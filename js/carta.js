/* =========================================================
   SALVAJE RESTOBAR — buscador y filtros de la carta
   JavaScript puro: búsqueda por texto y filtro por categoría.
   ========================================================= */

"use strict";

const contenedorCarta = document.querySelector(".static-menu-categories");
const campoBusquedaCarta = document.querySelector("#menu-search");
const contenedorFiltrosCarta = document.querySelector("#menu-filters");
const textoResultadosCarta = document.querySelector("#menu-results");
const mensajeSinResultados = document.querySelector("#menu-empty");
const botonLimpiarBusqueda = document.querySelector("#menu-search-clear");
const botonRestablecerCarta = document.querySelector("#menu-reset");

// Esta función permite buscar sin distinguir mayúsculas ni tildes.
function normalizarTexto(texto) {
  return texto
    .toLocaleLowerCase("es")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

// Obtiene el nombre principal de la categoría, sin el texto secundario.
function obtenerNombreCategoria(panel) {
  const resumen = panel.querySelector(":scope > summary");
  if (!resumen) return "Categoría";

  const copiaResumen = resumen.cloneNode(true);
  copiaResumen.querySelectorAll("span").forEach((elemento) => elemento.remove());
  return copiaResumen.textContent.trim();
}

if (
  contenedorCarta && campoBusquedaCarta && contenedorFiltrosCarta &&
  textoResultadosCarta && mensajeSinResultados
) {
  const categoriasCarta = Array.from(
    contenedorCarta.querySelectorAll(":scope > .menu-category-panel")
  );

  let categoriaSeleccionada = "all";

  // Cada plato queda asociado a su categoría para poder filtrarlo.
  const elementosCarta = categoriasCarta.flatMap((panel, indiceCategoria) => {
    const nombreCategoria = obtenerNombreCategoria(panel);
    const tarjetas = Array.from(
      panel.querySelectorAll(".static-product, .sauce-card")
    );

    return tarjetas.map((tarjeta) => {
      const tipoPasta = tarjeta.closest(".pasta-type");
      const nombreTipoPasta = tipoPasta
        ? tipoPasta.querySelector(":scope > summary")?.textContent || ""
        : "";

      return {
        elemento: tarjeta,
        panel,
        indiceCategoria: String(indiceCategoria),
        tipoPasta,
        texto: normalizarTexto(
          `${nombreCategoria} ${nombreTipoPasta} ${tarjeta.textContent}`
        )
      };
    });
  });

  // Crea botones visuales con el nombre y la cantidad de opciones por categoría.
  function crearBotonCategoria(nombre, identificador, cantidad) {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "menu-filter-button";
    boton.dataset.category = identificador;
    boton.setAttribute("aria-pressed", "false");
    boton.setAttribute("aria-label", `${nombre}: ${cantidad} opciones`);

    const etiqueta = document.createElement("span");
    etiqueta.className = "menu-filter-name";
    etiqueta.textContent = nombre;

    const contador = document.createElement("span");
    contador.className = "menu-filter-count";
    contador.textContent = cantidad;
    contador.setAttribute("aria-hidden", "true");

    boton.append(etiqueta, contador);
    return boton;
  }

  function crearFiltrosCategoria() {
    contenedorFiltrosCarta.replaceChildren();

    contenedorFiltrosCarta.appendChild(
      crearBotonCategoria("Todas", "all", elementosCarta.length)
    );

    categoriasCarta.forEach((panel, indice) => {
      const nombre = obtenerNombreCategoria(panel);
      const cantidad = elementosCarta.filter(
        (item) => item.indiceCategoria === String(indice)
      ).length;
      contenedorFiltrosCarta.appendChild(
        crearBotonCategoria(nombre, String(indice), cantidad)
      );
    });

    actualizarEstadoBotones();
  }

  function actualizarEstadoBotones() {
    contenedorFiltrosCarta.querySelectorAll(".menu-filter-button").forEach((boton) => {
      const estaActivo = boton.dataset.category === categoriaSeleccionada;
      boton.classList.toggle("is-active", estaActivo);
      boton.setAttribute("aria-pressed", String(estaActivo));
    });
  }

  function actualizarControlBusqueda() {
    if (botonLimpiarBusqueda) {
      botonLimpiarBusqueda.hidden = campoBusquedaCarta.value.length === 0;
    }
  }

  function restablecerCarta() {
    campoBusquedaCarta.value = "";
    categoriaSeleccionada = "all";
    filtrarCarta();
    campoBusquedaCarta.focus();
  }

  function filtrarCarta() {
    const busqueda = normalizarTexto(campoBusquedaCarta.value);
    actualizarControlBusqueda();
    let totalCoincidencias = 0;

    categoriasCarta.forEach((panel, indice) => {
      const categoriaCoincide =
        categoriaSeleccionada === "all" || categoriaSeleccionada === String(indice);

      const elementosDeCategoria = elementosCarta.filter(
        (item) => item.indiceCategoria === String(indice)
      );

      let coincidenciasCategoria = 0;

      elementosDeCategoria.forEach((item) => {
        const coincideTexto = !busqueda || item.texto.includes(busqueda);
        const visible = categoriaCoincide && coincideTexto;
        item.elemento.hidden = !visible;

        if (visible) {
          coincidenciasCategoria += 1;
          totalCoincidencias += 1;
        }
      });

      // Oculta los bloques de Spaghetti/Fetuccini cuando no contienen resultados.
      panel.querySelectorAll(".pasta-type").forEach((tipo) => {
        const tieneResultados = Boolean(
          tipo.querySelector(".static-product:not([hidden])")
        );
        tipo.hidden = Boolean(busqueda) && !tieneResultados;
        if (busqueda && tieneResultados) tipo.open = true;
      });

      const bloquePastas = panel.querySelector(".pasta-types");
      if (bloquePastas) {
        const tienePlatosDePasta = Boolean(
          bloquePastas.querySelector(".static-product:not([hidden])")
        );
        bloquePastas.hidden = Boolean(busqueda) && !tienePlatosDePasta;
      }

      const bloqueSalsas = panel.querySelector(".sauce-section");
      if (bloqueSalsas) {
        const tieneSalsasVisibles = Boolean(
          bloqueSalsas.querySelector(".sauce-card:not([hidden])")
        );
        bloqueSalsas.hidden = Boolean(busqueda) && !tieneSalsasVisibles;
      }

      const categoriaVisible = categoriaCoincide && coincidenciasCategoria > 0;
      panel.hidden = !categoriaVisible;

      // Abre las categorías que contienen coincidencias para que el resultado se vea.
      if ((busqueda || categoriaSeleccionada !== "all") && categoriaVisible) {
        panel.open = true;
      }
    });

    mensajeSinResultados.hidden = totalCoincidencias > 0;

    if (!busqueda && categoriaSeleccionada === "all") {
      const totalPlatos = elementosCarta.filter(
        (item) => item.elemento.classList.contains("static-product")
      ).length;
      textoResultadosCarta.textContent =
        `Mostrando la carta completa: ${totalPlatos} platos disponibles.`;
    } else if (totalCoincidencias === 0) {
      textoResultadosCarta.textContent = "No hay coincidencias para mostrar.";
    } else {
      const detalleSalsas = coincidenciasSalsasGlobales();
      const palabraResultado = totalCoincidencias === 1 ? "resultado" : "resultados";
      textoResultadosCarta.textContent =
        `${totalCoincidencias} ${palabraResultado} encontrados.` +
        (detalleSalsas > 0 ? ` Incluye ${detalleSalsas} opción(es) de salsa.` : "");
    }

    actualizarEstadoBotones();
  }

  function coincidenciasSalsasGlobales() {
    return elementosCarta.filter((item) =>
      item.elemento.classList.contains("sauce-card") && !item.elemento.hidden
    ).length;
  }

  contenedorFiltrosCarta.addEventListener("click", (evento) => {
    const boton = evento.target.closest("button[data-category]");
    if (!boton || !contenedorFiltrosCarta.contains(boton)) return;

    categoriaSeleccionada = boton.dataset.category;
    filtrarCarta();
  });

  campoBusquedaCarta.addEventListener("input", filtrarCarta);

  if (botonLimpiarBusqueda) {
    botonLimpiarBusqueda.addEventListener("click", () => {
      campoBusquedaCarta.value = "";
      filtrarCarta();
      campoBusquedaCarta.focus();
    });
  }

  if (botonRestablecerCarta) {
    botonRestablecerCarta.addEventListener("click", restablecerCarta);
  }

  crearFiltrosCategoria();
  filtrarCarta();
}
