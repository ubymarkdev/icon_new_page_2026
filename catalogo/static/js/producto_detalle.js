(function () {
    function attachSwipeNavigation(container, onSwipeLeft, onSwipeRight, options) {
        if (!container || typeof onSwipeLeft !== 'function' || typeof onSwipeRight !== 'function') return;

        const config = Object.assign(
            {
                minDistance: 45,
                maxVerticalRatio: 1.2,
            },
            options || {}
        );

        let startX = 0;
        let startY = 0;
        let isTouching = false;

        container.addEventListener(
            'touchstart',
            function (event) {
                if (!event.touches || event.touches.length !== 1) return;
                isTouching = true;
                startX = event.touches[0].clientX;
                startY = event.touches[0].clientY;
            },
            { passive: true }
        );

        container.addEventListener(
            'touchend',
            function (event) {
                if (!isTouching || !event.changedTouches || event.changedTouches.length !== 1) return;
                isTouching = false;

                const endX = event.changedTouches[0].clientX;
                const endY = event.changedTouches[0].clientY;
                const deltaX = endX - startX;
                const deltaY = endY - startY;

                if (Math.abs(deltaX) < config.minDistance) return;
                if (Math.abs(deltaX) <= Math.abs(deltaY) * config.maxVerticalRatio) return;

                if (deltaX < 0) {
                    onSwipeLeft();
                } else {
                    onSwipeRight();
                }
            },
            { passive: true }
        );
    }

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
    attachSwipeNavigation(gallery, next, prev);

    goTo(0);
})();
