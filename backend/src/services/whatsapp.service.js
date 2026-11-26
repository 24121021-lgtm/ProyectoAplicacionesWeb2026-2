
const MODO_WHATSAPP = process.env.WHATSAPP_MODE || 'simulacion'

// Construir mensaje según el estado de la reserva

function generarMensaje(reserva) {

  if (reserva.estado === 'CONFIRMADA') {

    return `
Hola ${reserva.nombre_cliente} 👋

¡Tu reserva en Salvaje Restobar ha sido CONFIRMADA!

📅 Fecha: ${reserva.fecha}
🕒 Hora: ${reserva.hora}
👥 Personas: ${reserva.cantidad_personas}
💰 Adelanto: S/ ${reserva.adelanto}

¡Te esperamos!

Salvaje Restobar
    `.trim()

  }

  if (reserva.estado === 'RECHAZADA') {

    return `
Hola ${reserva.nombre_cliente}.

Lamentamos informarte que tu reserva en Salvaje Restobar ha sido RECHAZADA.

📅 Fecha solicitada: ${reserva.fecha}
🕒 Hora: ${reserva.hora}

Motivo: ${reserva.motivo_rechazo || 'No especificado'}

Gracias por tu comprensión.

Salvaje Restobar
    `.trim()

  }

  return null

}

// Notificar cambio de estado

export function notificarCambioReserva(reserva) {

  const mensaje = generarMensaje(reserva)

  if (!mensaje) {
    return {
      enviado: false,
      mensaje: 'No requiere notificación'
    }
  }

  // Modo de simulación

  if (MODO_WHATSAPP === 'simulacion') {

    console.log('\n===================================')
    console.log('SIMULACIÓN DE WHATSAPP')
    console.log('===================================')

    console.log('Destinatario:', reserva.telefono)
    console.log('Estado:', reserva.estado)
    console.log('\nMensaje:\n', mensaje)

    console.log('===================================\n')

    return {
      enviado: false,
      simulacion: true,
      destinatario: reserva.telefono,
      estado: reserva.estado,
      mensaje
    }

  }

  throw new Error(
    'El envío real de WhatsApp todavía no está configurado'
  )

}
