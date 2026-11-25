
/* =========================================================
   SALVAJE RESTOBAR — buscador y filtros de bebidas
   JavaScript moderno y optimizado.
   Mantiene intacta la información de las bebidas.
   ========================================================= */

"use strict";

(() => {

  // 1. ELEMENTOS DEL DOM
  const contenedor = document.querySelector("#drink-categories");
  const campoBusqueda = document.querySelector("#drink-search");
  const filtros = document.querySelector("#drink-filters");
  const resultados = document.querySelector("#drink-results");
  const estadoVacio = document.querySelector("#drink-empty");
  const limpiarBusqueda = document.querySelector("#drink-search-clear");
  const restablecer = document.querySelector("#drink-reset");

  if (!contenedor || !campoBusqueda || !filtros || !resultados || !estadoVacio) {
    return;
  }

  // 2. CONFIGURACIÓN DE CATEGORÍAS
  const TODAS_LAS_CATEGORIAS = "all";

  const configuracionCategorias = [
    { etiqueta: "Clásicos", icono: "✦", distintivo: "CLÁSICO" },
    { etiqueta: "Sin alcohol", icono: "❋", distintivo: "SIN ALCOHOL" },
    { etiqueta: "De la casa", icono: "✧", distintivo: "DE LA CASA" }
  ];

  // 3. NORMALIZACIÓN DEL TEXTO
  const normalizarTextoBebida = (texto = "") => String(texto)
    .toLocaleLowerCase("es")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

  // 4. OBTENER EL NOMBRE DE CADA CATEGORÍA
  const obtenerNombrePanel = (panel) =>
    panel.querySelector(":scope > summary strong")?.textContent.trim() || "Bebidas";

  // 5. ORGANIZAR LAS BEBIDAS POR CATEGORÍA
  const paneles = Array.from(
    contenedor.querySelectorAll(":scope > .cocktail-panel")
  );

  const grupos = paneles.map((panel, indice) => {

    const categoria = obtenerNombrePanel(panel);
    const configuracion = configuracionCategorias[indice] || {};

    const distintivo = configuracion.distintivo || categoria.toLocaleUpperCase("es");

    const bebidas = Array.from(
      panel.querySelectorAll(".cocktail-card")
    ).map((tarjeta) => {

      // Agregar distintivo si todavía no existe.
      if (!tarjeta.querySelector(".drink-card-kicker")) {

        const etiqueta = document.createElement("span");

        etiqueta.className = "drink-card-kicker";
        etiqueta.textContent = distintivo;

        tarjeta.prepend(etiqueta);
      }

      tarjeta.dataset.drinkCategory = String(indice);

      return {
        elemento: tarjeta,
        texto: normalizarTextoBebida(
          `${categoria} ${tarjeta.textContent}`
        )
      };

    });

    return {
      panel,
      indice: String(indice),
      etiqueta: configuracion.etiqueta || categoria,
      icono: configuracion.icono || "✧",
      bebidas
    };

  });

  // 6. CALCULAR EL TOTAL DE BEBIDAS
  const totalBebidas = grupos.reduce(
    (total, grupo) => total + grupo.bebidas.length,
    0
  );

  let categoriaActiva = TODAS_LAS_CATEGORIAS;

  // 7. CREAR BOTONES DE FILTROS
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

  // 8. GENERAR TODOS LOS FILTROS
  function crearFiltros() {

    filtros.replaceChildren();

    filtros.appendChild(
      crearBotonFiltro("Todas", TODAS_LAS_CATEGORIAS, totalBebidas, "✦")
    );

    grupos.forEach(({ etiqueta, indice, icono, bebidas }) => {

      filtros.appendChild(
        crearBotonFiltro(
          etiqueta,
          indice,
          bebidas.length,
          icono
        )
      );

    });

    actualizarFiltrosActivos();
  }

  // 9. ACTUALIZAR EL FILTRO SELECCIONADO
  function actualizarFiltrosActivos() {

    filtros.querySelectorAll(".drink-filter-button").forEach((boton) => {

      const activo = boton.dataset.category === categoriaActiva;

      boton.classList.toggle("is-active", activo);
      boton.setAttribute("aria-pressed", String(activo));

    });

  }

  // 10. ACTUALIZAR CONTROLES
  function actualizarControles() {

    if (limpiarBusqueda) {
      limpiarBusqueda.hidden = campoBusqueda.value.length === 0;
    }

  }

  // 11. APLICAR BÚSQUEDA Y FILTROS
  function filtrarBebidas() {

    const consulta = normalizarTextoBebida(campoBusqueda.value);

    let total = 0;

    actualizarControles();

    grupos.forEach(({ panel, indice, bebidas }) => {

      const categoriaCoincide =
        categoriaActiva === TODAS_LAS_CATEGORIAS ||
        categoriaActiva === indice;

      let coincidenciasPanel = 0;

      bebidas.forEach(({ elemento, texto }) => {

        const coincideTexto = !consulta || texto.includes(consulta);

        const visible = categoriaCoincide && coincideTexto;

        elemento.hidden = !visible;

        if (visible) {
          coincidenciasPanel++;
          total++;
        }

      });

      panel.hidden = !(categoriaCoincide && coincidenciasPanel > 0);

      // Abrir las categorías que contienen resultados.
      // Cerrarlas cuando se restablece la vista general.
      panel.open = (consulta || categoriaActiva !== TODAS_LAS_CATEGORIAS)
        ? categoriaCoincide && coincidenciasPanel > 0
        : false;

    });

    // 12. ACTUALIZAR RESULTADOS
    estadoVacio.hidden = total > 0;

    if (total === 0) {

      resultados.textContent =
        "No hay bebidas que coincidan con tu búsqueda.";

    } else if (!consulta && categoriaActiva === TODAS_LAS_CATEGORIAS) {

      resultados.textContent =
        `${total} bebidas en nuestra carta.`;

    } else {

      resultados.textContent =
        `${total} ${total === 1 ? "bebida encontrada" : "bebidas encontradas"}.`;

    }

    actualizarFiltrosActivos();

  }

  // 13. RESTABLECER TODA LA CARTA
  function restablecerBebidas() {

    campoBusqueda.value = "";

    categoriaActiva = TODAS_LAS_CATEGORIAS;

    filtrarBebidas();

  }

  // 14. EVENTOS DE LOS FILTROS
  filtros.addEventListener("click", (evento) => {

    const boton = evento.target instanceof Element
      ? evento.target.closest("button[data-category]")
      : null;

    if (!boton || !filtros.contains(boton)) return;

    categoriaActiva = boton.dataset.category;

    filtrarBebidas();

  });

  // 15. EVENTOS DEL BUSCADOR
  campoBusqueda.addEventListener("input", filtrarBebidas);

  limpiarBusqueda?.addEventListener("click", () => {

    campoBusqueda.value = "";

    filtrarBebidas();

    campoBusqueda.focus();

  });

  restablecer?.addEventListener("click", restablecerBebidas);

  // 16. INICIALIZAR EL SISTEMA
  crearFiltros();

  filtrarBebidas();

})();
