import { validarSesion } from '../services/auth.service.js'

import { ErrorHTTP } from '../utils/errorHTTP.js'

export function autenticar(req, res, next) {

  try {

    const autorizacion = req.headers.authorization || ''

    if (!autorizacion.startsWith('Bearer ')) {

      throw new ErrorHTTP(
        401,
        'No autorizado'
      )

    }

    const token = autorizacion.slice(7)

    const sesion = validarSesion(token)

    req.token = token
    req.usuario = sesion.usuario

    next()

  } catch (error) {

    next(error)

  }

}