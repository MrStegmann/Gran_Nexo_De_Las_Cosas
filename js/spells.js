document.addEventListener('DOMContentLoaded', () => {
    const linkHechizos = document.getElementById('link-hechizos');
    const heroContent = document.getElementById('hero-content');
    const grimoireContainer = document.getElementById('grimoire-container');
    const attributeSelection = document.getElementById('attribute-selection');
    const schoolSelection = document.getElementById('school-selection');
    const schoolSelectionGrid = document.getElementById('school-selection-grid');
    const spellsContainer = document.getElementById('spells-container');

    const spellsGrid = document.getElementById('spells-grid');
    const schoolTitle = document.getElementById('spell-school-title');
    const searchInput = document.getElementById('spell-search');
    const filterBtns = document.querySelectorAll('.spell-filter-btn');

    let currentSpells = [];
    let activeFilters = new Set();

    const schoolsData = {
        intellect: [
            { id: 'arcane', name: 'Arcano', theme: 'theme-arcane', file: 'js/meta/arcane.json' },
            { id: 'fel', name: 'Vil', theme: 'theme-fel', file: 'js/meta/fel.json' },
            { id: 'nature', name: 'Naturaleza', theme: 'theme-nature', file: 'js/meta/nature.json' },
            { id: 'shadow', name: 'Sombras', theme: 'theme-shadow', file: 'js/meta/shadow.json' },
            { id: 'necro', name: 'Nigromancia', theme: 'theme-necro', file: 'js/meta/necromance.json' }
        ],
        willpower: [
            { id: 'elune', name: 'Elune', theme: 'theme-elune', file: 'js/meta/elune.json' },
            { id: 'holy', name: 'Luz Sagrada', theme: 'theme-holy', file: 'js/meta/holy_light.json' },
            { id: 'elemental', name: 'Elemental', theme: 'theme-elemental', file: 'js/meta/elemental.json' },
            { id: 'chi', name: 'Chi', theme: 'theme-chi', file: 'js/meta/chi.json' }
        ]
    };

    // Exponer al scope global para que los scripts 3D puedan leerlo
    window.schoolsData = schoolsData;
    window.currentAttribute = null;

    // 1. Mostrar Selección de Atributo
    if (linkHechizos) {
        linkHechizos.addEventListener('click', (e) => {
            e.preventDefault();
            hideAllViews();
            attributeSelection.classList.remove('hidden');

            document.querySelectorAll('#main-nav a').forEach(a => a.classList.remove('active'));
            linkHechizos.classList.add('active');
        });
    }

    window.triggerReturnToAttributes = function () {
        hideAllViews();
        if (window.hideSchoolsFlow) window.hideSchoolsFlow();
        attributeSelection.classList.remove('hidden');
    };

    // 2. Mostrar Selección de Escuela
    document.getElementById('btn-intellect')?.addEventListener('click', () => loadSchools('intellect'));
    document.getElementById('btn-willpower')?.addEventListener('click', () => loadSchools('willpower'));

    window.triggerLoadSchools = loadSchools;

    const btnReturnSchools = document.getElementById('btn-return-schools');
    if (btnReturnSchools) {
        btnReturnSchools.addEventListener('click', () => {
            const doReturn = () => {
                if (window.currentAttribute) {
                    loadSchools(window.currentAttribute);
                } else {
                    window.triggerReturnToAttributes();
                }
            };

            if (window.triggerWarpReturn) {
                window.triggerWarpReturn(doReturn);
            } else {
                doReturn();
            }
        });
    }

    const btnReturnSchoolsToAttributes = document.getElementById('btn-return-schools-to-attributes');
    if (btnReturnSchoolsToAttributes) {
        btnReturnSchoolsToAttributes.addEventListener('click', () => {
            if (window.triggerReturnToAttributes) {
                window.triggerReturnToAttributes();
            }
        });
    }

    function loadSchools(attribute) {
        hideAllViews();
        schoolSelection.classList.remove('hidden');
        window.currentAttribute = attribute;

        // Disparar la transición 3D (MagicFlow)
        if (window.buildSchoolsFlow) {
            window.buildSchoolsFlow(attribute);
        }
        schoolSelectionGrid.innerHTML = '';

        const schools = schoolsData[attribute];
        schools.forEach(school => {
            const card = document.createElement('div');
            card.className = 'portal-card';
            card.style.setProperty('--theme-color', `var(--${school.theme})`);
            card.innerHTML = `<h2>${school.name}</h2>`;

            card.addEventListener('click', () => loadSpells(school));

            schoolSelectionGrid.appendChild(card);
        });
    }

    // 3. Mostrar Hechizos de la Escuela Elegida
    async function loadSpells(school) {
        hideAllViews();
        spellsContainer.classList.remove('hidden');

        // Limpiar la visualización de escuelas 3D al cargar el grimorio
        if (window.hideSchoolsFlow) {
            window.hideSchoolsFlow();
        }

        schoolTitle.textContent = school.name;
        spellsContainer.style.setProperty('--theme-color', `var(--${school.theme})`);

        searchInput.value = '';
        activeFilters.clear();
        updateFilterButtons();

        spellsGrid.innerHTML = '<p style="color:var(--text-muted); text-align:center; grid-column: 1 / -1;">Canalizando energía mágica...</p>';
        currentSpells = [];

        try {
            const response = await fetch(school.file);
            if (!response.ok) throw new Error();
            
            const text = await response.text();
            if (!text.trim()) throw new Error();
            
            const data = JSON.parse(text);
            if (!data || (Array.isArray(data) && data.length === 0)) throw new Error();

            currentSpells = data;
            applyFiltersAndRender();
        } catch (error) {
            spellsGrid.innerHTML = `<div style="text-align:center; grid-column: 1 / -1; padding: 50px; display: flex; flex-direction: column; align-items: center;">
                <img src="assets/Azulito_Confused.png" alt="Azulito Confundido" style="max-width: 150px; margin-bottom: 20px; filter: drop-shadow(0 0 10px rgba(0,200,255,0.3));" />
                <h2 style="color: var(--theme-color);">Próximamente</h2>
                <p style="color: var(--text-muted);">No se ha recopilado ningún hechizo de magia ${school.name}. Estarán próximamente disponibles.</p>
                <p style="color: var(--text-muted); font-size: 0.9em; margin-top: 10px;">${error.message ? error.message : ''}</p>
            </div>`;
        }
    }

    // Exponer para invocar desde los nodos 3D
    window.triggerLoadSpells = loadSpells;

    // 4. Lógica de Filtros
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterName = btn.getAttribute('data-filter');
            if (activeFilters.has(filterName)) {
                activeFilters.delete(filterName);
            } else {
                activeFilters.add(filterName);
            }
            updateFilterButtons();
            applyFiltersAndRender();
        });
    });

    searchInput.addEventListener('input', () => {
        applyFiltersAndRender();
    });

    function updateFilterButtons() {
        filterBtns.forEach(b => {
            const filterName = b.getAttribute('data-filter');
            if (activeFilters.has(filterName)) {
                b.classList.add('active');
            } else {
                b.classList.remove('active');
            }
        });
    }

    function applyFiltersAndRender() {
        const query = searchInput.value.toLowerCase();

        let filtered = currentSpells;

        // Filtrado por categoría múltiple
        if (activeFilters.size > 0) {
            filtered = filtered.filter(spell => {
                const type = (spell['Tipo de hechizo'] || spell.Tipo || '').toLowerCase();
                let spellCategory = 'Otros';

                if (type.includes('truco')) spellCategory = 'Trucos';
                else if (type.includes('rápido') || type.includes('rapido')) spellCategory = 'Rápidos';
                else if (type.includes('básico') || type.includes('basico')) spellCategory = 'Básicos';
                else if (type.includes('potente')) spellCategory = 'Potentes';

                return activeFilters.has(spellCategory);
            });
        }

        // Filtrado por texto
        if (query) {
            filtered = filtered.filter(spell => {
                const name = (spell.Nombre || '').toLowerCase();
                const desc = (spell.Descripción || '').toLowerCase();
                const effect = (spell.Efecto || '').toLowerCase();
                return name.includes(query) || desc.includes(query) || effect.includes(query);
            });
        }

        renderSpells(filtered);
    }

    // 5. Renderizado Visual
    function renderSpells(spells) {
        spellsGrid.innerHTML = '';
        if (spells.length === 0) {
            spellsGrid.innerHTML = '<p style="color:var(--text-muted); text-align:center; grid-column: 1 / -1;">No se encontraron hechizos arcano-compatibles.</p>';
            return;
        }

        // Agrupar hechizos por tipo
        const groups = {};
        spells.forEach(spell => {
            const type = spell['Tipo de hechizo'] || spell.Tipo || 'Otros';
            // Normalizar texto para la agrupación
            let key = type;
            if (type.toLowerCase().includes('truco')) key = 'Trucos';
            else if (type.toLowerCase().includes('rápido') || type.toLowerCase().includes('rapido')) key = 'Rápidos';
            else if (type.toLowerCase().includes('básico') || type.toLowerCase().includes('basico')) key = 'Básicos';
            else if (type.toLowerCase().includes('potente')) key = 'Potentes';

            if (!groups[key]) groups[key] = [];
            groups[key].push(spell);
        });

        // Orden de renderizado deseado
        const order = ['Trucos', 'Rápidos', 'Básicos', 'Potentes'];
        const sortedKeys = Object.keys(groups).sort((a, b) => {
            let indexA = order.indexOf(a);
            let indexB = order.indexOf(b);
            if (indexA === -1) indexA = 99;
            if (indexB === -1) indexB = 99;
            return indexA - indexB;
        });

        sortedKeys.forEach(groupName => {
            // Añadir cabecera
            const header = document.createElement('h2');
            header.className = 'spell-tier-header';
            header.textContent = groupName;
            spellsGrid.appendChild(header);

            // Añadir las cartas de este grupo
            groups[groupName].forEach(spell => {
                const card = document.createElement('div');
                card.className = 'spell-card';

                card.innerHTML = `
                    <div class="spell-header">
                        <h3>${spell.Nombre || 'Hechizo Desconocido'}</h3>
                        <span class="spell-category">${spell['Tipo de hechizo'] || spell.Tipo || ''}</span>
                    </div>
                    <div class="spell-body">
                        <p>${spell.Descripción || ''}</p>
                        ${spell.Efecto ? `<div class="spell-effect">${spell.Efecto}</div>` : ''}
                    </div>
                    <div class="spell-footer">
                        ${spell.Acciones ? `<div class="spell-stat">⏱️ <strong>${spell.Acciones}</strong> Acc</div>` : ''}
                        ${spell.Maná ? `<div class="spell-stat">💧 <strong>${spell.Maná}</strong> Maná</div>` : ''}
                        ${spell['Espíritu'] ? `<div class="spell-stat">✨ <strong>${spell['Espíritu']}</strong> Espíritu</div>` : ''}
                        ${spell.Enfriamiento ? `<div class="spell-stat">⏳ <strong>${spell.Enfriamiento}</strong> Turnos CD</div>` : ''}
                        ${spell.Ranuras ? `<div class="spell-stat">💠 <strong>${spell.Ranuras}</strong> Slots</div>` : ''}
                    </div>
                `;
                spellsGrid.appendChild(card);
            });
        });
    }

    function hideAllViews() {
        if (heroContent) heroContent.style.display = 'none';
        if (grimoireContainer) grimoireContainer.classList.add('hidden');
        if (attributeSelection) attributeSelection.classList.add('hidden');
        if (schoolSelection) schoolSelection.classList.add('hidden');
        if (spellsContainer) spellsContainer.classList.add('hidden');
    }
});
