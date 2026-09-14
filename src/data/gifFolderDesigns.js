import { assetPath } from '../utils/assetPath';

const accents = [
  '#ec4899', '#3b82f6', '#a855f7', '#f59e0b', '#22d3ee',
  '#34d399', '#ef4444', '#f97316', '#8b5cf6', '#06b6d4',
  '#eab308', '#14b8a6', '#f43f5e', '#6366f1', '#84cc16',
  '#d946ef', '#0ea5e9', '#fb7185', '#10b981', '#facc15',
];

const createDesigns = (section, folder, gender) => {
  const fallbackImage = assetPath(`assets/Gif/${folder}/Diseño.png`);
  const availableNumbers = folder === '4d/mujeres'
    ? Array.from({ length: 10 }, (_, index) => index + 1)
    : [1, 2];
  const numberedImages = Object.fromEntries(
    availableNumbers.map((number) => [number, assetPath(`assets/Gif/${folder}/GIF${number}.png`)])
  );

  const womenColorOverrides = {
    1: { accent: '#7f1d1d', colors: ['#b91c1c', '#7f1d1d', '#fca5a5'] },
    3: { accent: '#c084fc', colors: ['#e9d5ff', '#c084fc', '#a78bfa'] },
    4: { accent: '#8b5e3c', colors: ['#8b5e3c', '#a16207', '#7c2d12'] },
    5: { accent: '#facc15', colors: ['#facc15', '#fbbf24', '#f59e0b'] },
    6: { accent: '#9ca3af', colors: ['#cbd5e1', '#94a3b8', '#6b7280'] },
    7: { accent: '#8b5cf6', colors: ['#c4b5fd', '#8b5cf6', '#7c3aed'] },
    8: { accent: '#4c1d95', colors: ['#6d28d9', '#4c1d95', '#3b0764'] },
    9: { accent: '#5eead4', colors: ['#f9a8d4', '#5eead4', '#a7f3d0'] },
    10: { accent: '#2dd4bf', colors: ['#5eead4', '#2dd4bf', '#14b8a6'] },
  };

  const menColorOverrides = {
    1: { accent: '#8b5cf6', colors: ['#c4b5fd', '#8b5cf6', '#a78bfa'] },
    2: { accent: '#60a5fa', colors: ['#8b5cf6', '#60a5fa', '#dbeafe'] },
  };

  const specialColorOverrides = {
    1: { accent: '#2dd4bf', colors: ['#5eead4', '#2dd4bf', '#14b8a6'] },
    2: { accent: '#2dd4bf', colors: ['#5eead4', '#2dd4bf', '#14b8a6'] },
  };

  return Array.from({ length: 20 }, (_, index) => {
    const designNumber = index + 1;
    const override =
      gender === 'mujeres'
        ? womenColorOverrides[designNumber]
        : gender === 'hombres'
          ? menColorOverrides[designNumber]
          : section === 'especial'
            ? specialColorOverrides[designNumber]
            : null;

    return {
      id: `gif-${section}-${designNumber}`,
      title: `GIF ${designNumber}`,
      alt: `GIF ${designNumber}`,
      image: numberedImages[designNumber] || fallbackImage,
      src: numberedImages[designNumber] || fallbackImage,
      category: 'animated',
      subcategory: section === 'mujeres' || section === 'hombres' ? '4d' : section,
      gender,
      colors: override?.colors || [accents[index], accents[(index + 1) % accents.length], accents[(index + 2) % accents.length]],
      accent: override?.accent || accents[index],
      format: 'GIF',
      badge: designNumber,
    };
  });
};

export const gifFolderDesigns = {
  mujeres: createDesigns('mujeres', '4d/mujeres', 'mujeres'),
  hombres: createDesigns('hombres', '4d/hombres', 'hombres'),
  parpadeo: createDesigns('parpadeo', 'parpadeo'),
  especial: createDesigns('especial', 'especial'),
};
