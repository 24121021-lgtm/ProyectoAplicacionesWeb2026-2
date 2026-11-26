function Footer() {

  const anioActual = new Date().getFullYear()

  const enlaces = [
    {
      nombre: 'Nosotros',
      destino: '#nosotros'
    },
    {
      nombre: 'Nuestra carta',
      destino: '#menu'
    },
    {
      nombre: 'Bebidas',
      destino: '#cocteles'
    },
    {
      nombre: 'Promociones y eventos',
      destino: '#novedades'
    },
    {
      nombre: 'Galería',
      destino: '#galeria'
    },
    {
      nombre: 'Reservaciones',
      destino: '#reservas'
    }
  ]

  return (

    <footer className="footer" id="contacto">

      <div className="section-shell footer-grid">

        {/* Identidad del restaurante */}

        <div className="footer-brand">

          <a
            href="#inicio"
            aria-label="Volver al inicio"
          >

            <img
              src="/imagen/salvaje_logo_png.png"
              alt="Salvaje Restobar"
              loading="lazy"
            />

          </a>

          <p>
            Sabores intensos, naturaleza y momentos
            para compartir.
          </p>

        </div>

        {/* Enlaces de navegación */}

        <div>

          <h2>Explora</h2>

          {enlaces.map(enlace => (

            <a
              key={enlace.destino}
              href={enlace.destino}
            >
              {enlace.nombre}
            </a>

          ))}

        </div>

        {/* Ubicación y horarios */}

        <div>

          <h2>Visítanos</h2>

          <p>Ica, Perú</p>

          <p>
            Dirección exacta pendiente de confirmación.
          </p>

          <p>
            Horario de atención pendiente de confirmación.
          </p>

        </div>

        {/* Información de contacto */}

        <div>

          <h2>Contacto</h2>

          <p>
            Teléfono pendiente de confirmación.
          </p>

          <p>
            Correo pendiente de confirmación.
          </p>

          <a href="#reservas">
            Solicitar una reserva
          </a>

        </div>

      </div>

      {/* Derechos de autor */}

      <div className="footer-bottom">

        <p>
          © {anioActual} Salvaje Restobar.
          Todos los derechos reservados.
        </p>

        <a href="#inicio">
          Volver arriba ↑
        </a>

      </div>

    </footer>

  )

}

export default Footer