# 📋 ANÁLISIS EXHAUSTIVO - PORTAFOLIO vs 3MEN2

**Fecha:** 2026-08-14  
**Referencia:** https://marv161.github.io/3men2/  
**Proyecto:** Portafolio (Reconstrucción desde cero)

---

## 📌 RESUMEN EJECUTIVO

La página de referencia es una **Single Page Application (SPA)** con:
- Layout fijo: Header + Sidebar
- 4 categorías de diseños
- Galerías paginadas (9 grupos cada una)
- Sistema de búsqueda en tiempo real
- Lightbox con navegación
- Selector de idioma ES/EN
- Diseño oscuro moderno (Dark mode)

**OBJETIVO:** Recrear esta experiencia en Portafolio con código nuevo, modular y sin reutilizar código original.

---

## 🏗️ ESTRUCTURA VISUAL

### Layout General

```
┌──────────────────────────────────────────────────────────────┐
│ HEADER (Fixed, 60-70px) - Glassmorphism                     │
│ [Logo] [Búsqueda] [Status●] [Bell] [Avatar] [Lang]          │
├─────────┬────────────────────────────────────────────────────┤
│SIDEBAR  │ CONTENIDO PRINCIPAL                                │
│(Fixed)  │ (margin-left: 80-100px, margin-top: 60-70px)      │
│         │                                                    │
│6 Botones│ [← Ver galería]                                    │
│Verticales│ FONDOS ANIMADOS                                   │
│         │                                                    │
│ • Logo  │ ┌─────────┐ ┌─────────┐ ┌─────────┐              │
│ • Home  │ │  Img1   │ │  Img2   │ │  Img3   │              │
│ • Xasp  │ │  Título │ │  Título │ │  Título │              │
│ • Anim  │ └─────────┘ └─────────┘ └─────────┘              │
│ • Static│                                                    │
│ • Pstyle│ [Ver grupo 1] [2] [3] ... [9]                    │
│         │                                                    │
└─────────┴────────────────────────────────────────────────────┘
```

### SIDEBAR (Izquierda - 80-100px ancho)

**6 elementos verticales:**
1. Logo "3M2" (clickeable → Home)
2. Botón Home
3. Botón Xatspaces
4. Botón Fondos Animados
5. Botón Fondos Estáticos
6. Botón Pstyles

**Estilos Botones:**
- Tamaño: 48×48px
- Border-radius: 8-12px
- Color normal: Gris #6b7280
- Color activo: Azul #2B7FFC
- Sombra activa: `shadow-[0_0_20px_rgba(43,127,252,0.4)]`
- Transición: 300ms ease
- Cursor: pointer

### HEADER (Arriba - 60-70px altura)

| Elemento | Ubicación | Función |
|----------|-----------|---------|
| Logo 3M2 | Izq | Volver a Home |
| Buscador | Centro | Filtrar por: nombre, tipo, color |
| Status● | Der | Muestra estado (AVAILABLE/ONLINE) |
| 🔔 Bell | Der | Notificaciones (badge con número) |
| 👤 Avatar | Der | Foto de usuario |
| EN/ES | Der | Selector idioma |

**Estilos Header:**
- Fondo: Glassmorphism (backdrop-blur + rgba)
- Z-index: 40+ (encima de contenido)
- Borde: 1px sutil #ffffff/5
- Position: fixed

---

## 🧭 NAVEGACIÓN COMPLETA

### Estructura de categorías

```
HOME
├─ XATSPACES
│  ├─ Grupo 1 (9 imágenes)
│  ├─ Grupo 2 (9 imágenes)
│  └─ Grupo 9 (9 imágenes)
├─ FONDOS ANIMADOS
│  ├─ Grupo 1
│  ├─ Grupo 2
│  └─ Grupo 9
├─ FONDOS ESTÁTICOS
│  ├─ Grupo 1
│  ├─ Grupo 2
│  └─ Grupo 9
└─ PSTYLES
   ├─ Grupo 1
   └─ Grupo 9
```

### Indicadores de estado

- **Botón activo:** Color azul #2B7FFC con sombra
- **Contenido:** Muestra solo la categoría activa
- **Título:** Grande, blanco, muestra nombre categoría

### Navegación entre grupos

- 9 botones: "Ver grupo 1" → "Ver grupo 9"
- Solo 1 grupo visible a la vez
- Botón activo destacado

---

## 🖼️ GALERÍA EN DETALLE

### Grid

- **Desktop:** 3 columnas (lg: grid-cols-3)
- **Tablet:** 2 columnas (md: grid-cols-2)
- **Móvil:** 1 columna (grid-cols-1)
- **Gap:** 20-30px
- **Imágenes por grupo:** 9 (3×3)
- **Total categoría:** ~81 imágenes (9 grupos × 9)

