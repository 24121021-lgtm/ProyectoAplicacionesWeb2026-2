import {
  TIPOS_RESERVA,
  HORARIOS_RESERVA
} from '../data/reglasReserva'

import { formatearSoles } from '../utils/validarReserva'

function ResumenReserva({ reserva }) {

  const horario = HORARIOS_RESERVA.find(
    item => item.valor === reserva.hora
  )

  return (

    <div
      className="reservation-result"
      role="status"
      aria-live="polite"
    >

      <strong className="text-lg">
        Solicitud de prueba registrada
      </strong>

      <span className="mb-4 inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-bold text-yellow-800">
        PENDIENTE
      </span>

      <div className="mb-4 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">

        <div>
          <strong>Cliente:</strong>
          {reserva.nombre_cliente}
        </div>

        <div>
          <strong>Tipo de reserva:</strong>
          {TIPOS_RESERVA[reserva.tipo_reserva]}
        </div>

        <div>
          <strong>Fecha:</strong>
          {reserva.fecha.split('-').reverse().join('/')}
        </div>

        <div>
          <strong>Hora:</strong>
          {horario?.etiqueta ?? reserva.hora}
        </div>

        <div>
          <strong>Personas:</strong>
          {reserva.cantidad_personas}
        </div>

        <div>
          <strong>Consumo estimado:</strong>
          {formatearSoles(reserva.consumo_estimado)}
        </div>

        <div>
          <strong>Adelanto:</strong>
          {formatearSoles(reserva.adelanto)}
        </div>

      </div>

      <p>
        Esta solicitud de demostración queda pendiente
        de revisión en el panel administrativo.
      </p>

      <p>
        No se ha realizado ningún pago ni se ha
        enviado un mensaje al restaurante.
      </p>

    </div>

  )

}

export default ResumenReserva