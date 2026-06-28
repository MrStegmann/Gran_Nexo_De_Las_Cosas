/**
 * charWizard.js — Wizard interactivo "Crear Personaje"
 * Se inyecta en #howto-content cuando se selecciona crear_ficha.md
 * Expone window.initCharWizard(container)
 */
(function () {
    'use strict';

    // ============================================================
    // CONSTANTES Y DATOS ESTÁTICOS
    // ============================================================

    const DATA_PATHS = {
        races: 'js/meta/races.json',
        positiveTraits: 'js/meta/positive_traits.json',
        negativeTraits: 'js/meta/negative_traits.json',
        attrTalents: 'js/meta/attributes_talents.json',
    };

    // Fuente de verdad para claves internas del Addon
    const META_PATHS = {
        racesKeys: 'js/meta/races.json',          // array de keys inglesas
        talentKeys: 'js/meta/attributes_talents.json', // [{name, talents:[]}]
    };

    // Mapas construidos dinámicamente en loadData()
    // racaDisplay(español) → key interna (inglés)
    let RACE_KEY_MAP = {};
    // talentDisplay(español) → key interna (inglés)
    let TALENT_KEY_MAP = {};

    const ATTR_ICONS = {
        'Destreza': '🏃', 'Fuerza': '💪', 'Inteligencia': '🔮',
        'Voluntad': '🌀', 'Constitución': '❤️', 'Sabiduría': '🦉', 'Carisma': '🗣️'
    };

    // Mapa de nombres de atributos español → clave interna (inglés)
    const ATTR_KEY_MAP = {
        'Destreza': 'dexterity',
        'Fuerza': 'strength',
        'Inteligencia': 'intelligence',
        'Voluntad': 'willpower',
        'Constitución': 'constitution',
        'Sabiduría': 'wisdom',
        'Carisma': 'charisma'
    };

    // Mapa de categoría español → clave interna
    const CAT_KEY_MAP = {
        'Novato': 'noob',
        'Normal': 'normal',
        'Elite': 'elite',
        'Boss': 'boss'
    };

    const ATTR_DESC = {
        'Destreza': 'Agilidad, precisión, sigilo, esquiva.',
        'Fuerza': 'Combate físico potente, resistencia bruta, atletismo.',
        'Inteligencia': 'Hechizos arcanos, viles, naturaleza, sombras, nigromancia. Cada punto +1 Maná.',
        'Voluntad': 'Hechizos de Fe, Elemental, Chi. Resistencia mental. Cada punto +1 Espíritu.',
        'Constitución': 'Resistencia física y estados negativos. Cada punto +1 Vida.',
        'Sabiduría': 'Percepción, supervivencia, artesanía, relación con animales.',
        'Carisma': 'Interacción con NPCs: persuasión, diplomacia, comercio...'
    };

    // positiveSlots: ranuras de rasgos positivos disponibles.
    //   - Un rasgo de Nivel 1 = 1 slot
    //   - Un rasgo de Nivel 2 = 2 slots (agota el cupo completo)
    // negativeMin: mínimo de rasgos negativos requeridos (sin máximo).
    const CATEGORY_DATA = {
        'Novato': { attrPoints: 0, slots: 2, hpBase: 15, resourceBase: 5, positiveSlots: 2, negativeMin: 2 },
        'Normal': { attrPoints: 5, slots: 5, hpBase: 20, resourceBase: 10, positiveSlots: 2, negativeMin: 2 }
    };

    const STEP_META = [
        { icon: '🪪', title: 'Identidad' },
        { icon: '💪', title: 'Atributos' },
        { icon: '✨', title: 'Talentos' },
        { icon: '🎭', title: 'Rasgos' },
        { icon: '⚡', title: 'Aptitudes' },
        { icon: '📖', title: 'Hechizos & Hab.' },
        { icon: '🏆', title: 'Profesión' }
    ];

    // ============================================================
    // ESTADO
    // ============================================================

    let state = {};
    let data = {};
    let currentStep = 0;

    function resetState() {
        state = {
            nombre: '', apellidos: '', categoria: 'Normal', raza: '', razaSecundaria: '', faccion: '', razaData: null,
            isWorgenCurse: false,
            atributos: { Destreza: 0, Fuerza: 0, Inteligencia: 0, Voluntad: 0, Constitución: 0, Sabiduría: 0, Carisma: 0 },
            talentos: {},
            rasgosPositivos: [],
            rasgosNegativos: [],
            aptitudes: [],
            hechizos: '', habilidades: '', profesion: '', profesionDesc: ''
        };
        currentStep = 0;
    }

    /** Calcula los slots de rasgos positivos ya consumidos. Nv2 cuesta 2 slots. */
    function usedPositiveSlots() {
        return state.rasgosPositivos.reduce((sum, r) => sum + (r.nivel === 2 ? 2 : 1), 0);
    }

    // ============================================================
    // CARGA DE DATOS
    // ============================================================

    async function loadData() {
        const [races, positiveTraits, negativeTraits, attrTalents, metaRaceKeys, metaTalentKeys] = await Promise.all([
            fetch(DATA_PATHS.races).then(r => r.json()),
            fetch(DATA_PATHS.positiveTraits).then(r => r.json()),
            fetch(DATA_PATHS.negativeTraits).then(r => r.json()),
            fetch(DATA_PATHS.attrTalents).then(r => r.json()),
            fetch(META_PATHS.racesKeys).then(r => r.json()),
            fetch(META_PATHS.talentKeys).then(r => r.json()),
        ]);
        data = { races, positiveTraits, negativeTraits, attrTalents };

        // ── Construir RACE_KEY_MAP ──────────────────────────────────────
        // races.json (sistema_de_rol) tiene facciones con nombres en español.
        // js/meta/races.json tiene las keys inglesas en el mismo orden que
        // aparecen las razas recorriendo el JSON por facción.
        // Aplanamos ambas listas y creamos el mapa display → key.
        RACE_KEY_MAP = {};
        const displayNames = [];
        Object.values(races).forEach(faction => {
            Object.keys(faction).forEach(raceName => displayNames.push(raceName));
        });
        metaRaceKeys.forEach((key, i) => {
            if (displayNames[i]) RACE_KEY_MAP[displayNames[i]] = key;
        });

        // ── Construir TALENT_KEY_MAP ────────────────────────────────────
        // atributes_talents.json (sistema_de_rol) tiene nombres en español.
        // js/meta/attributes_talents.json tiene los mismos en inglés,
        // en el mismo orden por atributo.
        TALENT_KEY_MAP = {};
        const attrKeysEs = Object.keys(attrTalents);          // ['Destreza', 'Fuerza', ...]
        metaTalentKeys.forEach((metaAttr) => {
            // Encontrar el atributo español correspondiente por posición
            const attrIndex = metaTalentKeys.indexOf(metaAttr);
            const esAttrKey = attrKeysEs[attrIndex];
            if (!esAttrKey) return;
            const esTalents = attrTalents[esAttrKey]?.Talentos || [];
            metaAttr.talents.forEach((enKey, ti) => {
                const esName = esTalents[ti];
                if (esName) TALENT_KEY_MAP[esName] = enKey;
            });
        });
    }

    // ============================================================
    // HELPERS
    // ============================================================

    function calcStats() {
        const cat = CATEGORY_DATA[state.categoria];
        return {
            hp: cat.hpBase + (state.atributos.Constitución || 0),
            mana: cat.resourceBase + (state.atributos.Inteligencia || 0),
            spirit: cat.resourceBase + (state.atributos.Voluntad || 0),
        };
    }

    function usedAttrPoints() {
        return Object.values(state.atributos).reduce((a, b) => a + b, 0);
    }

    /**
     * Convierte un nombre de rasgo en español a una clave camelCase en inglés
     * sin caracteres especiales ni tildes.
     * Ej: "Ábusoón/a"  → "abusonA"
     *     "Ambidiestro/a ágil" → "ambidiestroAAgil"
     */
    function toTraitKey(nombre) {
        // Tabla de transliteración de vocales con tilde
        const accents = {
            'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u',
            'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U', 'ü': 'u', 'Ã': 'A'
        };
        const normalized = nombre
            .replace(/[\u00C0-\u024F]/g, c => accents[c] || c)  // tildes conocidas
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '')    // resto de diacríticos
            .replace(/[\/\\]/g, ' ')                             // slash como separador
            .replace(/[^a-zA-Z0-9 ]/g, '')                       // eliminar símbolos
            .trim();
        const words = normalized.split(/\s+/).filter(Boolean);
        return words
            .map((w, i) => i === 0 ? w.charAt(0).toLowerCase() + w.slice(1)
                : w.charAt(0).toUpperCase() + w.slice(1))
            .join('');
    }

    function remainingAttrPoints() {
        return CATEGORY_DATA[state.categoria].attrPoints - usedAttrPoints();
    }

    function talentSpent(attr) {
        const talents = data.attrTalents[attr]?.Talentos || [];
        return talents.reduce((sum, t) => sum + (state.talentos[t] || 0), 0);
    }

    function talentRemaining(attr) {
        return (state.atributos[attr] || 0) * 2 - talentSpent(attr);
    }

    // ============================================================
    // RENDERERS DE PASOS
    // ============================================================

    /* ---------- PASO 1: IDENTIDAD ---------- */

    function renderRaceCards(faction) {
        const races = data.races[faction];
        if (!races) return '<p class="cw-text-muted">Sin razas disponibles.</p>';

        if (faction === 'Especiales') {
            return Object.keys(races).map(raceName => `
                <div class="cw-race-card ${state.raza === raceName && state.faccion === faction ? 'selected' : ''}"
                     data-race="${raceName}" data-faction="${faction}">
                    <div class="cw-race-name">${raceName}</div>
                    <div class="cw-race-note">Condición especial sobre raza base</div>
                </div>`).join('');
        }

        return Object.keys(races).map(raceName => {
            const rd = races[raceName];
            const ventajas = (rd.Ventajas || []).slice(0, 2);
            const desventajas = (rd.Desventajas || []).slice(0, 1);
            const especial = (rd.Especial || []).slice(0, 1);
            const isSelected = state.raza === raceName && state.faccion === faction;
            return `
                <div class="cw-race-card ${isSelected ? 'selected' : ''}"
                     data-race="${raceName}" data-faction="${faction}">
                    <div class="cw-race-name">${raceName}</div>
                    ${ventajas.length ? `<div class="cw-race-bonuses positive">${ventajas.map(v => `<span>${v}</span>`).join('')}</div>` : ''}
                    ${desventajas.length ? `<div class="cw-race-bonuses negative">${desventajas.map(d => `<span>${d}</span>`).join('')}</div>` : ''}
                    ${especial.length ? `<div class="cw-race-special">✦ ${especial[0]}</div>` : ''}
                </div>`;
        }).join('');
    }

    function renderRacePreview(raceName, faction) {
        if (!raceName || !faction) return '';
        const facData = data.races[faction];
        if (!facData) return '';
        const raceObj = facData[raceName];
        if (!raceObj) return '';

        if (faction === 'Especiales') {
            return `
                <div class="cw-preview-header">✦ ${raceName} <span class="cw-preview-faction">${faction}</span></div>
                ${Object.entries(raceObj).map(([form, fd]) => `
                    <div class="cw-preview-form-title">${form}</div>
                    <div class="cw-preview-badges">
                        ${(fd.Ventajas || []).map(v => `<span class="cw-badge-tag positive">${v}</span>`).join('')}
                        ${(fd.Desventajas || []).map(d => `<span class="cw-badge-tag negative">${d}</span>`).join('')}
                        ${(fd.Especial || []).map(e => `<span class="cw-badge-tag special">✦ ${e}</span>`).join('')}
                    </div>`).join('')}`;
        }

        const v = raceObj.Ventajas || [];
        const d = raceObj.Desventajas || [];
        const e = raceObj.Especial || [];
        return `
            <div class="cw-preview-header">✦ ${raceName} <span class="cw-preview-faction">${faction}</span></div>
            <div class="cw-preview-columns">
                <div class="cw-preview-col">
                    <div class="cw-preview-col-label">Ventajas</div>
                    ${v.map(x => `<span class="cw-badge-tag positive">${x}</span>`).join('')}
                </div>
                <div class="cw-preview-col">
                    <div class="cw-preview-col-label">Desventajas</div>
                    ${d.map(x => `<span class="cw-badge-tag negative">${x}</span>`).join('')}
                </div>
                ${e.length ? `<div class="cw-preview-col">
                    <div class="cw-preview-col-label">Especial</div>
                    ${e.map(x => `<span class="cw-badge-tag special">✦ ${x}</span>`).join('')}
                </div>` : ''}
            </div>`;
    }

    function renderStep1() {
        const factions = Object.keys(data.races);
        const activeFaction = state.faccion || factions[0];
        return `
            <div class="cw-step" id="cw-step-1">
                <h2 class="cw-step-title">🪪 Identidad del Personaje</h2>
            
                <div class="cw-field">
                    <label>Categoría <span class="cw-req">*</span></label>
                    <div class="cw-category-grid">
                        ${['Novato', 'Normal'].map(cat => {
            const cd = CATEGORY_DATA[cat];
            return `
                            <label class="cw-category-card ${state.categoria === cat ? 'selected' : ''}" data-cat="${cat}">
                                <input type="radio" name="categoria" value="${cat}" ${state.categoria === cat ? 'checked' : ''} class="sr-only">
                                <div class="cw-cat-name">${cat === 'Novato' ? '⚔️ Novato' : '🌟 Normal'}</div>
                                <ul class="cw-cat-stats">
                                    <li><span>Puntos Atributo</span><strong>${cd.attrPoints}</strong></li>
                                    <li><span>Ranuras (Hechizos/Hab.)</span><strong>${cd.slots}</strong></li>
                                    <li><span>Puntos de Vida</span><strong>${cd.hpBase}</strong></li>
                                    <li><span>Maná / Espíritu</span><strong>${cd.resourceBase}</strong></li>
                                    <li><span>Ranuras Rasgos +</span><strong>${cd.positiveSlots}</strong></li>
                                    <li><span>Mín. Rasgos −</span><strong>${cd.negativeMin}</strong></li>
                                </ul>
                                ${cat === 'Novato' ? '<div class="cw-cat-note">Experiencia desafiante. Más restricciones iniciales.</div>' : '<div class="cw-cat-note">Más opciones desde el inicio. Recomendado.</div>'}
                            </label>`;
        }).join('')}
                    </div>
                </div>

                <div class="cw-field">
                    <label>Raza <span class="cw-req">*</span></label>
                    <div class="cw-faction-tabs" role="tablist">
                        ${factions.map(f => `
                            <button class="cw-faction-tab ${activeFaction === f ? 'active' : ''}"
                                    data-faction="${f}" role="tab">${f}</button>`).join('')}
                    </div>
                    <div class="cw-race-grid" id="cw-race-grid">
                        ${renderRaceCards(activeFaction)}
                    </div>
                    <div class="cw-race-preview" id="cw-race-preview">
                        ${renderRacePreview(state.raza, state.faccion)}
                    </div>
                </div>

                <!-- ── Maldición Huargen  ── -->
                <div class="cw-field">
                    <label class="cw-worgen-label" for="cw-worgen-curse">
                        🐺 Maldición Huargen
                    </label>
                    <label class="cw-worgen-toggle" id="cw-worgen-toggle">
                        <input type="checkbox" id="cw-worgen-curse"
                               ${state.isWorgenCurse ? 'checked' : ''}
                               aria-describedby="cw-worgen-desc">
                        <span class="cw-worgen-slider"></span>
                        <span class="cw-worgen-text" id="cw-worgen-text">
                            ${state.isWorgenCurse ? 'Maldición activa' : 'Sin maldición'}
                        </span>
                    </label>
                    <p class="cw-hint" id="cw-worgen-desc" style="margin-top:0.4rem;">
                        Marca esta opción si tu personaje porta la Maldición Huargen.
                    </p>
                </div>
            </div>`;
    }

    /* ---------- PASO 2: ATRIBUTOS ---------- */

    function renderStep2() {
        const cat = CATEGORY_DATA[state.categoria];
        const rem = remainingAttrPoints();
        const stats = calcStats();
        const attrs = Object.keys(state.atributos);

        return `
            <div class="cw-step" id="cw-step-2">
                <h2 class="cw-step-title">💪 Atributos</h2>
                <p class="cw-step-subtitle">Distribuye tus puntos. Cada punto en un atributo otorga <strong>2 puntos de talento</strong> para esa rama.</p>

                <div class="cw-attr-dashboard">
                    <div class="cw-points-panel">
                        <div class="cw-points-orb ${rem === 0 ? 'full' : rem < 0 ? 'over' : ''}">
                            <span class="cw-orb-value" id="cw-rem-points">${rem}</span>
                            <span class="cw-orb-label">pts restantes</span>
                        </div>
                        <div class="cw-total-note">de ${cat.attrPoints} disponibles</div>
                    </div>
                    <div class="cw-live-stats">
                        <div class="cw-live-stat" id="cw-stat-hp">
                            <span class="cw-live-icon">❤️</span>
                            <div class="cw-live-info">
                                <span class="cw-live-label">Vida</span>
                                <span class="cw-live-val" id="cw-hp">${stats.hp}</span>
                            </div>
                        </div>
                        <div class="cw-live-stat" id="cw-stat-mana">
                            <span class="cw-live-icon">🔮</span>
                            <div class="cw-live-info">
                                <span class="cw-live-label">Maná</span>
                                <span class="cw-live-val" id="cw-mana">${stats.mana}</span>
                            </div>
                        </div>
                        <div class="cw-live-stat" id="cw-stat-spirit">
                            <span class="cw-live-icon">🌀</span>
                            <div class="cw-live-info">
                                <span class="cw-live-label">Espíritu</span>
                                <span class="cw-live-val" id="cw-spirit">${stats.spirit}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="cw-attr-list">
                    ${attrs.map(attr => `
                        <div class="cw-attr-row" data-attr="${attr}">
                            <div class="cw-attr-info">
                                <span class="cw-attr-icon">${ATTR_ICONS[attr]}</span>
                                <div class="cw-attr-text">
                                    <span class="cw-attr-name">${attr}</span>
                                    <span class="cw-attr-desc">${ATTR_DESC[attr]}</span>
                                </div>
                            </div>
                            <div class="cw-counter">
                                <button class="cw-counter-btn minus" data-attr="${attr}" aria-label="Reducir ${attr}"
                                        ${state.atributos[attr] <= 0 ? 'disabled' : ''}>−</button>
                                <span class="cw-counter-val" id="cw-attr-val-${attr.replace(/[^a-zA-Z]/g, '')}">${state.atributos[attr]}</span>
                                <button class="cw-counter-btn plus" data-attr="${attr}" aria-label="Aumentar ${attr}"
                                        ${rem <= 0 ? 'disabled' : ''}>+</button>
                            </div>
                        </div>`).join('')}
                </div>

                ${cat.attrPoints === 0 ? `<div class="cw-info-box warning">
                    ⚠️ Como <strong>Novato</strong>, no tienes puntos de atributo iniciales. Todos comienzan en 0.
                    Esto <strong>no te impide</strong> intentar acciones: simplemente las haces peor.
                </div>` : ''}
            </div>`;
    }

    /* ---------- PASO 3: TALENTOS ---------- */

    function renderStep3() {
        const attrEntries = Object.entries(state.atributos).filter(([, val]) => val > 0);

        if (attrEntries.length === 0) {
            return `
                <div class="cw-step" id="cw-step-3">
                    <h2 class="cw-step-title">✨ Talentos</h2>
                    <div class="cw-info-box warning">
                        No tienes puntos en ningún atributo, por lo que <strong>no hay puntos de talento</strong> que distribuir.
                        Puedes volver al paso anterior para asignar atributos, o continuar así.
                    </div>
                    <p class="cw-hint" style="margin-top:1rem;">
                        Los talentos se desbloquean cuando inviertes puntos en su atributo. Cada punto de atributo otorga 2 puntos de talento.
                    </p>
                </div>`;
        }

        return `
            <div class="cw-step" id="cw-step-3">
                <h2 class="cw-step-title">✨ Talentos</h2>
                <p class="cw-step-subtitle">Cada punto de atributo te da <strong>2 puntos de talento</strong> para gastar dentro de esa rama. Son exclusivos de su atributo.</p>

                <div class="cw-talent-sections">
                    ${attrEntries.map(([attr, attrVal]) => {
            const total = attrVal * 2;
            const rem = talentRemaining(attr);
            const talents = data.attrTalents[attr]?.Talentos || [];
            return `
                            <div class="cw-talent-block" data-talent-attr="${attr}">
                                <div class="cw-talent-block-header">
                                    <span class="cw-talent-block-icon">${ATTR_ICONS[attr]}</span>
                                    <span class="cw-talent-block-name">${attr}</span>
                                    <div class="cw-talent-pts-badge ${rem === 0 ? 'full' : ''}">
                                        <span class="cw-talent-rem" data-attr-rem="${attr}">${rem}</span>/<span>${total}</span> pts
                                    </div>
                                </div>
                                <div class="cw-talent-rows">
                                    ${talents.map(talent => `
                                        <div class="cw-talent-row" data-talent="${talent}" data-attr="${attr}">
                                            <span class="cw-talent-name">${talent}</span>
                                            <div class="cw-counter small">
                                                <button class="cw-counter-btn minus talent-minus"
                                                        data-talent="${talent}" data-attr="${attr}"
                                                        ${(state.talentos[talent] || 0) <= 0 ? 'disabled' : ''}>−</button>
                                                <span class="cw-counter-val talent-val"
                                                      data-talent-val="${talent}">${state.talentos[talent] || 0}</span>
                                                <button class="cw-counter-btn plus talent-plus"
                                                        data-talent="${talent}" data-attr="${attr}"
                                                        ${rem <= 0 ? 'disabled' : ''}>+</button>
                                            </div>
                                        </div>`).join('')}
                                </div>
                            </div>`;
        }).join('')}
                </div>
            </div>`;
    }

    /* ---------- PASO 4: RASGOS ---------- */

    function renderStep4() {
        const cat = CATEGORY_DATA[state.categoria];
        const slotsUsed = usedPositiveSlots();
        const slotsTotal = cat.positiveSlots;
        const selectedNeg = state.rasgosNegativos.length;

        return `
            <div class="cw-step" id="cw-step-4">
                <h2 class="cw-step-title">🎭 Rasgos</h2>
                <p class="cw-step-subtitle">Los rasgos definen la personalidad mecánica. Los rasgos negativos <strong>deben ser interpretados</strong>.</p>

                <div class="cw-traits-counters">
                    <div class="cw-trait-cnt positive">
                        <span class="cw-cnt-icon">✦</span>
                        Ranuras positivas: <strong id="cw-pos-cnt">${slotsUsed}</strong> / ${slotsTotal}
                        <span class="cw-cnt-hint">(Nv.1 = 1 ranura · Nv.2 = 2 ranuras)</span>
                    </div>
                    <div class="cw-trait-cnt negative">
                        <span class="cw-cnt-icon">✗</span>
                        Negativos: <strong id="cw-neg-cnt">${selectedNeg}</strong>
                        <span class="cw-cnt-hint">(mín. ${cat.negativeMin} — sin máximo)</span>
                    </div>
                </div>

                <h3 class="cw-section-title">Rasgos Positivos</h3>
                <p class="cw-hint">Muchos rasgos tienen 3 niveles. Haz clic para seleccionar y elige el nivel.</p>
                <div class="cw-traits-grid" id="cw-pos-traits-grid">
                    ${data.positiveTraits.map(trait => {
            const sel = state.rasgosPositivos.find(r => r.nombre === trait.Nombre);
            const levels = [1, 2, 3].filter(l => trait[`Nivel ${l}`] !== null);
            const hasLevels = levels.length > 0;
            const isDisabled = !sel && slotsUsed >= slotsTotal;
            return `
                            <div class="cw-trait-card ${sel ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}"
                                 data-trait="${trait.Nombre}" data-type="positive">
                                <div class="cw-trait-header">
                                    <div class="cw-trait-name">${trait.Nombre}</div>
                                    ${sel ? '<div class="cw-trait-check">✓</div>' : ''}
                                </div>
                                <div class="cw-trait-desc">${(trait.Descripción || '').split('\n')[0]}</div>
                                ${hasLevels ? `
                                    <div class="cw-trait-levels ${sel ? '' : 'hidden'}" id="cw-levels-${trait.Nombre.replace(/[^a-zA-Z]/g, '')}">
                                        ${levels.map(l => `
                                            <button class="cw-level-btn ${sel?.nivel === l ? 'active' : ''}"
                                                    data-trait="${trait.Nombre}" data-level="${l}">Nv.${l}</button>`).join('')}
                                    </div>` : ''}
                            </div>`;
        }).join('')}
                </div>

                <h3 class="cw-section-title" style="margin-top:2rem;">Rasgos Negativos</h3>
                <p class="cw-hint">El Máster puede intervenir si no los interpretas correctamente.</p>
                <div class="cw-traits-grid" id="cw-neg-traits-grid">
                    ${data.negativeTraits.map(trait => {
            const sel = state.rasgosNegativos.includes(trait.Nombre);
            const incompat = isIncompatible(trait.Nombre);
            const isDisabled = false; // Sin tope de rasgos negativos
            return `
                            <div class="cw-trait-card negative ${sel ? 'selected' : ''} ${incompat ? 'incompatible' : ''} ${isDisabled ? 'disabled' : ''}"
                                 data-trait="${trait.Nombre}" data-type="negative">
                                <div class="cw-trait-header">
                                    <div class="cw-trait-name">${trait.Nombre}</div>
                                    ${sel ? '<div class="cw-trait-check">✓</div>' : ''}
                                    ${incompat ? '<div class="cw-trait-incompat-badge">✗ Incompatible</div>' : ''}
                                </div>
                                <div class="cw-trait-desc">${(trait.Descripción || '').split('\n')[0]}</div>
                                ${trait.Incompatibilidad ? `<div class="cw-trait-incompat-note">No compatible con: ${trait.Incompatibilidad}</div>` : ''}
                            </div>`;
        }).join('')}
                </div>
            </div>`;
    }

    function isIncompatible(traitName) {
        return state.rasgosNegativos.some(r => {
            const t = data.negativeTraits.find(nt => nt.Nombre === r);
            return t?.Incompatibilidad === traitName;
        }) || (() => {
            const td = data.negativeTraits.find(t => t.Nombre === traitName);
            return td?.Incompatibilidad && state.rasgosNegativos.includes(td.Incompatibilidad);
        })();
    }

    /* ---------- PASO 5: APTITUDES HEROICAS ---------- */

    function renderAptitudForm(apt, index) {
        return `
            <div class="cw-aptitud-card" data-index="${index}">
                <div class="cw-aptitud-header">
                    <span class="cw-aptitud-num">⚡ Aptitud #${index + 1}</span>
                    <button class="cw-remove-btn" data-remove="${index}" aria-label="Eliminar aptitud">✕ Eliminar</button>
                </div>
                <div class="cw-form-grid">
                    <div class="cw-field">
                        <label>Nombre de la Aptitud</label>
                        <input type="text" class="cw-input apt-nombre" data-index="${index}"
                               placeholder="Ej: Estocada Relámpago" value="${apt.nombre}">
                    </div>
                    <div class="cw-field">
                        <label>Tipo</label>
                        <select class="cw-select apt-tipo" data-index="${index}">
                            <option value="Activa" ${apt.tipo === 'Activa' ? 'selected' : ''}>Activa</option>
                            <option value="Pasiva" ${apt.tipo === 'Pasiva' ? 'selected' : ''}>Pasiva</option>
                        </select>
                    </div>
                    <div class="cw-field">
                        <label>Acciones (coste)</label>
                        <input type="number" class="cw-input apt-acciones" data-index="${index}"
                               min="0" max="5" value="${apt.acciones ?? 1}" placeholder="1">
                    </div>
                    <div class="cw-field">
                        <label>Cooldown (turnos)</label>
                        <input type="number" class="cw-input apt-cooldown" data-index="${index}"
                               min="0" value="${apt.cooldown ?? 0}" placeholder="0 = sin cooldown">
                    </div>
                </div>
                <div class="cw-field">
                    <label>Descripción del efecto</label>
                    <textarea class="cw-textarea apt-desc" data-index="${index}"
                              placeholder="Describe exactamente qué hace y en qué condiciones..." rows="3">${apt.descripcion || ''}</textarea>
                </div>
            </div>`;
    }

    function renderStep5() {
        return `
            <div class="cw-step" id="cw-step-5">
                <h2 class="cw-step-title">⚡ Aptitudes Heroicas</h2>
                <p class="cw-step-subtitle">Lo que hace único a tu personaje. No son hechizos: el Máster las revisa y aprueba.</p>

                <div class="cw-info-box">
                    <strong>Recuerda:</strong> Las aptitudes no tienen coste de maná ni espíritu.
                    Deben definir: tipo, acciones, cooldown y efecto exacto.
                    Todas pasan por revisión del Máster antes de ser válidas.
                </div>

                <div id="cw-aptitudes-list">
                    ${state.aptitudes.map((apt, i) => renderAptitudForm(apt, i)).join('')}
                </div>

                ${state.aptitudes.length === 0 ? `
                    <p class="cw-hint" style="text-align:center; margin: 1.5rem 0;">
                        Puedes dejar este paso vacío y definir tus aptitudes con el Máster más adelante.
                    </p>` : ''}

                <button class="cw-add-btn" id="cw-add-aptitud" aria-label="Añadir aptitud heroica">
                    + Añadir Aptitud Heroica
                </button>
            </div>`;
    }

    /* ---------- PASO 6: HECHIZOS & HABILIDADES ---------- */

    function renderStep6() {
        const cat = CATEGORY_DATA[state.categoria];
        return `
            <div class="cw-step" id="cw-step-6">
                <h2 class="cw-step-title">📖 Hechizos & Habilidades</h2>
                <p class="cw-step-subtitle">Llena tus ranuras disponibles con lo que mejor encaje en tu personaje.</p>

                <div class="cw-slots-banner">
                    <span class="cw-slots-icon">🎰</span>
                    <div>
                        <div class="cw-slots-num">${cat.slots}</div>
                        <div class="cw-slots-label">ranuras disponibles</div>
                    </div>
                    <div class="cw-slots-hint">Mezcla hechizos y habilidades libremente. Cada uno indica las ranuras que ocupa.</div>
                </div>

                <div class="cw-ss-tabs" role="tablist">
                    <button class="cw-ss-tab active" data-tab="hechizos" role="tab">🔮 Hechizos</button>
                    <button class="cw-ss-tab" data-tab="habilidades" role="tab">⚔️ Habilidades</button>
                </div>

                <div class="cw-ss-panel" id="cw-panel-hechizos">
                    <div class="cw-info-box" style="margin-bottom:1rem;">
                        Requieren <strong>Inteligencia</strong> (arcano, vil, naturaleza, sombras, nigromancia)
                        o <strong>Voluntad</strong> (Fe, Elemental, Chi).
                    </div>
                    <div class="cw-spell-categories">
                        <div class="cw-spell-cat"><span class="cw-spell-cat-name">Trucos</span><span>0 recurso — 1 ranura — 1 acción</span></div>
                        <div class="cw-spell-cat"><span class="cw-spell-cat-name">Rápidos</span><span>2-4 recurso — 1-2 ranuras — 1 acción</span></div>
                        <div class="cw-spell-cat"><span class="cw-spell-cat-name">Básicos</span><span>5-7 recurso — 1-3 ranuras — 2 acciones</span></div>
                        <div class="cw-spell-cat"><span class="cw-spell-cat-name">Potentes</span><span>8+ recurso — 3-5 ranuras — 3 acciones</span></div>
                    </div>
                    <div class="cw-field">
                        <label for="cw-hechizos">Lista de Hechizos elegidos <span class="cw-opt">(uno por línea)</span></label>
                        <textarea id="cw-hechizos" class="cw-textarea" rows="6"
                                  placeholder="Ej:&#10;Bola de Fuego (Básico, Arcano, 2 ranuras)&#10;Rayo de Escarcha (Rápido, Arcano, 1 ranura)...">${state.hechizos}</textarea>
                    </div>
                    <button class="cw-library-btn" onclick="window.navigateTo && window.navigateTo('hechizos')">
                        → Consultar Biblioteca de Hechizos
                    </button>
                </div>

                <div class="cw-ss-panel hidden" id="cw-panel-habilidades">
                    <div class="cw-info-box" style="margin-bottom:1rem;">
                        Técnicas no mágicas (marciales/técnicas). No consumen maná ni espíritu,
                        pero pueden tener cooldown.
                    </div>
                    <div class="cw-field">
                        <label for="cw-habilidades">Lista de Habilidades elegidas <span class="cw-opt">(una por línea)</span></label>
                        <textarea id="cw-habilidades" class="cw-textarea" rows="6"
                                  placeholder="Ej:&#10;Golpe Brutal (Fuerza, Activa, 1 ranura)&#10;Guardia de Acero (Constitución, Pasiva, 2 ranuras)...">${state.habilidades}</textarea>
                    </div>
                    <button class="cw-library-btn" onclick="window.navigateTo && window.navigateTo('habilidades')">
                        → Consultar Biblioteca de Habilidades
                    </button>
                </div>
            </div>`;
    }

    /* ---------- PASO 7: PROFESIÓN + RESUMEN + EXPORTAR ---------- */

    function renderStep7() {
        const cat = CATEGORY_DATA[state.categoria];
        const stats = calcStats();
        const talentEntries = Object.entries(state.talentos).filter(([, v]) => v > 0);

        return `
            <div class="cw-step" id="cw-step-7">
                <h2 class="cw-step-title">🏆 Profesión & Resumen Final</h2>
                <p class="cw-step-subtitle">Último paso: define tu trasfondo profesional y revisa toda la ficha.</p>

                <div class="cw-form-grid">
                    <div class="cw-field">
                        <label for="cw-profesion">Profesión de Trasfondo <span class="cw-opt">(opcional)</span></label>
                        <input type="text" id="cw-profesion" class="cw-input"
                               placeholder="Ej: Herrero, Alquimista, Explorador..." value="${state.profesion}">
                    </div>
                    <div class="cw-field">
                        <label for="cw-profesion-desc">¿Qué sabe hacer?</label>
                        <input type="text" id="cw-profesion-desc" class="cw-input"
                               placeholder="Descripción breve de su profesión..." value="${state.profesionDesc}">
                    </div>
                </div>

                <!-- ─── RESUMEN VISUAL ─── -->
                <div class="cw-summary-card" id="cw-summary-card">
                    <div class="cw-summary-top">
                        <div class="cw-summary-name">
                            ${state.nombre || '<em>Sin nombre</em>'} ${state.apellidos || ''}
                        </div>
                        <div class="cw-summary-tags">
                            <span class="cw-badge-tag">${state.categoria}</span>
                            <span class="cw-badge-tag race">${state.raza || 'Sin raza'}</span>
                            ${state.faccion ? `<span class="cw-badge-tag faction">${state.faccion}</span>` : ''}
                        </div>
                    </div>

                    <div class="cw-summary-vitals">
                        <div class="cw-vital hp">❤️ <strong>${stats.hp}</strong> Vida</div>
                        <div class="cw-vital mana">🔮 <strong>${stats.mana}</strong> Maná</div>
                        <div class="cw-vital spirit">🌀 <strong>${stats.spirit}</strong> Espíritu</div>
                    </div>

                    <div class="cw-summary-grid">

                        <div class="cw-summary-block">
                            <div class="cw-sum-block-title">⚡ Atributos</div>
                            ${Object.entries(state.atributos).map(([a, v]) => `
                                <div class="cw-sum-stat">
                                    <span>${ATTR_ICONS[a]} ${a}</span>
                                    <span class="cw-sum-val ${v > 0 ? 'highlight' : ''}">${v}</span>
                                </div>`).join('')}
                        </div>

                        ${talentEntries.length > 0 ? `
                        <div class="cw-summary-block">
                            <div class="cw-sum-block-title">✨ Talentos</div>
                            ${talentEntries.map(([t, v]) => `
                                <div class="cw-sum-stat">
                                    <span>${t}</span>
                                    <span class="cw-sum-val highlight">+${v}</span>
                                </div>`).join('')}
                        </div>` : ''}

                        ${(state.rasgosPositivos.length + state.rasgosNegativos.length) > 0 ? `
                        <div class="cw-summary-block">
                            <div class="cw-sum-block-title">🎭 Rasgos</div>
                            ${state.rasgosPositivos.map(r => `
                                <div class="cw-sum-trait positive">✦ ${r.nombre}${r.nivel ? ` (Nv.${r.nivel})` : ''}</div>`).join('')}
                            ${state.rasgosNegativos.map(r => `
                                <div class="cw-sum-trait negative">✗ ${r}</div>`).join('')}
                        </div>` : ''}

                        ${state.aptitudes.filter(a => a.nombre).length > 0 ? `
                        <div class="cw-summary-block">
                            <div class="cw-sum-block-title">⚡ Aptitudes</div>
                            ${state.aptitudes.filter(a => a.nombre).map(a => `
                                <div class="cw-sum-aptitud">
                                    <div class="cw-sum-apt-name">${a.nombre} <span class="cw-badge-tag small">${a.tipo}</span></div>
                                    ${a.descripcion ? `<div class="cw-sum-apt-desc">${a.descripcion}</div>` : ''}
                                </div>`).join('')}
                        </div>` : ''}

                        ${(state.hechizos || state.habilidades) ? `
                        <div class="cw-summary-block span2">
                            <div class="cw-sum-block-title">📖 Hechizos & Habilidades</div>
                            ${state.hechizos ? `<div class="cw-sum-text"><strong>Hechizos:</strong><br>${state.hechizos.replace(/\n/g, '<br>')}</div>` : ''}
                            ${state.habilidades ? `<div class="cw-sum-text"><strong>Habilidades:</strong><br>${state.habilidades.replace(/\n/g, '<br>')}</div>` : ''}
                        </div>` : ''}

                        ${state.profesion ? `
                        <div class="cw-summary-block">
                            <div class="cw-sum-block-title">🛠️ Profesión</div>
                            <div class="cw-sum-stat"><span>${state.profesion}</span></div>
                            ${state.profesionDesc ? `<div class="cw-text-muted">${state.profesionDesc}</div>` : ''}
                        </div>` : ''}

                    </div>
                </div>

                <!-- ─── EXPORTAR ─── -->
                <div class="cw-export-section">
                    <div class="cw-export-header">
                        <h3>📤 Exportar Ficha</h3>
                        <p class="cw-hint">Genera una cadena de texto para importar tu personaje en el Addon ingame.</p>
                    </div>
                    <button class="cw-export-btn" id="cw-export-btn" aria-label="Generar cadena de exportación">
                        ⬡ Generar Cadena de Exportación
                    </button>
                    <div class="cw-export-result hidden" id="cw-export-result">
                        <div class="cw-export-bar">
                            <span class="cw-export-bar-label">Cadena generada — cópiala en el Addon</span>
                            <button class="cw-copy-btn" id="cw-copy-btn" aria-label="Copiar al portapapeles">📋 Copiar</button>
                        </div>
                        <textarea class="cw-export-textarea" id="cw-export-text" readonly rows="4"
                                  aria-label="Cadena de exportación"></textarea>
                        <div class="cw-export-hint">
                            ✅ Formato <strong>GAC:v1</strong> — cadena Base64 lista para importar en el Addon.
                        </div>
                    </div>
                </div>
            </div>`;
    }

    // ============================================================
    // EVENT LISTENERS POR PASO
    // ============================================================

    function attachStepListeners() {
        const listeners = [
            attachStep1Listeners,
            attachStep2Listeners,
            attachStep3Listeners,
            attachStep4Listeners,
            attachStep5Listeners,
            attachStep6Listeners,
            attachStep7Listeners
        ];
        listeners[currentStep]?.();
    }

    /* ── PASO 1 ── */
    function attachStep1Listeners() {
        const nombreEl = document.getElementById('cw-nombre');
        if (nombreEl) nombreEl.addEventListener('input', e => { state.nombre = e.target.value; });

        const apellidosEl = document.getElementById('cw-apellidos');
        if (apellidosEl) apellidosEl.addEventListener('input', e => { state.apellidos = e.target.value; });

        // Nivel siempre es 1 en la creación guiada — no requiere listener

        // Maldición Huargen
        const worgenEl = document.getElementById('cw-worgen-curse');
        if (worgenEl) {
            worgenEl.addEventListener('change', e => {
                state.isWorgenCurse = e.target.checked;
                const textEl = document.getElementById('cw-worgen-text');
                if (textEl) textEl.textContent = state.isWorgenCurse ? 'Maldición activa' : 'Sin maldición';
                const toggle = document.getElementById('cw-worgen-toggle');
                if (toggle) toggle.classList.toggle('active', state.isWorgenCurse);
            });
        }

        // Categoría
        document.querySelectorAll('.cw-category-card').forEach(card => {
            card.addEventListener('click', () => {
                const cat = card.dataset.cat;
                if (state.categoria !== cat) {
                    state.categoria = cat;
                    // Reset attr points if switching to Novato
                    if (cat === 'Novato') {
                        state.atributos = { Destreza: 0, Fuerza: 0, Inteligencia: 0, Voluntad: 0, Constitución: 0, Sabiduría: 0, Carisma: 0 };
                        state.talentos = {};
                    }
                }
                document.querySelectorAll('.cw-category-card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
            });
        });

        // Faction tabs
        document.querySelectorAll('.cw-faction-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.cw-faction-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const grid = document.getElementById('cw-race-grid');
                if (grid) {
                    grid.innerHTML = renderRaceCards(tab.dataset.faction);
                    attachRaceCardListeners();
                }
            });
        });

        attachRaceCardListeners();
    }

    function attachRaceCardListeners() {
        document.querySelectorAll('.cw-race-card').forEach(card => {
            card.addEventListener('click', () => {
                document.querySelectorAll('.cw-race-card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                state.raza = card.dataset.race;
                state.faccion = card.dataset.faction;
                const preview = document.getElementById('cw-race-preview');
                if (preview) preview.innerHTML = renderRacePreview(state.raza, state.faccion);
            });
        });
    }

    /* ── PASO 2 ── */
    function attachStep2Listeners() {
        function refreshAttrUI() {
            const cat = CATEGORY_DATA[state.categoria];
            const rem = remainingAttrPoints();
            const stats = calcStats();

            const remEl = document.getElementById('cw-rem-points');
            if (remEl) {
                remEl.textContent = rem;
                const orb = remEl.closest('.cw-points-orb');
                if (orb) {
                    orb.classList.toggle('full', rem === 0);
                    orb.classList.toggle('over', rem < 0);
                }
            }

            const hpEl = document.getElementById('cw-hp');
            const manaEl = document.getElementById('cw-mana');
            const spiritEl = document.getElementById('cw-spirit');
            if (hpEl) hpEl.textContent = stats.hp;
            if (manaEl) manaEl.textContent = stats.mana;
            if (spiritEl) spiritEl.textContent = stats.spirit;

            // Update counter values and button states
            Object.keys(state.atributos).forEach(attr => {
                const key = attr.replace(/[^a-zA-Z]/g, '');
                const valEl = document.getElementById(`cw-attr-val-${key}`);
                if (valEl) valEl.textContent = state.atributos[attr];
            });

            document.querySelectorAll('.cw-counter-btn.minus[data-attr]').forEach(btn => {
                btn.disabled = (state.atributos[btn.dataset.attr] || 0) <= 0;
            });
            document.querySelectorAll('.cw-counter-btn.plus[data-attr]').forEach(btn => {
                btn.disabled = rem <= 0;
            });
        }

        document.querySelectorAll('.cw-counter-btn.minus[data-attr]').forEach(btn => {
            btn.addEventListener('click', () => {
                const attr = btn.dataset.attr;
                if ((state.atributos[attr] || 0) > 0) {
                    state.atributos[attr]--;
                    // Reset talents for this attribute
                    (data.attrTalents[attr]?.Talentos || []).forEach(t => { delete state.talentos[t]; });
                    refreshAttrUI();
                }
            });
        });

        document.querySelectorAll('.cw-counter-btn.plus[data-attr]').forEach(btn => {
            btn.addEventListener('click', () => {
                const attr = btn.dataset.attr;
                if (remainingAttrPoints() > 0) {
                    state.atributos[attr] = (state.atributos[attr] || 0) + 1;
                    refreshAttrUI();
                }
            });
        });
    }

    /* ── PASO 3 ── */
    function attachStep3Listeners() {
        function refreshTalentBlock(attr) {
            const rem = talentRemaining(attr);
            const remEl = document.querySelector(`[data-attr-rem="${attr}"]`);
            if (remEl) {
                remEl.textContent = rem;
                const badge = remEl.closest('.cw-talent-pts-badge');
                if (badge) badge.classList.toggle('full', rem === 0);
            }

            document.querySelectorAll(`.talent-val[data-talent-val]`).forEach(el => {
                const talent = el.dataset.talentVal;
                el.textContent = state.talentos[talent] || 0;
            });

            document.querySelectorAll(`.talent-minus[data-attr="${attr}"]`).forEach(btn => {
                btn.disabled = (state.talentos[btn.dataset.talent] || 0) <= 0;
            });
            document.querySelectorAll(`.talent-plus[data-attr="${attr}"]`).forEach(btn => {
                btn.disabled = talentRemaining(attr) <= 0;
            });
        }

        document.querySelectorAll('.talent-minus').forEach(btn => {
            btn.addEventListener('click', () => {
                const t = btn.dataset.talent;
                const a = btn.dataset.attr;
                if ((state.talentos[t] || 0) > 0) {
                    state.talentos[t]--;
                    refreshTalentBlock(a);
                }
            });
        });

        document.querySelectorAll('.talent-plus').forEach(btn => {
            btn.addEventListener('click', () => {
                const t = btn.dataset.talent;
                const a = btn.dataset.attr;
                if (talentRemaining(a) > 0) {
                    state.talentos[t] = (state.talentos[t] || 0) + 1;
                    refreshTalentBlock(a);
                }
            });
        });
    }

    /* ── PASO 4 ── */
    function attachStep4Listeners() {
        const cat = CATEGORY_DATA[state.categoria];

        function updateCounters() {
            const posEl = document.getElementById('cw-pos-cnt');
            const negEl = document.getElementById('cw-neg-cnt');
            if (posEl) posEl.textContent = usedPositiveSlots();
            if (negEl) negEl.textContent = state.rasgosNegativos.length;
        }

        function refreshPosCardStates() {
            const slotsLeft = cat.positiveSlots - usedPositiveSlots();
            document.querySelectorAll('.cw-trait-card[data-type="positive"]').forEach(c => {
                const isSel = !!state.rasgosPositivos.find(r => r.nombre === c.dataset.trait);
                // Deshabilitar si no está seleccionado y no cabe ni 1 slot más
                c.classList.toggle('disabled', !isSel && slotsLeft <= 0);
            });
            // Deshabilitar botones de nivel 2 si solo queda 1 slot libre
            document.querySelectorAll('.cw-level-btn[data-level="2"]').forEach(btn => {
                const traitName = btn.dataset.trait;
                const existing = state.rasgosPositivos.find(r => r.nombre === traitName);
                if (!existing) return;
                // Coste actual del rasgo + coste nuevo vs slots totales
                const currentCost = existing.nivel === 2 ? 2 : 1;
                const slotsWithoutThis = usedPositiveSlots() - currentCost;
                btn.disabled = (slotsWithoutThis + 2) > cat.positiveSlots;
            });
        }

        function refreshNegCardStates() {
            // Sin tope: solo bloqueamos por incompatibilidades
            document.querySelectorAll('.cw-trait-card[data-type="negative"]').forEach(c => {
                const isSel = state.rasgosNegativos.includes(c.dataset.trait);
                const incompat = isIncompatible(c.dataset.trait);
                c.classList.toggle('incompatible', incompat && !isSel);
                c.classList.remove('disabled');
            });
        }

        // Positive trait cards
        document.querySelectorAll('.cw-trait-card[data-type="positive"]').forEach(card => {
            card.addEventListener('click', e => {
                if (e.target.closest('.cw-level-btn')) return;
                if (card.classList.contains('disabled')) return;

                const traitName = card.dataset.trait;
                const existing = state.rasgosPositivos.find(r => r.nombre === traitName);

                if (existing) {
                    state.rasgosPositivos = state.rasgosPositivos.filter(r => r.nombre !== traitName);
                    card.classList.remove('selected');
                    card.querySelector('.cw-trait-check')?.remove();
                    const lvls = card.querySelector('.cw-trait-levels');
                    if (lvls) lvls.classList.add('hidden');
                    card.querySelectorAll('.cw-level-btn').forEach(b => b.classList.remove('active'));
                } else {
                    // Comprobar si hay al menos 1 slot libre para añadirlo
                    if (usedPositiveSlots() >= cat.positiveSlots) return;

                    const traitData = data.positiveTraits.find(t => t.Nombre === traitName);
                    const levels = [1, 2, 3].filter(l => traitData?.[`Nivel ${l}`] !== null);
                    const defaultLevel = levels.length > 0 ? 1 : null;

                    state.rasgosPositivos.push({ nombre: traitName, nivel: defaultLevel });
                    card.classList.add('selected');

                    // Show check
                    if (!card.querySelector('.cw-trait-check')) {
                        const check = document.createElement('div');
                        check.className = 'cw-trait-check';
                        check.textContent = '✓';
                        card.querySelector('.cw-trait-header')?.appendChild(check);
                    }

                    // Show levels
                    const lvls = card.querySelector('.cw-trait-levels');
                    if (lvls) {
                        lvls.classList.remove('hidden');
                        const firstBtn = lvls.querySelector('.cw-level-btn[data-level="1"]');
                        if (firstBtn) firstBtn.classList.add('active');
                    }
                }

                updateCounters();
                refreshPosCardStates();
            });
        });

        // Level buttons — con validación de slots
        document.querySelectorAll('.cw-level-btn').forEach(btn => {
            btn.addEventListener('click', e => {
                e.stopPropagation();
                if (btn.disabled) return;
                const traitName = btn.dataset.trait;
                const level = parseInt(btn.dataset.level);
                const existing = state.rasgosPositivos.find(r => r.nombre === traitName);
                if (existing) {
                    const currentCost = existing.nivel === 2 ? 2 : 1;
                    const newCost = level === 2 ? 2 : 1;
                    const slotsWithoutThis = usedPositiveSlots() - currentCost;
                    // Verificar que el nuevo nivel cabe en el cupo restante
                    if (slotsWithoutThis + newCost > cat.positiveSlots) return;
                    existing.nivel = level;
                    btn.closest('.cw-trait-levels')?.querySelectorAll('.cw-level-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    updateCounters();
                    refreshPosCardStates();
                }
            });
        });

        // Negative trait cards
        document.querySelectorAll('.cw-trait-card[data-type="negative"]').forEach(card => {
            card.addEventListener('click', () => {
                if (card.classList.contains('incompatible') || card.classList.contains('disabled')) return;

                const traitName = card.dataset.trait;
                const isSel = state.rasgosNegativos.includes(traitName);

                if (isSel) {
                    // Permitir deseleccionar (sin restricción de mínimo en la UI)
                    state.rasgosNegativos = state.rasgosNegativos.filter(r => r !== traitName);
                    card.classList.remove('selected');
                    card.querySelector('.cw-trait-check')?.remove();
                } else {
                    // Sin máximo de rasgos negativos
                    state.rasgosNegativos.push(traitName);
                    card.classList.add('selected');

                    if (!card.querySelector('.cw-trait-check')) {
                        const check = document.createElement('div');
                        check.className = 'cw-trait-check';
                        check.textContent = '✓';
                        card.querySelector('.cw-trait-header')?.appendChild(check);
                    }
                }

                updateCounters();
                refreshNegCardStates();
            });
        });
    }

    /* ── PASO 5 ── */
    function attachStep5Listeners() {
        document.getElementById('cw-add-aptitud')?.addEventListener('click', () => {
            state.aptitudes.push({ nombre: '', tipo: 'Activa', acciones: 1, cooldown: 0, descripcion: '' });
            reRenderStep5();
        });

        document.querySelectorAll('[data-remove]').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.dataset.remove);
                state.aptitudes.splice(idx, 1);
                reRenderStep5();
            });
        });

        document.querySelectorAll('.apt-nombre').forEach(el => {
            el.addEventListener('input', e => { state.aptitudes[+e.target.dataset.index].nombre = e.target.value; });
        });
        document.querySelectorAll('.apt-tipo').forEach(el => {
            el.addEventListener('change', e => { state.aptitudes[+e.target.dataset.index].tipo = e.target.value; });
        });
        document.querySelectorAll('.apt-acciones').forEach(el => {
            el.addEventListener('input', e => { state.aptitudes[+e.target.dataset.index].acciones = parseInt(e.target.value) || 0; });
        });
        document.querySelectorAll('.apt-cooldown').forEach(el => {
            el.addEventListener('input', e => { state.aptitudes[+e.target.dataset.index].cooldown = parseInt(e.target.value) || 0; });
        });
        document.querySelectorAll('.apt-desc').forEach(el => {
            el.addEventListener('input', e => { state.aptitudes[+e.target.dataset.index].descripcion = e.target.value; });
        });
    }

    function reRenderStep5() {
        const body = document.getElementById('cw-body');
        if (body) {
            body.innerHTML = renderStep5();
            attachStep5Listeners();
        }
    }

    /* ── PASO 6 ── */
    function attachStep6Listeners() {
        document.getElementById('cw-hechizos')?.addEventListener('input', e => { state.hechizos = e.target.value; });
        document.getElementById('cw-habilidades')?.addEventListener('input', e => { state.habilidades = e.target.value; });

        document.querySelectorAll('.cw-ss-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.cw-ss-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                document.querySelectorAll('.cw-ss-panel').forEach(p => p.classList.add('hidden'));
                document.getElementById(`cw-panel-${tab.dataset.tab}`)?.classList.remove('hidden');
            });
        });
    }

    /* ── PASO 7 ── */
    function attachStep7Listeners() {
        document.getElementById('cw-profesion')?.addEventListener('input', e => { state.profesion = e.target.value; });
        document.getElementById('cw-profesion-desc')?.addEventListener('input', e => { state.profesionDesc = e.target.value; });

        document.getElementById('cw-export-btn')?.addEventListener('click', () => {
            const exportStr = buildExportString();

            const textarea = document.getElementById('cw-export-text');
            if (textarea) textarea.value = exportStr;

            document.getElementById('cw-export-result')?.classList.remove('hidden');
        });

        document.getElementById('cw-copy-btn')?.addEventListener('click', () => {
            const textarea = document.getElementById('cw-export-text');
            if (!textarea) return;
            navigator.clipboard.writeText(textarea.value).then(() => {
                const btn = document.getElementById('cw-copy-btn');
                if (btn) {
                    btn.textContent = '✓ ¡Copiado!';
                    btn.classList.add('copied');
                    setTimeout(() => {
                        btn.textContent = '📋 Copiar';
                        btn.classList.remove('copied');
                    }, 2500);
                }
            }).catch(() => {
                textarea.select();
                document.execCommand('copy');
            });
        });
    }

    /**
     * Genera el string de exportación en el formato GAC:v1 (string plano).
     *
     * Formato:
     *   GAC:v1:<raza1>:<raza2>:<nivel>:<categoría>:<atributos>:<talentos>:<isWorgenCurse>:<rasgosPositivos>:<rasgosNegativos>
     *
     * Todas las claves usan las keys internas en inglés del Addon
     * (fuente de verdad: js/meta/races.json y js/meta/attributes_talents.json).
     * Los rasgos se convierten a camelCase inglés mediante toTraitKey().
     */
    function buildExportString() {
        // Razas: mapear nombre display → key interna; fallback: 'void'
        const raza1 = RACE_KEY_MAP[state.raza] || 'void';
        const raza2 = RACE_KEY_MAP[state.razaSecundaria] || 'void';
        const nivel = '1'; // Siempre 1 en la creación guiada
        const categoria = CAT_KEY_MAP[state.categoria] || 'normal';
        const isWorgenCurse = state.isWorgenCurse ? 'true' : 'false';

        // Atributos: nombres español → key inglés (ATTR_KEY_MAP)
        const attrPairs = Object.entries(state.atributos)
            .map(([esp, val]) => `${ATTR_KEY_MAP[esp] || esp}=${val}`)
            .join(',');

        // Talentos: nombre español → key inglés (TALENT_KEY_MAP), solo los > 0
        const talentEntries = Object.entries(state.talentos).filter(([, v]) => v > 0);
        const talentPairs = talentEntries.length
            ? talentEntries.map(([esp, v]) => `${TALENT_KEY_MAP[esp] || toTraitKey(esp)}=${v}`).join(',')
            : 'void';

        // Rasgos positivos: toTraitKey(nombre)=nivel
        const positivePairs = state.rasgosPositivos.length
            ? state.rasgosPositivos.map(r => `${toTraitKey(r.nombre)}=${r.nivel || 0}`).join(',')
            : 'void';

        // Rasgos negativos: toTraitKey(nombre)=1
        const negativePairs = state.rasgosNegativos.length
            ? state.rasgosNegativos.map(r => `${toTraitKey(r)}=1`).join(',')
            : 'void';

        return [
            'GAC:v1',
            raza1,
            raza2,
            nivel,
            categoria,
            attrPairs,
            talentPairs,
            isWorgenCurse,
            positivePairs,
            negativePairs
        ].join(':');
    }

    // ============================================================
    // NAVEGACIÓN Y ESTRUCTURA DEL WIZARD
    // ============================================================

    function renderWizardShell() {
        return `
            <div class="char-wizard" id="char-wizard" role="main" aria-label="Asistente de creación de personaje">
                <!-- Cabecera de progreso -->
                <div class="cw-progress-header" aria-label="Progreso del wizard">
                    <div class="cw-progress-title">⬡ Crear Personaje</div>
                    <div class="cw-step-track" role="list">
                        ${STEP_META.map((s, i) => `
                            <div class="cw-step-node ${i === 0 ? 'active' : ''}" data-step="${i}"
                                 role="listitem" aria-label="Paso ${i + 1}: ${s.title}">
                                <div class="cw-node-circle">
                                    <span class="cw-node-icon">${s.icon}</span>
                                    <span class="cw-node-num">${i + 1}</span>
                                </div>
                                <span class="cw-node-label">${s.title}</span>
                            </div>
                            ${i < 6 ? '<div class="cw-node-connector"></div>' : ''}`).join('')}
                    </div>
                    <div class="cw-progress-bar-track" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                        <div class="cw-progress-bar-fill" id="cw-progress-fill"></div>
                    </div>
                </div>

                <!-- Contenido del paso -->
                <div class="cw-body" id="cw-body" aria-live="polite"></div>

                <!-- Navegación -->
                <div class="cw-nav-bar">
                    <button class="cw-nav-btn prev" id="cw-prev" aria-label="Paso anterior" style="visibility:hidden">← Anterior</button>
                    <div class="cw-nav-info" id="cw-nav-info" aria-live="polite">Paso 1 de 7</div>
                    <button class="cw-nav-btn next" id="cw-next" aria-label="Siguiente paso">Siguiente →</button>
                </div>
            </div>`;
    }

    function updateProgress() {
        const pct = (currentStep / 6) * 100;
        const fill = document.getElementById('cw-progress-fill');
        if (fill) {
            fill.style.width = pct + '%';
            fill.closest('[role="progressbar"]')?.setAttribute('aria-valuenow', pct.toFixed(0));
        }

        document.querySelectorAll('.cw-step-node').forEach((node, i) => {
            node.classList.remove('active', 'completed');
            if (i < currentStep) node.classList.add('completed');
            else if (i === currentStep) node.classList.add('active');
        });

        const navInfo = document.getElementById('cw-nav-info');
        if (navInfo) navInfo.textContent = `Paso ${currentStep + 1} de 7`;

        const prev = document.getElementById('cw-prev');
        const next = document.getElementById('cw-next');
        if (prev) prev.style.visibility = currentStep === 0 ? 'hidden' : 'visible';
        if (next) next.textContent = currentStep === 6 ? '✓ Ficha completada' : 'Siguiente →';
    }

    function updateWizardTOC() {
        const tocList = document.getElementById('fichas-toc');
        if (!tocList) return;

        tocList.innerHTML = STEP_META.map((s, i) => `
            <li>
                <a class="cw-toc-link ${i === currentStep ? 'active' : i < currentStep ? 'done' : ''}"
                   data-goto="${i}" href="#" aria-current="${i === currentStep ? 'step' : 'false'}">
                    ${s.icon} ${s.title}
                </a>
            </li>`).join('');

        tocList.querySelectorAll('.cw-toc-link').forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                const step = parseInt(link.dataset.goto);
                // Allow navigation to any visited step or step ahead (without strict validation)
                currentStep = step;
                renderCurrentStep();
            });
        });
    }

    const stepRenderers = [
        renderStep1, renderStep2, renderStep3,
        renderStep4, renderStep5, renderStep6, renderStep7
    ];

    function renderCurrentStep() {
        const body = document.getElementById('cw-body');
        if (!body) return;

        body.style.opacity = '0';
        body.style.transform = 'translateY(12px)';

        setTimeout(() => {
            body.innerHTML = stepRenderers[currentStep]();
            body.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            body.style.opacity = '1';
            body.style.transform = 'translateY(0)';

            attachStepListeners();
            updateProgress();
            updateWizardTOC();

            // Scroll wizard to top
            const wizard = document.getElementById('char-wizard');
            const scrollParent = document.getElementById('fichas-main-scroll');
            if (scrollParent) scrollParent.scrollTop = 0;
            else wizard?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 180);
    }

    function validateCurrentStep() {
        if (currentStep === 0) {
            if (!state.nombre.trim()) {
                highlightError(document.getElementById('cw-nombre'), 'Introduce un nombre para tu personaje.');
                return false;
            }
            if (!state.raza) {
                const raceGrid = document.getElementById('cw-race-grid');
                if (raceGrid) {
                    raceGrid.classList.add('cw-error-pulse');
                    setTimeout(() => raceGrid.classList.remove('cw-error-pulse'), 1000);
                }
                showToast('Por favor, elige una raza antes de continuar.');
                return false;
            }
        }
        return true;
    }

    function highlightError(el, msg) {
        if (!el) return;
        el.classList.add('cw-input-error');
        el.focus();
        showToast(msg);
        setTimeout(() => el.classList.remove('cw-input-error'), 2000);
    }

    function showToast(msg) {
        const existing = document.getElementById('cw-toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.id = 'cw-toast';
        toast.className = 'cw-toast';
        toast.textContent = msg;
        toast.setAttribute('role', 'alert');
        document.getElementById('char-wizard')?.appendChild(toast);

        requestAnimationFrame(() => {
            requestAnimationFrame(() => toast.classList.add('show'));
        });
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }, 3000);
    }

    // ============================================================
    // PUNTO DE ENTRADA PRINCIPAL
    // ============================================================

    window.initCharWizard = async function (container) {
        resetState();
        container.innerHTML = `
            <div class="cw-loading">
                <div class="cw-loading-rune">⬡</div>
                <p>Preparando el Grimorio del Personaje...</p>
            </div>`;

        try {
            await loadData();

            container.innerHTML = renderWizardShell();

            // Attach nav buttons
            document.getElementById('cw-next')?.addEventListener('click', () => {
                if (!validateCurrentStep()) return;
                if (currentStep < 6) {
                    currentStep++;
                    renderCurrentStep();
                }
            });

            document.getElementById('cw-prev')?.addEventListener('click', () => {
                if (currentStep > 0) {
                    currentStep--;
                    renderCurrentStep();
                }
            });

            renderCurrentStep();

        } catch (err) {
            console.error('[CharWizard] Error al cargar datos:', err);
            container.innerHTML = `
                <div class="kb-placeholder" style="color:#ff6666;">
                    <h2>Error al cargar el Wizard</h2>
                    <p>${err.message}</p>
                </div>`;
        }
    };

})();
