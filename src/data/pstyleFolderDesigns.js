import { assetPath } from '../utils/assetPath';

const accents = [
  '#ec4899', '#3b82f6', '#a855f7', '#f59e0b', '#22d3ee',
  '#34d399', '#ef4444', '#f97316', '#8b5cf6', '#06b6d4',
  '#eab308', '#14b8a6', '#f43f5e', '#6366f1', '#84cc16',
  '#d946ef', '#0ea5e9', '#fb7185', '#10b981', '#facc15',
];

const createDesigns = (mode, gender) => {
  const fallbackImage = assetPath(`assets/pstyle/${mode}/${gender}/Diseño.png`);
  const filesByIndex = {
    normal: {
      mujeres: {
        1: 'pstyle1.png',
        2: 'pstyle2.png',
      },
      hombres: {},
    },
    animacion: {
      mujeres: {
        1: 'pstyle1.mp4',
        2: 'pstyle2.mp4',
        3: 'pstyle3.mp4',
        4: 'pstyle4.mp4',
      },
      hombres: {
        1: 'pstyle1.mp4',
      },
    },
  };

  const availableFiles = filesByIndex[mode]?.[gender] || {};

  return Array.from({ length: 20 }, (_, index) => {
    const number = index + 1;
    const filename = availableFiles[number];
    const resolvedSrc = filename
      ? assetPath(`assets/pstyle/${mode}/${gender}/${filename}`)
      : fallbackImage;
    const ext = filename ? filename.split('.').pop().toUpperCase() : 'PNG';

    return {
      id: `pstyle-${mode}-${gender}-${number}`,
      title: `Pstyle ${number}`,
      alt: `Pstyle ${number}`,
      image: resolvedSrc,
      src: resolvedSrc,
      category: 'pstyle',
      subcategory: mode,
      gender,
      colors: [accents[index], accents[(index + 1) % accents.length], accents[(index + 2) % accents.length]],
      accent: accents[index],
      format: 'PSTYLE',
      badge: number,
      aspectRatio: 701 / 301,
      objectFit: 'contain',
    };
  });
};

export const pstyleFolderDesigns = {
  normal: {
    mujeres: createDesigns('normal', 'mujeres'),
    hombres: createDesigns('normal', 'hombres'),
  },
  animacion: {
    mujeres: createDesigns('animacion', 'mujeres'),
    hombres: createDesigns('animacion', 'hombres'),
  },
};
