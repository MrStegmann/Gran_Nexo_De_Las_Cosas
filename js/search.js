document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('global-search');
    const resultsContainer = document.getElementById('search-results');
    
    // Lista de archivos JSON a indexar (rutas relativas desde el index.html)
    const jsonSources = [
        { url: 'sistema_de_rol/spells/Arcane/hechizos_arcanos.json', label: 'Magia Arcana' },
        { url: 'sistema_de_rol/spells/Elemental/hechizos_elementales.json', label: 'Magia Elemental' },
        { url: 'sistema_de_rol/spells/Faith/HolyLight/hechizos_luz_sagrada.json', label: 'Luz Sagrada' },
        { url: 'sistema_de_rol/spells/Shadow/hechizos_sombras.json', label: 'Sombras' },
        { url: 'js/meta/strength_skills.json', label: 'Habilidad (Fuerza)' },
        { url: 'js/meta/dex_skills.json', label: 'Habilidad (Destreza)' }
        // Se pueden añadir más según sea necesario
    ];

    let searchIndex = [];

    // Carga asíncrona de todos los JSON
    async function buildIndex() {
        for (const source of jsonSources) {
            try {
                const response = await fetch(source.url);
                if (response.ok) {
                    const data = await response.json();
                    
                    // Transformar los datos para homogeneizar el buscador
                    data.forEach(item => {
                        searchIndex.push({
                            title: item.Nombre || item.Skill || 'Sin nombre',
                            description: item.Descripción || item.Description || '',
                            type: item.Tipo || item.Type || 'Habilidad',
                            sourceLabel: source.label,
                            urlPath: source.url, // Para saber de dónde viene
                            raw: item // Guardamos todo por si acaso
                        });
                    });
                } else {
                    console.warn(`No se pudo cargar: ${source.url}`);
                }
            } catch (error) {
                console.warn(`Error de red cargando: ${source.url}`, error);
            }
        }
        console.log(`[Search Engine] Indexadas ${searchIndex.length} entradas en memoria.`);
    }

    // Iniciar indexación en background
    buildIndex();

    // Lógica del buscador
    if (searchInput && resultsContainer) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            resultsContainer.innerHTML = ''; // Limpiar resultados

            if (query.length < 2) {
                resultsContainer.classList.add('hidden');
                return;
            }

            // Filtrar coincidencias en título, descripción o tipo
            const results = searchIndex.filter(item => {
                return (item.title && item.title.toLowerCase().includes(query)) ||
                       (item.description && item.description.toLowerCase().includes(query)) ||
                       (item.type && item.type.toLowerCase().includes(query));
            });

            if (results.length > 0) {
                resultsContainer.classList.remove('hidden');
                
                // Mostrar máximo 10 resultados para no saturar el DOM
                results.slice(0, 10).forEach(res => {
                    const li = document.createElement('li');
                    li.className = 'search-result-item';
                    li.setAttribute('role', 'option');
                    li.innerHTML = `
                        <div class="result-title">${highlightMatch(res.title, query)}</div>
                        <div class="result-meta">${res.sourceLabel} • ${res.type}</div>
                        <div class="result-desc">${res.description}</div>
                    `;
                    
                    // Evento click simulado
                    li.addEventListener('click', () => {
                        // En un entorno de producción estático real, redirigiría a "hechizos.html?id=xxx"
                        // o inyectaría el JSON en el <main>. Por ahora solo limpiamos.
                        searchInput.value = res.title;
                        resultsContainer.classList.add('hidden');
                        console.log("Navegar a: ", res);
                        alert(`Has seleccionado: ${res.title}\n(Aquí la UI cargaría los datos de ${res.sourceLabel})`);
                    });

                    resultsContainer.appendChild(li);
                });
            } else {
                resultsContainer.classList.remove('hidden');
                resultsContainer.innerHTML = `<li class="search-result-item" style="color: var(--text-muted); cursor: default;">No se encontraron resultados para "${query}".</li>`;
            }
        });

        // Cerrar buscador al clickear fuera
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                resultsContainer.classList.add('hidden');
            }
        });
    }

    // Helper: Resaltar texto coincidente
    function highlightMatch(text, query) {
        if (!text) return '';
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<span style="background: rgba(0,240,255,0.3); color: #fff;">$1</span>');
    }
});
