function SearchResults({ query, language, designs, onOpen }) {
  const text = {
    es: {
      title: 'Resultados de búsqueda',
      empty: 'No se encontraron diseños para tu búsqueda.',
    },
    en: {
      title: 'Search results',
      empty: 'No designs matched your search.',
    },
  };

  if (!query || !designs.length) {
    return null;
  }

  return (
    <section className="search-results">
      <div className="section-heading-row">
        <h2>{text[language].title}</h2>
      </div>
      <div className="gallery-grid compact">
        {designs.map((design) => (
          <button key={design.id} type="button" className="gallery-item" onClick={() => onOpen(design)}>
            <img src={design.src} alt={design.title} />
            <div className="gallery-item-overlay">
              <span>{design.title}</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

export default SearchResults;
