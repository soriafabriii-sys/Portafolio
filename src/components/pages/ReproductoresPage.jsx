import { useMemo, useState } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { COLORS } from '../../utils/constants';
import GalleryItem from '../Gallery/GalleryItem';
import CategoryTabs from '../Common/CategoryTabs';
import PricingPanel from '../Common/PricingPanel';
import { reproductorFolderDesigns } from '../../data/reproductorFolderDesigns';

export default function ReproductoresPage() {
  const { openLightbox } = useAppContext();
  const [activeTab, setActiveTab] = useState('normal');

  const tabs = [
    { id: 'normal', label: 'Normal' },
    { id: 'efectos', label: 'Efectos Especial' },
  ];

  const filtered = useMemo(() => {
    return reproductorFolderDesigns[activeTab];
  }, [activeTab]);

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
            Reproductores
          </h1>
          <p style={{ fontSize: '14px', color: COLORS.textSecondary }}>
            Reproductores multimedia personalizados.
          </p>
        </div>

        <PricingPanel
          tags={['.HTML', '.CSS', '.JS']}
          priceRows={[
            { label: 'Reproductores normal', value: '1500' },
            { label: 'Reproductores especial', value: '2000' },
          ]}
        />
      </div>

      <CategoryTabs tabs={tabs} active={activeTab} onChange={setActiveTab} />

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
