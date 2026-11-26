import { solicitarAPI } from './api'

// Obtener todos los productos
export async function obtenerProductos() {

  return await solicitarAPI('productos')

}

// Obtener productos activos
export async function obtenerProductosActivos() {

  const productos = await obtenerProductos()

  return productos.filter(
    producto => producto.activo === true
  )

}

// Obtener productos disponibles
export async function obtenerProductosDisponibles() {

  const productos = await obtenerProductos()

  return productos.filter(
    producto =>
      producto.activo === true &&
      producto.disponible === true
  )

}

// Obtener productos de una categoría
export async function obtenerProductosPorCategoria(idCategoria) {

  const productos = await obtenerProductos()

  return productos.filter(
    producto =>
      Number(producto.id_categoria) === Number(idCategoria) &&
      producto.activo === true
  )

}

// Obtener un producto por su identificador
export async function obtenerProductoPorId(idProducto) {

  const productos = await obtenerProductos()

  return productos.find(
    producto =>
      Number(producto.id_producto) === Number(idProducto)
  )

}

// Obtener productos destacados
export async function obtenerProductosDestacados() {

  const productos = await obtenerProductos()

  return productos.filter(
    producto =>
      producto.destacado === true &&
      producto.activo === true
  )

}