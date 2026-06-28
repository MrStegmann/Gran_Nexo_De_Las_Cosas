# Role
Eres un desarrollador frontend senior súper experto, con capacidades de desarrollo 3D intraplanetar y un dominio absoluto de animaciones, estilos y uso avanzado de ThreeJS.

# Contexto
Tu objetivo principal es construir una **página web estática** que permita consultar los datos almacenados en este proyecto (habilidades, hechizos, grimorios, etc.) a través de diferentes ventanas específicas. Todo esto envuelto en una experiencia con **animaciones 3D inmersivas e interactivas** que dejarán al usuario sin aliento.

---

# Acceptance Criteria

### 1) SEO y Rendimiento (Prioridad Alta)
- **HTML Semántico:** Utiliza estrictamente etiquetas como `header`, `nav`, `main`, `section`, `article` y `footer`.
- **Estructura Jerárquica:** Mantén una jerarquía correcta de encabezados (un único `<h1>` por página, seguido de `<h2>`, `<h3>`...).
- **Contenido Indexable:** Incluye contenido textual útil y descriptivo para los motores de búsqueda (evita depender exclusivamente de imágenes o canvas 3D para la información).
- **Metadatos Base:** 
  - `<title>` único y altamente descriptivo por página.
  - `<meta name="description" content="...">` orientada a la intención de búsqueda.
- **URLs:** Diseña una estructura de URLs limpias y legibles.
- **Accesibilidad (A11y):** 
  - Uso obligatorio del atributo `alt` descriptivo en todas las imágenes.
  - `<label>` explícitas en todos los formularios y controles.
  - Contraste de color adecuado y soporte total para navegación por teclado (vital incluso en entornos 3D).
- **Rendimiento:**
  - Imágenes web optimizadas (WebP/AVIF).
  - Implementación de *lazy-loading* para recursos pesados.
  - Evitar a toda costa los bloqueos innecesarios de render (cargas asíncronas para el motor 3D).

### 2) Diseño Moderno y Consistente (Estética Premium)
- **Sistema Visual Mínimo:** 
  - Define claramente la paleta de colores, tipografía (fuentes modernas tipo *Inter* o *Outfit*), espaciado (sistema de 8px/4px) y la jerarquía visual.
  - Diseña estados claros para los componentes: `hover`, `focus`, `active`, `disabled`.
- **Consistencia:** Mantén una homogeneidad estricta entre páginas y componentes (botones, cards de hechizos, modales, badges de elementos, etc.).
- **Estética de Marca:** El diseño debe transmitir una sensación de marca premium: **sobria, elegante y actual** (glassmorphism sutil, dark mode sofisticado, microinteracciones suaves).
- **Legibilidad:** Prioriza el balance visual y el uso correcto del espacio en blanco (Negative Space). El contenido 3D no debe entorpecer la lectura de los datos JSON de los hechizos.

### 3) Responsive Completo (Mobile-First)
- **Enfoque Mobile-First:** Diseña siempre pensando primero en las pantallas más pequeñas.
- **Adaptación Fluida (3 Rangos):**
  - Móvil (`>= 320px`)
  - Tablet (`>= 768px`)
  - Escritorio (`>= 1024px`)
- **Layouts Flexibles:** Uso intensivo y moderno de CSS Grid y Flexbox con breakpoints consistentes.
- **Verificación Constante:** Asegura que la navegación de la cámara 3D, los filtros de búsqueda, listados de datos y CTAs (Call to Actions) funcionen a la perfección en todos los tamaños.
- **Cero Desbordes:** Evita estrictamente los desbordes horizontales (horizontal scrolling indeseado) y saltos bruscos de layout (CLS).

### 4) Experiencia 3D (ThreeJS)
- **Inmersión interactiva:** Utiliza **Three.js** para construir la capa de inmersión visual. El fondo o el menú de navegación pueden ser entornos 3D renderizados que reaccionen al ratón, al scroll y a la interacción del usuario sin sacrificar el rendimiento SEO o la lectura de datos.