### Elemento de galería (Card)

```
┌─────────────────────┐
│    [  Imagen  ]     │  ← Clickeable
│                     │
│   Título/Alt text   │  ← Gris, pequeño
└─────────────────────┘
```

### Interacciones

- **Hover:** 
  - Scale: 1 → 1.05
  - Shadow: +30% más oscura
  - Cursor: pointer
  - Duración: 300ms
- **Click:** Abre Lightbox con imagen seleccionada

### Ejemplos de títulos

- "Japanese Black and White"
- "Pink Heart"
- "Anime Pink Purple"
- "Sky Blue woman"
- "Green Army"
- "Blue Flowers"

---

## 🖥️ LIGHTBOX/MODAL

### Cuándo se abre

- Click en cualquier imagen de galería
- Click en imagen de "Trabajos Recientes"

### Estructura visual

```
╔══════════════════════════════════════╗
║  [×]                                ║  ← Botón cerrar arriba
╠══════════════════════════════════════╣
║                                      ║
║  [◀] Botón Anterior                 ║
║                                      ║
║     [   Imagen Grande Responsiva   ] ║
║                                      ║
║           Botón Siguiente [▶]       ║
║                                      ║
║   Título - Posición (5 de 30)       ║
║                                      ║
╚══════════════════════════════════════╝
```

### Cómo cerrarlo

1. Click en botón "×" (esquina superior)
2. Click fuera de la imagen (fondo oscuro)
3. Tecla ESC
4. Navegar hasta el final/inicio

### Funcionalidades

- **Anterior:** Navega a imagen anterior
- **Siguiente:** Navega a imagen siguiente
- **Contador:** Muestra posición (ej: "5 de 30")
- **Información:** Título (alt text)
- **Responsivo:** Imagen escala con viewport
- **Animación:** Fade in/out 300ms

---

## 🔍 BUSCADOR

### Ubicación

Header central, entre logo y status

### Input

- Placeholder: "Busca diseños por tipo, nombre o color..."
- Type: text
- Maxlength: 100
- Búsqueda en tiempo real (onChange)

### Qué busca

1. **Nombre/Título:** "Pink Heart", "Japanese Black", "Flower"
2. **Tipo/Categoría:** "Fondos", "Xatspaces", "Animados", "Estáticos", "Pstyle"
3. **Color:** "Pink", "Blue", "Black", "Gold", "Purple", "Green"

### Comportamiento

- Filtra conforme escribes
- Busca en: nombres, categorías, tags, colores
- Muestra solo coincidencias
- Galería vacía si no hay coincidencias
- Busca case-insensitive

---

## 💰 SERVICIOS

### Ubicación

Página Home, después de "Trabajos Recientes"

### Los 4 Servicios

| # | Nombre | Descripción | Precio | Nota |
|---|--------|-------------|--------|------|
| 1 | Xatspaces | Diseños personalizados | Desde 2000 xats | *Sujeto a cambios |
| 2 | Fondos Animados | Efectos visuales a elección | 1200 xats | — |
| 3 | Fondos Estáticos | Modernos y alta calidad | Desde 800 xats | — |
| 4 | Pstyles | Lo mejor para tu perfil | Desde 600 xats | — |

### Estructura tarjeta servicio

```
┌────────────────────────┐
│ NOMBRE SERVICIO (H4)   │  ← Bold, blanco
│ Descripción text       │  ← Gris
│ Precio text            │  ← Destacado
│ *Nota (si hay)         │  ← Gris pequeño
└────────────────────────┘
```

### Interacción

- Hover: Scale 1.02, shadow aumenta
- Click: (probablemente → compra/contacto)

---

## 🌍 IDIOMAS

### Selector

Header lado derecho

### Opciones

- **EN:** Inglés (gris por defecto, azul si activo)
- **ES:** Español (gris por defecto, azul si activo)

### Cambios al seleccionar

- Todos los textos en la página
- Placeholder buscador
- Nombres categorías
- Textos botones
- Descripción servicios

### Persistencia

- Se guarda en localStorage
- Se mantiene al recargar página

---

## 🎨 PALETA DE COLORES

