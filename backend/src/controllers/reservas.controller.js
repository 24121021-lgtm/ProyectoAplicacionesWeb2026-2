
import {

  listarReservas,
  crearReserva,
  cambiarEstado

} from '../services/reservas.service.js'

import {
  notificarCambioReserva
} from '../services/whatsapp.service.js'

// GET - Consultar reservas

export function obtenerReservas(req, res, next) {

  try {

    const reservas = listarReservas()

    res.json(reservas)

  } catch (error) {

    next(error)

  }

}

// POST - Registrar reserva

export function registrarReserva(req, res, next) {

  try {

    const reserva = crearReserva(req.body)

    res.status(201).json(reserva)

  } catch (error) {

    next(error)

  }

}

// PATCH - Actualizar estado

export function actualizarReserva(req, res, next) {

  try {

    const { id } = req.params

    const {
      estado,
      motivo_rechazo
    } = req.body ?? {}

    const reserva = cambiarEstado(
      id,
      estado,
      motivo_rechazo
    )

    // Notificar cambio de estado

    try {

      notificarCambioReserva(reserva)

    } catch (error) {

      console.error(
        'Error en notificación WhatsApp:',
        error.message
      )

    }

    res.json(reserva)

  } catch (error) {

    next(error)

  }

}
