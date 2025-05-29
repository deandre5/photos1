// Espera a que el DOM esté completamente cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', function () {
    // --- Lógica del Carrusel de Imágenes ---
    const carouselImagesContainer = document.querySelector('.carousel-images');
    const images = carouselImagesContainer.querySelectorAll('img');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const carouselDotsContainer = document.getElementById('carouselDots');

    let currentIndex = 0;
    let autoSlideInterval;
    const slideIntervalTime = 3000; // 3 segundos para el auto-deslizamiento

    /**
     * Muestra la imagen en el índice especificado y actualiza los puntos de paginación.
     * @param {number} index El índice de la imagen a mostrar.
     */
    function showImage(index) {
        // Oculta todas las imágenes y remueve la clase 'active'
        images.forEach((img, i) => {
            img.classList.remove('active');
            // Remueve la clase 'active' de los puntos de paginación
            if (carouselDotsContainer.children[i]) {
                carouselDotsContainer.children[i].classList.remove('active');
            }
        });

        // Asegura que el índice esté dentro de los límites
        if (index >= images.length) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = images.length - 1;
        } else {
            currentIndex = index;
        }

        // Muestra la imagen actual y añade la clase 'active'
        images[currentIndex].classList.add('active');
        // Añade la clase 'active' al punto de paginación correspondiente
        if (carouselDotsContainer.children[currentIndex]) {
            carouselDotsContainer.children[currentIndex].classList.add('active');
        }
    }

    /**
     * Avanza a la siguiente imagen en el carrusel.
     */
    function nextImage() {
        showImage(currentIndex + 1);
    }

    /**
     * Retrocede a la imagen anterior en el carrusel.
     */
    function prevImage() {
        showImage(currentIndex - 1);
    }

    /**
     * Inicia el auto-deslizamiento del carrusel.
     */
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextImage, slideIntervalTime);
    }

    /**
     * Detiene el auto-deslizamiento del carrusel.
     */
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Genera los puntos de paginación dinámicamente
    images.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        dot.addEventListener('click', () => {
            stopAutoSlide(); // Detiene el auto-deslizamiento al hacer clic en un punto
            showImage(i);
            startAutoSlide(); // Reinicia el auto-deslizamiento
        });
        carouselDotsContainer.appendChild(dot);
    });

    // Event listeners para los botones de navegación
    prevBtn.addEventListener('click', () => {
        stopAutoSlide(); // Detiene el auto-deslizamiento al hacer clic
        prevImage();
        startAutoSlide(); // Reinicia el auto-deslizamiento
    });

    nextBtn.addEventListener('click', () => {
        stopAutoSlide(); // Detiene el auto-deslizamiento al hacer clic
        nextImage();
        startAutoSlide(); // Reinicia el auto-deslizamiento
    });

    // Muestra la primera imagen al cargar y comienza el auto-deslizamiento
    showImage(currentIndex);
    startAutoSlide();
});