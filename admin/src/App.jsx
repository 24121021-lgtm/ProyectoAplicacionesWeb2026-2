import { useState } from 'react'

import Login from './components/Login'
import ReservaCard from './components/ReservaCard'
import Notificaciones from './components/Notificaciones'

import { useReservas } from './hooks/useReservas'

function App() {

  const {

    token,
    reservas,
    avisos,
    cargando,
    error,
    mensaje,
    conexion,

    manejarLogin,
    manejarLogout,
    cargarReservas,
    manejarDecision,
    marcarLeidas

  } = useReservas()

  const [filtro, setFiltro] = useState('PENDIENTE')

  // Contadores

  const pendientes = reservas.filter(
    reserva => reserva.estado === 'PENDIENTE'
  ).length

  const confirmadas = reservas.filter(
    reserva => reserva.estado === 'CONFIRMADA'
  ).length

  const rechazadas = reservas.filter(
    reserva => reserva.estado === 'RECHAZADA'
  ).length

  // Filtrar reservas

  const reservasFiltradas = reservas.filter(
    reserva =>
      filtro === 'TODAS' ||
      reserva.estado === filtro
  )

  // Inicio de sesión

  if (!token) {

    return (

      <Login
        onLogin={(usuario, password) => {
          setFiltro('PENDIENTE')
          return manejarLogin(usuario, password)
        }}
        cargando={cargando}
        error={error}
      />

    )

  }

  const estadisticas = [

    {
      titulo: 'Pendientes',
      cantidad: pendientes,
      estado: 'PENDIENTE',
      color: 'text-yellow-700'
    },

    {
      titulo: 'Confirmadas',
      cantidad: confirmadas,
      estado: 'CONFIRMADA',
      color: 'text-green-700'
    },

    {
      titulo: 'Rechazadas',
      cantidad: rechazadas,
      estado: 'RECHAZADA',
      color: 'text-red-700'
    }

  ]

  return (

    <div className="min-h-screen bg-salvaje-crema">

      {/* Encabezado */}

      <header className="bg-salvaje-oscuro px-5 py-5 text-white">

        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">

          <div>

            <p className="text-2xl font-bold tracking-widest text-salvaje-dorado">
              SALVAJE ADMIN
            </p>

            <p className="mt-1 text-xs text-gray-300">
              Sistema administrativo de reservas
            </p>

          </div>

          <div className="flex items-center gap-5">

            <Notificaciones
              cantidad={avisos.length}
              marcarLeidas={marcarLeidas}
            />

            <button
              type="button"
              onClick={manejarLogout}
              disabled={cargando}
              className="rounded-lg border border-salvaje-dorado px-4 py-2 text-sm font-semibold text-salvaje-dorado hover:bg-salvaje-verde disabled:opacity-50"
            >

              Cerrar sesión

            </button>

          </div>

        </div>

      </header>

      <main className="mx-auto max-w-7xl px-5 py-8">

        {/* Título */}

        <div className="mb-8">

          <p className="mb-2 text-xs font-semibold tracking-widest text-salvaje-marron">
            ADMINISTRACIÓN
          </p>

          <h1 className="text-3xl font-bold">
            Gestión de reservas
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            Consulta, confirma o rechaza las solicitudes recibidas.
          </p>

          {/* Estado de conexión */}

          <div className="mt-4 flex items-center gap-2">

            <span
              className={`h-3 w-3 rounded-full ${
                conexion
                  ? 'animate-pulse bg-green-500'
                  : 'bg-red-500'
              }`}
            />

            <span className={`text-sm ${
              conexion ? 'text-green-700' : 'text-red-700'
            }`}>

              {conexion
                ? 'Actualización automática activa'
                : 'Sin conexión con el servidor'}

            </span>

          </div>

        </div>

        {/* Advertencia de conexión */}

        {!conexion && (

          <div
            role="alert"
            className="mb-6 rounded-lg border border-yellow-300 bg-yellow-100 p-4 text-sm text-yellow-800"
          >

            No se pudo actualizar el listado.
            Se intentará recuperar la conexión automáticamente.
            Los datos mostrados podrían estar desactualizados.

          </div>

        )}

        {/* Estadísticas */}

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

          {estadisticas.map(item => (

            <button
              type="button"
              key={item.estado}
              onClick={() => setFiltro(item.estado)}
              className={`rounded-xl border bg-white p-5 text-left shadow-sm ${
                filtro === item.estado
                  ? 'border-salvaje-dorado ring-1 ring-salvaje-dorado'
                  : 'border-gray-200'
              }`}
            >

              <p className="text-sm text-gray-600">
                {item.titulo}
              </p>

              <p className={`mt-2 text-4xl font-bold ${item.color}`}>
                {item.cantidad}
              </p>

            </button>

          ))}

        </div>

        {/* Aviso de nuevas solicitudes */}

        {avisos.length > 0 && (

          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-yellow-300 bg-yellow-50 p-4">

            <p className="font-semibold text-yellow-800">

              {avisos.length === 1
                ? 'Tienes una nueva solicitud de reserva.'
                : `Tienes ${avisos.length} nuevas solicitudes de reserva.`}

            </p>

            <button
              type="button"
              onClick={() => setFiltro('PENDIENTE')}
              className="rounded-lg bg-salvaje-dorado px-4 py-2 text-sm font-semibold text-salvaje-oscuro"
            >

              Ver solicitudes

            </button>

          </div>

        )}

        {/* Filtros */}

        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">

          <div className="flex flex-wrap gap-2">

            {[
              ['TODAS', 'Todas'],
              ['PENDIENTE', 'Pendientes'],
              ['CONFIRMADA', 'Confirmadas'],
              ['RECHAZADA', 'Rechazadas']
            ].map(([valor, etiqueta]) => (

              <button
                type="button"
                key={valor}
                onClick={() => setFiltro(valor)}
                className={`rounded-lg px-4 py-2 text-sm font-semibold ${
                  filtro === valor
                    ? 'bg-salvaje-verde text-white'
                    : 'bg-white text-salvaje-verde'
                }`}
              >

                {etiqueta}

              </button>

            ))}

          </div>

          <button
            type="button"
            onClick={cargarReservas}
            disabled={cargando}
            className="rounded-lg bg-salvaje-dorado px-5 py-2 text-sm font-semibold text-salvaje-oscuro disabled:opacity-50"
          >

            {cargando
              ? 'Procesando...'
              : 'Actualizar reservas'}

          </button>

        </div>

        {/* Mensajes */}

        {error && (

          <p
            role="alert"
            className="mb-5 rounded-lg bg-red-100 p-4 text-red-800"
          >

            {error}

          </p>

        )}

        {mensaje && (

          <p
            role="status"
            className="mb-5 rounded-lg bg-green-100 p-4 text-green-800"
          >

            {mensaje}

          </p>

        )}

        {/* Listado */}

        <p className="mb-4 text-sm text-gray-600">

          {reservasFiltradas.length} solicitudes encontradas

        </p>

        {reservasFiltradas.length === 0 ? (

          <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">

            <h2 className="text-xl font-semibold">
              No hay reservas en esta sección
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Las nuevas solicitudes aparecerán automáticamente.
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-2">

            {reservasFiltradas.map(reserva => (

              <div
                key={reserva.id_reserva}
                className={
                  avisos.includes(reserva.id_reserva)
                    ? 'rounded-xl ring-2 ring-salvaje-dorado'
                    : ''
                }
              >

                {avisos.includes(reserva.id_reserva) && (

                  <div className="rounded-t-xl bg-salvaje-dorado px-4 py-2 text-xs font-bold text-salvaje-oscuro">

                    NUEVA SOLICITUD

                  </div>

                )}

                <ReservaCard
                  reserva={reserva}
                  onDecision={manejarDecision}
                  procesando={cargando || !conexion}
                />

              </div>

            ))}

          </div>

        )}

      </main>

      <footer className="py-5 text-center text-xs text-gray-500">

        Salvaje Restobar · Panel administrativo de demostración

      </footer>

    </div>

  )

}

export default App