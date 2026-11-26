import { ErrorHTTP } from '../utils/errorHTTP.js'

// Ruta inexistente

export function rutaNoEncontrada(req, res) {

  res.status(404).json({
    mensaje: 'Ruta no encontrada'
  })

}

// Manejo centralizado de errores

export function manejarErrores(error, req, res, next) {

  if (res.headersSent) {
    return next(error)
  }

  if (error instanceof ErrorHTTP) {

    return res.status(error.status).json({
      mensaje: error.message
    })

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

  console.error(
    'Error interno:',
    error.name
  )

  res.status(500).json({
    mensaje: 'Error interno del servidor'
  })

}