| Uso | Color | Hex | CSS |
|-----|-------|-----|-----|
| Azul Principal | Botón activo | #2B7FFC | `bg-[#2B7FFC]` |
| Azul Shadow | Sombra activa | rgba(43,127,252,0.4) | `shadow-[0_0_20px_rgba(...)]` |
| Fondo Principal | Body | #0f0f0f | `bg-black` |
| Fondo Alt | Panels | #1a1a1a | `bg-[#1a1a1a]` |
| Blanco Texto | Headings | #ffffff | `text-white` |
| Gris Claro | Secundario | #d1d5db | `text-gray-300` |
| Gris Oscuro | Labels | #6b7280 | `text-gray-500` |
| Verde Status | Indicador | #10b981 | `bg-green-500` |
| Dorado Logo | Logo 3M2 | #fbbf24 | (estimado) |
| Overlay Modal | Fondo modal | rgba(0,0,0,0.8) | `bg-black/80` |
| Transparencia | BG buttons | rgba(0,0,0,0.3) | `bg-black/30` |

---

## ⚡ ANIMACIONES Y TRANSICIONES

### Transición global

- **Duración:** 300ms
- **Easing:** ease-in-out
- **Aplicar a:** todos los cambios de estado

### Efectos por elemento

| Elemento | Hover | Click | Enter |
|----------|-------|-------|-------|
| Imagen Galería | Scale 1.05 + shadow | Abre Lightbox | Fade in 300ms |
| Botón Sidebar | Color + bg | Cambia categoría | — |
| Botón Grupo | bg-black/50 | Cambia grupo | — |
| Input Búsqueda | border más claro | Focus (keyboard) | — |
| Tarjeta Servicio | Scale 1.02 + shadow | — | Fade in |
| Botón General | Opacity/Color | Acción | — |

