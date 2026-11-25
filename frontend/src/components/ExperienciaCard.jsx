function ExperienciaCard({ icono, titulo, descripcion }) {

  return (

    <article className="experience-card">

      <div
        className="experience-icon"
        aria-hidden="true"
      >
        {icono}
      </div>

      <h3>{titulo}</h3>

      <p>{descripcion}</p>

    </article>

  )
}

export default ExperienciaCard