import { useEffect, useState } from 'react'

import Carta from './Carta'
import Bebidas from './Bebidas'
import FiltrosCarta from './FiltrosCarta'
import ResultadosCarta from './ResultadosCarta'

import { obtenerCategorias } from '../services/categoriasService'
import { obtenerProductos } from '../services/productosService'

import { filtrarCarta } from '../utils/filtrarCarta'

function CartaDigital() {

  // Estados de la API

  const [categorias, setCategorias] = useState([])
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [reintento, setReintento] = useState(0)

  // Estados de los filtros

  const [busqueda, setBusqueda] = useState('')
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('')

  // Consultar MockAPI

  useEffect(() => {

    let activo = true

    async function cargarCarta() {

      try {

        const [datosCategorias, datosProductos] = await Promise.all([
          obtenerCategorias(),
          obtenerProductos()
        ])

        if (
          !Array.isArray(datosCategorias) ||
          !Array.isArray(datosProductos)
        ) {
          throw new Error('La API devolvió datos incorrectos')
        }

        if (activo) {

          const categoriasNormalizadas = datosCategorias.map(
            categoria => ({

              ...categoria,

              id_categoria_padre:
                categoria.id_categoria_padre == null ||
                categoria.id_categoria_padre === '' ||
                Number(categoria.id_categoria_padre) === 0
                  ? null
                  : categoria.id_categoria_padre

            })
          )

          setCategorias(categoriasNormalizadas)
          setProductos(datosProductos)

        }

      } catch (error) {

        if (activo) {
          setError(error.message)
        }

      } finally {

        if (activo) {
          setCargando(false)
        }

      }

    }

    cargarCarta()

    return () => {
      activo = false
    }

  }, [reintento])

  // Reintentar consulta a la API

  function reintentarCarga() {

    setError(null)
    setCargando(true)
    setReintento(anterior => anterior + 1)

  }

  // Limpiar los filtros

  function limpiarFiltros() {

    setBusqueda('')
    setCategoriaSeleccionada('')

  }

  // Obtener todos los productos publicados

  const productosActivos = filtrarCarta(
    categorias,
    productos
  )

  // Obtener los productos que coinciden con los filtros

  const productosFiltrados = filtrarCarta(
    categorias,
    productos,
    busqueda,
    categoriaSeleccionada
  )

  const hayFiltros =
    busqueda.trim() !== '' ||
    categoriaSeleccionada !== ''

  // Estado de carga

  if (cargando) {

    return (

      <section
        id="menu"
        className="bg-salvaje-oscuro py-16 text-center text-salvaje-crema"
        role="status"
      >

        <span id="cocteles"></span>

        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-solid border-salvaje-dorado border-t-transparent">
        </div>

        <p>Cargando la carta de Salvaje...</p>

      </section>

    )

  }

  // Estado de error

  if (error) {

    return (

      <section
        id="menu"
        className="bg-salvaje-oscuro px-6 py-16 text-center text-salvaje-crema"
      >

        <span id="cocteles"></span>

        <div role="alert">

          <h2 className="mb-3 text-2xl">
            No pudimos cargar la carta
          </h2>

          <p className="mb-5">{error}</p>

        </div>

        <button
          type="button"
          onClick={reintentarCarga}
          className="cursor-pointer rounded-lg bg-salvaje-dorado px-6 py-3 font-semibold text-salvaje-oscuro hover:opacity-90"
        >
          Reintentar
        </button>

      </section>

    )

  }

  // Mostrar la carta digital

  return (

    <>

      <FiltrosCarta
        categorias={categorias}
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        categoriaSeleccionada={categoriaSeleccionada}
        setCategoriaSeleccionada={setCategoriaSeleccionada}
        cantidadResultados={productosFiltrados.length}
        cantidadTotal={productosActivos.length}
        limpiarFiltros={limpiarFiltros}
      />

      {hayFiltros ? (

        <ResultadosCarta
          categorias={categorias}
          productos={productosFiltrados}
          limpiarFiltros={limpiarFiltros}
        />

      ) : (

        <>

          <Carta
            categorias={categorias}
            productos={productosActivos}
          />

          <Bebidas
            categorias={categorias}
            productos={productosActivos}
          />

        </>

      )}

    </>

  )

}

export default CartaDigital