function Gallery({ language, category, designs, onOpen }) {
  const title = {
    es: {
      xatspaces: 'Xatspaces',
      animated: 'Fondos Animados',
      static: 'Fondos Estáticos',
      pstyle: 'Pstyles',
      reproductores: 'Reproductores',
    },
    en: {
      xatspaces: 'Xatspaces',
      animated: 'Animated Backgrounds',
      static: 'Static Backgrounds',
      pstyle: 'Pstyles',
      reproductores: 'Players',
    },
  };

  return (
    <section className="gallery-section">
      <div className="section-heading-row">
        <h2>{title[language][category]}</h2>
      </div>

      <div className={`gallery-grid gallery-grid-${category}`}>
        {designs.map((design) => (
          <button 
            key={design.id} 
            type="button" 
            className={`gallery-item gallery-item-${category}`} 
            onClick={() => onOpen(design)}
          >
            <img src={design.src} alt={design.alt} />
            <div className="gallery-item-overlay">
              <span>{design.alt}</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

export default Gallery;
