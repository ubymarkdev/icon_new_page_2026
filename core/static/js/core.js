//función del fondo con movimiento al hacer scroll Dekton
(function () {
    function clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }

    function parseNumber(value, fallback) {
        const parsed = Number(value);
        return Number.isFinite(parsed) ? parsed : fallback;
    }

    function initParallaxEffect(options) {
        const selector = options && options.selector ? options.selector : '';
        if (!selector) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const sections = Array.from(document.querySelectorAll(selector));
        if (sections.length === 0) return;

        const fallbackCssVar = (options && options.cssVar) || '--marble-offset';
        const fallbackSpeed = parseNumber(options && options.speed, 0.45);
        const fallbackMaxShift = parseNumber(options && options.maxShift, 220);
        const fallbackAxis = (options && options.axis) || 'y';

        const instances = sections.map(function (section) {
            const axis = section.dataset.parallaxAxis || fallbackAxis;
            return {
                section,
                axis: axis === 'x' ? 'x' : 'y',
                cssVar: section.dataset.parallaxVar || fallbackCssVar,
                speed: parseNumber(section.dataset.parallaxSpeed, fallbackSpeed),
                maxShift: parseNumber(section.dataset.parallaxMax, fallbackMaxShift),
            };
        });

        let ticking = false;

        function update() {
            instances.forEach(function (instance) {
                const rect = instance.section.getBoundingClientRect();
                const anchor = instance.axis === 'x' ? rect.left : rect.top;
                const rawOffset = -anchor * instance.speed;
                const offset = clamp(rawOffset, -instance.maxShift, instance.maxShift);
                instance.section.style.setProperty(instance.cssVar, `${offset}px`);
            });
            ticking = false;
        }

        function onScroll() {
            if (ticking) return;
            ticking = true;
            window.requestAnimationFrame(update);
        }

        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
    }

    function initMarbleParallax() {
        initParallaxEffect({
            selector: '.identidad_icon, [data-parallax-section]',
            cssVar: '--marble-offset',
            speed: 0.45,
            maxShift: 220,
            axis: 'y',
        });
    }

    function initSlider(slider) {
        const track = slider.querySelector('[data-track]');
        const slides = Array.from(slider.querySelectorAll('.slide_slide'));
        const prevBtn = slider.querySelector('[data-prev]');
        const nextBtn = slider.querySelector('[data-next]');

        if (!track || slides.length === 0) return;

        let currentIndex = 0;
        let autoplayId = null;
        const autoplayDelay = 5000;

        function normalize(index) {
            return (index + slides.length) % slides.length;
        }

        function goTo(index) {
            currentIndex = normalize(index);
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        function next() {
            goTo(currentIndex + 1);
        }

        function prev() {
            goTo(currentIndex - 1);
        }

        function startAutoplay() {
            if (slides.length <= 1 || autoplayId) return;
            autoplayId = setInterval(next, autoplayDelay);
        }

        function stopAutoplay() {
            if (!autoplayId) return;
            clearInterval(autoplayId);
            autoplayId = null;
        }

        if (nextBtn) nextBtn.addEventListener('click', next);
        if (prevBtn) prevBtn.addEventListener('click', prev);

        slider.addEventListener('mouseenter', stopAutoplay);
        slider.addEventListener('mouseleave', startAutoplay);
        slider.addEventListener('focusin', stopAutoplay);
        slider.addEventListener('focusout', startAutoplay);

        window.addEventListener('resize', function () {
            goTo(currentIndex);
        });

        goTo(0);
        startAutoplay();
    }

    function initClientsSlider(section) {
        const track = section.querySelector('[data-client-track]');
        const viewport = section.querySelector('.clientes_viewport');
        const prevBtn = section.querySelector('[data-client-prev]');
        const nextBtn = section.querySelector('[data-client-next]');
        const baseCards = Array.from(section.querySelectorAll('.cliente_card'));

        if (!track || baseCards.length === 0) return;

        baseCards.forEach(function (card, index) {
            card.setAttribute('data-client-index', String(index));
        });

        const cardCount = baseCards.length;
        const cloneCount = Math.min(3, cardCount);

        if (cardCount > 1) {
            const prefixClones = baseCards.slice(-cloneCount).map(function (card) {
                const clone = card.cloneNode(true);
                clone.classList.add('is-clone');
                return clone;
            });

            const suffixClones = baseCards.slice(0, cloneCount).map(function (card) {
                const clone = card.cloneNode(true);
                clone.classList.add('is-clone');
                return clone;
            });

            prefixClones.reverse().forEach(function (clone) {
                track.insertBefore(clone, track.firstChild);
            });

            suffixClones.forEach(function (clone) {
                track.appendChild(clone);
            });
        }

        const renderedCards = Array.from(track.querySelectorAll('.cliente_card'));

        let logicalIndex = 0;
        let physicalIndex = cardCount > 1 ? cloneCount : 0;
        let isTransitioning = false;
        let autoplayId = null;
        const autoplayDelay = 3000;
        let bgShift = 0;
        const bgStep = 20;
        const bgMax = 88;

        function getPerView() {
            if (window.innerWidth <= 900) return 1;
            return 3;
        }

        function getCenterSlot(perView) {
            return Math.floor(perView / 2);
        }

        function setFeaturedCard(physicalIndex) {
            renderedCards.forEach(function (card) {
                card.classList.remove('is-featured');
            });

            const featuredCard = renderedCards[physicalIndex];
            if (featuredCard) {
                featuredCard.classList.add('is-featured');
            }
        }

        function updatePosition(animate) {
            const perView = getPerView();
            const centerSlot = getCenterSlot(perView);

            renderedCards.forEach(function (card) {
                card.style.flexBasis = `${100 / perView}%`;
            });

            const step = renderedCards[physicalIndex]
                ? renderedCards[physicalIndex].getBoundingClientRect().width
                : (viewport ? viewport.getBoundingClientRect().width / perView : 0);
            const targetTransform = `translateX(-${(physicalIndex - centerSlot) * step}px)`;

            if (!animate) {
                track.style.transition = 'none';
                track.style.transform = targetTransform;
                track.offsetHeight;
                track.style.transition = '';
            } else {
                track.style.transform = targetTransform;
            }

            setFeaturedCard(physicalIndex);
        }

        function moveBackground(direction) {
            bgShift += direction * bgStep;
            bgShift = Math.max(-bgMax, Math.min(bgMax, bgShift));
            section.style.setProperty('--clientes-bg-shift', `${bgShift}px`);
        }

        function next() {
            if (isTransitioning || cardCount <= 1) return;
            isTransitioning = true;
            logicalIndex += 1;
            physicalIndex += 1;
            moveBackground(1);
            updatePosition(true);
        }

        function prev() {
            if (isTransitioning || cardCount <= 1) return;
            isTransitioning = true;
            logicalIndex -= 1;
            physicalIndex -= 1;
            moveBackground(-1);
            updatePosition(true);
        }

        function onTransitionEnd(event) {
            if (event.propertyName !== 'transform') return;

            if (cardCount > 1 && physicalIndex >= cloneCount + cardCount) {
                physicalIndex -= cardCount;
                logicalIndex = ((logicalIndex % cardCount) + cardCount) % cardCount;
                updatePosition(false);
            } else if (cardCount > 1 && physicalIndex < cloneCount) {
                physicalIndex += cardCount;
                logicalIndex = ((logicalIndex % cardCount) + cardCount) % cardCount;
                updatePosition(false);
            }

            isTransitioning = false;
        }

        function startAutoplay() {
            if (cardCount <= 1 || autoplayId) return;
            autoplayId = setInterval(next, autoplayDelay);
        }

        function stopAutoplay() {
            if (!autoplayId) return;
            clearInterval(autoplayId);
            autoplayId = null;
        }

        if (nextBtn) nextBtn.addEventListener('click', next);
        if (prevBtn) prevBtn.addEventListener('click', prev);
        track.addEventListener('transitionend', onTransitionEnd);

        section.addEventListener('mouseenter', stopAutoplay);
        section.addEventListener('mouseleave', startAutoplay);
        section.addEventListener('focusin', stopAutoplay);
        section.addEventListener('focusout', startAutoplay);

        window.addEventListener('resize', function () {
            updatePosition(false);
            stopAutoplay();
            startAutoplay();
        });

        updatePosition(false);
        startAutoplay();
    }

    document.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('[data-slider]').forEach(initSlider);
        document.querySelectorAll('[data-client-slider]').forEach(initClientsSlider);
        initMarbleParallax();
    });
})();
