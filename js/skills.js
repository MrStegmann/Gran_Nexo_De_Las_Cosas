document.addEventListener('DOMContentLoaded', () => {
    const attributeSelection = document.getElementById('skills-attribute-selection');
    const skillsContainer = document.getElementById('skills-container');

    const skillsGrid = document.getElementById('skills-grid');
    const skillTitle = document.getElementById('skill-attribute-title');
    const searchInput = document.getElementById('skill-search');
    const filterBtns = document.querySelectorAll('.skill-filter-btn');

    let currentSkills = [];
    let activeFilters = new Set();

    const skillsData = {
        strength: { id: 'strength', name: 'Fuerza', theme: 'theme-strength', file: 'js/meta/strength_skills.json' },
        dexterity: { id: 'dexterity', name: 'Destreza', theme: 'theme-dexterity', file: 'js/meta/dex_skills.json' },
        constitution: { id: 'constitution', name: 'Constitución', theme: 'theme-constitution', file: 'js/meta/constitution_skills.json' }
    };

    window.triggerReturnToSkillsAttributes = function () {
        hideAllViews();
        if (window.triggerWarpReturn) {
            window.triggerWarpReturn(() => {
                if (attributeSelection) attributeSelection.classList.remove('hidden');
            });
        } else {
            if (attributeSelection) attributeSelection.classList.remove('hidden');
        }
    };

    const btnReturnSkillsAttributes = document.getElementById('btn-return-skills-attributes');
    if (btnReturnSkillsAttributes) {
        btnReturnSkillsAttributes.addEventListener('click', () => {
            window.triggerReturnToSkillsAttributes();
        });
    }

    async function loadSkills(attributeId) {
        hideAllViews();
        if (skillsContainer) skillsContainer.classList.remove('hidden');

        const attribute = skillsData[attributeId];
        if (!attribute) return;

        if (skillTitle) skillTitle.textContent = attribute.name;
        if (skillsContainer) skillsContainer.style.setProperty('--theme-color', `var(--${attribute.theme})`);

        if (searchInput) searchInput.value = '';
        activeFilters.clear();
        updateFilterButtons();

        if (skillsGrid) skillsGrid.innerHTML = '<p style="color:var(--text-muted); text-align:center; grid-column: 1 / -1;">Canalizando poder físico...</p>';
        currentSkills = [];

        try {
            const response = await fetch(attribute.file);
            if (!response.ok) throw new Error('Las habilidades de este atributo aún no han sido registradas en el tomo.');
            const data = await response.json();

            currentSkills = data;
            applyFiltersAndRender();
        } catch (error) {
            if (skillsGrid) skillsGrid.innerHTML = `<div style="text-align:center; grid-column: 1 / -1; padding: 50px; display: flex; flex-direction: column; align-items: center;">
                <img src="assets/Azulito_Confused.png" alt="Azulito Confundido" style="max-width: 150px; margin-bottom: 20px; filter: drop-shadow(0 0 10px rgba(0,200,255,0.3));" />
                <h2 style="color: var(--theme-color);">¡Ups! Algo no cuadra...</h2>
                <p style="color: var(--text-muted);">${error.message}</p>
            </div>`;
        }
    }

    window.triggerLoadSkills = loadSkills;

    if (filterBtns) {
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
    }

    if (searchInput) {
        searchInput.addEventListener('input', () => {
            applyFiltersAndRender();
        });
    }

    function updateFilterButtons() {
        if (!filterBtns) return;
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
        if (!searchInput) return;
        const query = searchInput.value.toLowerCase();

        let filtered = currentSkills;

        if (activeFilters.size > 0) {
            filtered = filtered.filter(skill => {
                const type = (skill.Tipo || '').toLowerCase();
                let category = 'Otros';

                if (type.includes('pasiva')) category = 'Pasiva';
                else if (type.includes('activa')) category = 'Activa';

                return activeFilters.has(category);
            });
        }

        if (query) {
            filtered = filtered.filter(skill => {
                const name = (skill.Nombre || '').toLowerCase();
                const desc = (skill.Descripción || skill.Descripcion || '').toLowerCase();
                return name.includes(query) || desc.includes(query);
            });
        }

        renderSkills(filtered);
    }

    function renderSkills(skills) {
        if (!skillsGrid) return;
        skillsGrid.innerHTML = '';
        if (skills.length === 0) {
            skillsGrid.innerHTML = '<p style="color:var(--text-muted); text-align:center; grid-column: 1 / -1;">No se encontraron habilidades con estos criterios.</p>';
            return;
        }

        const groups = {};
        skills.forEach(skill => {
            const type = skill.Tipo || 'Otros';
            let key = type;
            if (type.toLowerCase().includes('pasiva')) key = 'Pasivas';
            else if (type.toLowerCase().includes('activa')) key = 'Activas';

            if (!groups[key]) groups[key] = [];
            groups[key].push(skill);
        });

        const order = ['Pasivas', 'Activas'];
        const sortedKeys = Object.keys(groups).sort((a, b) => {
            let indexA = order.indexOf(a);
            let indexB = order.indexOf(b);
            if (indexA === -1) indexA = 99;
            if (indexB === -1) indexB = 99;
            return indexA - indexB;
        });

        sortedKeys.forEach(groupName => {
            const header = document.createElement('h2');
            header.className = 'spell-tier-header';
            header.textContent = groupName;
            skillsGrid.appendChild(header);

            groups[groupName].forEach(skill => {
                const card = document.createElement('div');
                card.className = 'spell-card';

                const costActions = skill['Coste de Acciones'] !== undefined ? skill['Coste de Acciones'] : (skill.Coste || 0);
                const costSlots = skill['Coste de Ranuras'] !== undefined ? skill['Coste de Ranuras'] : 0;
                const turnsEffect = skill['Turnos de Efecto'] !== undefined ? skill['Turnos de Efecto'] : 0;
                const cooldown = skill['Turnos de Enfriamiento (Cooldown)'] !== undefined ? skill['Turnos de Enfriamiento (Cooldown)'] : 0;

                card.innerHTML = `
                    <div class="spell-header">
                        <h3>${skill.Nombre || 'Habilidad Desconocida'}</h3>
                        <span class="spell-category">${skill.Tipo || ''}</span>
                    </div>
                    <div class="spell-body">
                        <p>${skill.Descripción || skill.Descripcion || ''}</p>
                    </div>
                    <div class="spell-footer">
                        ${costActions ? `<div class="spell-stat">⏱️ <strong>${costActions}</strong> Acc</div>` : ''}
                        ${costSlots ? `<div class="spell-stat">💠 <strong>${costSlots}</strong> Slots</div>` : ''}
                        ${turnsEffect ? `<div class="spell-stat">🌀 <strong>${turnsEffect}</strong> T. Efecto</div>` : ''}
                        ${cooldown ? `<div class="spell-stat">⏳ <strong>${cooldown}</strong> T. CD</div>` : ''}
                    </div>
                `;
                skillsGrid.appendChild(card);
            });
        });
    }

    function hideAllViews() {
        if (attributeSelection) attributeSelection.classList.add('hidden');
        if (skillsContainer) skillsContainer.classList.add('hidden');
    }
});
