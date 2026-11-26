import { useState } from 'react'

const estilosEstado = {
  PENDIENTE: 'bg-yellow-100 text-yellow-800',
  CONFIRMADA: 'bg-green-100 text-green-800',
  RECHAZADA: 'bg-red-100 text-red-800'
}

function formatearSoles(monto) {

  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN'
  }).format(monto)

}

function ReservaCard({ reserva, onDecision, procesando }) {

  const [rechazando, setRechazando] = useState(false)
  const [motivo, setMotivo] = useState('')

  const datos = [
    {
      etiqueta: 'Teléfono',
      valor: reserva.telefono
    },
    {
      etiqueta: 'Tipo de reserva',
      valor: reserva.tipo_reserva === 'PAREJA'
        ? 'Pareja'
        : 'Mesa'
    },
    {
      etiqueta: 'Fecha',
      valor: reserva.fecha.split('-').reverse().join('/')
    },
    {
      etiqueta: 'Hora',
      valor: reserva.hora
    },
    {
      etiqueta: 'Personas',
      valor: reserva.cantidad_personas
    },
    {
      etiqueta: 'Consumo estimado',
      valor: formatearSoles(reserva.consumo_estimado)
    },
    {
      etiqueta: 'Adelanto requerido',
      valor: formatearSoles(reserva.adelanto)
    }
  ]

  return (

    <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

      <header className="mb-5 flex flex-wrap items-center justify-between gap-3">

        <div>

          <p className="text-xs text-gray-500">
            RESERVA #{reserva.id_reserva.slice(0, 8)}
          </p>

          <h2 className="mt-1 text-xl font-bold">
            {reserva.nombre_cliente}
          </h2>

        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${estilosEstado[reserva.estado]}`}
        >
          {reserva.estado}
        </span>

      </header>

      <div className="mb-5 grid grid-cols-1 gap-3 border-y border-gray-200 py-4 sm:grid-cols-2">

        {datos.map(dato => (

          <div key={dato.etiqueta}>

            <p className="text-xs text-gray-500">
              {dato.etiqueta}
            </p>

            <p className="font-semibold">
              {dato.valor}
            </p>

          </div>

        ))}

      </div>

      <p className="mb-4 text-xs text-gray-500">

        Registrada: {new Date(
          reserva.fecha_registro
        ).toLocaleString('es-PE', {
          timeZone: 'America/Lima'
        })}

      </p>

      {reserva.estado === 'PENDIENTE' && (

        <>

          {!rechazando ? (

            <>

              <p className="mb-4 text-sm text-gray-600">
                Verifica la disponibilidad antes de confirmar.
              </p>

              <div className="grid grid-cols-2 gap-3">

                <button
                  type="button"
                  disabled={procesando}
                  onClick={() => onDecision(
                    reserva.id_reserva,
                    'CONFIRMADA',
                    null
                  )}
                  className="rounded-lg bg-green-700 px-3 py-3 text-sm font-semibold text-white hover:bg-green-800 disabled:opacity-50"
                >
                  Confirmar
                </button>

                <button
                  type="button"
                  disabled={procesando}
                  onClick={() => setRechazando(true)}
                  className="rounded-lg border border-red-600 px-3 py-3 text-sm font-semibold text-red-700 hover:bg-red-50 disabled:opacity-50"
                >
                  Rechazar
                </button>

              </div>

            </>

          ) : (

            <form
              className="space-y-3"
              onSubmit={async evento => {

                evento.preventDefault()

                const correcto = await onDecision(
                  reserva.id_reserva,
                  'RECHAZADA',
                  motivo.trim()
                )

                if (correcto) {
                  setRechazando(false)
                  setMotivo('')
                }

              }}
            >

              <label className="block text-sm font-semibold">

                Motivo del rechazo

                <textarea
                  value={motivo}
                  onChange={e => setMotivo(e.target.value)}
                  placeholder="Ej.: No hay mesas disponibles"
                  rows={3}
                  maxLength={300}
                  required
                  disabled={procesando}
                  className="mt-2 w-full rounded-lg border border-gray-300 p-3"
                />

              </label>

              <div className="grid grid-cols-2 gap-3">

                <button
                  type="submit"
                  disabled={procesando || !motivo.trim()}
                  className="rounded-lg bg-red-700 py-3 text-sm font-semibold text-white disabled:opacity-50"
                >
                  Confirmar rechazo
                </button>

                <button
                  type="button"
                  disabled={procesando}
                  onClick={() => setRechazando(false)}
                  className="rounded-lg border border-gray-300 py-3 text-sm"
                >
                  Cancelar
                </button>

              </div>

            </form>

          )}

        </>

      )}

      {reserva.estado === 'RECHAZADA' && (

        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-800">

          <strong>Motivo: </strong>

          {reserva.motivo_rechazo}

        </div>

      )}

      {reserva.fecha_respuesta && (

        <p className="mt-3 text-xs text-gray-500">

          Procesada: {new Date(
            reserva.fecha_respuesta
          ).toLocaleString('es-PE', {
            timeZone: 'America/Lima'
          })}

        </p>

      )}

    </article>

  )
}

export default ReservaCard