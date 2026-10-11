/* Funciones sencillas de navegación y año del pie de página. */
(() => {
  const navbar = document.querySelector(".navbar");
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const year = document.querySelector("#year");

  // Actualiza el color de la barra al desplazarse.
  const updateNavbar = () => {
    if (!navbar) return;
    navbar.classList.toggle("scrolled", window.scrollY > 40);
  };

  updateNavbar();
  window.addEventListener("scroll", updateNavbar, { passive: true });

  // Abre y cierra el menú móvil.
  if (menuToggle && navLinks) {
    const closeMenu = () => {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menú de navegación");
      navLinks.classList.remove("is-open");
    };

    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Abrir menú de navegación" : "Cerrar menú de navegación"
      );
      navLinks.classList.toggle("is-open", !isOpen);
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
        menuToggle.focus();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 680) closeMenu();
    });
  }

  // Mantiene actualizado el año del copyright.
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  /*
   * CARTA DEL RESTAURANTE
   * Categoría -> plato -> opciones/acompañamientos.
   * Edita aquí los nombres, descripciones y precios reales.
   * Para agregar opciones a un plato, añade objetos al arreglo options.
   */
  const menuProducts = [
    // PASTAS: las tres salsas de la carta se pueden elegir para cada pasta.
    { name: "Spaghetti", category: "Pastas", description: "Elige salsa al pesto, Alfredo o huancaína y el acompañamiento de tu preferencia.", optionsTitle: "Acompañamientos y precios", options: [
      { name: "Con chuleta de cerdo", description: "Spaghetti con salsa a elección.", price: "S/ 35" },
      { name: "Con pechuga a la parrilla", description: "Spaghetti con salsa a elección.", price: "S/ 32" },
      { name: "Con corazón de res", description: "Spaghetti con salsa a elección.", price: "S/ 34" },
      { name: "Con churrasco a la parrilla", description: "Spaghetti con salsa a elección.", price: "S/ 39" },
      { name: "Con bife a la parrilla", description: "Spaghetti con salsa a elección.", price: "S/ 49" },
      { name: "Con lomo al jugo", description: "Spaghetti con salsa a elección.", price: "S/ 49" },
      { name: "Con lomo fino", description: "Spaghetti con salsa a elección.", price: "S/ 54" },
      { name: "Con picaña", description: "Spaghetti con salsa a elección.", price: "S/ 65" }
    ]},
    { name: "Fetuccini", category: "Pastas", description: "Elige salsa al pesto, Alfredo o huancaína y el acompañamiento de tu preferencia.", optionsTitle: "Acompañamientos y precios", options: [
      { name: "Con chuleta de cerdo", description: "Fetuccini con salsa a elección.", price: "S/ 35" },
      { name: "Con pechuga a la parrilla", description: "Fetuccini con salsa a elección.", price: "S/ 32" },
      { name: "Con corazón de res", description: "Fetuccini con salsa a elección.", price: "S/ 34" },
      { name: "Con churrasco a la parrilla", description: "Fetuccini con salsa a elección.", price: "S/ 39" },
      { name: "Con bife a la parrilla", description: "Fetuccini con salsa a elección.", price: "S/ 49" },
      { name: "Con lomo al jugo", description: "Fetuccini con salsa a elección.", price: "S/ 49" },
      { name: "Con lomo fino", description: "Fetuccini con salsa a elección.", price: "S/ 54" },
      { name: "Con picaña", description: "Fetuccini con salsa a elección.", price: "S/ 65" }
    ]},
    // CORTES DE RES
    { name: "Churrasco 300 g", category: "Cortes de res", description: "Churrasco a la parrilla.", price: "S/ 35" },
    { name: "Asado de tira 300 g", category: "Cortes de res", description: "Asado de tira a la parrilla.", price: "S/ 35" },
    { name: "Bife brasilera 300 g", category: "Cortes de res", description: "Bife a la parrilla.", price: "S/ 48" },
    { name: "Lomo fino 300 g", category: "Cortes de res", description: "Lomo fino a la parrilla.", price: "S/ 48" },
    { name: "Picaña brasilera 300 g", category: "Cortes de res", description: "Picaña a la parrilla.", price: "S/ 65" },
    { name: "Tomahawk 500 g", category: "Cortes de res", description: "Corte tomahawk a la parrilla.", price: "S/ 68" },
    { name: "Dúo parrillero", category: "Cortes de res", description: "200 g de bife + 200 g de picaña.", price: "S/ 90" },
    { name: "Trío parrillero", category: "Cortes de res", description: "200 g de bife + 200 g de picaña + 200 g de lomo fino.", price: "S/ 120" },
    // BROCHETAS
    { name: "Anticucho de corazón", category: "Brochetas", description: "2 palitos de corazón, papas fritas, queso, choclo y ensalada.", price: "S/ 29" },
    { name: "Brocheta de pollo", category: "Brochetas", description: "2 palitos de pechuga de pollo, papa frita, queso, choclo y ensalada.", price: "S/ 28" },
    { name: "Brocheta de lomo", category: "Brochetas", description: "2 palitos con trozo de lomo fino, papa frita, queso, choclo y ensalada.", price: "S/ 37" },
    { name: "Brocheta mixta", category: "Brochetas", description: "1 brocheta de lomo fino + 1 de pollo + 1 anticucho de corazón, papas fritas, queso, choclo y ensalada.", price: "S/ 45" },
    { name: "Champiñones a la parrilla", category: "Brochetas", description: "Champiñones, papa frita y ensalada.", price: "S/ 28" },
    { name: "Mollejas a la parrilla", category: "Brochetas", description: "Papa dorada, queso y ensalada.", price: "S/ 23" },
    { name: "Brochetas especial", category: "Brochetas", description: "4 brochetas a escoger + mollejitas + papas fritas y salsas al gusto.", price: "S/ 59" },
    // PIQUEOS
    { name: "Salchipapa clásica", category: "Piqueos", description: "Salchicha frankfurter en trozos acompañada con papas fritas.", price: "S/ 19" },
    { name: "Salchipapa especial", category: "Piqueos", description: "Salchicha frankfurter en trozos, generosa porción de papas fritas y dos huevos.", price: "S/ 26" },
    { name: "Salchipapa regional", category: "Piqueos", description: "Salchicha frankfurter en trozos con cecina, papas fritas, huevo y plátano maduro.", price: "S/ 29" },
    { name: "Chicharrón de pollo", category: "Piqueos", description: "Filete de pechuga en trozos, rebozado con harina y el ingrediente especial de la casa; acompañado de papas fritas.", price: "S/ 26" },
    { name: "Tequeños clásicos (10 unidades)", category: "Piqueos", description: "Rellenos de queso y jamón, acompañados con salsa de guacamole.", price: "S/ 18" },
    { name: "Tequeños regionales (10 unidades)", category: "Piqueos", description: "Rellenos de cecina y calabresa, acompañados con salsa de guacamole.", price: "S/ 20" },
    { name: "Canastas amazónicas", category: "Piqueos", description: "4 patacones rellenos de cecina y calabresa, acompañados de salsa de cocona.", price: "S/ 17" },
    { name: "Canastas con lomo al jugo", category: "Piqueos", description: "4 patacones con lomito al jugo acompañados de salsa de cocona.", price: "S/ 29" },
    { name: "Chorizo parrillero", category: "Piqueos", description: "Chorizo a la parrilla.", price: "Consultar" },
    // PLATOS AMAZÓNICOS SALVAJE
    { name: "Toscana parrillero", category: "Platos amazónicos", description: "Plato de la casa.", price: "S/ 25" },
    { name: "Pollo canga", category: "Platos amazónicos", description: "Especialidad amazónica de pollo.", price: "S/ 26" },
    { name: "Tacacho con cecina", category: "Platos amazónicos", description: "Tacacho acompañado con cecina.", price: "S/ 25" },
    { name: "Tacacho con cecina + chorizo", category: "Platos amazónicos", description: "Tacacho con cecina y chorizo.", price: "S/ 29" },
    { name: "Chaufa amazónico", category: "Platos amazónicos", description: "Arroz chaufa al estilo amazónico.", price: "S/ 34" },
    { name: "Plato amazónico (nombre no legible en foto)", category: "Platos amazónicos", description: "El nombre aparece cubierto en la fotografía.", price: "S/ 35" },
    { name: "Plato amazónico (nombre no legible en foto) 2", category: "Platos amazónicos", description: "El nombre aparece cubierto en la fotografía.", price: "S/ 35" },
    { name: "Paco frito", category: "Platos amazónicos", description: "Paco frito.", price: "S/ 35" },
    { name: "Saltado de cecina", category: "Platos amazónicos", description: "Saltado preparado con cecina.", price: "S/ 39" },
    { name: "Ronda amazónica", category: "Platos amazónicos", description: "Cecina, chancho, chaufa amazónico, tacacho y chorizo regional.", price: "S/ 50" },
    // SOPAS
    { name: "Sopa de dieta", category: "Sopas", description: "Sopa de dieta.", price: "S/ 18" },
    { name: "Sopa a la minuta", category: "Sopas", description: "Sopa a la minuta.", price: "S/ 19" },
    { name: "Sopa criolla", category: "Sopas", description: "Sopa criolla.", price: "S/ 20" },
    // ENSALADAS
    { name: "Ensalada fresca", category: "Ensaladas", description: "Lechuga orgánica, tomate, pepino, brócoli, zanahoria, palta y rabanito.", price: "S/ 15" },
    { name: "Ensalada especial", category: "Ensaladas", description: "Lechuga orgánica, tomate, zanahoria cocida, brócoli, champiñones, aceituna, palta y huevo duro.", price: "S/ 19" },
    { name: "Ensalada César", category: "Ensaladas", description: "Lechuga orgánica, tomates, queso parmesano, crutones, huevo duro y pechuga de pollo.", price: "S/ 27" },
    { name: "Ensalada Salvaje", category: "Ensaladas", description: "Lechuga orgánica, tomate, palta, queso, palmito, cecina y jamón.", price: "S/ 29" },
    { name: "Ensalada de casa", category: "Ensaladas", description: "Lechuga orgánica, tomates, cebolla blanca, brócoli, palta, queso edam y pechuga a la plancha.", price: "S/ 29" },
    // PARRILLAS
    { name: "Parrilla personal", category: "Parrillas", description: "Bife brasilera 200 g + filete de pollo + 1 palo de anticucho + toscana + vaso de refresco.", price: "S/ 60" },
    { name: "Parrilla mediana", category: "Parrillas", description: "Bife brasilera 200 g + filete de pollo + chuleta de cerdo + 1 palo de anticucho + 2 chorizos + 1 jarra de sangría.", price: "S/ 140" },
    { name: "Parrilla familiar", category: "Parrillas", description: "Bife brasilera 200 g + picaña 200 g + lomo fino 200 g + 2 filetes de pollo + 1 chuleta de cerdo + 2 palos de anticuchos + 2 chorizos + 1 jarra de sangría.", price: "S/ 220" },
    { name: "Parrilla Salvaje", category: "Parrillas", description: "2 bife brasilera 200 g + picaña 300 g + 2 lomos finos + 2 filetes de pollo + 2 chuletas de cerdo + 2 anticuchos + 2 chorizos de la casa + porción de molleja + 1 jarra de sangría.", price: "S/ 300" },
    // GUARNICIONES
    { name: "Arroz", category: "Guarniciones", description: "Porción de arroz.", price: "S/ 7" },
    { name: "Papas fritas", category: "Guarniciones", description: "Porción de papas fritas.", price: "S/ 10" },
    { name: "Patacones", category: "Guarniciones", description: "Porción de patacones.", price: "S/ 10" },
    { name: "Papa dorada", category: "Guarniciones", description: "Porción de papa dorada.", price: "S/ 10" },
    { name: "Yucas fritas", category: "Guarniciones", description: "Porción de yucas fritas.", price: "S/ 10" },
    { name: "Tacacho", category: "Guarniciones", description: "Porción de tacacho.", price: "S/ 10" },
    // RECOMENDACIONES DE LA CASA
    { name: "Filet mignon en salsa de champiñones", category: "Recomendaciones de la casa", description: "Filet mignon con salsa de champiñones.", price: "S/ 53" },
    { name: "Pechuga en salsa de champiñones", category: "Recomendaciones de la casa", description: "Pechuga de pollo con salsa de champiñones.", price: "S/ 33" },
    { name: "Pechuga Salvaje regional", category: "Recomendaciones de la casa", description: "Pechuga estilo Salvaje regional.", price: "S/ 39" },
    // COCINA
    { name: "Lomo saltado", category: "Nuestra cocina", description: "Lomo saltado.", price: "S/ 35" },
    { name: "Lomo saltado a lo pobre", category: "Nuestra cocina", description: "Lomo saltado a lo pobre.", price: "S/ 38" },
    { name: "Tallarín saltado lomo fino", category: "Nuestra cocina", description: "Tallarín saltado con lomo fino.", price: "S/ 37" },
    { name: "Tallarín saltado pollo", category: "Nuestra cocina", description: "Tallarín saltado con pollo.", price: "S/ 32" },
    { name: "Chaufa de pollo", category: "Nuestra cocina", description: "Arroz chaufa de pollo.", price: "S/ 24" },
    { name: "Chaufa especial", category: "Nuestra cocina", description: "Arroz chaufa especial.", price: "S/ 33" },
    { name: "Saltado de pollo", category: "Nuestra cocina", description: "Saltado de pollo.", price: "S/ 29" },
    { name: "Arroz con pato", category: "Nuestra cocina", description: "Arroz con pato.", price: "Consultar" },
    // CERDO Y PECHUGAS
    { name: "Chuleta a la parrilla 300 g", category: "Cerdo", description: "Chuleta de cerdo a la parrilla.", price: "S/ 35" },
    { name: "Costillas ahumadas BBQ", category: "Cerdo", description: "Costillas ahumadas con sabor de casa (BBQ).", price: "S/ 43" },
    { name: "Caja china", category: "Cerdo", description: "Preparación al estilo caja china.", price: "S/ 35" },
    { name: "Filete de pechuga", category: "Pechugas", description: "Filete de pechuga con papas fritas y ensalada.", price: "S/ 24" },
    { name: "Filete light", category: "Pechugas", description: "Filete de pechuga con ensalada especial.", price: "S/ 27" },
    { name: "Filete a lo pobre", category: "Pechugas", description: "Filete de pechuga + papas fritas + arroz + plátano + huevo frito.", price: "S/ 29" },
    { name: "Filete parrillero", category: "Pechugas", description: "Filete de pechuga + mollejitas + chorizo + papas fritas + ensalada.", price: "S/ 32" },
    { name: "Filete Salvaje", category: "Pechugas", description: "Filete de pechuga + queso + tocino + champiñones + jamón.", price: "S/ 34" },
    // ALITAS
    { name: "Alitas - 6 unidades", category: "Alitas", description: "Acompañadas con una salsa a elección: BBQ, acevichado, búfalo, anticuchera, Salvaje o maracuyá.", price: "S/ 25" },
    { name: "Alitas - 10 unidades", category: "Alitas", description: "Acompañadas con una salsa a elección: BBQ, acevichado, búfalo, anticuchera, Salvaje o maracuyá.", price: "S/ 35" },
    // TACU-TACU: la foto no muestra los precios con suficiente claridad.
    { name: "Tacu tacu con lomo saltado", category: "Tacu-tacu", description: "Tacu tacu con lomo saltado.", price: "Consultar" },
    { name: "Tacu tacu con pollo saltado", category: "Tacu-tacu", description: "Tacu tacu con pollo saltado.", price: "Consultar" },
    { name: "Tacu tacu a lo pobre", category: "Tacu-tacu", description: "Tacu tacu a lo pobre.", price: "Consultar" }
  ];

  const pastaSauces = [
    { name: "Al pesto", description: "Salsa verde aromática a base de albahaca.", image: "imagen/salsa_pesto.jpg" },
    { name: "A lo Alfredo", description: "Salsa cremosa estilo Alfredo.", image: "imagen/salsa_alfredo.jpg" },
    { name: "Huancaína", description: "Salsa cremosa de ají amarillo.", image: "imagen/salsa_huancaina.jpg" }
  ];
  const meatCuts = [
    { name: "Chuleta de cerdo", price: "S/ 35" },
    { name: "Pechuga a la parrilla", price: "S/ 32" },
    { name: "Corazón de res", price: "S/ 34" },
    { name: "Churrasco a la parrilla", price: "S/ 39" },
    { name: "Bife a la parrilla", price: "S/ 49" },
    { name: "Lomo al jugo", price: "S/ 49" },
    { name: "Lomo fino", price: "S/ 54" },
    { name: "Picaña", price: "S/ 65" }
  ];
  const donenessLevels = [
    { name: "Rojo inglés", description: "Centro rojo y muy jugoso.", image: "imagen/termino_rojo_ingles.jpg" },
    { name: "Rojo medio", description: "Centro rojo, ligeramente más cocido.", image: "imagen/termino_rojo_medio.jpg" },
    { name: "Término medio", description: "Centro rosado y jugoso.", image: "imagen/termino_medio.jpg" },
    { name: "Tres cuartos", description: "Mayormente cocido, con poco centro rosado.", image: "imagen/termino_tres_cuartos.jpg" },
    { name: "Bien cocido", description: "Carne completamente cocida.", image: "imagen/termino_bien_cocido.jpg" }
  ];

  const productGrid = document.querySelector("#product-grid");
  const categoryContainer = document.querySelector("#menu-categories");
  const searchInput = document.querySelector("#menu-search");
  const categoryTitle = document.querySelector("#menu-category-title");
  const resultCount = document.querySelector("#menu-results-count");
  const emptyMessage = document.querySelector("#menu-empty");
  const productDetail = document.querySelector("#product-detail");
  const detailBack = document.querySelector("#detail-back");
  const detailCategory = document.querySelector("#detail-category");
  const detailTitle = document.querySelector("#detail-title");
  const detailDescription = document.querySelector("#detail-description");
  const detailOptionsTitle = document.querySelector("#detail-options-title");
  const detailOptions = document.querySelector("#detail-options");
  const detailOptionsWrap = document.querySelector("#detail-options-wrap");

  if (productGrid && categoryContainer && searchInput) {
    let activeCategory = "Todos";
    let activeProduct = null;

    const escapeHTML = (value) =>
      String(value ?? "").replace(/[&<>"']/g, (character) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      })[character]);

    const getCategories = () => [
      "Todos",
      ...new Set(menuProducts.map((product) => product.category).filter(Boolean))
    ];

    const renderCategories = () => {
      categoryContainer.innerHTML = getCategories().map((category) => `
        <button class="menu-category-button" type="button"
          data-category="${escapeHTML(category)}"
          aria-pressed="${category === activeCategory ? "true" : "false"}">
          ${escapeHTML(category)}
        </button>
      `).join("");
    };

    const renderProducts = () => {
      const query = searchInput.value.trim().toLocaleLowerCase("es");
      const filtered = menuProducts.filter((product) => {
        const matchesCategory = activeCategory === "Todos" || product.category === activeCategory;
        const searchable = [product.name, product.category, product.description]
          .join(" ").toLocaleLowerCase("es");
        return matchesCategory && searchable.includes(query);
      });

      categoryTitle.textContent = activeCategory === "Todos" ? "Todos los platos" : activeCategory;
      resultCount.textContent = `${filtered.length} ${filtered.length === 1 ? "plato" : "platos"}`;
      emptyMessage.hidden = filtered.length > 0;
      productGrid.hidden = filtered.length === 0;

      productGrid.innerHTML = filtered.map((product) => `
        <button class="product-card" type="button" data-product="${escapeHTML(product.name)}">
          <span class="product-card-top">
            <h4>${escapeHTML(product.name)}</h4>
            ${product.price ? `<span class="product-price">${escapeHTML(product.price)}</span>` : ""}
          </span>
          <p>${escapeHTML(product.description || "Selecciona para ver las opciones disponibles.")}</p>
          <span class="product-card-hint">Ver opciones <span aria-hidden="true">→</span></span>
        </button>
      `).join("");
    };

    const openProduct = (product) => {
      activeProduct = product;
      productGrid.hidden = true;
      document.querySelector(".menu-results-heading").hidden = true;
      categoryContainer.hidden = true;
      searchInput.closest(".menu-tools").hidden = true;
      productDetail.hidden = false;

      detailCategory.textContent = product.category;
      detailTitle.textContent = product.name;
      detailDescription.textContent = product.description || "";
      detailOptionsTitle.textContent = product.optionsTitle || "Opciones disponibles";

      const options = Array.isArray(product.options) ? product.options : [];
      detailOptionsWrap.hidden = options.length === 0;
      detailOptions.innerHTML = options.map((option) => `
        <article class="detail-option">
          <h5>${escapeHTML(option.name)}</h5>
          <p>${escapeHTML(option.description || "")}</p>
          <span class="product-price">${escapeHTML(option.price || "Precio por confirmar")}</span>
        </article>
      `).join("");

      const extraOptions = document.querySelector("#detail-extra-options");
      const isPasta = product.category === "Pastas";
      const isMeat = product.category === "Carnes";
      extraOptions.innerHTML = "";
      if (isPasta) {
        extraOptions.innerHTML = `
          <section class="choice-section">
            <h4>1. Elige tu salsa</h4>
            <p class="choice-hint">Selecciona la salsa para tu ${escapeHTML(product.name)}.</p>
            <div class="visual-choice-grid sauce-grid">
              ${pastaSauces.map((item) => `<button type="button" class="visual-choice" data-choice-group="salsa" data-choice="${escapeHTML(item.name)}" aria-pressed="false"><img src="${item.image}" alt="Salsa ${escapeHTML(item.name)}" loading="lazy"><span class="visual-choice-name">${escapeHTML(item.name)}</span><span class="visual-choice-description">${escapeHTML(item.description)}</span></button>`).join("")}
            </div>
          </section>
          <section class="choice-section">
            <h4>2. Elige tu carne</h4>
            <p class="choice-hint">Puedes acompañar tu pasta con cualquiera de estos cortes.</p>
            <div class="cut-choice-grid">
              ${meatCuts.map((item) => `<button type="button" class="cut-choice" data-choice-group="carne" data-choice="${escapeHTML(item.name)}" aria-pressed="false">${escapeHTML(item.name)}<span>${escapeHTML(item.price)}</span></button>`).join("")}
            </div>
          </section>
          <p class="selection-note" aria-live="polite">Elige una salsa y un corte para personalizar tu pasta.</p>`;
      } else if (isMeat) {
        extraOptions.innerHTML = `
          <section class="choice-section">
            <h4>Elige el término de cocción</h4>
            <p class="choice-hint">Selecciona cómo prefieres que prepararemos tu carne.</p>
            <div class="visual-choice-grid doneness-grid">
              ${donenessLevels.map((item) => `<button type="button" class="visual-choice doneness-choice" data-choice-group="termino" data-choice="${escapeHTML(item.name)}" aria-pressed="false"><img src="${item.image}" alt="Referencia visual: ${escapeHTML(item.name)}" loading="lazy"><span class="visual-choice-name">${escapeHTML(item.name)}</span><span class="visual-choice-description">${escapeHTML(item.description)}</span></button>`).join("")}
            </div>
            <p class="selection-note" aria-live="polite">Selecciona el término de cocción que prefieras.</p>
          </section>`;
      }
      productDetail.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    productDetail.addEventListener("click", (event) => {
      const choice = event.target.closest("[data-choice-group]");
      if (!choice) return;
      const group = choice.dataset.choiceGroup;
      const wasPressed = choice.getAttribute("aria-pressed") === "true";
      productDetail.querySelectorAll(`[data-choice-group="${group}"]`).forEach((item) => {
        item.setAttribute("aria-pressed", "false");
      });
      if (!wasPressed) choice.setAttribute("aria-pressed", "true");
      const note = productDetail.querySelector(".selection-note");
      if (note) {
        const selected = [...productDetail.querySelectorAll('[data-choice-group][aria-pressed="true"]')]
          .map((item) => `${item.dataset.choiceGroup === "salsa" ? "Salsa" : item.dataset.choiceGroup === "carne" ? "Carne" : "Término"}: ${item.dataset.choice}`);
        note.textContent = selected.length ? `Tu selección: ${selected.join(" · ")}. Los precios indicados corresponden a la carta fotografiada.` : "Puedes seleccionar tus preferencias nuevamente.";
      }
    });

    const closeProduct = () => {
      activeProduct = null;
      productDetail.hidden = true;
      productGrid.hidden = false;
      document.querySelector(".menu-results-heading").hidden = false;
      categoryContainer.hidden = false;
      searchInput.closest(".menu-tools").hidden = false;
      renderProducts();
    };

    categoryContainer.addEventListener("click", (event) => {
      const button = event.target.closest("[data-category]");
      if (!button) return;
      activeCategory = button.dataset.category;
      renderCategories();
      renderProducts();
    });

    productGrid.addEventListener("click", (event) => {
      const button = event.target.closest("[data-product]");
      if (!button) return;
      const product = menuProducts.find((item) => item.name === button.dataset.product);
      if (product) openProduct(product);
    });

    if (detailBack) detailBack.addEventListener("click", closeProduct);
    searchInput.addEventListener("input", renderProducts);

    renderCategories();
    renderProducts();
  }

})();
