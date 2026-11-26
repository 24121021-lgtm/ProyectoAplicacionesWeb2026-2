import { useState } from 'react'

function Notificaciones({
  cantidad,
  marcarLeidas
}) {

  const [abierto, setAbierto] = useState(false)

  return (

    <div className="relative">

      <button
        type="button"
        aria-label={`Notificaciones: ${cantidad} nuevas reservas`}
        aria-expanded={abierto}
        onClick={() => setAbierto(anterior => !anterior)}
        className="relative rounded-lg border border-salvaje-dorado p-3 text-salvaje-dorado hover:bg-salvaje-verde"
      >

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >

          <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />

          <path d="M10 21h4" />

        </svg>

        {cantidad > 0 && (

          <span className="absolute -right-2 -top-2 flex min-h-6 min-w-6 items-center justify-center rounded-full bg-red-600 px-1 text-xs font-bold text-white">

            {cantidad > 99 ? '99+' : cantidad}

          </span>

        )}

      </button>

      {abierto && (

        <div className="absolute right-0 z-50 mt-3 w-64 rounded-xl border border-gray-200 bg-white p-5 text-salvaje-oscuro shadow-xl">

          <h2 className="mb-4 font-bold">
            Notificaciones
          </h2>

          {cantidad > 0 ? (

            <>

              <div className="mb-4 rounded-lg bg-yellow-50 p-3">

                <p className="font-semibold text-yellow-800">

                  {cantidad === 1
                    ? 'Nueva solicitud de reserva'
                    : `${cantidad} nuevas solicitudes de reserva`}

                </p>

                <p className="mt-1 text-xs text-gray-600">
                  Revisa las reservas pendientes.
                </p>

              </div>

              <button
                type="button"
                onClick={marcarLeidas}
                className="w-full rounded-lg bg-salvaje-verde px-3 py-2 text-sm font-semibold text-white"
              >

                Marcar como leídas

              </button>

            </>

          ) : (

            <p className="text-sm text-gray-500">

              No tienes notificaciones nuevas.

            </p>

          )}

        </div>

      )}

      <span className="sr-only" aria-live="polite">
        {cantidad} nuevas reservas
      </span>

    </div>

  )

}

export default Notificaciones