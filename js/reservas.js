/* =========================================================
   SALVAJE RESTOBAR — sistema de reservas
   JavaScript puro: validación, cálculo del adelanto fijo y WhatsApp.
   ========================================================= */

"use strict";

// Número que aparece actualmente en el pie de página del proyecto.
// Confirma que este número también recibe mensajes por WhatsApp antes de publicar.
const WHATSAPP_NUMBER = "51980710043";
const ADELANTO_HASTA_CINCO_PERSONAS = 30;
const ADELANTO_MAS_DE_CINCO_PERSONAS = 50;

const formatoSoles = new Intl.NumberFormat("es-PE", {
  style: "currency",
  currency: "PEN"
});

const formulario = document.querySelector("#reservation-form");
const campoConsumo = document.querySelector("#reservation-consumption");
const campoFecha = document.querySelector("#reservation-date");
const campoPersonas = document.querySelector("#reservation-people");
const vistaAdelanto = document.querySelector("#advance-preview");
const resultado = document.querySelector("#reservation-result");

// Solo se ejecuta si la página contiene el formulario de reservas.
if (
  formulario && campoConsumo && campoFecha && campoPersonas &&
  vistaAdelanto && resultado
) {
  // La reserva debe realizarse como mínimo para el día siguiente.
  // Se usa la fecha local del dispositivo para evitar desfases por UTC.
  const manana = new Date();
  manana.setDate(manana.getDate() + 1);
  const fechaMinima = [
    manana.getFullYear(),
    String(manana.getMonth() + 1).padStart(2, "0"),
    String(manana.getDate()).padStart(2, "0")
  ].join("-");

  campoFecha.min = fechaMinima;

  /** Calcula y muestra el adelanto fijo según el número de personas. */
  function actualizarAdelanto() {
    const personas = Number(campoPersonas.value);
    const adelanto = personas > 5
      ? ADELANTO_MAS_DE_CINCO_PERSONAS
      : ADELANTO_HASTA_CINCO_PERSONAS;
    const tramo = personas > 5
      ? "para reservas de más de 5 personas"
      : "para reservas de 1 a 5 personas";

    vistaAdelanto.textContent =
      `Adelanto requerido: ${formatoSoles.format(adelanto)} ${tramo}.`;
  }

  /** Comprueba que la fecha seleccionada sea mañana o un día posterior. */
  function validarFecha() {
    campoFecha.setCustomValidity("");

    if (!campoFecha.value) {
      return true;
    }

    if (campoFecha.value < fechaMinima) {
      campoFecha.setCustomValidity(
        "Las reservas deben realizarse con al menos un día de anticipación. Selecciona mañana o una fecha posterior."
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
    const personas = Number(datosFormulario.get("personas"));
    const adelanto = personas > 5
      ? ADELANTO_MAS_DE_CINCO_PERSONAS
      : ADELANTO_HASTA_CINCO_PERSONAS;

    return {
      tipo: datosFormulario.get("tipo-reserva"),
      nombre: String(datosFormulario.get("nombre")).trim(),
      fecha: new Intl.DateTimeFormat("es-PE", {
        day: "2-digit",
        month: "long",
        year: "numeric"
      }).format(fechaSeleccionada),
      hora: datosFormulario.get("hora"),
      personas,
      consumo: Number(datosFormulario.get("consumo-estimado")),
      adelanto
    };
  }

  /** Verifica los campos obligatorios y los valores del formulario. */
  function validarReserva() {
    campoConsumo.setCustomValidity("");
    campoPersonas.setCustomValidity("");

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

    const personas = Number(campoPersonas.value);
    if (!Number.isInteger(personas) || personas < 1) {
      campoPersonas.setCustomValidity(
        "Selecciona una cantidad válida de personas."
      );
      campoPersonas.reportValidity();
      return false;
    }

    return true;
  }

  /** Construye el texto que el cliente enviará al WhatsApp del restaurante. */
  function crearMensajeWhatsApp(datos) {
    return [
      "Hola, Salvaje Restobar. Deseo solicitar una reserva.",
      "",
      `Tipo de reserva: ${datos.tipo}`,
      `Nombre: ${datos.nombre}`,
      `Fecha: ${datos.fecha}`,
      `Hora: ${datos.hora}`,
      `Número de personas: ${datos.personas}`,
      `Consumo total estimado: ${formatoSoles.format(datos.consumo)}`,
      `Adelanto solicitado: ${formatoSoles.format(datos.adelanto)}`,
      "",
      "El adelanto es de S/ 30 para grupos de 1 a 5 personas y de S/ 50 para grupos de más de 5 personas.",
      "Por favor, confirmar la disponibilidad e indicar los datos para realizar el adelanto. Entiendo que la solicitud queda pendiente de confirmación. Gracias."
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
  });

  campoPersonas.addEventListener("change", actualizarAdelanto);
  campoFecha.addEventListener("change", validarFecha);
  formulario.addEventListener("submit", enviarReservaWhatsApp);

  // Muestra el adelanto correspondiente a la cantidad inicial de personas.
  actualizarAdelanto();
}
