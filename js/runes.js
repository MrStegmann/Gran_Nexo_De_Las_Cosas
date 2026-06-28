document.addEventListener('DOMContentLoaded', () => {
    const runasContainer = document.getElementById('runas-container');
    if (!runasContainer) return;

    const indexList = document.getElementById('runas-index');
    const contentArea = document.getElementById('runas-content');
    const cardsContainer = document.getElementById('runas-cards-container');
    const searchInput = runasContainer.querySelector('.kb-search-input');
    const tocList = document.getElementById('runas-toc');
    const mainScroll = document.getElementById('runas-main-scroll');
    const returnBtn = document.getElementById('btn-return-runas');

    if (returnBtn) {
        returnBtn.addEventListener('click', () => {
            if (typeof window.navigateTo === 'function') {
                window.navigateTo('inicio');
            }
        });
    }

    // Schools for auto-discovery
    const potentialRunes = [
        { id: 'arcane', name: 'Arcanas' },
        { id: 'fel', name: 'Viles' },
        { id: 'nature', name: 'Naturaleza' },
        { id: 'shadow', name: 'Sombras' },
        { id: 'necro', name: 'Nigromancia' },
        { id: 'elune', name: 'Elune' },
        { id: 'holy_light', name: 'Luz Sagrada' },
        { id: 'elemental', name: 'Elementales' },
        { id: 'chi', name: 'Chi' }
    ];

    let currentRuneData = [];

    async function autoDiscoverRunes() {
        let indexCounter = 2; // Starts after "1. El Arte de las Runas"
        
        for (const rune of potentialRunes) {
            const filepath = `js/meta/${rune.id}_runes.json`;
            try {
                const response = await fetch(filepath, { method: 'HEAD' });
                if (response.ok) {
                    const li = document.createElement('li');
                    li.innerHTML = `<button class="kb-link runas-link" data-file="${filepath}" data-type="json">${indexCounter}. Runas ${rune.name}</button>`;
                    indexList.appendChild(li);
                    indexCounter++;
                    
                    // Attach event listener immediately
                    const btn = li.querySelector('button');
                    btn.addEventListener('click', (e) => loadRuneContent(e.target));
                }
            } catch (e) {
                // Ignore missing files
            }
        }
    }

    // Load initial Contexto
    const contextBtn = document.querySelector('.runas-link[data-type="md"]');
    if (contextBtn) {
        contextBtn.addEventListener('click', (e) => loadRuneContent(e.target));
    }

    async function loadRuneContent(btn) {
        // Update active class
        document.querySelectorAll('.runas-link').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const file = btn.getAttribute('data-file');
        const type = btn.getAttribute('data-type');
        
        contentArea.classList.remove('kb-content-fade-in');
        cardsContainer.classList.add('hidden');
        cardsContainer.innerHTML = '';
        currentRuneData = [];
        
        contentArea.innerHTML = '<div class="kb-placeholder"><h2 style="font-size: 1.5rem;">Canalizando conocimiento rúnico...</h2></div>';
        tocList.innerHTML = '<li style="color:var(--text-muted); font-size:0.85rem;">Generando esquema...</li>';

        try {
            const response = await fetch(file);
            if (!response.ok) throw new Error('No se pudo canalizar la runa.');
            
            if (type === 'md') {
                contentArea.style.display = 'block';
                const markdownText = await response.text();
                
                let htmlContent = '';
                if (typeof marked !== 'undefined') {
                    htmlContent = marked.parse(markdownText);
                } else {
                    htmlContent = `<pre>${markdownText}</pre>`;
                }

                contentArea.innerHTML = htmlContent;
                if(mainScroll) mainScroll.scrollTop = 0;
                
                // Generar TOC para MD
                generateTOC(contentArea, tocList);
            } else if (type === 'json') {
                contentArea.style.display = 'none';
                cardsContainer.classList.remove('hidden');
                
                const data = await response.json();
                currentRuneData = data;
                renderRuneCards(data);
                
                tocList.innerHTML = '<li style="color:var(--text-muted); font-size:0.85rem;">Tomo visual (Runas)</li>';
            }
            
            void contentArea.offsetWidth;
            contentArea.classList.add('kb-content-fade-in');

        } catch (error) {
            contentArea.style.display = 'block';
            contentArea.innerHTML = `<div class="kb-placeholder" style="display: flex; flex-direction: column; align-items: center; text-align: center;">
                <img src="assets/Azulito_Confused.png" alt="Azulito Confundido" style="max-width: 150px; margin-bottom: 20px; filter: drop-shadow(0 0 10px rgba(0,200,255,0.3));" />
                <h2 style="color: var(--theme-color);">¡Ups! Algo no cuadra...</h2>
                <p style="color: var(--text-muted);">${error.message}</p>
            </div>`;
        }
    }

    function renderRuneCards(runes) {
        cardsContainer.innerHTML = '';
        if (!runes || runes.length === 0) {
            cardsContainer.innerHTML = '<p style="color:var(--text-muted); text-align:center; grid-column: 1 / -1;">No hay runas registradas en este tomo.</p>';
            return;
        }

        runes.forEach(runa => {
            const card = document.createElement('div');
            card.className = 'spell-card';
            
            let trazadoHtml = '';
            if (runa.trazado) {
                trazadoHtml = '<div style="margin-top: 15px;"><strong>Trazado:</strong><ul style="padding-left:20px; font-size:0.9rem; margin-top:5px; margin-bottom: 10px; color:var(--text-muted);">';
                if (runa.trazado.tipo_1) trazadoHtml += `<li><b>Nivel 1:</b> ${runa.trazado.tipo_1}</li>`;
                if (runa.trazado.tipo_2) trazadoHtml += `<li><b>Nivel 2:</b> ${runa.trazado.tipo_2}</li>`;
                if (runa.trazado.tipo_3) trazadoHtml += `<li><b>Nivel 3:</b> ${runa.trazado.tipo_3}</li>`;
                if (runa.trazado.tipo_4) trazadoHtml += `<li><b>Nivel 4:</b> ${runa.trazado.tipo_4}</li>`;
                trazadoHtml += '</ul></div>';
            }

            let escaladoHtml = '';
            if (runa.escalado) {
                escaladoHtml = '<div><strong>Escalado:</strong><ul style="padding-left:20px; font-size:0.9rem; margin-top:5px; margin-bottom: 10px; color:var(--text-muted);">';
                if (runa.escalado.tipo_1) escaladoHtml += `<li><b>Nivel 1:</b> ${runa.escalado.tipo_1}</li>`;
                if (runa.escalado.tipo_2) escaladoHtml += `<li><b>Nivel 2:</b> ${runa.escalado.tipo_2}</li>`;
                if (runa.escalado.tipo_3) escaladoHtml += `<li><b>Nivel 3:</b> ${runa.escalado.tipo_3}</li>`;
                if (runa.escalado.tipo_4) escaladoHtml += `<li><b>Nivel 4:</b> ${runa.escalado.tipo_4}</li>`;
                escaladoHtml += '</ul></div>';
            }

            let imgHtml = '';
            if (runa.image_url) {
                imgHtml = `<div style="text-align: center; margin-bottom: 15px;">
                               <img src="${runa.image_url}" alt="${runa.nombre}" style="max-width: 100%; border-radius: var(--border-radius); border: 1px solid var(--border-color); box-shadow: 0 4px 10px rgba(0,0,0,0.5);">
                           </div>`;
            }

            card.innerHTML = `
                <div class="spell-header">
                    <h3 class="spell-title">${runa.nombre}</h3>
                    <div class="spell-school-badge">${runa.activacion || 'Desconocida'}</div>
                </div>
                <div class="spell-body">
                    ${imgHtml}
                    <p style="margin-bottom: 15px;"><em>${runa.descripcion_base || ''}</em></p>
                    ${trazadoHtml}
                    ${escaladoHtml}
                    ${runa.preparacion ? `<div style="margin-top: 10px;"><strong>Preparación:</strong> <span style="color:var(--text-muted); font-size:0.9rem;">${runa.preparacion}</span></div>` : ''}
                </div>
            `;
            cardsContainer.appendChild(card);
        });
    }

    // Buscador
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            if (cardsContainer.classList.contains('hidden') === false) {
                // Filtrando JSON (Runas)
                if (query === '') {
                    renderRuneCards(currentRuneData);
                } else {
                    const filtered = currentRuneData.filter(r => 
                        r.nombre.toLowerCase().includes(query) || 
                        (r.descripcion_base && r.descripcion_base.toLowerCase().includes(query))
                    );
                    renderRuneCards(filtered);
                }
            }
        });
    }

    // Helper for TOC (simil to inventario.js)
    function generateTOC(container, tocEl) {
        tocEl.innerHTML = '';
        const headers = container.querySelectorAll('h1, h2, h3');
        if (headers.length === 0) {
            tocEl.innerHTML = '<li style="color:var(--text-muted); font-size:0.85rem;">Sin secciones</li>';
            return;
        }

        headers.forEach((h, i) => {
            if (!h.id) h.id = 'rune-section-' + i;
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = '#' + h.id;
            a.textContent = h.textContent;
            a.className = 'kb-toc-link';
            
            // Indentar basado en el nivel
            const level = parseInt(h.tagName.substring(1));
            a.style.paddingLeft = ((level - 1) * 10) + 'px';
            
            a.addEventListener('click', (e) => {
                e.preventDefault();
                h.scrollIntoView({ behavior: 'smooth' });
            });
            
            li.appendChild(a);
            tocEl.appendChild(li);
        });
    }

    // Iniciar descubrimiento automático al cargar
    autoDiscoverRunes();
});
