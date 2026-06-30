import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './Tesseract.css';
import { useConstellationStore } from '../../features/constellation/store/useConstellationStore';

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 bg-white/10 hover:bg-white/20 text-xs px-2 py-1 rounded transition-colors border border-white/20 uppercase tracking-wider"
    >
      {copied ? '¡Copiado!' : 'Copiar'}
    </button>
  );
};

export interface TesseractSection {
  id: string;
  title: string;
  markdown: string;
  customComponent?: React.ReactNode;
  filterOptions?: string[];
}

export interface TesseractProps {
  /** Content to render if not using sections mode. */
  children?: React.ReactNode;
  /** Sections containing markdown for the advanced layout. */
  sections?: TesseractSection[];
  /** The primary color of the Tesseract. @default "#00f0ff" */
  color?: string;
  /** Additional class names for the container. */
  className?: string;
  /** Additional style for the container. */
  style?: React.CSSProperties;
  /** Callback for when the close button is clicked. */
  onClose?: () => void;
}

const HighlightText = ({ text, query }: { text: string; query: string }) => {
  if (!query) return <>{text}</>;
  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="tesseract-match-highlight bg-yellow-500/60 text-white rounded px-1 transition-all">{part}</mark>
        ) : (
          part
        )
      )}
    </>
  );
};

const renderWithHighlights = (node: React.ReactNode, query: string): React.ReactNode => {
  if (!query) return node;
  if (typeof node === 'string') {
    return <HighlightText text={node} query={query} />;
  }
  if (Array.isArray(node)) {
    return React.Children.map(node, child => renderWithHighlights(child, query));
  }
  if (React.isValidElement(node)) {
    const props = node.props as any;
    if (props && props.children) {
      return React.cloneElement(node, {
        ...props,
        children: renderWithHighlights(props.children, query)
      });
    }
  }
  return node;
};

