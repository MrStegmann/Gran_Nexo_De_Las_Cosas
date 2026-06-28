document.addEventListener('DOMContentLoaded', () => {
    // Referencias principales
    const grimoireContainer = document.getElementById('grimoire-container');
    const heroContent = document.getElementById('hero-content');
    const spellsContainer = document.getElementById('spells-container');
    const attributeSelection = document.getElementById('attribute-selection');
    const schoolSelection = document.getElementById('school-selection');
    
    // Navegación principal
    const linkMecanicas = document.getElementById('link-mecanicas');
    const linkInicio = document.getElementById('link-inicio');
    
    // Elementos de la Knowledge Base
    const indexButtons = document.querySelectorAll('.kb-link');
    const contentArea = document.getElementById('grimoire-content');
    const searchInput = document.getElementById('kb-search');
    const tocList = document.getElementById('kb-toc');
    const mainScroll = document.getElementById('kb-main-scroll');

    // Elementos del Menú Móvil
    const mobileToggle = document.getElementById('mobile-toggle');
    const mainNav = document.getElementById('main-nav');

    // Toggle Menú Móvil
    if (mobileToggle && mainNav) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('is-active');
            mainNav.classList.toggle('is-open');
        });

        // Cerrar menú al hacer clic en un enlace (excepto el botón del dropdown)
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('is-active');
                mainNav.classList.remove('is-open');
            });
        });
    }

    // Navegación a Mecánicas
    if (linkMecanicas) {
        linkMecanicas.addEventListener('click', (e) => {
            e.preventDefault();
            
            document.querySelectorAll('#main-nav a').forEach(a => a.classList.remove('active'));
            linkMecanicas.classList.add('active');

            hideAllViews();
            grimoireContainer.classList.remove('hidden');
        });
    }

    // Navegación a Inicio
    if (linkInicio) {
        linkInicio.addEventListener('click', (e) => {
            e.preventDefault();
            
            document.querySelectorAll('#main-nav a').forEach(a => a.classList.remove('active'));
            linkInicio.classList.add('active');

            hideAllViews();
            if (heroContent) heroContent.style.display = 'block';
        });
    }

    // Caché de archivos para búsqueda profunda
    const fileCache = {};
    let cacheLoaded = false;

    async function loadKbCache() {
        if (cacheLoaded) return;
        cacheLoaded = true;
        const fetchPromises = Array.from(indexButtons).map(async (btn) => {
            const file = btn.getAttribute('data-file');
            try {
                const res = await fetch(file);
                fileCache[file] = await res.text();
            } catch (e) {
                console.error("Error al cachear " + file, e);
            }
        });
        await Promise.all(fetchPromises);
    }

    // Buscador del Índice (Full-Text)
    if (searchInput) {
        // Cargar caché cuando se enfoca el buscador para acelerar
        searchInput.addEventListener('focus', loadKbCache);

        searchInput.addEventListener('input', async (e) => {
            await loadKbCache(); // Asegurar carga
            
            const query = e.target.value.toLowerCase().trim();
            let firstMatchBtn = null;

            indexButtons.forEach(btn => {
                const file = btn.getAttribute('data-file');
                const title = btn.textContent.toLowerCase();
                const content = (fileCache[file] || '').toLowerCase();
                
                if (title.includes(query) || content.includes(query)) {
                    btn.parentElement.style.display = 'block';
                    if (!firstMatchBtn) firstMatchBtn = btn;
                } else {
                    btn.parentElement.style.display = 'none';
                }
            });

            if (firstMatchBtn && query !== '') {
                firstMatchBtn.click();
            }
        });
    }

    // Cargar contenido de los archivos MarkDown
    indexButtons.forEach(btn => {
        btn.addEventListener('click', async () => {
            // Activar botón en el índice
            indexButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const file = btn.getAttribute('data-file');
            
            // Efecto de disolución y carga
            contentArea.classList.remove('kb-content-fade-in');
            contentArea.innerHTML = '<div class="kb-placeholder"><h2 style="font-size: 1.5rem;">Canalizando conocimiento...</h2></div>';
            tocList.innerHTML = '<li style="color:var(--text-muted); font-size:0.85rem;">Generando esquema...</li>';

            try {
                const response = await fetch(file);
                if (!response.ok) throw new Error('El archivo no pudo ser leído por el Kirin Tor.');
                const markdownText = await response.text();

                // Parsear Markdown (usando marked si está disponible)
                let htmlContent = '';
                if (typeof marked !== 'undefined') {
                    htmlContent = marked.parse(markdownText);
                } else {
                    // Fallback básico si marked.js falla o no está cargado
                    htmlContent = `<p style="color:red">Librería marked.js no encontrada. Mostrando texto crudo:</p><pre>${markdownText}</pre>`;
                }

                // Inyectar HTML y aplicar animación
                contentArea.innerHTML = htmlContent;
                
                // Reiniciar animación para que vuelva a aplicarse
                void contentArea.offsetWidth; // trigger reflow
                contentArea.classList.add('kb-content-fade-in');
                
                // Reset scroll
                if(mainScroll) mainScroll.scrollTop = 0;

                // Generar Tabla de Contenidos (TOC)
                generateTOC(contentArea);

                // Eliminar HUD residual
                const oldHud = document.getElementById('search-nav-hud');
                if (oldHud) oldHud.remove();

                // Resaltar términos si hay búsqueda activa
                if (searchInput && searchInput.value.trim() !== '') {
                    highlightSearchTerm(contentArea, searchInput.value.trim());
                    setupSearchNavigation();
                }

            } catch (error) {
                contentArea.innerHTML = `
                    <div class="kb-placeholder" style="color: #ff4444; display: flex; flex-direction: column; align-items: center; text-align: center;">
                        <img src="assets/Azulito_Confused.png" alt="Azulito Confundido" style="max-width: 150px; margin-bottom: 20px; filter: drop-shadow(0 0 10px rgba(255,68,68,0.5));" />
                        <h2 style="color: #ff4444;">Error de Canalización</h2>
                        <p>${error.message}</p>
                    </div>`;
                tocList.innerHTML = '';
            }
        });
    });

    // Función para generar la Tabla de Contenidos dinámicamente
    function generateTOC(container) {
        if (!tocList) return;
        
        // Buscar todos los h2 y h3
        const headers = container.querySelectorAll('h2, h3');
        tocList.innerHTML = '';

        if (headers.length === 0) {
            tocList.innerHTML = '<li style="color:var(--text-muted); font-size:0.85rem;">Este texto no tiene divisiones.</li>';
            return;
        }

        headers.forEach((header, index) => {
            // Asignar un ID único al header si no lo tiene
            if (!header.id) {
                header.id = 'heading-' + index;
            }

            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = '#' + header.id;
            a.textContent = header.textContent;
            
            // Clase para indentar h3
            if (header.tagName.toLowerCase() === 'h3') {
                a.classList.add('toc-h3');
            }

            // Smooth scroll interno
            a.addEventListener('click', (e) => {
                e.preventDefault();
                header.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });

            li.appendChild(a);
            tocList.appendChild(li);
        });
    }

    function hideAllViews() {
        if (heroContent) heroContent.style.display = 'none';
        if (grimoireContainer) grimoireContainer.classList.add('hidden');
        if (attributeSelection) attributeSelection.classList.add('hidden');
        if (schoolSelection) schoolSelection.classList.add('hidden');
        if (spellsContainer) spellsContainer.classList.add('hidden');
    }

    // Lógica de resaltado mágico (Full-text search)
    function highlightSearchTerm(element, query) {
        if (!query) return;
        // Escapar regex
        const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        
        // Usamos un caminante de nodos para no destruir el HTML
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
        const nodesToReplace = [];
        let node;
        while (node = walker.nextNode()) {
            if (node.parentNode.tagName === 'MARK') continue;
            if (node.parentNode.tagName === 'SCRIPT' || node.parentNode.tagName === 'STYLE') continue;
            if (regex.test(node.nodeValue)) {
                nodesToReplace.push(node);
            }
        }

        nodesToReplace.forEach(n => {
            const frag = document.createDocumentFragment();
            let lastIdx = 0;
            n.nodeValue.replace(regex, (match, p1, offset) => {
                if (offset > lastIdx) {
                    frag.appendChild(document.createTextNode(n.nodeValue.slice(lastIdx, offset)));
                }
                const mark = document.createElement('mark');
                mark.className = 'search-highlight';
                mark.textContent = match;
                frag.appendChild(mark);
                lastIdx = offset + match.length;
            });
            if (lastIdx < n.nodeValue.length) {
                frag.appendChild(document.createTextNode(n.nodeValue.slice(lastIdx)));
            }
            n.parentNode.replaceChild(frag, n);
        });
    }

    function setupSearchNavigation() {
        const highlights = Array.from(contentArea.querySelectorAll('mark.search-highlight'));
        if (highlights.length === 0) return;

        let currentIndex = 0;
        
        // Crear HUD flotante
        const hud = document.createElement('div');
        hud.id = 'search-nav-hud';
        hud.innerHTML = `
            <span id="hud-match-count">1 / ${highlights.length}</span>
            <div class="hud-controls">
                <button id="hud-prev">▲</button>
                <button id="hud-next">▼</button>
                <button id="hud-close">✕</button>
            </div>
        `;
        
        const layout = document.querySelector('.kb-layout');
        layout.appendChild(hud);

        const countSpan = hud.querySelector('#hud-match-count');
        
        function updateHighlight() {
            highlights.forEach(h => h.classList.remove('active'));
            if (highlights[currentIndex]) {
                highlights[currentIndex].classList.add('active');
                // Ajustamos el scroll para que se centre en la pantalla
                highlights[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            countSpan.textContent = `${currentIndex + 1} / ${highlights.length}`;
        }

        hud.querySelector('#hud-prev').addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + highlights.length) % highlights.length;
            updateHighlight();
        });

        hud.querySelector('#hud-next').addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % highlights.length;
            updateHighlight();
        });
        
        hud.querySelector('#hud-close').addEventListener('click', () => {
            hud.remove();
            searchInput.value = ''; // Opcional: borrar la busqueda
            searchInput.dispatchEvent(new Event('input')); // disparar filtrado
            
            // Eliminar resaltado restaurando nodos de texto
            highlights.forEach(h => {
                if(h.parentNode) {
                    const parent = h.parentNode;
                    parent.replaceChild(document.createTextNode(h.textContent), h);
                    parent.normalize(); 
                }
            });
        });

        // Activar la primera coincidencia con un ligero retraso para permitir el layout
        setTimeout(updateHighlight, 100);
    }
});
