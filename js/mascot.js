document.addEventListener('DOMContentLoaded', () => {
    const azulitoImg = document.getElementById('azulito-img');
    const tooltip = document.getElementById('azulito-tooltip');
    const messageEl = document.getElementById('azulito-message');

    if (!azulitoImg || !tooltip || !messageEl) return;

    let hideTooltipTimeout = null;

    window.azulitoSay = function (message, duration = 4000) {
        messageEl.textContent = message;
        tooltip.classList.remove('hidden');
        azulitoImg.src = 'assets/Azulito_Talk.png'; // Abrir la boca

        if (hideTooltipTimeout) clearTimeout(hideTooltipTimeout);
        hideTooltipTimeout = setTimeout(() => {
            tooltip.classList.add('hidden');
            azulitoImg.src = 'assets/Azulito_.png'; // Cerrar la boca
        }, duration);
    };

    const greetings = [
        "¡Has venido! ¿Echabas de menos este sitio? A mi me encanta, tan lleno de estrellas mágicas, de puntos mágicos, de... ¡Magia!",
        "Uy, hola. ¿Qué se te ha olvidado? Yo no he encontrado ningún reloj perdido... No he visto ningún reloj perdido por aquí.",
        "Brilla. No brilla. Brilla. No brilla... ¡Ah! ¡Hola! ¿Necesita ayuda?",
        "¡Hola! ¡Bienvenido al Nexo!"
    ]

    // Saludo inicial
    setTimeout(() => {
        window.azulitoSay(greetings[Math.floor(Math.random() * greetings.length)]);
    }, 1000);
});
