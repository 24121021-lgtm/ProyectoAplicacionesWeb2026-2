/* =========================================================
   SALVAJE RESTOBAR — sistema de reservas
   JavaScript puro: validación, cálculo del adelanto y WhatsApp.
   ========================================================= */

"use strict";

// Número que aparece actualmente en el pie de página del proyecto.
// Confirma que este número también recibe mensajes por WhatsApp antes de publicar.
const WHATSAPP_NUMBER = "51980710043";
const PORCENTAJE_ADELANTO = 0.20;

const formatoSoles = new Intl.NumberFormat("es-PE", {
  style: "currency",
  currency: "PEN"
});

const formulario = document.querySelector("#reservation-form");
const campoConsumo = document.querySelector("#reservation-consumption");
const campoFecha = document.querySelector("#reservation-date");
const vistaAdelanto = document.querySelector("#advance-preview");
const resultado = document.querySelector("#reservation-result");

// Solo se ejecuta si la página contiene el formulario de reservas.
if (formulario && campoConsumo && campoFecha && vistaAdelanto && resultado) {
  // Evita que el cliente pueda seleccionar una fecha anterior al día actual.
  const hoy = new Date();
  const fechaMinima = [
    hoy.getFullYear(),
    String(hoy.getMonth() + 1).padStart(2, "0"),
    String(hoy.getDate()).padStart(2, "0")
  ].join("-");

  campoFecha.min = fechaMinima;

  /** Calcula y muestra el adelanto equivalente al 20 % del consumo. */
  function actualizarAdelanto() {
    const valorConsumo = campoConsumo.value;
    const consumo = Number(valorConsumo);

    if (!valorConsumo || !Number.isFinite(consumo) || consumo <= 0) {
      vistaAdelanto.textContent =
        "Ingresa el consumo estimado para calcular el adelanto del 20 %.";
      return;
    }

    const adelanto = consumo * PORCENTAJE_ADELANTO;
    vistaAdelanto.textContent =
      `Adelanto requerido: ${formatoSoles.format(adelanto)} ` +
      `(20 % de ${formatoSoles.format(consumo)}).`;
  }

  /** Comprueba que la fecha seleccionada no sea anterior al día actual. */
  function validarFecha() {
    campoFecha.setCustomValidity("");

    if (!campoFecha.value) {
      return true;
    }

    if (campoFecha.value < fechaMinima) {
      campoFecha.setCustomValidity(
        "Selecciona hoy o una fecha posterior para solicitar tu reserva."
      );
      campoFecha.reportValidity();
      return false;
    }

    return true;
  }

  /** Recopila los campos del formulario y prepara los datos de la reserva. */
  function obtenerDatosReserva() {
    const datosFormulario = new FormData(formulario);
    const fechaSeleccionada = new Date(
      `${datosFormulario.get("fecha")}T12:00:00`
    );

    return {
      tipo: datosFormulario.get("tipo-reserva"),
      nombre: String(datosFormulario.get("nombre")).trim(),
      fecha: new Intl.DateTimeFormat("es-PE", {
        day: "2-digit",
        month: "long",
        year: "numeric"
      }).format(fechaSeleccionada),
      hora: datosFormulario.get("hora"),
      personas: datosFormulario.get("personas"),
      consumo: Number(datosFormulario.get("consumo-estimado"))
    };
  }

  /** Verifica los campos obligatorios y los valores del formulario. */
  function validarReserva() {
    campoConsumo.setCustomValidity("");

    if (!formulario.checkValidity()) {
      formulario.reportValidity();
      return false;
    }

    if (!validarFecha()) {
      return false;
    }

    const consumo = Number(campoConsumo.value);
    if (!Number.isFinite(consumo) || consumo <= 0) {
      campoConsumo.setCustomValidity(
        "Ingresa un consumo estimado mayor que cero."
      );
      campoConsumo.reportValidity();
      return false;
    }

    return true;
  }

  /** Construye el texto que el cliente enviará al WhatsApp del restaurante. */
  function crearMensajeWhatsApp(datos) {
    const adelanto = datos.consumo * PORCENTAJE_ADELANTO;

    return [
      "Hola, Salvaje Restobar. Deseo solicitar una reserva.",
      "",
      `Tipo de reserva: ${datos.tipo}`,
      `Nombre: ${datos.nombre}`,
      `Fecha: ${datos.fecha}`,
      `Hora: ${datos.hora}`,
      `Número de personas: ${datos.personas}`,
      `Consumo estimado: ${formatoSoles.format(datos.consumo)}`,
      `Adelanto (20 %): ${formatoSoles.format(adelanto)}`,
      "",
      "Por favor, confirmar la disponibilidad. Entiendo que la solicitud queda pendiente de confirmación. Gracias."
    ].join("\n");
  }

  /** Valida la solicitud, muestra una confirmación y abre WhatsApp. */
  function enviarReservaWhatsApp(evento) {
    evento.preventDefault();

    if (!validarReserva()) {
      return;
    }

    const datos = obtenerDatosReserva();
    const mensaje = crearMensajeWhatsApp(datos);
    const enlaceWhatsApp =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;

    const titulo = document.createElement("strong");
    titulo.textContent = "Tu solicitud está lista para enviar.";

    const aviso = document.createElement("p");
    aviso.textContent =
      "Se abrirá WhatsApp con los datos de tu reserva. Revisa el mensaje y pulsa Enviar. La reserva quedará pendiente de confirmación del restaurante.";

    const enlace = document.createElement("a");
    enlace.className = "button button-gold reservation-submit";
    enlace.href = enlaceWhatsApp;
    enlace.target = "_blank";
    enlace.rel = "noopener noreferrer";
    enlace.textContent = "Abrir WhatsApp";

    resultado.replaceChildren(titulo, aviso, enlace);
    resultado.hidden = false;

    // Se abre desde el evento de envío del usuario; el enlace queda como alternativa.
    window.open(enlaceWhatsApp, "_blank", "noopener,noreferrer");
  }

  campoConsumo.addEventListener("input", () => {
    campoConsumo.setCustomValidity("");
    actualizarAdelanto();
  });

  campoFecha.addEventListener("change", validarFecha);
  formulario.addEventListener("submit", enviarReservaWhatsApp);

  // Muestra el mensaje inicial del cálculo al cargar la página.
  actualizarAdelanto();
}
