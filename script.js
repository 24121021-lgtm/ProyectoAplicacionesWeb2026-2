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
    {
      name: "Spaghetti",
      category: "Pastas",
      description: "Elige el corte de carne brasilera para acompañar tu pasta.",
      price: "",
      optionsTitle: "Elige tu acompañamiento",
      options: []
    },
    {
      name: "Fetuccini",
      category: "Pastas",
      description: "Elige el corte de carne brasilera para acompañar tu pasta.",
      price: "",
      optionsTitle: "Elige tu acompañamiento",
      options: []
    },
    {
      name: "Sopas",
      category: "Sopas",
      description: "Selecciona para ver los platos de sopa disponibles.",
      price: "",
      optionsTitle: "Platos de sopa",
      options: [
        { name: "Sopa de la casa", description: "Reemplaza por el nombre y la descripción de la sopa real.", price: "Precio por confirmar" },
        { name: "Otra sopa", description: "Agrega aquí otra sopa que figure en la carta.", price: "Precio por confirmar" }
      ]
    },
    {
      name: "Ensaladas",
      category: "Ensaladas",
      description: "Consulta las ensaladas disponibles.",
      price: "",
      optionsTitle: "Ensaladas disponibles",
      options: [
        { name: "Ensalada de la casa", description: "Reemplaza por los ingredientes reales.", price: "Precio por confirmar" },
        { name: "Otra ensalada", description: "Agrega aquí otra ensalada del restaurante.", price: "Precio por confirmar" }
      ]
    },
    {
      name: "Piqueos",
      category: "Piqueos",
      description: "Selecciona para consultar los piqueos disponibles.",
      price: "",
      optionsTitle: "Piqueos disponibles",
      options: [
        { name: "Piqueo de la casa", description: "Reemplaza por el contenido real del piqueo.", price: "Precio por confirmar" },
        { name: "Piqueo para compartir", description: "Agrega aquí otra opción de piqueo.", price: "Precio por confirmar" }
      ]
    },
    {
      name: "Platos de casa",
      category: "Platos de casa",
      description: "Explora los platos propios de Salvaje Restobar.",
      price: "",
      optionsTitle: "Platos de casa",
      options: [
        { name: "Especialidad de la casa", description: "Reemplaza por el nombre y descripción del plato real.", price: "Precio por confirmar" },
        { name: "Otro plato de casa", description: "Agrega aquí otra especialidad.", price: "Precio por confirmar" }
      ]
    },
    {
      name: "Carnes",
      category: "Carnes",
      description: "Elige tu corte brasilero o una combinación parrillera.",
      price: "",
      optionsTitle: "Cortes y combinaciones parrilleras",
      options: [
        { name: "Churrasco brasilero", description: "Corte de carne a la parrilla.", price: "Precio por confirmar" },
        { name: "Asado de Tira brasilero", description: "Asado de tira preparado a la parrilla.", price: "Precio por confirmar" },
        { name: "Lomo fino brasilero", description: "Lomo fino preparado a la parrilla.", price: "Precio por confirmar" },
        { name: "Bife brasilero", description: "Bife preparado a la parrilla.", price: "Precio por confirmar" },
        { name: "Picaña brasilero", description: "Picaña preparada a la parrilla.", price: "Precio por confirmar" },
        { name: "Dúo parrillero", description: "Combinación de dos cortes de carne. Confirma los cortes incluidos.", price: "Precio por confirmar" },
        { name: "Trío parrillero", description: "Combinación de tres cortes de carne. Confirma los cortes incluidos.", price: "Precio por confirmar" }
      ]
    },
    {
      name: "Alitas",
      category: "Alitas",
      description: "Elige la presentación que prefieras.",
      price: "",
      optionsTitle: "Presentaciones",
      options: [
        { name: "6 unidades", description: "Porción de 6 alitas.", price: "Precio por confirmar" },
        { name: "10 unidades", description: "Porción de 10 alitas.", price: "Precio por confirmar" }
      ]
    },
    {
      name: "Filete de pollo",
      category: "Pollo",
      description: "Consulta las presentaciones y acompañamientos del filete de pollo.",
      price: "",
      optionsTitle: "Opciones de filete de pollo",
      options: [
        { name: "Filete de pollo", description: "Agrega aquí la descripción y los acompañamientos reales.", price: "Precio por confirmar" }
      ]
    }
  ];

  const pastaSauces = [
    { name: "Al pesto", description: "Salsa verde aromática a base de albahaca.", image: "imagen/salsa_pesto.jpg" },
    { name: "A lo Alfredo", description: "Salsa cremosa estilo Alfredo.", image: "imagen/salsa_alfredo.jpg" },
    { name: "Huancaína", description: "Salsa cremosa de ají amarillo.", image: "imagen/salsa_huancaina.jpg" }
  ];
  const meatCuts = ["Churrasco brasilero", "Asado de Tira brasilero", "Lomo fino brasilero", "Bife brasilero", "Picaña brasilero"];
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
              ${meatCuts.map((name) => `<button type="button" class="cut-choice" data-choice-group="carne" data-choice="${escapeHTML(name)}" aria-pressed="false">${escapeHTML(name)}<span>Precio por confirmar</span></button>`).join("")}
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
        note.textContent = selected.length ? `Tu selección: ${selected.join(" · ")}. Los precios se confirmarán en la carta final.` : "Puedes seleccionar tus preferencias nuevamente.";
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
