import Navbar from './Navbar'

function Hero() {

  return (

    <header className="hero" id="inicio">

      <Navbar />

      <div className="hero-content">

        <p className="eyebrow hero-eyebrow">
          Cocina · Naturaleza · Encuentros
        </p>

        <h1>
          Una experiencia
          <br />
          <em>fuera de lo común.</em>
        </h1>

        <p className="hero-description">
          Sabores que despiertan los sentidos y un ambiente
          pensado para compartir.
        </p>

        <div className="hero-actions">

          <a className="button button-gold" href="#menu">
            Explorar la carta <span aria-hidden="true">↗</span>
          </a>

          <a
            className="button button-outline"
            href="#nosotros"
          >
            Conócenos
          </a>

        </div>

      </div>

      <a
        className="scroll-cue"
        href="#bienvenida"
        aria-label="Desplazarse a la siguiente sección"
      >
        <span aria-hidden="true">↓</span>
        Descubre Salvaje
      </a>

    </header>

  )
}

export default Hero