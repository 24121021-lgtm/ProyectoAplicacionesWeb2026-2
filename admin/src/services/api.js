const API_URL = import.meta.env.VITE_BACKEND_URL
  ?.replace(/\/+$/, '')

async function solicitarAPI(
  endpoint,
  opciones = {},
  token = null
) {

  if (!API_URL) {
    throw new Error('URL del backend no configurada')
  }

  const respuesta = await fetch(
    `${API_URL}/${endpoint}`,
    {
      ...opciones,

      headers: {
        ...(opciones.body
          ? { 'Content-Type': 'application/json' }
          : {}),

        ...(token
          ? { Authorization: `Bearer ${token}` }
          : {})
      }
    }
  )

  const datos = await respuesta.json()

  if (!respuesta.ok) {

    const error = new Error(
      datos.mensaje || 'Error en la solicitud'
    )

    error.status = respuesta.status

    throw error

  }

  return datos
}

// Iniciar sesión

export function iniciarSesion(usuario, password) {

  return solicitarAPI('auth/login', {
    method: 'POST',

    body: JSON.stringify({
      usuario,
      password
    })
  })

}

// Cerrar sesión

export function cerrarSesion(token) {

  return solicitarAPI(
    'auth/logout',
    { method: 'POST' },
    token
  )

}

// Consultar reservas

export function obtenerReservas(token) {

  return solicitarAPI(
    'reservas',
    { method: 'GET' },
    token
  )

}

// Actualizar estado

export function actualizarEstado(
  id,
  estado,
  motivo,
  token
) {

  return solicitarAPI(

    `reservas/${encodeURIComponent(id)}/estado`,

    {
      method: 'PATCH',

      body: JSON.stringify({
        estado,
        motivo_rechazo: motivo
      })
    },

    token

  )

}