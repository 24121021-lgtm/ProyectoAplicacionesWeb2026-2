
export function filtrarCarta(
  categorias,
  productos,
  busqueda = '',
  categoriaSeleccionada = ''
) {
  // Obtener únicamente productos disponibles y publicados
  let resultado = productos.filter((producto) => {
    return producto.activo !== false &&
      producto.publicado !== false
  })

  // Filtrar por búsqueda
  if (busqueda.trim() !== '') {
    const texto = busqueda.toLowerCase().trim()

    resultado = resultado.filter((producto) => {
      const nombre = String(producto.nombre || '').toLowerCase()
      const descripcion = String(producto.descripcion || '').toLowerCase()

      return nombre.includes(texto) ||
        descripcion.includes(texto)
    })
  }

  // Filtrar por categoría
  if (categoriaSeleccionada !== '') {
    resultado = resultado.filter((producto) => {
      return String(producto.id_categoria) ===
        String(categoriaSeleccionada)
    })
  }

  return resultado
}
