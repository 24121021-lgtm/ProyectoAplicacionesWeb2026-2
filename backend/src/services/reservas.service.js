import {

  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
  renameSync

} from 'node:fs'

import { randomUUID } from 'node:crypto'
import { fileURLToPath } from 'node:url'

import { ErrorHTTP } from '../utils/errorHTTP.js'

import {
  validarReserva,
  calcularAdelanto
} from '../utils/validarReserva.js'

// Ubicación del almacenamiento

const DIRECTORIO = fileURLToPath(
  new URL('../../data/', import.meta.url)
)

const ARCHIVO = fileURLToPath(
  new URL('../../data/reservas.json', import.meta.url)
)

// Guardar las reservas

function guardarReservas(reservas) {

  const archivoTemporal = `${ARCHIVO}.tmp`

  writeFileSync(
    archivoTemporal,
    JSON.stringify(reservas, null, 2),
    {
      encoding: 'utf8',
      mode: 0o600
    }
  )

  renameSync(archivoTemporal, ARCHIVO)

}

// Leer las reservas

function leerReservas() {

  const contenido = readFileSync(ARCHIVO, 'utf8')

  const reservas = JSON.parse(contenido)

  if (!Array.isArray(reservas)) {

    throw new Error(
      'El archivo de reservas no tiene un formato válido'
    )

  }

  return reservas

}

// Crear almacenamiento inicial

export function inicializarReservas() {

  mkdirSync(DIRECTORIO, {
    recursive: true,
    mode: 0o700
  })

  if (!existsSync(ARCHIVO)) {

    guardarReservas([])

  }

  leerReservas()

}

// Obtener todas las reservas

export function listarReservas() {

  return leerReservas().reverse()

}

// Registrar una reserva

export function crearReserva(datos) {

  const datosValidados = validarReserva(datos)

  const reservas = leerReservas()

  const nuevaReserva = {

    id_reserva: randomUUID(),

    ...datosValidados,

    adelanto: calcularAdelanto(
      datosValidados.cantidad_personas
    ),

    estado: 'PENDIENTE',

    fecha_registro: new Date().toISOString(),

    fecha_respuesta: null,

    motivo_rechazo: null

  }

  reservas.push(nuevaReserva)

  guardarReservas(reservas)

  return nuevaReserva

}

// Confirmar o rechazar una reserva

export function cambiarEstado(
  id,
  estado,
  motivoRechazo
) {

  const reservas = leerReservas()

  const reserva = reservas.find(
    item => item.id_reserva === id
  )

  if (!reserva) {

    throw new ErrorHTTP(
      404,
      'Reserva no encontrada'
    )

  }

  if (reserva.estado !== 'PENDIENTE') {

    throw new ErrorHTTP(
      409,
      'Esta reserva ya fue procesada'
    )

  }

  if (!['CONFIRMADA', 'RECHAZADA'].includes(estado)) {

    throw new ErrorHTTP(
      400,
      'Estado incorrecto'
    )

  }

  const motivo = typeof motivoRechazo === 'string'
    ? motivoRechazo.trim()
    : ''

  if (
    estado === 'RECHAZADA' &&
    (motivo.length === 0 || motivo.length > 300)
  ) {

    throw new ErrorHTTP(
      400,
      'Ingresa un motivo de hasta 300 caracteres'
    )

  }

  reserva.estado = estado

  reserva.fecha_respuesta = new Date().toISOString()

  reserva.motivo_rechazo =
    estado === 'RECHAZADA' ? motivo : null

  guardarReservas(reservas)

  return reserva

} 