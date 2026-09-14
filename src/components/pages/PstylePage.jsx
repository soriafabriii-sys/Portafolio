import { useMemo, useState } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { COLORS } from '../../utils/constants';
import GalleryItem from '../Gallery/GalleryItem';
import CategoryTabs from '../Common/CategoryTabs';
import PricingPanel from '../Common/PricingPanel';
import { pstyleFolderDesigns } from '../../data/pstyleFolderDesigns';

export default function PstylePage() {
  const { openLightbox } = useAppContext();
  const [activeTab, setActiveTab] = useState('normal');
  const [activeGender, setActiveGender] = useState('mujeres');

  const tabs = [
    { id: 'normal', label: 'Normal' },
    { id: 'animacion', label: 'Animación' },
  ];

  const filtered = useMemo(() => {
    return pstyleFolderDesigns[activeTab][activeGender];
  }, [activeGender, activeTab]);

  const lightboxDesigns = useMemo(() => {
    const designs = filtered.map((design) => ({ ...design }));
    designs.forEach((design) => {
      design.lightboxItems = designs;
    });
    return designs;
  }, [filtered]);

  return (
    <div
      style={{
        width: '100%',
        paddingTop: '100px',
        paddingBottom: '60px',
        paddingLeft: '22px',
        paddingRight: '60px',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '40px', fontWeight: 'bold', color: COLORS.textPrimary, marginBottom: '8px' }}>
            Fondos Pstyle
          </h1>
          <p style={{ fontSize: '14px', color: COLORS.textSecondary }}>
            Lo mejor para tu perfil.
          </p>
        </div>

        <PricingPanel
          tags={['.PNG', '.GIF']}
          priceRows={[
            { label: 'Pstyle normal', value: '500' },
            { label: 'Pstyle animado', value: '700' },
          ]}
        />
      </div>

      <CategoryTabs tabs={tabs} active={activeTab} onChange={setActiveTab} />

      <div className="gif-gender-tabs" aria-label="Filtrar Pstyle por género">
        <button type="button" className={activeGender === 'mujeres' ? 'active female' : 'female'} onClick={() => setActiveGender('mujeres')} aria-label="Pstyle de mujeres">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4" /><path d="M12 12v9M8 18h8" /></svg>
          <span>Mujeres</span>
        </button>
        <button type="button" className={activeGender === 'hombres' ? 'active male' : 'male'} onClick={() => setActiveGender('hombres')} aria-label="Pstyle de hombres">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10" cy="14" r="4" /><path d="m13 11 7-7M15 4h5v5" /></svg>
          <span>Hombres</span>
        </button>
      </div>

      {/* Galería */}
      <section>
        <div
          style={{
            display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '22px',
            marginBottom: '60px',
          }}
        >
          {lightboxDesigns.map((design) => (
            <GalleryItem key={design.id} design={design} onImageClick={() => openLightbox(design)} />
          ))}
        </div>
      </section>
    </div>
  );
}
