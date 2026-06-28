export function initNavigation() {
    // Mapeo de secciones (Constelación -> HTML ID)
    const sections = {
        'inicio': document.getElementById('hero-content'),
        'mecanicas': document.getElementById('grimoire-container'),
        'hechizos': document.getElementById('attribute-selection'),
        'habilidades': document.getElementById('skills-attribute-selection'),
        'fichas': document.getElementById('fichas-container'),
        'inventario': document.getElementById('inventario-container'),
        'runas': document.getElementById('runas-container')
    };

    const btnReturnVoidList = document.querySelectorAll('.btn-return-void');

    function hideAllSections() {
        Object.values(sections).forEach(sec => {
            if (sec) sec.classList.add('hidden');
        });

        // Ocultar también sub-secciones del flujo de hechizos y habilidades
        const schoolSelection = document.getElementById('school-selection');
        const spellsContainer = document.getElementById('spells-container');
        const skillsContainer = document.getElementById('skills-container');
        if (schoolSelection) schoolSelection.classList.add('hidden');
        if (spellsContainer) spellsContainer.classList.add('hidden');
        if (skillsContainer) skillsContainer.classList.add('hidden');
    }

    // Navegación global inyectada para que la usen scene3D.js u otros
    window.navigateTo = function (sectionKey) {
        window.currentSection = sectionKey;
        hideAllSections();

        const targetSection = sections[sectionKey];
        if (targetSection) {
            targetSection.classList.remove('hidden');
        }

        // Si entramos a cualquier sección que no sea el "Inicio" (Nexo 3D),
        // mostramos el botón de retorno.
        if (sectionKey !== 'inicio') {
            btnReturnVoidList.forEach(btn => btn.classList.remove('hidden'));
        } else {
            btnReturnVoidList.forEach(btn => btn.classList.add('hidden'));
        }

        // Interacción de la mascota al navegar
        if (window.azulitoSay) {
            const msgs = {
                'inicio': "¡Brrrrum! ¡De vuelta al Nexo! ¡A ver qué luces brillantes encendemos ahora! ¡Pica, pica!",
                'mecanicas': "¡Pfff, las reglas! Eso es facilísimo. Solo tiras un dado, le sumas tu... eh... agilidad, o era fuerza, y... mmm... ¡Bah! Yo me lo sé de memoria, ¡pero te dejo leerlo a ti para que aprendas!",
                'hechizos': "¡Buum! ¡Pium, pium! ¡Me encantan los hechizos de colores! ¡Pero no me chamusques las escamas, porfi!",
                'habilidades': "¡Fiuuu! Si aprendes las habilidades chulas podrás dar volteretas y hacer el súper-ataque-dragón. ¡O algo parecido!",
                'fichas': "¡Vaya, aquí están las fichas! ¡Puedes leer todos los tomos de creación de personajes o usar el asistente mágico paso a paso!",
                'inventario': "¡Caramba! ¡Aquí tienes todas las armas, armaduras y escudos! ¡Asegúrate de llevar buena armadura para evitar el daño masivo!",
                'runas': "¡Runas! ¡Trazos matemáticos que doblan la realidad! ¿Sabías que si dibujas mal un trazado te puedes quedar sin cejas? ¡Es verdad, yo lo vi!"
            };
            if (msgs[sectionKey]) {
                window.azulitoSay(msgs[sectionKey]);
            }
        }
    };

    // Botón de Retorno al Nexo (Menú Constelación 3D)
    btnReturnVoidList.forEach(btn => {
        if (btn.id !== 'btn-return-schools-to-attributes') {
            btn.addEventListener('click', () => {
                // Animación Warp de vuelta al nexo (origen)
                if (window.triggerWarpReturn) {
                    window.triggerWarpReturn(() => {
                        window.navigateTo('inicio');
                    });
                } else {
                    window.navigateTo('inicio');
                }
            });
        }
    });
}
