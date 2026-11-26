import ProductoCard from './ProductoCard'
import { salsas, notasCarta } from '../data/productos'

function Carta({ categorias, productos }) {

  const categoriasComidas = categorias
    .filter(categoria =>
      categoria.tipo === 'COMIDA' &&
      categoria.activo === true
    )
    .sort((a, b) =>
      a.orden_visualizacion - b.orden_visualizacion
    )

  const categoriasPrincipales = categoriasComidas.filter(
    categoria => categoria.id_categoria_padre == null
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

  function obtenerSubcategorias(idCategoria) {

    return categoriasComidas.filter(
      categoria =>
        categoria.id_categoria_padre != null &&
        Number(categoria.id_categoria_padre) === Number(idCategoria)
    )

  }

  return (

    <section className="menu-section section-dark" id="menu">

      <div className="section-shell">

        <details className="main-menu-disclosure food-menu-disclosure">

          <summary className="main-menu-trigger">

            <span className="trigger-icon" aria-hidden="true">
              🍽
            </span>

            <span>
              <strong>Ver carta de comidas</strong>

              <small>
                Platos, pastas, carnes y especialidades
              </small>
            </span>

            <span className="trigger-arrow" aria-hidden="true">
              ＋
            </span>

          </summary>

          <div className="main-menu-content">

            <div className="section-heading section-heading-light">

              <p className="eyebrow eyebrow-light">
                Nuestra propuesta
              </p>

              <h2>
                Descubre la carta <em>Salvaje.</em>
              </h2>

              <p>
                Explora nuestras especialidades y consulta
                los precios de tus platos favoritos.
              </p>

            </div>

            <div className="static-menu-categories">

              {categoriasPrincipales.map(categoria => {

                const subcategorias = obtenerSubcategorias(
                  categoria.id_categoria
                )

                const productosCategoria = obtenerProductosCategoria(
                  categoria.id_categoria
                )

                return (

                  <details
                    className="menu-category-panel"
                    key={categoria.id_categoria}
                  >

                    <summary>

                      {categoria.nombre}

                      {categoria.descripcion && (
                        <span>{categoria.descripcion}</span>
                      )}

                    </summary>

                    {productosCategoria.length > 0 && (

                      <div className="static-product-grid">

                        {productosCategoria.map(producto => (

                          <ProductoCard
                            key={producto.id_producto}
                            producto={producto}
                          />

                        ))}

                      </div>

                    )}

                    {subcategorias.length > 0 && (

                      <div className="pasta-types">

                        {subcategorias.map(subcategoria => (

                          <details
                            className="pasta-type"
                            key={subcategoria.id_categoria}
                          >

                            <summary>

                              <span>{subcategoria.nombre}</span>

                              <small>
                                {subcategoria.descripcion}
                              </small>

                            </summary>

                            <div className="static-product-grid">

                              {obtenerProductosCategoria(
                                subcategoria.id_categoria
                              ).map(producto => (

                                <ProductoCard
                                  key={producto.id_producto}
                                  producto={producto}
                                />

                              ))}

                            </div>

                          </details>

                        ))}

                      </div>

                    )}

                    {categoria.slug === 'pastas' && (

                      <div className="sauce-section">

                        <h3>Elige tu salsa favorita</h3>

                        <div className="sauce-grid">

                          {salsas.map(salsa => (

                            <article
                              className="sauce-card"
                              key={salsa.id_salsa}
                            >

                              <img
                                className="sauce-photo"
                                src={salsa.imagen_url}
                                alt={salsa.imagen_alt}
                                loading="lazy"
                              />

                              <h4>{salsa.nombre}</h4>

                              <p>{salsa.descripcion}</p>

                            </article>

                          ))}

                        </div>

                      </div>

                    )}

                    {categoria.slug === 'carnes' && (

                      <p className="px-5 pb-5 text-sm text-salvaje-crema">
                        {notasCarta.carnes}
                      </p>

                    )}

                  </details>

                )

              })}

            </div>

            <p className="menu-disclaimer">
              {notasCarta.comidas}
            </p>

          </div>

        </details>

      </div>

    </section>

  )
}

export default Carta