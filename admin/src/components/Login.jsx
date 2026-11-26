import { useState } from 'react'

function Login({ onLogin, cargando, error }) {

  const [usuario, setUsuario] = useState('')
  const [password, setPassword] = useState('')

  function manejarEnvio(evento) {

    evento.preventDefault()

    onLogin(usuario.trim(), password)

  }

  return (

    <main className="flex min-h-screen items-center justify-center bg-salvaje-oscuro p-5">

      <div className="w-full max-w-md rounded-2xl bg-salvaje-crema p-8 shadow-xl">

        <header className="mb-8 text-center">

          <p className="text-4xl font-bold tracking-widest text-salvaje-verde">
            SALVAJE
          </p>

          <p className="mt-2 text-xs tracking-[0.3em] text-salvaje-marron">
            RESTOBAR
          </p>

          <h1 className="mt-8 text-2xl font-bold">
            Panel administrativo
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            Acceso exclusivo del personal autorizado
          </p>

        </header>

        <form
          onSubmit={manejarEnvio}
          className="space-y-5"
        >

          <div>

            <label
              htmlFor="usuario"
              className="mb-2 block text-sm font-semibold"
            >
              Usuario
            </label>

            <input
              id="usuario"
              type="text"
              value={usuario}
              onChange={e => setUsuario(e.target.value)}
              autoComplete="username"
              required
              disabled={cargando}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-salvaje-dorado"
            />

          </div>

          <div>

            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold"
            >
              Contraseña
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              disabled={cargando}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-salvaje-dorado"
            />

          </div>

          {error && (

            <p
              role="alert"
              className="rounded-lg bg-red-100 p-3 text-sm text-red-800"
            >
              {error}
            </p>

          )}

          <button
            type="submit"
            disabled={cargando}
            className="w-full rounded-lg bg-salvaje-verde py-3 font-semibold text-white hover:bg-salvaje-oscuro disabled:opacity-50"
          >

            {cargando
              ? 'Iniciando sesión...'
              : 'Iniciar sesión'}

          </button>

        </form>

        <p className="mt-6 text-center text-xs text-gray-500">
          Sistema de gestión de reservas
        </p>

      </div>

    </main>

  )
}

export default Login