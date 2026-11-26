import express from 'express'
import cors from 'cors'

import apiRoutes from './routes/api.routes.js'

import {
  inicializarReservas
} from './services/reservas.service.js'

import {
  rutaNoEncontrada,
  manejarErrores
} from './middlewares/error.middleware.js'

const app = express()

const PORT = Number(process.env.PORT || 3001)

// Inicializar almacenamiento

inicializarReservas()

// Configuración de seguridad

app.disable('x-powered-by')

// Configuración de CORS

app.use(cors({

  origin: [

    'http://localhost:5173',
    'http://localhost:5174',

    'http://127.0.0.1:5173',
    'http://127.0.0.1:5174'

  ],

  methods: [
    'GET',
    'POST',
    'PATCH',
    'OPTIONS'
  ],

  allowedHeaders: [
    'Content-Type',
    'Authorization'
  ]

}))

// Interpretar solicitudes JSON

app.use(express.json({
  limit: '16kb'
}))

// Evitar el almacenamiento en caché de respuestas

app.use('/api', (req, res, next) => {

  res.setHeader('Cache-Control', 'no-store')

  next()

})

// Ruta principal

app.get('/', (req, res) => {

  res.json({

    nombre: 'API Salvaje Restobar',

    estado: 'Funcionando',

    health: '/api/health'

  })

})

// Rutas de la API

app.use('/api', apiRoutes)

// Manejo de errores

app.use(rutaNoEncontrada)

app.use(manejarErrores)

// Iniciar servidor

app.listen(PORT, '127.0.0.1', () => {

  console.log('===================================')

  console.log('Backend Salvaje Restobar')

  console.log(`Servidor: http://localhost:${PORT}`)

  console.log(`Estado: http://localhost:${PORT}/api/health`)

  console.log('Almacenamiento JSON inicializado')

  console.log('===================================')

})