import { useState, useEffect } from 'react'

function Navbar() {

  const [menuAbierto, setMenuAbierto] = useState(false)
  const [desplazado, setDesplazado] = useState(false)

  const enlaces = [
    { nombre: 'Nosotros', href: '#nosotros' },
    { nombre: 'Experiencia', href: '#experiencia' },
    { nombre: 'Nuestra carta', href: '#menu' },
    { nombre: 'Bebidas y cócteles', href: '#cocteles' },
    { nombre: 'Promociones y eventos', href: '#novedades' },
    { nombre: 'Galería', href: '#galeria' }
  ]

  useEffect(() => {

    const manejarScroll = () => {
      setDesplazado(window.scrollY > 40)
    }

    manejarScroll()

    window.addEventListener('scroll', manejarScroll)

    return () => {
      window.removeEventListener('scroll', manejarScroll)
    }

  }, [])

  return (

    <nav
      className={`navbar ${desplazado ? 'scrolled' : ''}`}
      aria-label="Navegación principal"
    >

      <a
        className="brand"
        href="#inicio"
        aria-label="Salvaje Restobar, inicio"
        onClick={() => setMenuAbierto(false)}
      >
        <img
          src="/imagen/salvaje_logo_png.png"
          alt="Salvaje Restobar"
        />
      </a>

      <button
        className="menu-toggle"
        type="button"
        aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={menuAbierto}
        aria-controls="nav-links"
        onClick={() => setMenuAbierto(anterior => !anterior)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div
        className={`nav-links ${menuAbierto ? 'is-open' : ''}`}
        id="nav-links"
      >

        {enlaces.map((enlace) => (

          <a
            key={enlace.href}
            href={enlace.href}
            onClick={() => setMenuAbierto(false)}
          >
            {enlace.nombre}
          </a>

        ))}

        <a
          className="nav-cta"
          href="#reservas"
          onClick={() => setMenuAbierto(false)}
        >
          Reservar mesa
        </a>

      </div>

    </nav>

  )
}

export default Navbar