import RecentWorks from './RecentWorks';
import ServiceCard from './ServiceCard';

const services = [
  {
    title: 'Xatspaces Premium',
    description: 'Diseños premium para entornos modernos y marcados por identidad visual.',
    accent: 'linear-gradient(135deg, #2B7FFC, #4ea1ff)',
  },
  {
    title: 'Fondos Animados',
    description: 'Ambientes dinámicos con movimiento sutil y mayor sensación de profundidad.',
    accent: 'linear-gradient(135deg, #ffd700, #f5b700)',
  },
  {
    title: 'Fondos Estáticos',
    description: 'Escenas minimalistas con estilo elegante y equilibrio visual para cada proyecto.',
    accent: 'linear-gradient(135deg, #7c3aed, #9b7dff)',
  },
  {
    title: 'Pstyles',
    description: 'Estética personalizada para perfiles que buscan distinguirse visualmente.',
    accent: 'linear-gradient(135deg, #00b894, #19c9a5)',
  },
];

function Home({ language, currentText, designs, onOpen, onSetSection }) {
  const title = language === 'es' ? 'Designs that elevate the experience' : 'Designs that elevate the experience';
  const subtitle =
    language === 'es'
      ? 'Colecciones visuales para entornos premium, modernos y memorables.'
      : 'Visual collections for premium, modern, memorable experiences.';

  return (
    <>
      <section className="hero-banner">
        <div className="hero-copy">
          <span className="pill">{language === 'es' ? 'Portfolio' : 'Portfolio'}</span>
          <h2>{title}</h2>
          <p>{subtitle}</p>
          <div className="hero-actions">
            <button type="button" className="primary-button" onClick={() => onSetSection('xatspaces')}>
              {currentText.viewCollection}
            </button>
            <button type="button" className="secondary-button" onClick={() => onSetSection('animated')}>
              {language === 'es' ? 'Explorar' : 'Explore'}
            </button>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-card large">
            <img src={designs[0]?.src} alt={designs[0]?.title} />
          </div>
          <div className="hero-card small top">
            <img src={designs[1]?.src} alt={designs[1]?.title} />
          </div>
          <div className="hero-card small bottom">
            <img src={designs[2]?.src} alt={designs[2]?.title} />
          </div>
        </div>
      </section>

      <RecentWorks designs={designs} onOpen={onOpen} />

      <section className="section-block">
        <div className="section-heading-row">
          <h2>{currentText.services}</h2>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              description={service.description}
              accent={service.accent}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;
