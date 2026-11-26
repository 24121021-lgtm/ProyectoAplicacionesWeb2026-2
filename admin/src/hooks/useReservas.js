import {
  useState,
  useEffect,
  useRef,
  useCallback
} from 'react'

import {
  iniciarSesion,
  cerrarSesion,
  obtenerReservas,
  actualizarEstado
} from '../services/api'

export function useReservas() {

  const [token, setToken] = useState('')
  const [reservas, setReservas] = useState([])
  const [avisos, setAvisos] = useState([])
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [conexion, setConexion] = useState(true)

  const idsConocidos = useRef(new Set())
  const ocupado = useRef(false)
  const version = useRef(0)

  // Limpiar la sesión local

  const limpiarSesion = useCallback(() => {

    setToken('')
    setReservas([])
    setAvisos([])

    idsConocidos.current.clear()

  }, [])

  // Manejar errores

  const manejarError = useCallback(error => {

    setError(error.message)

    if (error.status === 401) {
      limpiarSesion()
    }

  }, [limpiarSesion])

  // Detectar nuevas reservas

  const registrarListado = useCallback(datos => {

    if (!Array.isArray(datos)) {
      throw new Error('El listado de reservas no es válido')
    }

    const nuevas = datos.filter(reserva =>
      reserva.estado === 'PENDIENTE' &&
      !idsConocidos.current.has(reserva.id_reserva)
    )

    const pendientes = new Set(
      datos
        .filter(reserva => reserva.estado === 'PENDIENTE')
        .map(reserva => reserva.id_reserva)
    )

    datos.forEach(reserva => {
      idsConocidos.current.add(reserva.id_reserva)
    })

    setReservas(datos)

    setAvisos(anteriores => [

      ...new Set([
        ...anteriores,
        ...nuevas.map(reserva => reserva.id_reserva)
      ])

    ].filter(id => pendientes.has(id)))

  }, [])

  // Actualización automática cada 5 segundos

  useEffect(() => {

    if (!token) {
      return
    }

    let cancelado = false
    let consultando = false

    async function consultar() {

      if (ocupado.current || consultando) {
        return
      }

      consultando = true

      const versionActual = version.current

      try {

        const datos = await obtenerReservas(token)

        if (
          cancelado ||
          versionActual !== version.current
        ) {
          return
        }

        registrarListado(datos)
        setConexion(true)

      } catch (error) {

        if (
          cancelado ||
          versionActual !== version.current
        ) {
          return
        }

        if (error.status === 401) {

          manejarError(error)

        } else {

          setConexion(false)

        }

      } finally {

        consultando = false

      }

    }

    const intervalo = setInterval(consultar, 5000)

    return () => {

      cancelado = true
      clearInterval(intervalo)

    }

  }, [token, registrarListado, manejarError])

  // Ejecutar operaciones administrativas

  async function ejecutar(operacion) {

    if (ocupado.current) {
      return false
    }

    ocupado.current = true
    version.current += 1

    setCargando(true)
    setError('')
    setMensaje('')

    try {

      await operacion()

      setConexion(true)

      return true

    } catch (error) {

      manejarError(error)

      return false

    } finally {

      ocupado.current = false
      setCargando(false)

    }

  }

  // Iniciar sesión

  async function manejarLogin(usuario, password) {

    return ejecutar(async () => {

      const sesion = await iniciarSesion(
        usuario,
        password
      )

      const datos = await obtenerReservas(sesion.token)

      idsConocidos.current = new Set(
        datos.map(reserva => reserva.id_reserva)
      )

      setReservas(datos)
      setAvisos([])
      setToken(sesion.token)

    })

  }

  // Actualizar manualmente

  async function cargarReservas() {

    return ejecutar(async () => {

      const datos = await obtenerReservas(token)

      registrarListado(datos)

    })

  }

  // Confirmar o rechazar reservas

  async function manejarDecision(id, estado, motivo) {

    return ejecutar(async () => {

      const actualizada = await actualizarEstado(
        id,
        estado,
        motivo,
        token
      )

      setReservas(anteriores =>
        anteriores.map(reserva =>
          reserva.id_reserva === id
            ? actualizada
            : reserva
        )
      )

      setAvisos(anteriores =>
        anteriores.filter(aviso => aviso !== id)
      )

      setMensaje(
        estado === 'CONFIRMADA'
          ? 'Reserva confirmada correctamente'
          : 'Reserva rechazada correctamente'
      )

    })

  }

  // Marcar notificaciones como leídas

  function marcarLeidas() {

    setAvisos([])

  }

  // Cerrar sesión

  async function manejarLogout() {

    return ejecutar(async () => {

      try {

        await cerrarSesion(token)

      } catch {

        setError(
          'Sesión local cerrada. No se pudo contactar al servidor.'
        )

      } finally {

        limpiarSesion()

      }

    })

  }

  return {

    token,
    reservas,
    avisos,
    cargando,
    error,
    mensaje,
    conexion,

    manejarLogin,
    manejarLogout,
    cargarReservas,
    manejarDecision,
    marcarLeidas

  }

}