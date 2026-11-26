import ProductoCard from './ProductoCard'

function Bebidas({ categorias, productos }) {

  const categoriasBebidas = categorias
    .filter(categoria =>
      categoria.tipo === 'BEBIDA' &&
      categoria.activo === true
    )
    .sort((a, b) =>
      a.orden_visualizacion - b.orden_visualizacion
    )

  function obtenerProductosCategoria(idCategoria) {

    return productos
      .filter(producto =>
        Number(producto.id_categoria) === Number(idCategoria) &&
        producto.activo === true
      )
      .sort((a, b) =>
        a.orden_visualizacion - b.orden_visualizacion
      )

  }

  return (

    <section className="cocktail-section section-shell" id="cocteles">

      <details className="main-menu-disclosure cocktail-menu-disclosure">

        <summary className="main-menu-trigger">

          <span className="trigger-icon" aria-hidden="true">
            ✦
          </span>

          <span>

            <strong>Ver carta de bebidas</strong>

            <small>
              Consulta nuestras categorías de bebidas
            </small>

          </span>

          <span className="trigger-arrow" aria-hidden="true">
            ＋
          </span>

        </summary>

        <div className="main-menu-content">

          <div className="section-heading">

            <p className="eyebrow">
              Barra Salvaje
            </p>

            <h2>
              Nuestra carta de <em>bebidas.</em>
            </h2>

            <p>
              Consulta las categorías y la información
              de nuestros productos.
            </p>

          </div>

          <div className="cocktail-categories">

            {categoriasBebidas.map((categoria, indice) => (

              <details
                className="cocktail-panel"
                key={categoria.id_categoria}
              >

                <summary>

                  <span className="cocktail-number">
                    {String(indice + 1).padStart(2, '0')}
                  </span>

                  <span>

                    <strong>{categoria.nombre}</strong>

                    <small>{categoria.descripcion}</small>

                  </span>

                </summary>

                <div className="cocktail-grid">

                  {obtenerProductosCategoria(
                    categoria.id_categoria
                  ).map(producto => (

                    <ProductoCard
                      key={producto.id_producto}
                      producto={producto}
                      esBebida={true}
                    />

                  ))}

                </div>

              </details>

            ))}

          </div>

          <p className="cocktail-note">
            Precios pendientes de confirmación.
          </p>

        </div>

      </details>

    </section>

  )
}

export default Bebidas