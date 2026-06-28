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
        if (window.azulitoSay && window.MascotSpeeches && window.MascotSpeeches.navigation) {
            const msgs = window.MascotSpeeches.navigation;
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
