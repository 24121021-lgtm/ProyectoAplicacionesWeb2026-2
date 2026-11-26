import { useEffect, useState } from 'react'

import Carta from './Carta'
import Bebidas from './Bebidas'

import { obtenerCategorias } from '../services/categoriasService'
import { obtenerProductos } from '../services/productosService'

function CartaDigital() {

  const [categorias, setCategorias] = useState([])
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [reintento, setReintento] = useState(0)

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
          setCategorias(datosCategorias)
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

  function reintentarCarga() {
    setError(null)
    setCargando(true)
    setReintento(anterior => anterior + 1)
  }

  if (cargando) {

    return (

      <section
        id="menu"
        className="bg-salvaje-oscuro py-16 text-center text-salvaje-crema"
        role="status"
      >

        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-solid border-salvaje-dorado border-t-transparent">
        </div>

        <p>Cargando la carta de Salvaje...</p>

      </section>

    )

  }

  if (error) {

    return (

      <section
        id="menu"
        className="bg-salvaje-oscuro px-6 py-16 text-center text-salvaje-crema"
      >

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

  return (

    <>

      <Carta
        categorias={categorias}
        productos={productos}
      />

      <Bebidas
        categorias={categorias}
        productos={productos}
      />

    </>

  )
}

export default CartaDigital