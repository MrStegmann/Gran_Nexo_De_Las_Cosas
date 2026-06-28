document.addEventListener('DOMContentLoaded', () => {
    // Referencias principales y elementos de la Knowledge Base de Inventario
    const inventarioContainer = document.getElementById('inventario-container');
    const indexButtons = inventarioContainer ? inventarioContainer.querySelectorAll('.inventario-link') : [];
    const contentArea = document.getElementById('inventario-content');
    const searchInput = inventarioContainer ? inventarioContainer.querySelector('.kb-search-input') : null;
    const tocList = document.getElementById('inventario-toc');
    const mainScroll = document.getElementById('inventario-main-scroll');

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

                // Inicializar botones de copiar para bloques de código
                setupCopyButtons(contentArea);

                // Configurar enlaces cruzados si apuntan de vuelta a fichas (opcional)
                setupCrossLinksToFichas(contentArea);

                // Eliminar HUD residual de otro lado si existe
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

    // Lógica de resaltado mágico (Full-text search)
    function highlightSearchTerm(element, query) {
        if (!query) return;
        const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')})`, 'gi');
        
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

    // Configurar la navegación de la búsqueda
    function setupSearchNavigation() {
        const highlights = Array.from(contentArea.querySelectorAll('mark.search-highlight'));
        if (highlights.length === 0) return;

        let currentIndex = 0;
        
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
        
        const layout = document.querySelector('#inventario-container .kb-layout');
        if(layout) layout.appendChild(hud);

        const countSpan = hud.querySelector('#hud-match-count');
        
        function updateHighlight() {
            highlights.forEach(h => h.classList.remove('active'));
            if (highlights[currentIndex]) {
                highlights[currentIndex].classList.add('active');
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
            searchInput.value = '';
            searchInput.dispatchEvent(new Event('input'));
            
            highlights.forEach(h => {
                if(h.parentNode) {
                    const parent = h.parentNode;
                    parent.replaceChild(document.createTextNode(h.textContent), h);
                    parent.normalize(); 
                }
            });
        });

        setTimeout(updateHighlight, 100);
    }

    // Botones de copiar reutilizando estilos de styles.css
    function setupCopyButtons(container) {
        const preElements = container.querySelectorAll('pre');
        preElements.forEach(pre => {
            if (pre.parentElement.classList.contains('code-block-container')) return;

            const wrapper = document.createElement('div');
            wrapper.className = 'code-block-container';
            pre.parentNode.insertBefore(wrapper, pre);
            wrapper.appendChild(pre);

            const btn = document.createElement('button');
            btn.className = 'copy-code-btn';
            btn.type = 'button';
            btn.textContent = 'Copiar';
            wrapper.appendChild(btn);

            btn.addEventListener('click', async () => {
                const codeText = pre.textContent.trim();
                try {
                    await navigator.clipboard.writeText(codeText);
                    btn.textContent = '✓ Copiado';
                    btn.classList.add('copied');
                    setTimeout(() => {
                        btn.textContent = 'Copiar';
                        btn.classList.remove('copied');
                    }, 2000);
                } catch (err) {
                    console.error('Error al copiar:', err);
                    btn.textContent = '⚠️ Error';
                    setTimeout(() => btn.textContent = 'Copiar', 2000);
                }
            });
        });
    }

    // Interceptor para links que regresen a Fichas (ej: assets/documents/sheet/*)
    function setupCrossLinksToFichas(container) {
        container.querySelectorAll('a').forEach(a => {
            const href = a.getAttribute('href');
            if (href && href.includes('assets/documents/sheet/')) {
                a.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (typeof window.navigateTo === 'function') {
                        window.navigateTo('fichas');
                        setTimeout(() => {
                            const targetBtn = document.querySelector(`.fichas-link[data-file="${href}"]`);
                            if (targetBtn) {
                                targetBtn.click();
                            } else {
                                const fileName = href.split('/').pop();
                                const fallbackBtn = Array.from(document.querySelectorAll('.fichas-link')).find(btn => {
                                    const btnFile = btn.getAttribute('data-file') || '';
                                    return btnFile.includes(fileName);
                                });
                                if (fallbackBtn) fallbackBtn.click();
                            }
                        }, 100);
                    }
                });
            }
        });
    }

    const btnReturnInventario = document.getElementById('btn-return-inventario');
    if (btnReturnInventario) {
        btnReturnInventario.addEventListener('click', () => {
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
