
import process from 'node:process'

import { categorias } from '../src/data/categorias.js'
import { productos } from '../src/data/productos.js'

const API_URL = process.env.MOCKAPI_URL?.replace(/\/+$/, '')

const ESPERA = 750

const esperar = (ms) =>
  new Promise(resolve => setTimeout(resolve, ms))

// Consultar registros existentes
async function consultarDatos(recurso) {

  const respuesta = await fetch(`${API_URL}/${recurso}`)

  if (!respuesta.ok) {
    throw new Error(
      `Error consultando ${recurso}: ${respuesta.status}`
    )
  }

  return await respuesta.json()
}

// Registrar los datos en MockAPI
async function cargarDatos(recurso, datos, campoId) {

  const existentes = await consultarDatos(recurso)

  const idsExistentes = new Set(
    existentes.map(registro => String(registro[campoId]))
  )

  for (const dato of datos) {

    const identificador = String(dato[campoId])

    // Evitar registros duplicados
    if (idsExistentes.has(identificador)) {
      console.log(`Omitido: ${dato.nombre}`)
      continue
    }

    const respuesta = await fetch(`${API_URL}/${recurso}`, {

      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(dato)

    })

    if (!respuesta.ok) {
      const detalle = await respuesta.text()

      throw new Error(
        `Error registrando ${dato.nombre}: ${respuesta.status} ${detalle}`
      )
    }

    const creado = await respuesta.json()

    idsExistentes.add(identificador)

    console.log(`Registrado: ${creado.nombre}`)

    await esperar(ESPERA)
  }

  console.log(`Carga de ${recurso} finalizada`)
}

// Iniciar proceso
async function iniciarCarga() {

  try {

    if (!API_URL) {
      throw new Error('No se ha configurado MOCKAPI_URL')
    }

    console.log('Iniciando carga de categorías...')

    await cargarDatos(
      'categorias',
      categorias,
      'id_categoria'
    )

    console.log('Iniciando carga de productos...')

    await cargarDatos(
      'productos',
      productos,
      'id_producto'
    )

    console.log('Todos los datos fueron cargados correctamente')

  } catch (error) {

    console.error('ERROR:', error.message)

    process.exitCode = 1
  }
}

iniciarCarga()
