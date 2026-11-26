import { Router } from 'express'

import {

  obtenerReservas,
  registrarReserva,
  actualizarReserva

} from '../controllers/reservas.controller.js'

import {

  iniciarSesion,
  cerrarSesion

} from '../services/auth.service.js'

import {
  autenticar
} from '../middlewares/auth.middleware.js'

const router = Router()

// Comprobar el funcionamiento del backend

router.get('/health', (req, res) => {

  res.json({
    mensaje: 'Backend de Salvaje funcionando'
  })

})

// Iniciar sesión

router.post('/auth/login', (req, res, next) => {

  try {

    const { usuario, password } = req.body ?? {}

    const sesion = iniciarSesion(
      usuario,
      password,
      req.ip
    )

    res.json(sesion)

  } catch (error) {

    next(error)

  }

})

// Cerrar sesión

router.post('/auth/logout', autenticar, (req, res) => {

  cerrarSesion(req.token)

  res.json({
    mensaje: 'Sesión cerrada correctamente'
  })

})

// Registrar reserva - Público

router.post(
  '/reservas',
  registrarReserva
)

// Consultar reservas - Administrador

router.get(
  '/reservas',
  autenticar,
  obtenerReservas
)

// Confirmar o rechazar - Administrador

router.patch(
  '/reservas/:id/estado',
  autenticar,
  actualizarReserva
)

export default router