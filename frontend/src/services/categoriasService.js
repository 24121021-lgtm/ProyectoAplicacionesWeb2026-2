import { solicitarAPI } from './api'

// Obtener todas las categorías
export async function obtenerCategorias() {

  return await solicitarAPI('categorias')

}

// Obtener categorías según su tipo
export async function obtenerCategoriasPorTipo(tipo) {

  const categorias = await obtenerCategorias()

  return categorias.filter(
    categoria =>
      categoria.tipo === tipo &&
      categoria.activo === true
  )

}

// Obtener una categoría por su identificador
export async function obtenerCategoriaPorId(idCategoria) {

  const categorias = await obtenerCategorias()

  return categorias.find(
    categoria =>
      Number(categoria.id_categoria) === Number(idCategoria)
  )

}

// Obtener las subcategorías
export async function obtenerSubcategorias(idCategoriaPadre) {

  const categorias = await obtenerCategorias()

  return categorias.filter(
    categoria =>
      categoria.id_categoria_padre != null &&
      Number(categoria.id_categoria_padre) === Number(idCategoriaPadre) &&
      categoria.activo === true
  )

}