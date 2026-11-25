function Bienvenida() {

  return (

    <section
      className="welcome section-shell"
      id="bienvenida"
    >

      <div className="welcome-copy">

        <p className="eyebrow">
          Bienvenidos a Salvaje
        </p>

        <h2>
          El sabor se disfruta.
          <br />
          <em>El momento se recuerda.</em>
        </h2>

        <p>
          Disfruta de una propuesta gastronómica que reúne
          el sabor de la parrilla, la tradición peruana y
          una atención cercana, en un ambiente rústico
          inspirado en la naturaleza.
        </p>

        <p>
          Ven con tu familia, amigos o esa persona especial.
          Queremos que cada visita sea una oportunidad para
          compartir, celebrar y volver.
        </p>

        <a className="text-link" href="#experiencia">
          Conoce nuestra esencia
          <span aria-hidden="true"> →</span>
        </a>

      </div>

      <aside className="welcome-card">

        <div className="welcome-mark" aria-hidden="true">
          S
        </div>

        <p className="card-kicker">
          El espíritu Salvaje
        </p>

        <h3>
          Buena mesa.
          <br />
          Grandes momentos.
        </h3>

        <div className="ornament" aria-hidden="true"></div>

        <p>
          Una experiencia para disfrutar con todos los sentidos.
        </p>

      </aside>

    </section>

  )
}

export default Bienvenida