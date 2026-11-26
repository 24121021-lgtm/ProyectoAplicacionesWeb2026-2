import { novedades } from '../data/novedades'

function NovedadCard({ novedad }) {

  const clases = {
    PROMOCION: 'news-promo',
    EVENTO: '',
    AVISO: 'news-status'
  }

  function formatearFecha(fecha) {

    if (!fecha) {
      return ''
    }

    return fecha.split('-').reverse().join('/')

  }

  return (

    <article className={`news-card ${clases[novedad.tipo] ?? ''}`}>

      <span className="news-label">
        {novedad.etiqueta}
      </span>

      {novedad.fechaInicio && (

        <p className="news-date">

          {novedad.fechaFin ? 'Vigencia: ' : 'Fecha: '}

          <time dateTime={novedad.fechaInicio}>
            {formatearFecha(novedad.fechaInicio)}
          </time>

          {novedad.fechaFin && (

            <>
              {' – '}

              <time dateTime={novedad.fechaFin}>
                {formatearFecha(novedad.fechaFin)}
              </time>
            </>

          )}

        </p>

      )}

      <h3>{novedad.titulo}</h3>

      <p>{novedad.descripcion}</p>

    </article>

  )
}

function Novedades() {

  const novedadesActivas = novedades.filter(
    novedad => novedad.activo === true
  )

  return (

    <section
      className="news-section section-dark"
      id="novedades"
    >

      <div className="section-shell">

        <div className="section-heading section-heading-light">

          <p className="eyebrow eyebrow-light">
            Siempre hay algo que celebrar
          </p>

          <h2>
            Promociones y <em>eventos.</em>
          </h2>

          <p>
            Consulta nuestras promociones, noches
            especiales y próximos eventos.
          </p>

        </div>

        {novedadesActivas.length > 0 ? (

          <div className="news-grid">

            {novedadesActivas.map(novedad => (

              <NovedadCard
                key={novedad.id}
                novedad={novedad}
              />

            ))}

          </div>

        ) : (

          <p className="py-8 text-center text-salvaje-crema">
            Actualmente no tenemos novedades publicadas.
          </p>

        )}

      </div>

    </section>

  )

}

export default Novedades