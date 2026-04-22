const track = document.querySelector(".slider_track");
const slides = document.querySelectorAll(".slide");
const btnNext = document.querySelector(".boton_avanzar");
const btnPrev = document.querySelector(".boton_retroceder");
const productos = document.querySelectorAll(".producto");
const descripciones = document.querySelectorAll(".cont_descripcion");
const dotsContainer = document.querySelector("[data-catalogo-dots]");

let indice = 0;
let direccion = 1;
const categorias = Array.from(slides).map((slide) => slide.dataset.categoria);
let dots = [];

function renderDots() {
    if (!dotsContainer || slides.length === 0) return;

    dotsContainer.innerHTML = "";
    dots = Array.from(slides).map((_, index) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "catalogo_dot";
        dot.setAttribute("aria-label", `Ir a categoría ${index + 1}`);
        dot.addEventListener("click", () => {
            direccion = index > indice ? 1 : -1;
            indice = index;
            actualizarSlider();
        });
        dotsContainer.appendChild(dot);
        return dot;
    });
}

function actualizarDots() {
    dots.forEach((dot, i) => {
        dot.classList.toggle("is-active", i === indice);
    });
}

function actualizarSlider() {
    pintarEstadoSlides();
    filtrarProductos();
    filtrarDescripcion();
    actualizarDots();
}

if (btnNext) {
    btnNext.addEventListener("click", () => {
        direccion = 1;
        indice = (indice + 1) % slides.length;
        actualizarSlider();
    });
}

if (btnPrev) {
    btnPrev.addEventListener("click", () => {
        direccion = -1;
        indice = (indice - 1 + slides.length) % slides.length;
        actualizarSlider();
    });
}

function filtrarProductos() {
    const categoriaActiva = categorias[indice];
    let visibleIndex = 0;

    productos.forEach(producto => {
        if (producto.dataset.categoria === categoriaActiva) {
            producto.style.display = "block";
            producto.classList.remove("is-hidden", "is-visible");
            producto.style.animationDelay = `${visibleIndex * 140}ms`;
            void producto.offsetWidth;
            producto.classList.add("is-visible");
            visibleIndex += 1;
        } else {
            producto.style.display = "none";
            producto.classList.remove("is-visible");
            producto.classList.add("is-hidden");
            producto.style.animationDelay = "0ms";
        }
    });
}

function pintarEstadoSlides() {
    const anterior = (indice - 1 + slides.length) % slides.length;
    const siguiente = (indice + 1) % slides.length;

    slides.forEach((slide, i) => {
        slide.classList.remove(
            "is-active",
            "is-side",
            "is-prev",
            "is-next",
            "is-hidden",
            "enter-from-left",
            "enter-from-right"
        );

        if (i === indice) {
            slide.classList.add("is-active");
            slide.classList.add(direccion === 1 ? "enter-from-right" : "enter-from-left");
        } else if (i === anterior) {
            slide.classList.add("is-side", "is-prev");
        } else if (i === siguiente) {
            slide.classList.add("is-side", "is-next");
        } else {
            slide.classList.add("is-hidden");
        }
    });
}

function filtrarDescripcion() {
    const categoriaActiva = categorias[indice];

    descripciones.forEach((descripcion) => {
        if (descripcion.dataset.categoria === categoriaActiva) {
            descripcion.style.display = "block";
        } else {
            descripcion.style.display = "none";
        }
    });
}

if (slides.length > 0) {
    renderDots();
    actualizarSlider();
}
