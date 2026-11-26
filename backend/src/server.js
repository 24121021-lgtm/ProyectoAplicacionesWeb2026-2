import express from 'express'
import cors from 'cors'
import { randomUUID } from 'node:crypto'

const app = express()
const PORT = Number(process.env.PORT || 3001)

const ADMIN_USER = process.env.ADMIN_USER
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

if (!ADMIN_USER || !ADMIN_PASSWORD) {
  throw new Error('Faltan las credenciales del administrador en .env')
}

// Middlewares

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:5174'
  ]
}))

app.use(express.json({ limit: '16kb' }))

// Almacenamiento temporal

const reservas = []
const sesiones = new Map()

const HORARIOS = [
  '12:00',
  '13:00',
  '14:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00'
]

// Obtener la fecha mínima en Perú

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

// Validar fechas

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

// Validaciones del backend

function validarReserva(datos) {

  const nombre = String(datos.nombre_cliente ?? '').trim()
  const telefono = String(datos.telefono ?? '').trim()
  const personas = Number(datos.cantidad_personas)
  const consumo = Number(datos.consumo_estimado)

  if (nombre.length < 3 || nombre.length > 100) {
    return 'Nombre del cliente incorrecto'
  }

  if (!/^9\d{8}$/.test(telefono)) {
    return 'Teléfono incorrecto'
  }

  if (!['PAREJA', 'MESA'].includes(datos.tipo_reserva)) {
    return 'Tipo de reserva incorrecto'
  }

  if (
    !Number.isInteger(personas) ||
    personas < 1 ||
    personas > 10
  ) {
    return 'La cantidad debe ser de 1 a 10 personas'
  }

  if (datos.tipo_reserva === 'PAREJA' && personas !== 2) {
    return 'Las reservas para parejas requieren 2 personas'
  }

  if (
    !fechaValida(datos.fecha) ||
    datos.fecha < obtenerFechaMinima()
  ) {
    return 'La reserva debe realizarse desde mañana'
  }

  if (!HORARIOS.includes(datos.hora)) {
    return 'Horario incorrecto'
  }

  if (!Number.isFinite(consumo) || consumo < 1) {
    return 'Consumo estimado incorrecto'
  }

  return null
}

// Middleware de autenticación

function autenticar(req, res, next) {

  const autorizacion = req.headers.authorization || ''

  if (!autorizacion.startsWith('Bearer ')) {
    return res.status(401).json({
      mensaje: 'No autorizado'
    })
  }

  const token = autorizacion.slice(7)
  const sesion = sesiones.get(token)

  if (!sesion || sesion.expira <= Date.now()) {

    sesiones.delete(token)

    return res.status(401).json({
      mensaje: 'Sesión inválida o expirada'
    })

  }

  req.token = token

  next()
}

// Comprobar el servidor

app.get('/api/health', (req, res) => {

  res.json({
    mensaje: 'Backend de Salvaje funcionando'
  })

})

// Inicio de sesión

app.post('/api/auth/login', (req, res) => {

  const { usuario, password } = req.body ?? {}

  if (
    usuario !== ADMIN_USER ||
    password !== ADMIN_PASSWORD
  ) {

    return res.status(401).json({
      mensaje: 'Usuario o contraseña incorrectos'
    })

  }

  const token = randomUUID()

  sesiones.set(token, {
    expira: Date.now() + 60 * 60 * 1000
  })

  res.json({
    token,
    usuario: ADMIN_USER
  })

})

// Cerrar sesión

app.post('/api/auth/logout', autenticar, (req, res) => {

  sesiones.delete(req.token)

  res.json({
    mensaje: 'Sesión cerrada correctamente'
  })

})

// Registrar una nueva reserva
// Endpoint público

app.post('/api/reservas', (req, res) => {

  const datos = req.body ?? {}
  const error = validarReserva(datos)

  if (error) {
    return res.status(400).json({
      mensaje: error
    })
  }

  const personas = Number(datos.cantidad_personas)

  const reserva = {

    id_reserva: randomUUID(),

    nombre_cliente: datos.nombre_cliente.trim(),

    telefono: datos.telefono.trim(),

    tipo_reserva: datos.tipo_reserva,

    fecha: datos.fecha,

    hora: datos.hora,

    cantidad_personas: personas,

    consumo_estimado: Number(datos.consumo_estimado),

    adelanto: personas > 5 ? 50 : 30,

    estado: 'PENDIENTE',

    fecha_registro: new Date().toISOString(),

    fecha_respuesta: null,

    motivo_rechazo: null

  }

  reservas.push(reserva)

  res.status(201).json(reserva)

})

// Consultar todas las reservas
// Endpoint protegido

app.get('/api/reservas', autenticar, (req, res) => {

  res.json([...reservas].reverse())

})

// Confirmar o rechazar una reserva
// Endpoint protegido

app.patch(
  '/api/reservas/:id/estado',
  autenticar,
  (req, res) => {

    const { id } = req.params
    const { estado, motivo_rechazo } = req.body ?? {}

    const reserva = reservas.find(
      item => item.id_reserva === id
    )

    if (!reserva) {

      return res.status(404).json({
        mensaje: 'Reserva no encontrada'
      })

    }

    if (reserva.estado !== 'PENDIENTE') {

      return res.status(409).json({
        mensaje: 'Esta reserva ya fue procesada'
      })

    }

    if (!['CONFIRMADA', 'RECHAZADA'].includes(estado)) {

      return res.status(400).json({
        mensaje: 'Estado incorrecto'
      })

    }

    const motivo = String(motivo_rechazo ?? '').trim()

    if (
      estado === 'RECHAZADA' &&
      (motivo.length === 0 || motivo.length > 300)
    ) {

      return res.status(400).json({
        mensaje: 'Ingresa un motivo de hasta 300 caracteres'
      })

    }

    reserva.estado = estado

    reserva.fecha_respuesta = new Date().toISOString()

    reserva.motivo_rechazo =
      estado === 'RECHAZADA' ? motivo : null

    res.json(reserva)

  }
)

// Manejo de errores

app.use((error, req, res, next) => {

  if (res.headersSent) {
    return next(error)
  }

  if (error.type === 'entity.parse.failed') {
    return res.status(400).json({
      mensaje: 'JSON incorrecto'
    })
  }

  if (error.type === 'entity.too.large') {
    return res.status(413).json({
      mensaje: 'Solicitud demasiado grande'
    })
  }

  console.error(error)

  res.status(500).json({
    mensaje: 'Error interno del servidor'
  })

})

// Iniciar servidor local

app.listen(PORT, '127.0.0.1', () => {

  console.log(
    `Servidor funcionando en http://localhost:${PORT}`
  )

})