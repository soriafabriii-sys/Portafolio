// Funciones de filtrado y búsqueda
export const filterBySearch = (designs, query) => {
  if (!query || query.trim() === '') return designs;

  const lowerQuery = query.toLowerCase();

  return designs.filter((design) => {
    const matchAlt = design.alt.toLowerCase().includes(lowerQuery);
    const matchCategory = design.category.toLowerCase().includes(lowerQuery);
    const matchColors = design.colors.some((color) =>
      color.toLowerCase().includes(lowerQuery)
    );
    const matchTags = design.tags.some((tag) =>
      tag.toLowerCase().includes(lowerQuery)
    );

    return matchAlt || matchCategory || matchColors || matchTags;
  });
};

export const filterByCategory = (designs, category) => {
  if (!category) return designs;
  return designs.filter((design) => design.category === category);
};

export const filterByGroup = (designs, group) => {
  if (!group) return designs;
  return designs.filter((design) => design.group === group);
};

export const sortByFeatured = (designs) => {
  return [...designs].sort((a, b) => {
    if (a.featured === b.featured) return 0;
    return a.featured ? -1 : 1;
  });
};

export const paginateDesigns = (designs, page, pageSize = 9) => {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return designs.slice(start, end);
};

export const getTotalPages = (designs, pageSize = 9) => {
  return Math.ceil(designs.length / pageSize);
};
