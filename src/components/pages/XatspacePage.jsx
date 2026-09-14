import { useMemo, useState } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { COLORS } from '../../utils/constants';
import GalleryItem from '../Gallery/GalleryItem';
import CategoryTabs from '../Common/CategoryTabs';
import { xatspaceFolderDesigns } from '../../data/xatspaceFolderDesigns';

export default function XatspacePage() {
  const { openLightbox } = useAppContext();
  const [activeTab, setActiveTab] = useState('normal');

  const tabs = [
    { id: 'normal', label: 'Normal' },
    { id: 'especial', label: 'Especial' },
    { id: 'premium', label: 'Premium' },
  ];

  const filtered = useMemo(() => {
    return xatspaceFolderDesigns[activeTab];
  }, [activeTab]);

  const lightboxDesigns = useMemo(() => {
    const designs = filtered.map((design) => ({ ...design }));
    designs.forEach((design) => {
      design.lightboxItems = designs;
    });
    return designs;
  }, [filtered]);

  return (
    <>
      <style>{`
        @keyframes xatspaceBorderFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes xatspaceShimmer {
          0% { transform: translateX(-120%) skewX(-18deg); opacity: 0; }
          20% { opacity: 0.9; }
          50% { opacity: 0.72; }
          100% { transform: translateX(160%) skewX(-18deg); opacity: 0; }
        }

        .xatspace-pricing {
          position: relative;
          display: inline-block;
          border-radius: 18px;
          padding: 1px;
          background: linear-gradient(120deg, #ff4d8d, #6f7cff, #2dd4bf, #ffb866, #ff4d8d);
          background-size: 220% 220%;
          animation: xatspaceBorderFlow 6s ease-in-out infinite;
          box-shadow: 0 0 22px rgba(98, 119, 255, 0.28), 0 6px 28px rgba(0, 0, 0, 0.35);
          overflow: hidden;
        }

        .xatspace-pricing::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: rgba(10, 12, 18, 0.7);
          z-index: 0;
        }

        .xatspace-pricing-inner {
          position: relative;
          z-index: 1;
          background: rgba(12, 14, 22, 0.72);
          border-radius: 17px;
          padding: 16px 18px 14px;
          min-width: 290px;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .xatspace-pricing-glow {
          position: absolute;
          top: -10%;
          left: -30%;
          width: 42%;
          height: 120%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), rgba(255,255,255,0.2), transparent);
          filter: blur(18px);
          animation: xatspaceShimmer 4s ease-in-out infinite;
          z-index: 2;
          pointer-events: none;
        }

        .xatspace-tags {
          display: flex;
          justify-content: flex-end;
          gap: 8px;
          margin-bottom: 12px;
          flex-wrap: wrap;
        }

        .xatspace-tag {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          line-height: 1;
          font-weight: 800;
          letter-spacing: 0.02em;
          color: #dfe8ff;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 7px;
          padding: 6px 8px;
          min-width: 42px;
        }

        .xatspace-tag.html { color: #ff7b72; }
        .xatspace-tag.css { color: #79b8ff; }
        .xatspace-tag.js { color: #f7d154; }
        .xatspace-tag.react { color: #7ce7ff; }
        .xatspace-tag.ps { color: #d8a5ff; }

        .xatspace-price-label {
          font-size: 11px;
          text-transform: none;
          letter-spacing: 0.02em;
          color: rgba(255,255,255,0.75);
          margin-bottom: 8px;
        }

        .xatspace-pricing-list {
          display: grid;
          gap: 8px;
        }

        .xatspace-price-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          color: #f5f7ff;
          font-size: 14px;
          font-weight: 700;
        }

        .xatspace-price-row .name {
          color: #f4f6fb;
          min-width: 70px;
        }

        .xatspace-price-row .value {
          color: #8ae7ff;
          font-weight: 800;
          letter-spacing: 0.02em;
        }

        .xatspace-price-row .unit {
          color: rgba(255,255,255,0.7);
          font-size: 11px;
          font-weight: 600;
          margin-left: 2px;
        }
      `}</style>

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
              Xatspaces
            </h1>
            <p style={{ fontSize: '14px', color: COLORS.textSecondary }}>
              Diseños personalizados.
            </p>
          </div>

          <div className="xatspace-pricing">
            <div className="xatspace-pricing-glow" />
            <div className="xatspace-pricing-inner">
              <div className="xatspace-tags">
                <span className="xatspace-tag html">.HTML</span>
                <span className="xatspace-tag css">.CSS</span>
                <span className="xatspace-tag js">.JS</span>
                <span className="xatspace-tag react">.React</span>
                <span className="xatspace-tag ps">.PS</span>
              </div>

              <div className="xatspace-price-label">Precio base:</div>

              <div className="xatspace-pricing-list">
                <div className="xatspace-price-row">
                  <span className="name">Normal</span>
                  <div>
                    <span className="value">2000</span>
                    <span className="unit">xats</span>
                  </div>
                </div>

                <div className="xatspace-price-row">
                  <span className="name">Especial</span>
                  <div>
                    <span className="value">1500</span>
                    <span className="unit">xats</span>
                  </div>
                </div>

                <div className="xatspace-price-row">
                  <span className="name">Premium</span>
                  <div>
                    <span className="value">3000</span>
                    <span className="unit">xats</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
    </>
  );
}
