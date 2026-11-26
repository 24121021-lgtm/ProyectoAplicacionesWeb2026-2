function ProductoCard({ producto, esBebida = false }) {

  const {
    nombre,
    descripcion,
    precio,
    imagen_url,
    informacion_adicional,
    disponible,
    destacado
  } = producto

  const tienePrecio =
    precio !== null &&
    precio !== undefined &&
    precio !== '' &&
    Number.isFinite(Number(precio)) &&
    Number(precio) > 0

  const precioTexto = tienePrecio
    ? `S/ ${Number(precio).toFixed(2)}`
    : 'Consultar precio'

  const clase = esBebida
    ? 'cocktail-card'
    : `static-product ${destacado ? 'featured-product' : ''}`

  const Titulo = esBebida ? 'h3' : 'h4'

  return (

    <article className={clase}>

      {imagen_url && (
        <img
          src={imagen_url}
          alt={nombre}
          loading="lazy"
          className="w-full rounded-lg object-cover mb-3"
        />
      )}

      <Titulo>{nombre}</Titulo>

      {descripcion && (
        <p>{descripcion}</p>
      )}

      <strong className="text-salvaje-dorado">
        {precioTexto}
      </strong>

      {!disponible && (
        <div className="mt-3">
          <span className="rounded-full bg-red-100 px-3 py-1 text-xs text-red-800">
            No disponible
          </span>
        </div>
      )}

      {informacion_adicional && (
        <details className="cooking-details">

          <summary>Información adicional</summary>

          <p className="whitespace-pre-line">
            {informacion_adicional}
          </p>

        </details>
      )}

    </article>

  )
}

export default ProductoCard