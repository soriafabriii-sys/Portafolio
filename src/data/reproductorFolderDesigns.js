import { assetPath } from '../utils/assetPath';

const accents = [
  '#ec4899', '#3b82f6', '#a855f7', '#f59e0b', '#22d3ee',
  '#34d399', '#ef4444', '#f97316', '#8b5cf6', '#06b6d4',
  '#eab308', '#14b8a6', '#f43f5e', '#6366f1', '#84cc16',
  '#d946ef', '#0ea5e9', '#fb7185', '#10b981', '#facc15',
];

const createDesigns = (section) => {
  const image = assetPath(`assets/reproductores/${section}/Diseño.png`);

  return Array.from({ length: 20 }, (_, index) => ({
    id: `reproductor-${section}-${index + 1}`,
    title: `Reproductor ${index + 1}`,
    alt: `Reproductor ${index + 1}`,
    src: image,
    category: 'reproductores',
    subcategory: section,
    colors: [accents[index], accents[(index + 1) % accents.length], accents[(index + 2) % accents.length]],
    accent: accents[index],
    format: 'REPRODUCTOR',
    price: '1500',
    badge: index + 1,
  }));
};

export const reproductorFolderDesigns = {
  normal: createDesigns('normal'),
  efectos: createDesigns('efectos'),
  premium: createDesigns('premium'),
};