### CSS Keyframes necesarios

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from { transform: translateY(10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes scaleIn {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
```

---

## 📱 RESPONSIVE DESIGN

### Breakpoints (Tailwind)

| Pantalla | Ancho | Grid | Cambios |
|----------|-------|------|---------|
| Móvil | <640px | 1 col | Sidebar hamburguesa, header compacto |
| Tablet | 640-1024px | 2 col | Sidebar pequeño, header normal |
| Desktop | >1024px | 3 col | Layout completo |

### Adaptaciones

- **Sidebar:** 
  - Desktop: Vertical (80-100px)
  - Móvil: Bottom nav o hamburguesa
- **Header:** 
  - Desktop: Todos los elementos
  - Móvil: Compacto, algunos ocultos
- **Galería:**
  - 3 col → 2 col → 1 col
  - Gap ajusta: 30px → 20px → 15px
- **Imágenes:**
  - Ancho 100% respecto contenedor

---

## 🏠 PÁGINA HOME

### Secciones

1. **Hero/Banner** (no capturado completamente)
2. **Trabajos Recientes 3M2**
   - Título + descripción
   - Grid 3-4 imágenes últimos proyectos
   - Clickeable cada imagen → Lightbox
3. **Nuestros Servicios**
   - 4 tarjetas de servicios
   - Precio y descripción
   - Hover effects

### Imágenes "Trabajos Recientes"

- Japanese Black and White
- Black & Gold Harry Potter
- Pink Heart
- aesthetic black and white
- Sky Blue woman
- Green Army
- Blue Flowers
- Anime Girl Purple Pink

---

## 🧩 COMPONENTES REACT NECESARIOS

```
src/
├─ components/
│  ├─ Layout/
│  │  ├─ Header.jsx
│  │  ├─ Sidebar.jsx
│  │  └─ MainLayout.jsx
│  ├─ Pages/
│  │  ├─ HomePage.jsx
│  │  ├─ CategoryPage.jsx
│  │  └─ NotFoundPage.jsx
│  ├─ Gallery/
│  │  ├─ GalleryGrid.jsx
│  │  ├─ GalleryItem.jsx
│  │  ├─ GalleryPagination.jsx
│  │  └─ GalleryLoading.jsx
│  ├─ Lightbox/
│  │  ├─ Lightbox.jsx
│  │  ├─ LightboxControls.jsx
│  │  ├─ LightboxOverlay.jsx
│  │  └─ LightboxContent.jsx
│  ├─ Services/
│  │  ├─ ServiceCard.jsx
│  │  └─ ServicesList.jsx
│  ├─ Common/
│  │  ├─ NavButton.jsx
│  │  ├─ SearchBar.jsx
│  │  ├─ LanguageSelector.jsx
│  │  ├─ StatusBadge.jsx
│  │  ├─ Icon.jsx
│  │  └─ Button.jsx
│  └─ Home/
│     ├─ HeroSection.jsx
│     ├─ RecentWorks.jsx
│     └─ ServicesSection.jsx
├─ hooks/
│  ├─ useGallery.js
│  ├─ useSearch.js
│  ├─ useLanguage.js
│  ├─ useLightbox.js
│  └─ useNavigation.js
├─ utils/
│  ├─ filters.js
│  ├─ search.js
│  ├─ translations.js
│  └─ constants.js
├─ data/
│  ├─ designs.js
│  ├─ services.js
│  └─ categories.js
├─ context/
│  ├─ LanguageContext.jsx
│  └─ AppContext.jsx
├─ styles/
│  ├─ globals.css
│  ├─ animations.css
│  └─ responsive.css
├─ App.jsx
└─ main.jsx
```

---

## 📊 ESTRUCTURA DE DATOS

### Diseño

```javascript
{
  id: "uuid-or-string",
  alt: "Pink Heart",                           // Título visible
  src: "/assets/animated/LobisPinkHeart.gif",  // URL local
  category: "animated",                        // "xatspaces" | "animated" | "static" | "pstyle"
  colors: ["pink", "heart"],                   // Tags/colores para búsqueda
  featured: false                              // Destaca en "Trabajos Recientes"
}
```

### Grupo

```javascript
{
  id: 1,                                      // 1-9
  category: "animated",
  designs: [design, design, ...]              // Array de 9 diseños
}
```

### Servicio

```javascript
{
  id: "xatspaces",
  name: "Xatspaces",
  description: "Diseños personalizados.",
  price: "Desde 2000 xats",
  note: "*Sujeto a cambios por personalización"
}
```

### App State

```javascript
{
  currentCategory: "home",                    // "home" | "xatspaces" | "animated" | ...
  currentGroup: 1,                            // 1-9
  searchQuery: "",                            // String búsqueda
  filteredDesigns: [],                        // Array de diseños filtrados
  selectedImage: null,                        // Design object | null
  language: "es",                             // "es" | "en"
  isLightboxOpen: false,
  status: "available"                         // "available" | "online"
}
```

---

## ✅ CHECKLIST DE FUNCIONALIDADES

- [ ] Sidebar con 6 botones de navegación
- [ ] Header con logo, búsqueda, status, bell, avatar, idioma
- [ ] Navegación entre categorías (4)
- [ ] Paginación de grupos (9 grupos)
- [ ] Galería responsive (1-3 columnas)
- [ ] Búsqueda en tiempo real (nombre, tipo, color)
- [ ] Lightbox completo (anterior, siguiente, cerrar, ESC)
- [ ] Contador de posición en Lightbox
- [ ] Home con "Trabajos Recientes" + "Servicios"
- [ ] Tarjetas de servicios con precios
- [ ] Selector de idioma ES/EN
- [ ] Efectos hover en todos los elementos
- [ ] Transiciones 300ms suaves
- [ ] Indicador de estado (AVAILABLE/ONLINE)
- [ ] Responsive para móvil/tablet/desktop
- [ ] Dark mode consistente
- [ ] Iconos SVG reutilizables
- [ ] Animaciones de entrada
- [ ] CSS moderno sin dependencias innecesarias

---

## 🎯 SIGUIENTES PASOS

**FASE 1:** ✅ COMPLETADA - Análisis exhaustivo

**FASE 2:** Crear arquitectura React base
- [ ] Estructura de carpetas
- [ ] Configuración Vite
- [ ] Setup inicial componentes
- [ ] Context/Estado global

**FASE 3:** Layout principal
- [ ] Header completo
- [ ] Sidebar completo
- [ ] MainLayout responsivo
- [ ] Responsive breakpoints

**FASE 4:** Home
- [ ] Hero section
- [ ] Trabajos recientes
- [ ] Servicios

**FASE 5:** Galerías
- [ ] GalleryGrid component
- [ ] GalleryItem component
- [ ] Paginación

**FASE 6:** Buscador
- [ ] SearchBar component
- [ ] Lógica de filtrado
- [ ] Búsqueda real-time

**FASE 7:** Lightbox
- [ ] Lightbox component
- [ ] Navegación anterior/siguiente
- [ ] Cierre por ESC y click fuera

**FASE 8:** Carrusel
- [ ] Autoplay
- [ ] Controles manual
- [ ] Indicadores

**FASE 9:** Animaciones
- [ ] Transiciones CSS
- [ ] Hover effects
- [ ] Entrada de elementos

**FASE 10:** Idioma
- [ ] Sistema traducción ES/EN
- [ ] Selector idioma
- [ ] Persistencia localStorage

**FASE 11:** Responsive completo
- [ ] Móvil (< 640px)
- [ ] Tablet (640-1024px)
- [ ] Desktop (> 1024px)

**FASE 12:** Testing y pulido
- [ ] Verificar funcionalidades
- [ ] Revisar errores
- [ ] Optimizaciones
- [ ] Deploy

---

**Estado Final:** Portafolio como réplica funcional de 3MEN2, con código nuevo, modular y personalizable.
