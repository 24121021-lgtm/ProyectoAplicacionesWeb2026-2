/* =========================================================
   SALVAJE RESTOBAR — buscador y filtros de bebidas
   Vanilla JavaScript: búsqueda por nombre/ingredientes y
   filtros por categoría, sin modificar la información de
   las bebidas ni los datos de la carta de comidas.
   ========================================================= */

"use strict";

(() => {
  const contenedor = document.querySelector("#drink-categories");
  const campoBusqueda = document.querySelector("#drink-search");
  const filtros = document.querySelector("#drink-filters");
  const resultados = document.querySelector("#drink-results");
  const estadoVacio = document.querySelector("#drink-empty");
  const limpiarBusqueda = document.querySelector("#drink-search-clear");
  const restablecer = document.querySelector("#drink-reset");

  if (!contenedor || !campoBusqueda || !filtros || !resultados || !estadoVacio) return;

  const paneles = Array.from(contenedor.querySelectorAll(":scope > .cocktail-panel"));
  const configuracionCategorias = [
    { etiqueta: "Clásicos", icono: "✦", distintivo: "CLÁSICO" },
    { etiqueta: "Sin alcohol", icono: "❋", distintivo: "SIN ALCOHOL" },
    { etiqueta: "De la casa", icono: "✧", distintivo: "DE LA CASA" }
  ];

  const normalizarTextoBebida = (texto) => texto
    .toLocaleLowerCase("es")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

  const obtenerNombrePanel = (panel) =>
    panel.querySelector(":scope > summary strong")?.textContent.trim() || "Bebidas";

  const elementos = paneles.flatMap((panel, indice) => {
    const categoria = obtenerNombrePanel(panel);
    const tarjetas = Array.from(panel.querySelectorAll(".cocktail-card"));
    const distintivo = configuracionCategorias[indice]?.distintivo || categoria.toUpperCase();

    tarjetas.forEach((tarjeta) => {
      if (!tarjeta.querySelector(".drink-card-kicker")) {
        const etiqueta = document.createElement("span");
        etiqueta.className = "drink-card-kicker";
        etiqueta.textContent = distintivo;
        tarjeta.prepend(etiqueta);
      }
      tarjeta.dataset.drinkCategory = String(indice);
    });

    return tarjetas.map((tarjeta) => ({
      elemento: tarjeta,
      panel,
      indice: String(indice),
      texto: normalizarTextoBebida(`${categoria} ${tarjeta.textContent}`)
    }));
  });

  let categoriaActiva = "all";

  function crearBotonFiltro(nombre, valor, cantidad, icono = "") {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "drink-filter-button";
    boton.dataset.category = valor;
    boton.setAttribute("aria-pressed", "false");

    if (icono) {
      const simbolo = document.createElement("span");
      simbolo.className = "drink-filter-icon";
      simbolo.setAttribute("aria-hidden", "true");
      simbolo.textContent = icono;
      boton.appendChild(simbolo);
    }

    const etiqueta = document.createElement("span");
    etiqueta.textContent = nombre;

    const contador = document.createElement("span");
    contador.className = "drink-filter-count";
    contador.textContent = String(cantidad);
    contador.setAttribute("aria-hidden", "true");

    boton.append(etiqueta, contador);
    return boton;
  }

  function crearFiltros() {
    filtros.replaceChildren();
    filtros.appendChild(crearBotonFiltro("Todas", "all", elementos.length, "✦"));

    paneles.forEach((panel, indice) => {
      const categoria = configuracionCategorias[indice] || {};
      const cantidad = elementos.filter((item) => item.indice === String(indice)).length;
      filtros.appendChild(crearBotonFiltro(
        categoria.etiqueta || obtenerNombrePanel(panel),
        String(indice),
        cantidad,
        categoria.icono || "✧"
      ));
    });

    actualizarFiltrosActivos();
  }

  function actualizarFiltrosActivos() {
    filtros.querySelectorAll(".drink-filter-button").forEach((boton) => {
      const activo = boton.dataset.category === categoriaActiva;
      boton.classList.toggle("is-active", activo);
      boton.setAttribute("aria-pressed", String(activo));
    });
  }

  function actualizarControles() {
    if (limpiarBusqueda) limpiarBusqueda.hidden = campoBusqueda.value.length === 0;
  }

  function filtrarBebidas() {
    const consulta = normalizarTextoBebida(campoBusqueda.value);
    let total = 0;
    actualizarControles();

    paneles.forEach((panel, indice) => {
      const panelCoincide = categoriaActiva === "all" || categoriaActiva === String(indice);
      const tarjetasPanel = elementos.filter((item) => item.indice === String(indice));
      let coincidenciasPanel = 0;

      tarjetasPanel.forEach((item) => {
        const coincideTexto = !consulta || item.texto.includes(consulta);
        const visible = panelCoincide && coincideTexto;
        item.elemento.hidden = !visible;
        if (visible) {
          coincidenciasPanel += 1;
          total += 1;
        }
      });

      panel.hidden = !(panelCoincide && coincidenciasPanel > 0);

      // Al buscar o seleccionar un tipo, abre la categoría que contiene resultados.
      if (consulta || categoriaActiva !== "all") {
        panel.open = coincidenciasPanel > 0 && panelCoincide;
      }
    });

    estadoVacio.hidden = total > 0;
    if (total === 0) {
      resultados.textContent = "No hay bebidas que coincidan con tu búsqueda.";
    } else if (!consulta && categoriaActiva === "all") {
      resultados.textContent = `${total} bebidas en nuestra carta.`;
    } else {
      resultados.textContent = `${total} ${total === 1 ? "bebida encontrada" : "bebidas encontradas"}.`;
    }

    actualizarFiltrosActivos();
  }

  function restablecerBebidas() {
    campoBusqueda.value = "";
    categoriaActiva = "all";
    paneles.forEach((panel) => { panel.open = false; });
    filtrarBebidas();
  }

  filtros.addEventListener("click", (evento) => {
    const boton = evento.target.closest("button[data-category]");
    if (!boton || !filtros.contains(boton)) return;
    categoriaActiva = boton.dataset.category;
    filtrarBebidas();
  });

  campoBusqueda.addEventListener("input", filtrarBebidas);

  limpiarBusqueda?.addEventListener("click", () => {
    campoBusqueda.value = "";
    filtrarBebidas();
    campoBusqueda.focus();
  });

  restablecer?.addEventListener("click", restablecerBebidas);

  crearFiltros();
  filtrarBebidas();
})();
