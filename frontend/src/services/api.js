export const API_URL = import.meta.env.VITE_API_URL?.replace(/\/+$/, '')

export async function solicitarAPI(endpoint, opciones = {}) {

  if (!API_URL) {
    throw new Error('La URL de la API no está configurada')
  }

  const respuesta = await fetch(`${API_URL}/${endpoint}`, {
    ...opciones,
    headers: {
      ...(opciones.body
        ? { 'Content-Type': 'application/json' }
        : {}),
      ...opciones.headers
    }
  })

  if (!respuesta.ok) {
    throw new Error(
      `Error en la solicitud: ${respuesta.status}`
    )
  }

  if (respuesta.status === 204) {
    return null
  }

  return await respuesta.json()
}