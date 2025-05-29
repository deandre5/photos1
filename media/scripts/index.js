document.addEventListener('DOMContentLoaded', () => {
    const closedEnvelopes = document.querySelectorAll('.envelope.closed');
    const clickedEnvelopeIds = new Set();
    const totalClosedEnvelopes = closedEnvelopes.length;

    const proposalModal = document.getElementById('proposalModal');
    const modalPrompt = document.getElementById('modalPrompt');
    const passwordInput = document.getElementById('passwordInput');
    const errorMessage = document.getElementById('errorMessage');
    const submitPasswordButton = document.getElementById('submitPasswordButton');
    const closeModalButton = document.getElementById('closeModalButton');
    const mobileActivateButton = document.getElementById('mobileActivateButton'); // <-- Nuevo: Referencia al botón móvil

    const easterEggText = "Este es solo el comienzo de una aventura. Quería darte un adelanto de mi propuesta. Aún no sé el lugar o la fecha, ¡pero sé que quiero compartir mi vida contigo!";
    const correctPassword = "29";

    closedEnvelopes.forEach(envelope => {
        envelope.addEventListener('click', () => {
            const envelopeId = envelope.dataset.envelopeId;
            if (envelopeId) {
                clickedEnvelopeIds.add(envelopeId);
                envelope.classList.add('clicked');

                // Si todos los sobres están clicados, muestra el botón para móviles
                if (clickedEnvelopeIds.size === totalClosedEnvelopes) {
                    mobileActivateButton.classList.add('show-mobile-button');
                }
            }
        });
    });

    // Añadir event listener para la tecla 'Enter' (para escritorio)
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            handleActivation(); // Reutiliza la lógica de activación
        }
    });

    // Añadir event listener para el botón de activación móvil
    mobileActivateButton.addEventListener('click', () => {
        handleActivation(); // Reutiliza la lógica de activación
    });

    // Función para manejar la activación del modal (ya sea por Enter o botón móvil)
    function handleActivation() {
        // Si el modal de la contraseña ya está visible, intentar enviar la contraseña
        if (proposalModal.classList.contains('show') && passwordInput.value) {
            submitPasswordButton.click();
            return;
        }

        // Verificar si todos los sobres cerrados han sido clicados
        if (clickedEnvelopeIds.size === totalClosedEnvelopes) {
            modalPrompt.textContent = "¡Introduce la contraseña para revelar el mensaje!";
            passwordInput.value = '';
            errorMessage.classList.add('hidden');
            proposalModal.classList.add('show');
            passwordInput.focus();
            // Ocultar el botón móvil una vez que el modal se muestra
            mobileActivateButton.classList.remove('show-mobile-button');
        } else {
            console.log(`Faltan ${totalClosedEnvelopes - clickedEnvelopeIds.size} sobres por clicar.`);
        }
    }

    submitPasswordButton.addEventListener('click', () => {
        if (passwordInput.value === correctPassword) {
            modalPrompt.textContent = easterEggText;
            passwordInput.classList.add('hidden');
            submitPasswordButton.classList.add('hidden');
            errorMessage.classList.add('hidden');
            closeModalButton.textContent = "¡Qué emoción!";
        } else {
            errorMessage.classList.remove('hidden');
            passwordInput.value = '';
            passwordInput.focus();
        }
    });

    closeModalButton.addEventListener('click', () => {
        proposalModal.classList.remove('show');
        passwordInput.classList.remove('hidden');
        submitPasswordButton.classList.remove('hidden');
        closeModalButton.textContent = "Cerrar";
        clickedEnvelopeIds.clear();
        closedEnvelopes.forEach(envelope => {
            envelope.classList.remove('clicked');
        });
        // Asegúrate de ocultar el botón móvil al cerrar el modal y resetear
        mobileActivateButton.classList.remove('show-mobile-button');
    });

    proposalModal.addEventListener('click', (event) => {
        if (event.target === proposalModal) {
            proposalModal.classList.remove('show');
            passwordInput.classList.remove('hidden');
            submitPasswordButton.classList.remove('hidden');
            closeModalButton.textContent = "Cerrar";
            clickedEnvelopeIds.clear();
            closedEnvelopes.forEach(envelope => {
                envelope.classList.remove('clicked');
            });
            // Asegúrate de ocultar el botón móvil al cerrar el modal y resetear
            mobileActivateButton.classList.remove('show-mobile-button');
        }
    });
});