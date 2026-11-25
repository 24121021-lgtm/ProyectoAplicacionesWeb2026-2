import ExperienciaCard from './ExperienciaCard'

function Experiencia() {

  const experiencias = [

    {
      id: 1,
      icono: '✳',
      titulo: 'Sabor a la parrilla',
      descripcion: 'Una propuesta para quienes disfrutan los sabores intensos y las buenas comidas.'
    },

    {
      id: 2,
      icono: '❋',
      titulo: 'Ambiente natural',
      descripcion: 'Detalles rústicos, vegetación e iluminación cálida para cambiar de ritmo.'
    },

    {
      id: 3,
      icono: '◌',
      titulo: 'Momentos compartidos',
      descripcion: 'Un espacio para reunirse, celebrar ocasiones especiales y crear recuerdos.'
    }

  ]

  return (

    <section
      className="experience section-shell"
      id="experiencia"
    >

      <div className="section-heading">

        <p className="eyebrow">
          Más que una comida
        </p>

        <h2>
          Un lugar para <em>disfrutar.</em>
        </h2>

        <p>
          Encuentra tu motivo para venir y comparte
          la experiencia Salvaje.
        </p>

      </div>

      <div className="experience-grid">

        {experiencias.map((experiencia) => (

          <ExperienciaCard
            key={experiencia.id}
            icono={experiencia.icono}
            titulo={experiencia.titulo}
            descripcion={experiencia.descripcion}
          />

        ))}

      </div>

    </section>

  )
}

export default Experiencia