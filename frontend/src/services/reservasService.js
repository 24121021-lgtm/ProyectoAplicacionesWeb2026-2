import { ESTADOS_RESERVA } from '../data/reglasReserva'

import {
  calcularAdelanto,
  validarReserva
} from '../utils/validarReserva'

const STORAGE_KEY = 'salvaje_reservas_demo'

// Consultar todas las reservas simuladas

export async function obtenerReservas() {

  const datos = localStorage.getItem(STORAGE_KEY)

  if (!datos) {
    return []
  }

  const reservas = JSON.parse(datos)

  if (!Array.isArray(reservas)) {
    throw new Error('El almacenamiento de reservas no es válido')
  }

  return reservas

}

// Registrar una nueva reserva

export async function crearReserva(datos) {

  const errores = validarReserva(datos)

  if (Object.keys(errores).length > 0) {

    throw new Error(
      Object.values(errores).join(' ')
    )

  }

  const reservas = await obtenerReservas()

  const nuevaReserva = {

    id_reserva: crypto.randomUUID(),

    nombre_cliente: datos.nombre_cliente.trim(),

    telefono: datos.telefono.trim(),

    tipo_reserva: datos.tipo_reserva,

    fecha: datos.fecha,

    hora: datos.hora,

    cantidad_personas: Number(datos.cantidad_personas),

    consumo_estimado: Number(datos.consumo_estimado),

    adelanto: calcularAdelanto(datos.cantidad_personas),

    estado: ESTADOS_RESERVA.PENDIENTE,

    fecha_registro: new Date().toISOString(),

    fecha_respuesta: null,

    motivo_rechazo: null

  }

  const reservasActualizadas = [
    ...reservas,
    nuevaReserva
  ]

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(reservasActualizadas)
  )

  return nuevaReserva

}