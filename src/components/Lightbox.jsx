import { useEffect } from 'react';

function Lightbox({ image, onClose, onNext, onPrev }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') onNext();
      if (event.key === 'ArrowLeft') onPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev]);

  if (!image) return null;

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox" onClick={(event) => event.stopPropagation()}>
        <button className="lightbox-close" onClick={onClose} aria-label="Cerrar">
          ×
        </button>
        <button className="lightbox-nav lightbox-prev" onClick={onPrev} aria-label="Anterior">
          ‹
        </button>
        <img src={image.src} alt={image.title} />
        <button className="lightbox-nav lightbox-next" onClick={onNext} aria-label="Siguiente">
          ›
        </button>
        <div className="lightbox-caption">
          <h3>{image.title}</h3>
          <p>{image.description}</p>
        </div>
      </div>
    </div>
  );
}

export default Lightbox;
