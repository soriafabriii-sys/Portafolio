// Sistema de traducciones centralizado
export const translations = {
  es: {
    // Header
    searchPlaceholder: 'Busca diseños por tipo, nombre o color...',
    available: 'DISPONIBLE',
    online: 'EN LÍNEA',
    notifications: 'Notificaciones',
    language: 'Idioma',

    // Sidebar
    home: 'Inicio',
    xatspaces: 'Xatspaces',
    animatedBg: 'Fondos Animados',
    staticBg: 'Fondos Estáticos',
    pstyles: 'Pstyles',

    // Gallery
    viewGallery: '← Ver galería',
    viewGroup: 'Ver grupo',
    noResults: 'No se encontraron diseños para tu búsqueda.',
    of: 'de',

    // Lightbox
    previous: 'Anterior',
    next: 'Siguiente',
    close: 'Cerrar',

    // Home
    recentWorks: 'Trabajos Recientes 3M2',
    recentWorksDesc: 'Últimos proyectos completados',
    ourServices: 'Nuestros Servicios',

    // Services
    fromPrice: 'Desde',

    // Common
    loading: 'Cargando...',
    error: 'Error',
    back: 'Atrás',
  },
  en: {
    // Header
    searchPlaceholder: 'Search designs by type, name or color...',
    available: 'AVAILABLE',
    online: 'ONLINE',
    notifications: 'Notifications',
    language: 'Language',

    // Sidebar
    home: 'Home',
    xatspaces: 'Xatspaces',
    animatedBg: 'Animated Backgrounds',
    staticBg: 'Static Backgrounds',
    pstyles: 'Pstyles',

    // Gallery
    viewGallery: '← View gallery',
    viewGroup: 'View group',
    noResults: 'No designs found for your search.',
    of: 'of',

    // Lightbox
    previous: 'Previous',
    next: 'Next',
    close: 'Close',

    // Home
    recentWorks: 'Recent Works 3M2',
    recentWorksDesc: 'Latest completed projects',
    ourServices: 'Our Services',

    // Services
    fromPrice: 'From',

    // Common
    loading: 'Loading...',
    error: 'Error',
    back: 'Back',
  },
};

export const t = (key, language = 'es') => {
  return translations[language]?.[key] || translations.es[key] || key;
};

export const getTranslation = (key, language = 'es') => {
  const keys = key.split('.');
  let value = translations[language] || translations.es;

  for (const k of keys) {
    value = value?.[k];
  }

  return value || key;
};
