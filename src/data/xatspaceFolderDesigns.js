import { assetPath } from '../utils/assetPath';

const accents = [
  '#ec4899', '#3b82f6', '#a855f7', '#f59e0b', '#22d3ee',
  '#34d399', '#ef4444', '#f97316', '#8b5cf6', '#06b6d4',
  '#eab308', '#14b8a6', '#f43f5e', '#6366f1', '#84cc16',
  '#d946ef', '#0ea5e9', '#fb7185', '#10b981', '#facc15',
];

const createDesigns = (section) => {
  const filesByIndex = {
    normal: {},
    especial: {
      1: 'Editable1.mkv',
      2: 'Editable2.mkv',
    },
    premium: {
      1: 'Editable1.mp4',
      2: 'Editable2.mkv',
      3: 'Editable3.mkv',
    },
  };

  const availableFiles = filesByIndex[section] || {};

  const sectionOverrides = {
    especial: {
      1: {
        accent: '#d946ef',
        colors: ['#f9a8d4', '#c084fc', '#f472b6'],
      },
      2: {
        accent: '#9ca3af',
        colors: ['#d1d5db', '#9ca3af', '#6b7280'],
      },
    },
    premium: {
      1: {
        accent: '#f9c5d6',
        colors: ['#fbcfe8', '#f9a8d4', '#f6d1dc'],
      },
      2: {
        colors: ['#dbeafe', '#bfdbfe', '#93c5fd'],
      },
      3: {
        accent: '#f4b0a3',
        colors: ['#f7c8b7', '#f4b0a3', '#e8a6a6'],
      },
    },
  };

  return Array.from({ length: 15 }, (_, index) => {
    const number = index + 1;
    const filename = availableFiles[number];
    const resolvedSrc = filename
      ? assetPath(`assets/xatspace/${section}/${filename}`)
      : assetPath(`assets/xatspace/${section}/Diseño.png`);
    const ext = filename ? filename.split('.').pop().toUpperCase() : 'PNG';
    const override = sectionOverrides[section]?.[number] || {};
    const accent = override.accent || accents[index];
    const colors = override.colors || [accents[index], accents[(index + 1) % accents.length], accents[(index + 2) % accents.length]];

    return {
      id: `xatspace-${section}-${number}`,
      title: `Xatspace ${number}`,
      alt: `Xatspace ${number}`,
      src: resolvedSrc,
      image: resolvedSrc,
      category: 'xatspaces',
      subcategory: section,
      colors,
      accent,
      format: 'XATSPACE',
      price: section === 'premium' ? '3000' : section === 'especial' ? '1500' : '2000',
      badge: number,
      aspectRatio: 16 / 9,
      objectFit: 'contain',
    };
  });
};

export const xatspaceFolderDesigns = {
  normal: createDesigns('normal'),
  especial: createDesigns('especial'),
  premium: createDesigns('premium'),
};
