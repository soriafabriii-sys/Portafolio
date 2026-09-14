function RecentWorks({ designs, onOpen }) {
  return (
    <section className="section-block">
      <div className="section-heading-row">
        <h2>Recent works</h2>
        <button type="button" className="text-button">
          View all
        </button>
      </div>

      <div className="recent-grid">
        {designs.slice(0, 4).map((design) => (
          <button key={design.id} type="button" className="recent-card" onClick={() => onOpen(design)}>
            <img src={design.src} alt={design.title} />
            <div className="recent-card-info">
              <strong>{design.title}</strong>
              <span>{design.category}</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

export default RecentWorks;
