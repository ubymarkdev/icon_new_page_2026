(function () {
    const gallery = document.querySelector('[data-galeria]');
    if (!gallery) return;

    const track = gallery.querySelector('[data-track]');
    const slides = Array.from(gallery.querySelectorAll('.galeria_slide'));
    const prevBtn = gallery.querySelector('[data-prev]');
    const nextBtn = gallery.querySelector('[data-next]');

    if (!track || slides.length === 0) return;

    let index = 0;

    function normalize(i) {
        return (i + slides.length) % slides.length;
    }

    function goTo(i) {
        index = normalize(i);
        track.style.transform = `translateX(-${index * 100}%)`;
    }

    function next() {
        goTo(index + 1);
    }

    function prev() {
        goTo(index - 1);
    }

    if (prevBtn) prevBtn.addEventListener('click', prev);
    if (nextBtn) nextBtn.addEventListener('click', next);

    goTo(0);
})();
