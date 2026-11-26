function Galeria() {

  return (

    <section
      className="gallery section-shell"
      id="galeria"
    >

      <div className="section-heading">

        <p className="eyebrow">
          Una mirada a Salvaje
        </p>

        <h2>
          El ambiente también <em>se disfruta.</em>
        </h2>

        <p>
          Descubre un espacio donde la naturaleza,
          la gastronomía y los buenos momentos se encuentran.
        </p>

      </div>

      <figure className="gallery-feature">

        <img
          src="/imagen/salvaje_inicio.jpg"
          alt="Fachada de Salvaje Restobar con letrero iluminado, vegetación y luces cálidas"
          loading="lazy"
        />

        <figcaption>

          <span>Salvaje Restobar</span>

          <span>Un espacio para compartir</span>

        </figcaption>

      </figure>

      <p className="gallery-note">

        Conoce algunos de los espacios, platos y momentos
        que forman parte de la experiencia Salvaje.

      </p>

    </section>

  )
}

export default Galeria