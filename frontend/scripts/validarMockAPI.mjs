
const API_URL = process.env.MOCKAPI_URL

async function obtenerDatos(recurso) {
    const respuesta = await fetch(`${API_URL}/${recurso}`)

    if (!respuesta.ok) {
        throw new Error(`Error consultando ${recurso}: ${respuesta.status}`)
    }

    return await respuesta.json()
}

async function validarDatos() {
    try {
        if (!API_URL) {
            throw new Error('No se configuró MOCKAPI_URL')
        }

        // Obtener los registros
        const [categorias, productos] = await Promise.all([
            obtenerDatos('categorias'),
            obtenerDatos('productos')
        ])

        // Crear conjunto de identificadores de categorías
        const idsCategorias = new Set(
            categorias.map(c => String(c.id_categoria))
        )

        // Buscar productos sin categoría existente
        const productosSinCategoria = productos.filter(
            p => !idsCategorias.has(String(p.id_categoria))
        )

        // Buscar categorías con padres inexistentes
        const padresInvalidos = categorias.filter(c => {
            const padre = c.id_categoria_padre

            if (padre === null || padre === undefined || padre === '' || Number(padre) === 0) {
                return false
            }

            return !idsCategorias.has(String(padre))
        })

        // Mostrar resultados
        console.log('\n===== VALIDACIÓN DE MOCKAPI =====\n')

        console.log('Categorías registradas:', categorias.length)
        console.log('Productos registrados:', productos.length)

        console.log(
            'Productos sin categoría válida:',
            productosSinCategoria.length
        )

        console.log(
            'Categorías con padre inválido:',
            padresInvalidos.length
        )

        if (productosSinCategoria.length > 0) {
            console.log('\nProductos con problemas:')
            console.table(productosSinCategoria)
        }

        if (padresInvalidos.length > 0) {
            console.log('\nCategorías con padres inexistentes:')
            console.table(padresInvalidos)
        }

        console.log('\n===== FIN DE VALIDACIÓN =====')

    } catch (error) {
        console.error('Error:', error.message)
    }
}

validarDatos()
