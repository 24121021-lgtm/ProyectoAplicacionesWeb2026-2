function FiltrosCarta({
  categorias,
  busqueda,
  setBusqueda,
  categoriaSeleccionada,
  setCategoriaSeleccionada,
  cantidadResultados,
  cantidadTotal,
  limpiarFiltros
}) {

  const categoriasActivas = categorias
    .filter(categoria => categoria.activo === true)
    .sort((a, b) =>
      a.orden_visualizacion - b.orden_visualizacion
    )

  function obtenerNombreCategoria(categoria) {

    const padre = categoriasActivas.find(
      item =>
        Number(item.id_categoria) ===
        Number(categoria.id_categoria_padre)
    )

    return padre
      ? `${padre.nombre} - ${categoria.nombre}`
      : categoria.nombre

  }

  return (

    <section className="bg-salvaje-oscuro px-5 py-10 text-salvaje-crema">

      <div className="mx-auto max-w-6xl">

        <div className="mb-6 text-center">

          <p className="mb-2 text-sm font-semibold tracking-widest text-salvaje-dorado">
            CARTA DIGITAL
          </p>

          <h2 className="text-3xl font-bold md:text-4xl">
            Encuentra tu plato favorito
          </h2>

          <p className="mt-3 text-sm opacity-80">
            Explora nuestra carta utilizando los filtros.
          </p>

        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

          {/* Buscador */}

          <div>

            <label
              htmlFor="buscar-producto"
              className="mb-2 block text-sm font-semibold"
            >
              Buscar producto
            </label>

            <input
              id="buscar-producto"
              type="search"
              placeholder="Ejemplo: pasta, lomo, ensalada..."
              value={busqueda}
              onChange={evento =>
                setBusqueda(evento.target.value)
              }
              className="box-border w-full rounded-lg border border-solid border-salvaje-dorado bg-salvaje-verde px-4 py-3 text-salvaje-crema outline-none focus:ring-2 focus:ring-salvaje-dorado"
            />

          </div>

          {/* Filtro por categoría */}

          <div>

            <label
              htmlFor="filtro-categoria"
              className="mb-2 block text-sm font-semibold"
            >
              Categoría
            </label>

            <select
              id="filtro-categoria"
              value={categoriaSeleccionada}
              onChange={evento =>
                setCategoriaSeleccionada(evento.target.value)
              }
              className="box-border w-full rounded-lg border border-solid border-salvaje-dorado bg-salvaje-verde px-4 py-3 text-salvaje-crema outline-none focus:ring-2 focus:ring-salvaje-dorado"
            >

              <option value="">
                Todas las categorías
              </option>

              <optgroup label="Comidas">

                {categoriasActivas
                  .filter(categoria =>
                    categoria.tipo === 'COMIDA'
                  )
                  .map(categoria => (

                    <option
                      key={categoria.id_categoria}
                      value={categoria.id_categoria}
                    >
                      {obtenerNombreCategoria(categoria)}
                    </option>

                  ))}

              </optgroup>

              <optgroup label="Bebidas">

                {categoriasActivas
                  .filter(categoria =>
                    categoria.tipo === 'BEBIDA'
                  )
                  .map(categoria => (

                    <option
                      key={categoria.id_categoria}
                      value={categoria.id_categoria}
                    >
                      {obtenerNombreCategoria(categoria)}
                    </option>

                  ))}

              </optgroup>

            </select>

          </div>

        </div>

        {/* Contador y botón para limpiar */}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">

          <p
            aria-live="polite"
            className="text-sm font-semibold text-salvaje-dorado"
          >
            {cantidadResultados} de {cantidadTotal} productos
          </p>

          <button
            type="button"
            onClick={limpiarFiltros}
            disabled={
              busqueda === '' &&
              categoriaSeleccionada === ''
            }
            className="cursor-pointer rounded-lg border border-solid border-salvaje-dorado bg-transparent px-5 py-2 text-sm font-semibold text-salvaje-dorado hover:bg-salvaje-dorado hover:text-salvaje-oscuro disabled:cursor-default disabled:opacity-50"
          >
            Limpiar filtros
          </button>

        </div>

      </div>

    </section>

  )

}

export default FiltrosCarta