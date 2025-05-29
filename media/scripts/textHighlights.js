/**
 * Envuelve caracteres específicos dentro de un texto con una etiqueta <span>
 * que tiene la clase 'highlight-char'.
 *
 * @param {string} text El texto a procesar.
 * @param {string} charactersToHighlight Una cadena con los caracteres que se deben resaltar (ej: "SA" o "XYZ").
 * @returns {string} El texto con los caracteres envueltos en <span>.
 */
function wrapCharacters(text, charactersToHighlight) {
    // Escapar caracteres especiales para usar en una expresión regular
    const escapedChars = charactersToHighlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // Crea una expresión regular global e insensible a mayúsculas/minúsculas
    const regex = new RegExp(`([${escapedChars}])`, 'gi');
    return text.replace(regex, '<span class="highlight-char">$1</span>');
}

/**
 * Inicializa el efecto de brillo para caracteres específicos en un contenedor.
 *
 * @param {string} containerId El ID del elemento contenedor cuyo texto será procesado (ej: 'letterTextOverlay').
 * @param {string} charactersToHighlight Una cadena con los caracteres que se deben resaltar.
 * @param {number} glowDelay El retraso en milisegundos antes de aplicar el efecto de brillo.
 * @param {number} finalMessageDelay El retraso en milisegundos antes de mostrar el mensaje final.
 * @param {string} finalMessage La palabra final a mostrar.
 */
function initializeCharacterHighlighting(containerId, charactersToHighlight, glowDelay, finalMessageDelay, finalMessage) {
    const letterTextOverlay = document.getElementById(containerId);
    if (!letterTextOverlay) {
        console.error(`Contenedor con ID '${containerId}' no encontrado.`);
        return;
    }

    const paragraphs = letterTextOverlay.querySelectorAll('p');

    // Envuelve los caracteres iniciales
    paragraphs.forEach(p => {
        p.innerHTML = wrapCharacters(p.innerHTML, charactersToHighlight);
    });

    // Establece un temporizador para añadir el efecto de brillo
    setTimeout(() => {
        const highlightChars = document.querySelectorAll(`#${containerId} .highlight-char`);
        highlightChars.forEach(char => {
            char.classList.add('glow-effect');
        });
    }, glowDelay);

    // Establece un temporizador para modificar el texto con el mensaje final
    setTimeout(() => {
        letterTextOverlay.innerHTML = ''; // Limpia el contenido existente

        const finalLettersContainer = document.createElement('div');
        finalLettersContainer.style.cssText = `
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            font-size: 8rem;
            font-weight: bold;
            color: #3a3a3a;
            gap: 40px;
        `; // Usamos cssText para aplicar múltiples estilos de forma concisa

        const span = document.createElement('span'); // Cambié 'Span' a 'span' para seguir convenciones
        span.textContent = finalMessage; // Usa la variable `finalMessage`

        finalLettersContainer.appendChild(span);
        letterTextOverlay.appendChild(finalLettersContainer);

        // Asegura que el contenedor principal también sea flex para centrar
        letterTextOverlay.style.display = 'flex';
        letterTextOverlay.style.justifyContent = 'center';
        letterTextOverlay.style.alignItems = 'center';

    }, finalMessageDelay);
}