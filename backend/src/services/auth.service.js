import {
  randomBytes,
  scryptSync,
  timingSafeEqual
} from 'node:crypto'

import { ErrorHTTP } from '../utils/errorHTTP.js'

const ADMIN_USER = process.env.ADMIN_USER
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

if (!ADMIN_USER || !ADMIN_PASSWORD) {

  throw new Error(
    'Faltan las credenciales del administrador en .env'
  )

}

const salt = randomBytes(16)

const passwordHash = scryptSync(
  ADMIN_PASSWORD,
  salt,
  64
)

const sesiones = new Map()
const intentos = new Map()

const DURACION_SESION = 60 * 60 * 1000
const DURACION_BLOQUEO = 60 * 1000
const MAX_INTENTOS = 5

// Comprobar la contraseña

function passwordCorrecto(password) {

  if (
    typeof password !== 'string' ||
    password.length > 256
  ) {
    return false
  }

  const hashRecibido = scryptSync(
    password,
    salt,
    64
  )

  return timingSafeEqual(
    passwordHash,
    hashRecibido
  )

}

// Iniciar sesión

export function iniciarSesion(usuario, password, ip) {

  const ahora = Date.now()

  for (const [clave, registro] of intentos) {

    if (registro.expira <= ahora) {
      intentos.delete(clave)
    }

  }

  const registro = intentos.get(ip) ?? {
    cantidad: 0,
    expira: ahora + DURACION_BLOQUEO
  }

  if (registro.cantidad >= MAX_INTENTOS) {

    throw new ErrorHTTP(
      429,
      'Demasiados intentos. Intenta nuevamente en un minuto.'
    )

  }

  if (
    usuario !== ADMIN_USER ||
    !passwordCorrecto(password)
  ) {

    registro.cantidad += 1

    intentos.set(ip, registro)

    throw new ErrorHTTP(
      401,
      'Usuario o contraseña incorrectos'
    )

  }

  intentos.delete(ip)

  // Eliminar sesiones expiradas

  for (const [token, sesion] of sesiones) {

    if (sesion.expira <= ahora) {
      sesiones.delete(token)
    }

  }

  // Generar una sesión nueva

  const token = randomBytes(32).toString('hex')

  sesiones.set(token, {

    usuario: ADMIN_USER,

    expira: ahora + DURACION_SESION

  })

  return {
    token,
    usuario: ADMIN_USER
  }

}

// Validar una sesión

export function validarSesion(token) {

  const sesion = sesiones.get(token)

  if (!sesion || sesion.expira <= Date.now()) {

    sesiones.delete(token)

    throw new ErrorHTTP(
      401,
      'Sesión inválida o expirada'
    )

  }

  return sesion

}

// Cerrar sesión

export function cerrarSesion(token) {

  sesiones.delete(token)

}