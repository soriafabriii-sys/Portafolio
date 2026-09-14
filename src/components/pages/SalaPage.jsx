import { useMemo, useState } from 'react';
import { COLORS } from '../../utils/constants';
import GalleryItem from '../Gallery/GalleryItem';
import CategoryTabs from '../Common/CategoryTabs';
import PricingPanel from '../Common/PricingPanel';
import { salaFolderDesigns } from '../../data/salaFolderDesigns';

export default function SalaPage() {
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [activeTab, setActiveTab] = useState('sala');
  const tabs = [
    { id: 'sala', label: 'Sala' },
    { id: 'eventos', label: 'Eventos' },
  ];
  const filtered = useMemo(() => salaFolderDesigns[activeTab], [activeTab]);

  const lightboxDesigns = useMemo(() => {
    const designs = filtered.map((design) => ({ ...design }));
    designs.forEach((design) => {
      design.lightboxItems = designs;
    });
    return designs;
  }, [filtered]);

  return (
    <div style={{ width: '100%', paddingTop: '100px', paddingBottom: '60px', paddingLeft: '22px', paddingRight: '60px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '40px', fontWeight: 'bold', color: COLORS.textPrimary, marginBottom: '8px' }}>Fondos para sala</h1>
          <p style={{ fontSize: '14px', color: COLORS.textSecondary }}>Fondos para interior y exterior.</p>
        </div>
        <PricingPanel
          tags={['.PNG']}
          priceRows={[
            { label: 'Fondo interior', value: '600' },
            { label: 'Fondo exterior', value: '700' },
            { label: 'Combo: Fondo interior - Exterior', value: '1300' },
          ]}
        />
      </div>

      <CategoryTabs tabs={tabs} active={activeTab} onChange={setActiveTab} />

      <section>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '22px', marginBottom: '60px' }}>
          {lightboxDesigns.map((design) => (
            <GalleryItem key={design.id} design={design} onImageClick={setSelectedDesign} />
          ))}
        </div>
      </section>

      {selectedDesign && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Muestra de ${selectedDesign.alt}`}
          onClick={() => setSelectedDesign(null)}
          style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', backgroundColor: COLORS.overlay, backdropFilter: 'blur(4px)' }}
        >
          <div onClick={(event) => event.stopPropagation()} style={{ width: 'min(900px, 94vw)', maxHeight: '90vh', overflow: 'auto', padding: '24px', borderRadius: '16px', backgroundColor: COLORS.bgAlt, border: '1px solid rgba(255,255,255,0.12)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <h2 style={{ margin: 0, color: COLORS.textPrimary, fontSize: '22px' }}>{selectedDesign.alt}</h2>
              <button type="button" onClick={() => setSelectedDesign(null)} aria-label="Cerrar muestra" style={{ border: 0, background: 'transparent', color: COLORS.textSecondary, fontSize: '26px', cursor: 'pointer' }}>×</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '18px' }}>
              {selectedDesign.previews.map((preview) => (
                <figure key={preview.label} style={{ margin: 0, color: COLORS.textPrimary, textAlign: 'center' }}>
                  <img
                    src={preview.src}
                    alt={preview.label}
                    style={{
                      display: 'block',
                      width: '100%',
                      height: 'auto',
                      maxHeight: '420px',
                      objectFit: 'contain',
                      borderRadius: '10px',
                      marginBottom: '10px',
                      backgroundColor: 'rgba(255,255,255,0.02)',
                    }}
                  />
                  <figcaption style={{ fontSize: '13px', color: COLORS.textSecondary }}>{preview.label}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}