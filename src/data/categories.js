// Categorías disponibles
export const categories = [
  {
    id: 'xatspaces',
    name: 'Xatspaces',
    nameEn: 'Xatspaces',
    description: 'Diseños personalizados',
    descriptionEn: 'Custom designs',
    icon: 'palette',
  },
  {
    id: 'animated',
    name: 'Fondos Animados',
    nameEn: 'Animated Backgrounds',
    description: 'Efectos visuales',
    descriptionEn: 'Visual effects',
    icon: 'film',
  },
  {
    id: 'static',
    name: 'Fondos Estáticos',
    nameEn: 'Static Backgrounds',
    description: 'Fondos de alta calidad',
    descriptionEn: 'High quality backgrounds',
    icon: 'image',
  },
  {
    id: 'pstyle',
    name: 'Pstyles',
    nameEn: 'Pstyles',
    description: 'Estilos de perfil',
    descriptionEn: 'Profile styles',
    icon: 'sparkles',
  },
];

export const getCategoryById = (id) => {
  return categories.find((c) => c.id === id);
};

export const getCategoryName = (id, language = 'es') => {
  const category = getCategoryById(id);
  if (!category) return '';
  return language === 'en' ? category.nameEn : category.name;
};
