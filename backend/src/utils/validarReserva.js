import { ErrorHTTP } from './errorHTTP.js'

const HORARIOS = [
  '12:00',
  '13:00',
  '14:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00'
]

function obtenerFechaMinima() {

  const partes = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Lima',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).formatToParts(new Date())

  const parte = tipo =>
    Number(partes.find(item => item.type === tipo).value)

  const manana = new Date(Date.UTC(
    parte('year'),
    parte('month') - 1,
    parte('day') + 1
  ))

  return manana.toISOString().slice(0, 10)

}

function fechaValida(fecha) {

  if (
    typeof fecha !== 'string' ||
    !/^\d{4}-\d{2}-\d{2}$/.test(fecha)
  ) {
    return false
  }

  const valor = new Date(`${fecha}T00:00:00Z`)

  return !Number.isNaN(valor.getTime()) &&
    valor.toISOString().slice(0, 10) === fecha

}

function esNumero(valor) {

  return (
    typeof valor === 'number' ||
    (
      typeof valor === 'string' &&
      valor.trim() !== ''
    )
  ) && Number.isFinite(Number(valor))

}

export function validarReserva(datos) {

  if (
    !datos ||
    typeof datos !== 'object' ||
    Array.isArray(datos)
  ) {
    throw new ErrorHTTP(400, 'Datos de reserva incorrectos')
  }

  const nombre = typeof datos.nombre_cliente === 'string'
    ? datos.nombre_cliente.trim()
    : ''

  const telefono = typeof datos.telefono === 'string'
    ? datos.telefono.trim()
    : ''

  const personas = Number(datos.cantidad_personas)
  const consumo = Number(datos.consumo_estimado)

  if (nombre.length < 3 || nombre.length > 100) {
    throw new ErrorHTTP(400, 'Nombre del cliente incorrecto')
  }

  if (!/^9\d{8}$/.test(telefono)) {
    throw new ErrorHTTP(400, 'Teléfono incorrecto')
  }

  if (!['PAREJA', 'MESA'].includes(datos.tipo_reserva)) {
    throw new ErrorHTTP(400, 'Tipo de reserva incorrecto')
  }

  if (
    !esNumero(datos.cantidad_personas) ||
    !Number.isInteger(personas) ||
    personas < 1 ||
    personas > 10
  ) {
    throw new ErrorHTTP(
      400,
      'La cantidad debe ser de 1 a 10 personas'
    )
  }

  if (
    datos.tipo_reserva === 'PAREJA' &&
    personas !== 2
  ) {
    throw new ErrorHTTP(
      400,
      'Las reservas para parejas requieren 2 personas'
    )
  }

  if (
    !fechaValida(datos.fecha) ||
    datos.fecha < obtenerFechaMinima()
  ) {
    throw new ErrorHTTP(
      400,
      'La reserva debe realizarse desde mañana'
    )
  }

  if (!HORARIOS.includes(datos.hora)) {
    throw new ErrorHTTP(400, 'Horario incorrecto')
  }

  if (
    !esNumero(datos.consumo_estimado) ||
    consumo < 1
  ) {
    throw new ErrorHTTP(
      400,
      'Consumo estimado incorrecto'
    )
  }

  return {

    nombre_cliente: nombre,
    telefono,
    tipo_reserva: datos.tipo_reserva,
    fecha: datos.fecha,
    hora: datos.hora,
    cantidad_personas: personas,
    consumo_estimado: consumo

  }

}

export function calcularAdelanto(personas) {

  return personas > 5 ? 50 : 30

}