import { validarReserva } from '../utils/validarReserva'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
  ?.replace(/\/+$/, '')

export async function crearReserva(datos) {

  const errores = validarReserva(datos)

  if (Object.keys(errores).length > 0) {

    throw new Error(
      Object.values(errores).join(' ')
    )

  }

  if (!BACKEND_URL) {

    throw new Error(
      'La URL del backend no está configurada'
    )

  }

  const respuesta = await fetch(
    `${BACKEND_URL}/reservas`,
    {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(datos)
    }
  )

  const resultado = await respuesta.json()

  if (!respuesta.ok) {

    throw new Error(
      resultado.mensaje || 'No se pudo registrar la reserva'
    )

  }

  return resultado

}