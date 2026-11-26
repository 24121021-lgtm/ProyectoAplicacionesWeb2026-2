import { useState } from 'react'

import ResumenReserva from './ResumenReserva'

import {
  HORARIOS_RESERVA,
  REGLAS_RESERVA
} from '../data/reglasReserva'

import {
  obtenerFechaMinima,
  calcularAdelanto,
  formatearSoles,
  validarReserva
} from '../utils/validarReserva'

import { crearReserva } from '../services/reservasService'

const formularioInicial = {
  tipo_reserva: 'PAREJA',
  nombre_cliente: '',
  telefono: '',
  fecha: '',
  hora: '',
  cantidad_personas: '2',
  consumo_estimado: ''
}

function Reservas() {

  const [formulario, setFormulario] = useState(formularioInicial)
  const [errores, setErrores] = useState({})
  const [enviando, setEnviando] = useState(false)
  const [reservaRegistrada, setReservaRegistrada] = useState(null)
  const [errorGeneral, setErrorGeneral] = useState('')

  const adelanto = calcularAdelanto(
    formulario.cantidad_personas
  )

  // Actualizar los campos del formulario

  function manejarCambio(evento) {

    const { name, value } = evento.target

    setFormulario(anterior => ({
      ...anterior,
      [name]: value
    }))

    setErrores(anterior => ({
      ...anterior,
      [name]: ''
    }))

    setReservaRegistrada(null)
    setErrorGeneral('')

  }

  // Cambiar el tipo de reserva

  function cambiarTipo(tipo) {

    setFormulario(anterior => ({
      ...anterior,

      tipo_reserva: tipo,

      cantidad_personas:
        tipo === 'PAREJA'
          ? '2'
          : anterior.cantidad_personas
    }))

    setErrores(anterior => ({
      ...anterior,
      tipo_reserva: '',
      cantidad_personas: ''
    }))

    setReservaRegistrada(null)
    setErrorGeneral('')

  }

  // Registrar la solicitud

  async function manejarEnvio(evento) {

    evento.preventDefault()

    if (enviando) {
      return
    }

    setErrorGeneral('')
    setReservaRegistrada(null)

    const erroresValidacion = validarReserva(formulario)

    setErrores(erroresValidacion)

    if (Object.keys(erroresValidacion).length > 0) {
      return
    }

    setEnviando(true)

    try {

      const reserva = await crearReserva(formulario)

      setReservaRegistrada(reserva)

      setFormulario({
        ...formularioInicial
      })

      setErrores({})

    } catch (error) {

      setErrorGeneral(error.message)

    } finally {

      setEnviando(false)

    }

  }

  // Mostrar un mensaje de validación

  function mostrarError(campo) {

    return errores[campo] && (

      <span className="mt-1 block text-xs font-semibold text-red-700">
        {errores[campo]}
      </span>

    )

  }

  return (

    <section className="reservation" id="reservas">

      <div className="reservation-inner reservation-layout">

        {/* Presentación */}

        <div className="reservation-intro">

          <p className="eyebrow eyebrow-light">
            Tu próxima salida empieza aquí
          </p>

          <h2>
            Reserva tu momento
            <br />
            <em>en Salvaje</em>
          </h2>

          <p>
            Elige una experiencia para dos o solicita
            una mesa para compartir con amigos y familia.
            La solicitud quedará pendiente de confirmación.
          </p>

        </div>

        {/* Formulario */}

        <form
          className="reservation-form"
          id="reservation-form"
          onSubmit={manejarEnvio}
          noValidate
        >

          <div className="mb-5 rounded-lg bg-yellow-100 p-3 text-sm text-yellow-900">

            <strong>Modo demostración:</strong>
            {' '}utiliza exclusivamente datos ficticios.
            No se enviarán reservas reales.

          </div>

          <fieldset
            className="reservation-types"
            disabled={enviando}
          >

            <legend>
              ¿Qué tipo de reserva deseas?
            </legend>

            <label className="reservation-choice">

              <input
                type="radio"
                name="tipo_reserva"
                value="PAREJA"
                checked={formulario.tipo_reserva === 'PAREJA'}
                onChange={() => cambiarTipo('PAREJA')}
              />

              <span
                className="choice-icon"
                aria-hidden="true"
              >
                ♡
              </span>

              <span>

                <strong>Reserva para parejas</strong>

                <small>
                  Una ocasión especial para dos
                </small>

              </span>

            </label>

            <label className="reservation-choice">

              <input
                type="radio"
                name="tipo_reserva"
                value="MESA"
                checked={formulario.tipo_reserva === 'MESA'}
                onChange={() => cambiarTipo('MESA')}
              />

              <span
                className="choice-icon"
                aria-hidden="true"
              >
                ▤
              </span>

              <span>

                <strong>Reserva de mesa</strong>

                <small>
                  Para amigos o familia
                </small>

              </span>

            </label>

            {mostrarError('tipo_reserva')}

          </fieldset>

          {/* Datos del cliente */}

          <div className="reservation-fields">

            <label>

              Nombre completo

              <input
                type="text"
                name="nombre_cliente"
                placeholder="Ej.: Cliente Demo"
                value={formulario.nombre_cliente}
                onChange={manejarCambio}
                maxLength={100}
                required
                disabled={enviando}
                aria-invalid={Boolean(errores.nombre_cliente)}
              />

              {mostrarError('nombre_cliente')}

            </label>

            <label>

              Teléfono de WhatsApp

              <input
                type="tel"
                name="telefono"
                placeholder="Ej.: 900000000"
                inputMode="numeric"
                maxLength={9}
                value={formulario.telefono}
                onChange={manejarCambio}
                required
                disabled={enviando}
                aria-invalid={Boolean(errores.telefono)}
              />

              {mostrarError('telefono')}

            </label>

            <label>

              Fecha

              <input
                type="date"
                name="fecha"
                min={obtenerFechaMinima()}
                value={formulario.fecha}
                onChange={manejarCambio}
                required
                disabled={enviando}
                aria-invalid={Boolean(errores.fecha)}
              />

              {mostrarError('fecha')}

            </label>

            <label>

              Hora

              <select
                name="hora"
                value={formulario.hora}
                onChange={manejarCambio}
                required
                disabled={enviando}
                aria-invalid={Boolean(errores.hora)}
              >

                <option value="">
                  Selecciona una hora
                </option>

                {HORARIOS_RESERVA.map(horario => (

                  <option
                    key={horario.valor}
                    value={horario.valor}
                  >
                    {horario.etiqueta}
                  </option>

                ))}

              </select>

              {mostrarError('hora')}

            </label>

            <label className="md:col-span-2">

              Número de personas

              <select
                name="cantidad_personas"
                value={formulario.cantidad_personas}
                onChange={manejarCambio}
                disabled={
                  enviando ||
                  formulario.tipo_reserva === 'PAREJA'
                }
                required
                aria-invalid={Boolean(errores.cantidad_personas)}
              >

                {Array.from(
                  { length: REGLAS_RESERVA.MAX_PERSONAS },
                  (_, indice) => indice + 1
                ).map(personas => (

                  <option
                    key={personas}
                    value={personas}
                  >

                    {personas}
                    {personas === 1 ? ' persona' : ' personas'}

                  </option>

                ))}

              </select>

              {mostrarError('cantidad_personas')}

            </label>

          </div>

          {/* Consumo estimado y adelanto */}

          <div className="reservation-advance">

            <label htmlFor="reservation-consumption">
              Consumo total estimado (S/)
            </label>

            <input
              id="reservation-consumption"
              type="number"
              name="consumo_estimado"
              min={REGLAS_RESERVA.CONSUMO_MINIMO}
              step="0.01"
              inputMode="decimal"
              placeholder="Ej.: 150"
              value={formulario.consumo_estimado}
              onChange={manejarCambio}
              required
              disabled={enviando}
              aria-invalid={Boolean(errores.consumo_estimado)}
            />

            {mostrarError('consumo_estimado')}

            <p>
              El adelanto es de <strong>S/ 30</strong> para
              reservas de 1 a 5 personas y de
              {' '}<strong>S/ 50</strong> para reservas
              de 6 a 10 personas.
            </p>

            <p>
              El consumo estimado es únicamente referencial.
            </p>

            <p
              className="advance-preview"
              aria-live="polite"
            >

              Adelanto requerido: {formatearSoles(adelanto)}

            </p>

          </div>

          {/* Botón de envío */}

          <button
            className="button button-gold reservation-submit disabled:cursor-not-allowed disabled:opacity-60"
            type="submit"
            disabled={enviando}
          >

            {enviando
              ? 'Registrando solicitud...'
              : 'Enviar solicitud de reserva'}

          </button>

          <p className="reservation-disclaimer">
            Enviar una solicitud no confirma automáticamente
            la reserva. El restaurante deberá verificar
            la disponibilidad.
          </p>

          {/* Error de almacenamiento */}

          {errorGeneral && (

            <div
              className="mt-4 rounded-lg bg-red-100 p-3 text-sm text-red-800"
              role="alert"
            >

              {errorGeneral}

            </div>

          )}

          {/* Confirmación del registro */}

          {reservaRegistrada && (

            <ResumenReserva
              reserva={reservaRegistrada}
            />

          )}

        </form>

      </div>

    </section>

  )

}

export default Reservas