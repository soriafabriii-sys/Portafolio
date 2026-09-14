import { assetPath } from '../utils/assetPath';

const accents = [
  '#ec4899', '#3b82f6', '#a855f7', '#f59e0b', '#22d3ee',
  '#34d399', '#ef4444', '#f97316', '#8b5cf6', '#06b6d4',
  '#eab308', '#14b8a6', '#f43f5e', '#6366f1', '#84cc16',
  '#d946ef', '#0ea5e9', '#fb7185', '#10b981', '#facc15',
];

const createDesigns = (section, folder) => {
  return Array.from({ length: 20 }, (_, index) => ({
    ...(() => {
      const number = index + 1;
      const fallback = assetPath(`assets/sala/${folder}/Diseño.png`);
      const hasNumberedImages = section === 'sala' ? number <= 8 : number <= 2;
      const prefix = section === 'sala' ? 'sala' : 'evento';
      const filePrefix = section === 'sala' && number === 1 ? 'Sala1' : `${prefix}${number}`;
      const interior = hasNumberedImages
        ? assetPath(`assets/sala/${folder}/${filePrefix}-interior.png`)
        : fallback;
      const exterior = hasNumberedImages
        ? assetPath(`assets/sala/${folder}/${filePrefix}-exterior.png`)
        : fallback;
      return {
        image: interior,
        previewImages: { interior, exterior, fallback },
      };
    })(),
    id: `sala-${section}-${index + 1}`,
    title: `${section === 'sala' ? 'Sala' : 'Evento'} ${index + 1}`,
    alt: `${section === 'sala' ? 'Sala' : 'Evento'} ${index + 1}`,
    src: undefined,
    category: 'sala',
    subcategory: section,
    colors: [accents[index], accents[(index + 1) % accents.length], accents[(index + 2) % accents.length]],
    accent: accents[index],
    format: 'SALA',
    price: '800',
    badge: index + 1,
    aspectRatio: 728 / 486,
    objectFit: 'contain',
    previews: [
      { label: 'Fondo interior', src: undefined },
      { label: 'Fondo exterior', src: undefined },
    ],
  })).map((design) => ({
    ...design,
    src: design.previewImages.interior,
    image: design.previewImages.interior,
    previews: [
      { label: 'Fondo interior', src: design.previewImages.interior },
      { label: 'Fondo exterior', src: design.previewImages.exterior },
    ],
  }));
};

export const salaFolderDesigns = {
  sala: createDesigns('sala', 'sala'),
  eventos: createDesigns('eventos', 'eventos'),
};