function extractHeadings(markdown: string) {
  const regex = /^(#{1,6})\s+(.+)$/gm;
  const headings = [];
  let match;
  while ((match = regex.exec(markdown)) !== null) {
    headings.push({
      level: match[1].length,
      text: match[2].trim(),
      id: match[2].trim().toLowerCase().replace(/[^\w]+/g, '-')
    });
  }
  return headings;
}

export const Tesseract: React.FC<TesseractProps> = ({
  children,
  sections,
  color = '#00f0ff',
  className = '',
  style
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const getInitialState = () => {
    const pendingSectionId = useConstellationStore.getState().pendingSectionId;
    
    // Usar location de react-router-dom asegura que durante la transición de rutas 
    // tenemos el hash correcto y no hay problemas de carrera con window.location.
    const hashContent = location.hash.substring(1);
    const [hashSection, hashQueryString] = hashContent.split('?');
    const hashParams = new URLSearchParams(hashQueryString || '');
    const realParams = new URLSearchParams(location.search);
    const search = hashParams.get('search') || realParams.get('search') || '';
    
    let activeId = sections && sections.length > 0 ? sections[0].id : null;
    
    // Prioridad 1: pendingSectionId (guardado globalmente en el click)
    const targetSection = pendingSectionId || hashSection;
    
    if (targetSection && sections?.some(s => s.id === targetSection)) {
      activeId = targetSection;
    }
    
    if (pendingSectionId) {
      // Limpiar el estado pendiente para no afectar futuras navegaciones
      setTimeout(() => useConstellationStore.getState().setPendingSectionId(null), 10);
    }
    
    return { activeId, search };
  };

  const [initialData] = useState(getInitialState);
  const [searchQuery, setSearchQuery] = useState(initialData.search);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(initialData.activeId);
  const [isMobileIndexOpen, setIsMobileIndexOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>('Todos');

  // Sync state when location.hash changes externally (e.g. browser back button or internal same-page links)
  useEffect(() => {
    const hashContent = location.hash.substring(1);
    if (!hashContent) return;
    
    const [hashSection, hashQueryString] = hashContent.split('?');
    const hashParams = new URLSearchParams(hashQueryString || '');
    const realParams = new URLSearchParams(location.search);
    const search = hashParams.get('search') || realParams.get('search') || '';
    
    if (hashSection && sections?.some(s => s.id === hashSection)) {
      if (hashSection !== activeSectionId) {
        setActiveSectionId(hashSection);
      }
    }
    if (search && search !== searchQuery) {
      setSearchQuery(search);
    }
  }, [location.hash, location.search, sections]); // Escucha cambios en la URL

  // Match navigation state
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const [totalMatches, setTotalMatches] = useState(0);

  // Sync to URL
  useEffect(() => {
    if (!sections) return; // Only sync if in sections mode

    const currentUrl = new URL(window.location.href);
    let changed = false;

    let targetHash = activeSectionId || '';
    if (searchQuery) {
      targetHash += `?search=${encodeURIComponent(searchQuery)}`;
    }

    if (currentUrl.hash !== `#${targetHash}`) {
      currentUrl.hash = targetHash;
      changed = true;
    }

    // Limpiar query params reales si existieran
    if (currentUrl.searchParams.has('search')) {
      currentUrl.searchParams.delete('search');
      changed = true;
    }

    if (changed) {
      window.history.replaceState(null, '', currentUrl.toString());
    }
  }, [activeSectionId, searchQuery, sections]);

  // Filter sections based on search query
  const filteredSections = useMemo(() => {
    if (!sections) return [];
    if (!searchQuery.trim()) return sections;
    const q = searchQuery.toLowerCase();
    return sections.filter(sec =>
      sec.title.toLowerCase().includes(q) || sec.markdown.toLowerCase().includes(q)
    );
  }, [sections, searchQuery]);

  // If active section is filtered out, try to select the first available one
  useEffect(() => {
    if (searchQuery && filteredSections.length > 0 && !filteredSections.find(s => s.id === activeSectionId)) {
      setActiveSectionId(filteredSections[0].id);
    }
  }, [searchQuery, filteredSections, activeSectionId]);

  const activeSection = sections?.find(s => s.id === activeSectionId);

  useEffect(() => {
    if (activeSection?.filterOptions && activeSection.filterOptions.length > 0) {
      setActiveFilter(activeSection.filterOptions[0]);
    }
  }, [activeSectionId, activeSection?.filterOptions]);

  const headings = useMemo(() => {
    if (!activeSection) return [];
    return extractHeadings(activeSection.markdown);
  }, [activeSection]);

  // Effect to handle match navigation
  useEffect(() => {
    if (!searchQuery) {
      setTotalMatches(0);
      setCurrentMatchIndex(0);
      return;
    }
    // Give it a small timeout to let React render the markdown
    const timer = setTimeout(() => {
      const marks = document.querySelectorAll('.tesseract-match-highlight');
      setTotalMatches(marks.length);
      if (marks.length > 0) {
        // Only reset to 0 if the current index is out of bounds
        if (currentMatchIndex >= marks.length) {
          setCurrentMatchIndex(0);
        }
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [searchQuery, activeSectionId]);

  // Effect to scroll to the active match
  useEffect(() => {
    if (totalMatches > 0) {
      const marks = document.querySelectorAll('.tesseract-match-highlight');
      if (marks[currentMatchIndex]) {
        // Highlight active match differently
        marks.forEach((m, idx) => {
          if (idx === currentMatchIndex) {
            (m as HTMLElement).style.boxShadow = `0 0 8px ${color}`;
            (m as HTMLElement).style.border = `1px solid ${color}`;
          } else {
            (m as HTMLElement).style.boxShadow = 'none';
            (m as HTMLElement).style.border = 'none';
          }
        });

        marks[currentMatchIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentMatchIndex, totalMatches, color]);

  const nextMatch = () => setCurrentMatchIndex(prev => (prev + 1) % totalMatches);
  const prevMatch = () => setCurrentMatchIndex(prev => (prev - 1 + totalMatches) % totalMatches);

  const customComponents = useMemo(() => ({
    p: ({ children }: any) => <p className="mb-4 leading-relaxed opacity-90 text-[13px] sm:text-sm md:text-base">{renderWithHighlights(children, searchQuery)}</p>,
    h1: ({ children }: any) => {
      const text = String(children).replace(/\n/g, '');
      const id = text.toLowerCase().replace(/[^\w]+/g, '-');
      return <h1 id={id} className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 mt-8 border-b border-opacity-30 pb-2" style={{ borderColor: color }}>{renderWithHighlights(children, searchQuery)}</h1>;
    },
    h2: ({ children }: any) => {
      const text = String(children).replace(/\n/g, '');
      const id = text.toLowerCase().replace(/[^\w]+/g, '-');
      return <h2 id={id} className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 mt-6 text-opacity-90 text-white">{renderWithHighlights(children, searchQuery)}</h2>;
    },
    h3: ({ children }: any) => {
      const text = String(children).replace(/\n/g, '');
      const id = text.toLowerCase().replace(/[^\w]+/g, '-');
      return <h3 id={id} className="text-base sm:text-lg md:text-xl font-medium mb-3 mt-5 text-opacity-80 text-white">{renderWithHighlights(children, searchQuery)}</h3>;
    },
    ul: ({ children }: any) => <ul className="list-disc pl-6 mb-4 space-y-1 opacity-90 text-[13px] sm:text-sm md:text-base">{children}</ul>,
    ol: ({ children }: any) => <ol className="list-decimal pl-6 mb-4 space-y-1 opacity-90 text-[13px] sm:text-sm md:text-base">{children}</ol>,
    li: ({ children }: any) => <li>{renderWithHighlights(children, searchQuery)}</li>,
    strong: ({ children }: any) => <strong className="font-bold text-white" style={{ textShadow: `0 0 5px ${color}40` }}>{renderWithHighlights(children, searchQuery)}</strong>,
    blockquote: ({ children }: any) => <blockquote className="border-l-4 pl-4 italic opacity-80 my-4" style={{ borderColor: color }}>{renderWithHighlights(children, searchQuery)}</blockquote>,
    a: ({ children, href }: any) => {
      const isInternal = href && !href.startsWith('http') && !href.startsWith('mailto:');
      
      const handleClick = (e: React.MouseEvent) => {
        if (isInternal) {
          // Si es un enlace de ancla pura (ej. #mi-titulo), dejamos el comportamiento por defecto
          if (href.startsWith('#')) {
            return;
          }
          
          e.preventDefault();
          let targetPath = href;
          // Asegurar que comience con / y que la parte de la ruta sea minúsculas para coincidir con NodeId
          if (!targetPath.startsWith('/')) {
            targetPath = '/' + targetPath;
          }
          const parts = targetPath.split('#');
          parts[0] = parts[0].toLowerCase();
          
          if (parts[1]) {
            useConstellationStore.getState().setPendingSectionId(parts[1]);
          }
          
          targetPath = parts.join('#');
          
          navigate(targetPath);
        }
      };

      return (
        <a 
          href={href} 
          onClick={handleClick}
          className="underline hover:opacity-80 transition-opacity" 
          style={{ color }}
          target={isInternal ? undefined : "_blank"}
          rel={isInternal ? undefined : "noopener noreferrer"}
        >
          {renderWithHighlights(children, searchQuery)}
        </a>
      );
    },
    pre: ({ children }: any) => {
      // Extract text content for the copy button
      let text = '';
      if (React.isValidElement<any>(children) && children.props && children.props.children) {
        text = String(children.props.children);
      }
      return (
        <div className="relative group mb-4">
          <pre className="bg-black/50 border border-white/10 rounded p-4 overflow-x-auto text-sm text-gray-300">
            {children}
          </pre>
          {text && <CopyButton text={text} />}
        </div>
      );
    },
    code: ({ inline, children }: any) => {
      if (inline) {
        return <code className="bg-white/10 px-1 py-0.5 rounded text-sm text-white/90">{children}</code>;
      }
      return <code className="font-mono">{children}</code>;
    },
  }), [searchQuery, color]);

  return (
    <div className={`w-full h-full flex justify-center items-center p-4 box-border animate-[fadeIn_0.5s_ease-out_forwards] ${className}`} style={style}>
      <div
        className="tesseract-layout-bg flex flex-col w-full h-full bg-black/70 backdrop-blur-2xl transform-gpu border border-[color-mix(in_srgb,var(--theme-color,#00f0ff)_40%,transparent)] overflow-hidden relative z-0 p-3.75 box-border rounded-lg shadow-2xl"
        style={{ '--theme-color': color } as React.CSSProperties}
      >
        {/* Inner Cube / Lines */}
        <div className="tesseract-inner-cube"></div>
        <div className="tesseract-connectors"></div>

        {/* Content Container */}
        <div className="relative z-20 w-full h-full flex flex-col text-white pt-0">

          {/* Si no hay secciones, usamos el modo clásico */}
          {!sections ? (
            children
          ) : (
            <div className="flex flex-col md:flex-row h-full overflow-hidden">

              {/* Left Sidebar (Desktop) / Top Area (Mobile) */}
              <aside className="w-full md:w-64 shrink-0 flex flex-col border-b md:border-b-0 md:border-r border-[color-mix(in_srgb,var(--theme-color,#00f0ff)_30%,transparent)] pb-4 md:pb-0 md:pr-4 overflow-hidden relative z-20">
                <div className="mb-4">
                  <div className="flex gap-2 mb-2 items-center">
                    <input
                      type="text"
                      placeholder="Buscar..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-black/50 border rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-all text-xs md:text-sm"
                      style={{ borderColor: `${color}60`, outlineColor: color }}
                    />
                  </div>
                  {totalMatches > 0 && searchQuery && (
                    <div className="flex justify-between items-center text-xs opacity-80 px-1">
                      <span>{currentMatchIndex + 1} de {totalMatches}</span>
                      <div className="flex gap-2">
                        <button onClick={prevMatch} className="hover:text-white transition-colors" style={{ color }}>▲</button>
                        <button onClick={nextMatch} className="hover:text-white transition-colors" style={{ color }}>▼</button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Mobile Accordion Toggle */}
                <div className="md:hidden">
                  <button
                    onClick={() => setIsMobileIndexOpen(!isMobileIndexOpen)}
                    className="w-full flex justify-between items-center bg-black/40 border border-transparent rounded px-3 py-2 text-xs uppercase tracking-wider font-semibold"
                    style={{ color }}
                  >
                    <span>{activeSection?.filterOptions ? 'Filtros' : (activeSection ? activeSection.title : 'Índice')}</span>
                    <span>{isMobileIndexOpen ? '▲' : '▼'}</span>
                  </button>
                </div>

                {/* Index List or Filters */}
                <div className={`flex-1 overflow-y-auto custom-scrollbar ${isMobileIndexOpen ? 'block' : 'hidden md:block'} mt-2 md:mt-0`}>
                  {activeSection?.filterOptions ? (
                    <div className="flex flex-col gap-2">
                      {activeSection.filterOptions.map(f => (
                        <button
                          key={f}
                          onClick={() => setActiveFilter(f)}
                          className={`w-full text-left px-3 py-2 rounded transition-colors text-xs md:text-sm ${activeFilter === f ? 'bg-black/60 font-bold' : 'hover:bg-black/40 opacity-80 hover:opacity-100'}`}
                          style={{ color: activeFilter === f ? color : 'white', borderLeft: activeFilter === f ? `3px solid ${color}` : '3px solid transparent' }}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <ul className="space-y-1">
                      {filteredSections.map(sec => (
                        <li key={sec.id}>
                          <button
                            onClick={() => { setActiveSectionId(sec.id); setIsMobileIndexOpen(false); }}
                            className={`w-full text-left px-3 py-2 rounded transition-colors text-xs md:text-sm ${activeSectionId === sec.id ? 'bg-black/60 font-bold' : 'hover:bg-black/40 opacity-80 hover:opacity-100'}`}
                            style={{ color: activeSectionId === sec.id ? color : 'white', borderLeft: activeSectionId === sec.id ? `3px solid ${color}` : '3px solid transparent' }}
                          >
                            {sec.title}
                          </button>
                        </li>
                      ))}
                      {filteredSections.length === 0 && (
                        <li className="text-center text-xs opacity-50 py-4">No se encontraron resultados</li>
                      )}
                    </ul>
                  )}
                </div>
              </aside>

              {/* Main Content Area */}
              <main className="flex-1 overflow-y-auto custom-scrollbar px-4 md:px-8 py-4 relative">
                {activeSection ? (
                  activeSection.customComponent ? (
                    React.isValidElement(activeSection.customComponent) 
                      ? React.cloneElement(activeSection.customComponent as React.ReactElement<any>, { searchQuery, activeFilter })
                      : activeSection.customComponent
                  ) : (
                    <div className="markdown-body max-w-3xl mx-auto">
                      <ReactMarkdown remarkPlugins={[remarkGfm]} components={customComponents}>
                        {activeSection.markdown}
                      </ReactMarkdown>
                    </div>
                  )
                ) : (
                  <div className="flex items-center justify-center h-full opacity-50">
                    <p>Selecciona una sección en el índice para leer.</p>
                  </div>
                )}
              </main>

              {/* Right Sidebar (ToC) - Desktop Only */}
              <aside className="hidden lg:flex w-64 shrink-0 flex-col border-l border-[color-mix(in_srgb,var(--theme-color,#00f0ff)_30%,transparent)] pl-4 overflow-y-auto custom-scrollbar">
                <h3 className="uppercase tracking-widest text-xs font-bold mb-4 opacity-70 mt-2" style={{ color }}>En esta sección</h3>
                <ul className="space-y-2">
                  {headings.map((h, i) => (
                    <li key={i} style={{ paddingLeft: `${(h.level - 1) * 0.75}rem` }}>
                      <a
                        href={`#${h.id}`}
                        className="text-xs opacity-70 hover:opacity-100 transition-opacity block truncate"
                        title={h.text}
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                  {headings.length === 0 && (
                    <li className="text-xs opacity-50">No hay encabezados</li>
                  )}
                </ul>
              </aside>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

