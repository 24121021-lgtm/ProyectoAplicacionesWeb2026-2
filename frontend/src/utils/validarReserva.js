import {
  HORARIOS_RESERVA,
  TIPOS_RESERVA,
  REGLAS_RESERVA
} from '../data/reglasReserva'

// Obtener la fecha mínima según la hora de Perú

export function obtenerFechaMinima() {

  const partes = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Lima',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).formatToParts(new Date())

  const obtenerParte = tipo =>
    Number(partes.find(parte => parte.type === tipo).value)

  const manana = new Date(Date.UTC(
    obtenerParte('year'),
    obtenerParte('month') - 1,
    obtenerParte('day') + 1
  ))

  return manana.toISOString().slice(0, 10)

}

// Calcular el adelanto

export function calcularAdelanto(personas) {

  return Number(personas) > 5
    ? REGLAS_RESERVA.ADELANTO_MAS_DE_CINCO
    : REGLAS_RESERVA.ADELANTO_HASTA_CINCO

}

// Formatear cantidades en soles

export function formatearSoles(monto) {

  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN'
  }).format(monto)

}

// Comprobar que una fecha exista

function fechaValida(fecha) {

  if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
    return false
  }

  const valor = new Date(`${fecha}T00:00:00Z`)

  return !Number.isNaN(valor.getTime()) &&
    valor.toISOString().slice(0, 10) === fecha

}

// Validar los datos de la reserva

export function validarReserva(datos) {

  const errores = {}

  const nombre = String(datos.nombre_cliente ?? '').trim()
  const telefono = String(datos.telefono ?? '').trim()
  const personas = Number(datos.cantidad_personas)
  const consumo = Number(datos.consumo_estimado)

  if (nombre.length < 3 || nombre.length > 100) {

    errores.nombre_cliente =
      'Ingresa un nombre de entre 3 y 100 caracteres.'

  }

  if (!/^9\d{8}$/.test(telefono)) {

    errores.telefono =
      'Ingresa un celular peruano válido de 9 dígitos.'

  }

  if (!Object.hasOwn(TIPOS_RESERVA, datos.tipo_reserva)) {

    errores.tipo_reserva =
      'Selecciona un tipo de reserva válido.'

  }

  if (!fechaValida(datos.fecha)) {

    errores.fecha = 'Selecciona una fecha válida.'

  } else if (datos.fecha < obtenerFechaMinima()) {

    errores.fecha =
      'Debes reservar con al menos un día de anticipación.'

  }

  if (!HORARIOS_RESERVA.some(
    horario => horario.valor === datos.hora
  )) {

    errores.hora = 'Selecciona un horario válido.'

  }

  if (
    !Number.isInteger(personas) ||
    personas < REGLAS_RESERVA.MIN_PERSONAS ||
    personas > REGLAS_RESERVA.MAX_PERSONAS
  ) {

    errores.cantidad_personas =
      'Selecciona entre 1 y 10 personas.'

  } else if (
    datos.tipo_reserva === 'PAREJA' &&
    personas !== 2
  ) {

    errores.cantidad_personas =
      'La reserva para parejas debe ser para 2 personas.'

  }

  if (
    !Number.isFinite(consumo) ||
    consumo < REGLAS_RESERVA.CONSUMO_MINIMO
  ) {

    errores.consumo_estimado =
      'El consumo estimado debe ser como mínimo S/ 1.'

  }

  return errores

}