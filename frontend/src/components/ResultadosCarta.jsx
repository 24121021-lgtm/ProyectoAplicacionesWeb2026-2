import ProductoCard from './ProductoCard'

function ResultadosCarta({
  categorias,
  productos,
  limpiarFiltros
}) {

  function renderizarResultados(tipo) {

    const esBebida = tipo === 'BEBIDA'

    const categoriasTipo = categorias
      .filter(categoria =>
        categoria.tipo === tipo &&
        categoria.activo === true
      )
      .sort((a, b) =>
        a.orden_visualizacion - b.orden_visualizacion
      )

    return (

      <section
        id={esBebida ? 'cocteles' : 'menu'}
        className="bg-salvaje-oscuro px-5 py-10 text-salvaje-crema"
      >

        <div className="mx-auto max-w-6xl">

          <h2 className="mb-6 text-3xl font-bold text-salvaje-dorado">

            {esBebida
              ? 'Resultados de bebidas'
              : 'Resultados de comidas'}

          </h2>

          {!categoriasTipo.some(categoria =>
            productos.some(producto =>
              Number(producto.id_categoria) ===
              Number(categoria.id_categoria)
            )
          ) && (

            <p className="rounded-lg bg-salvaje-verde p-5 text-center">
              No hay resultados en esta sección.
            </p>

          )}

          {categoriasTipo.map(categoria => {

            const productosCategoria = productos
              .filter(producto =>
                Number(producto.id_categoria) ===
                Number(categoria.id_categoria)
              )
              .sort((a, b) =>
                a.orden_visualizacion - b.orden_visualizacion
              )

            if (productosCategoria.length === 0) {
              return null
            }

            return (

              <div
                key={categoria.id_categoria}
                className="mb-8"
              >

                <h3 className="mb-4 border-b border-solid border-salvaje-dorado pb-3 text-xl font-semibold">
                  {categoria.nombre}
                </h3>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

                  {productosCategoria.map(producto => (

                    <ProductoCard
                      key={producto.id_producto}
                      producto={producto}
                      esBebida={esBebida}
                    />

                  ))}

                </div>

              </div>

            )

          })}

        </div>

      </section>

    )

  }

  if (productos.length === 0) {

    return (

      <section
        id="menu"
        className="bg-salvaje-oscuro px-5 py-16 text-center text-salvaje-crema"
      >

        <span id="cocteles"></span>

        <div className="mx-auto max-w-lg rounded-xl border border-solid border-salvaje-dorado bg-salvaje-verde p-8">

          <h2 className="mb-4 text-2xl font-bold text-salvaje-dorado">
            No encontramos productos
          </h2>

          <p className="mb-6">
            Intenta buscar otro nombre o seleccionar
            una categoría diferente.
          </p>

          <button
            type="button"
            onClick={limpiarFiltros}
            className="cursor-pointer rounded-lg bg-salvaje-dorado px-6 py-3 font-semibold text-salvaje-oscuro hover:opacity-90"
          >
            Mostrar toda la carta
          </button>

        </div>

      </section>

    )

  }

  return (

    <>

      {renderizarResultados('COMIDA')}

      {renderizarResultados('BEBIDA')}

    </>

  )

}

export default ResultadosCarta