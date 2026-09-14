import { useMemo, useState } from 'react';
import { COLORS } from '../../utils/constants';
import GalleryItem from '../Gallery/GalleryItem';
import CategoryTabs from '../Common/CategoryTabs';
import { gifFolderDesigns } from '../../data/gifFolderDesigns';
import SpriteAnimation from '../SpriteAnimation';

export default function GifPage() {
  const [activeTab, setActiveTab] = useState('4d');
  const [activeGender, setActiveGender] = useState('mujeres');

  const tabs = [
    { id: '4d', label: '4D' },
    { id: 'parpadeo', label: 'Parpadeo' },
    { id: 'especial', label: 'Especial' },
  ];

  const galleryDesigns = useMemo(() => {
    if (activeTab === '4d') {
      return gifFolderDesigns[activeGender];
    }
    return gifFolderDesigns[activeTab];
  }, [activeGender, activeTab]);

  return (
    <>
      <style>{`
        @keyframes gifBorderFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes gifShimmer {
          0% { transform: translateX(-120%) skewX(-18deg); opacity: 0; }
          20% { opacity: 0.9; }
          50% { opacity: 0.72; }
          100% { transform: translateX(160%) skewX(-18deg); opacity: 0; }
        }

        .gif-pricing {
          position: relative;
          display: inline-block;
          border-radius: 18px;
          padding: 1px;
          background: linear-gradient(120deg, #a855f7, #ec4899, #60a5fa, #22d3ee, #a855f7);
          background-size: 220% 220%;
          animation: gifBorderFlow 6s ease-in-out infinite;
          box-shadow: 0 0 22px rgba(168, 85, 247, 0.28), 0 6px 28px rgba(0, 0, 0, 0.35);
          overflow: hidden;
        }

        .gif-pricing::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: rgba(14, 11, 24, 0.72);
          z-index: 0;
        }

        .gif-pricing-inner {
          position: relative;
          z-index: 1;
          background: rgba(14, 11, 24, 0.75);
          border-radius: 17px;
          padding: 16px 18px 14px;
          min-width: 290px;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .gif-pricing-glow {
          position: absolute;
          top: -10%;
          left: -30%;
          width: 42%;
          height: 120%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), rgba(255,255,255,0.2), transparent);
          filter: blur(18px);
          animation: gifShimmer 4s ease-in-out infinite;
          z-index: 2;
          pointer-events: none;
        }

        .gif-tags {
          display: flex;
          justify-content: flex-end;
          gap: 8px;
          margin-bottom: 12px;
          flex-wrap: wrap;
        }

        .gif-tag {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          line-height: 1;
          font-weight: 800;
          letter-spacing: 0.02em;
          color: #e9e7ff;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 7px;
          padding: 6px 8px;
          min-width: 42px;
        }

        .gif-tag.gif { color: #f472b6; }
        .gif-tag.css { color: #79b8ff; }
        .gif-tag.js { color: #f7d154; }
        .gif-tag.ps { color: #d8a5ff; }

        .gif-price-label {
          font-size: 11px;
          text-transform: none;
          letter-spacing: 0.02em;
          color: rgba(255,255,255,0.75);
          margin-bottom: 8px;
        }

        .gif-pricing-list {
          display: grid;
          gap: 8px;
        }

        .gif-price-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          color: #f5f7ff;
          font-size: 14px;
          font-weight: 700;
        }

        .gif-price-row .name {
          color: #f4f6fb;
          min-width: 90px;
        }

        .gif-price-row .value {
          color: #9ee7ff;
          font-weight: 800;
          letter-spacing: 0.02em;
        }

        .gif-price-row .unit {
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
              Gifs Animados
            </h1>
            <p style={{ fontSize: '14px', color: COLORS.textSecondary }}>
              Efectos visuales a elección.
            </p>
          </div>

          <div className="gif-pricing">
            <div className="gif-pricing-glow" />
            <div className="gif-pricing-inner">
              <div className="gif-tags">
                <span className="gif-tag gif">.GIF</span>
              </div>

              <div className="gif-price-label">Precio base:</div>

              <div className="gif-pricing-list">
                <div className="gif-price-row">
                  <span className="name">4D</span>
                  <div>
                    <span className="value">600</span>
                    <span className="unit">xats</span>
                  </div>
                </div>

                <div className="gif-price-row">
                  <span className="name">Parpadeo</span>
                  <div>
                    <span className="value">150</span>
                    <span className="unit">xats</span>
                  </div>
                </div>

                <div className="gif-price-row">
                  <span className="name">Especial</span>
                  <div>
                    <span className="value">350</span>
                    <span className="unit">xats</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <CategoryTabs tabs={tabs} active={activeTab} onChange={setActiveTab} />

        {activeTab === '4d' && (
          <div className="gif-gender-tabs" aria-label="Filtrar sprites 4D">
            <button
              type="button"
              className={activeGender === 'mujeres' ? 'active female' : 'female'}
              onClick={() => setActiveGender('mujeres')}
              aria-label="Sprites de mujeres"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="8" r="4" />
                <path d="M12 12v9M8 18h8" />
              </svg>
              <span>Mujeres</span>
            </button>
            <button
              type="button"
              className={activeGender === 'hombres' ? 'active male' : 'male'}
              onClick={() => setActiveGender('hombres')}
              aria-label="Sprites de hombres"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="10" cy="14" r="4" />
                <path d="m13 11 7-7M15 4h5v5" />
              </svg>
              <span>Hombres</span>
            </button>
          </div>
        )}

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
            {galleryDesigns.map((design) => (
              <GalleryItem
                key={design.id}
                design={design}
                zoomOnly
                media={<SpriteAnimation image={design.image} alt={design.title} fps={12} />}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
