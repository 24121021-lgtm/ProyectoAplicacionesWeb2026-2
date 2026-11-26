export const HORARIOS_RESERVA = [
  { valor: '12:00', etiqueta: '12:00 p. m.' },
  { valor: '13:00', etiqueta: '1:00 p. m.' },
  { valor: '14:00', etiqueta: '2:00 p. m.' },
  { valor: '18:00', etiqueta: '6:00 p. m.' },
  { valor: '19:00', etiqueta: '7:00 p. m.' },
  { valor: '20:00', etiqueta: '8:00 p. m.' },
  { valor: '21:00', etiqueta: '9:00 p. m.' }
]

export const TIPOS_RESERVA = {
  PAREJA: 'Reserva para parejas',
  MESA: 'Reserva de mesa'
}

export const ESTADOS_RESERVA = {
  PENDIENTE: 'PENDIENTE',
  CONFIRMADA: 'CONFIRMADA',
  RECHAZADA: 'RECHAZADA'
}

export const REGLAS_RESERVA = {
  MIN_PERSONAS: 1,
  MAX_PERSONAS: 10,
  ADELANTO_HASTA_CINCO: 30,
  ADELANTO_MAS_DE_CINCO: 50,
  CONSUMO_MINIMO: 1
}