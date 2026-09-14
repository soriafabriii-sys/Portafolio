import React from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { COLORS } from '../../utils/constants';
import ColorDots from '../Common/ColorDots';
import PriceCard from '../Common/PriceCard';

const CATEGORY_STYLES = {
  xatspaces: {
    background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.12), rgba(15, 23, 42, 0.76))',
    border: '1px solid rgba(34, 211, 238, 0.28)',
    glow: '0 12px 30px rgba(34, 211, 238, 0.12)',
  },
  animated: {
    background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.12), rgba(17, 24, 39, 0.76))',
    border: '1px solid rgba(168, 85, 247, 0.28)',
    glow: '0 12px 30px rgba(168, 85, 247, 0.12)',
  },
  static: {
    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(15, 23, 42, 0.76))',
    border: '1px solid rgba(16, 185, 129, 0.28)',
    glow: '0 12px 30px rgba(16, 185, 129, 0.12)',
  },
  pstyle: {
    background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.12), rgba(15, 23, 42, 0.76))',
    border: '1px solid rgba(249, 115, 22, 0.28)',
    glow: '0 12px 30px rgba(249, 115, 22, 0.12)',
  },
  reproductores: {
    background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.12), rgba(15, 23, 42, 0.76))',
    border: '1px solid rgba(239, 68, 68, 0.28)',
    glow: '0 12px 30px rgba(239, 68, 68, 0.12)',
  },
  sala: {
    background: 'linear-gradient(135deg, rgba(66, 133, 244, 0.12), rgba(15, 23, 42, 0.76))',
    border: '1px solid rgba(66, 133, 244, 0.28)',
    glow: '0 12px 30px rgba(66, 133, 244, 0.12)',
  },
};

export default function GalleryItem({ design, onImageClick, zoomOnly = false, media }) {
  const { openLightbox } = useAppContext();
  const isVideoAsset = (src) => /\.(mp4|webm|mkv|avi)$/i.test(src || '');
  const categoryStyle = CATEGORY_STYLES[design.category] || CATEGORY_STYLES.xatspaces;
  const cardStyle = design.accent
    ? {
        background: `linear-gradient(135deg, ${design.accent}22, rgba(15, 23, 42, 0.76))`,
        border: `1px solid ${design.accent}66`,
        glow: `0 12px 30px ${design.accent}22`,
      }
    : categoryStyle;
  const handleOpen = () => {
    if (zoomOnly) return;
    if (onImageClick) {
      onImageClick(design);
      return;
    }
    if (design.link || design.url) {
      window.open(design.link || design.url, '_blank', 'noopener,noreferrer');
      return;
    }
    openLightbox(design);
  };

  return (
    <div
      onClick={handleOpen}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        padding: 12,
        borderRadius: 16,
        cursor: zoomOnly ? 'default' : 'pointer',
        background: cardStyle.background,
        border: cardStyle.border,
        boxShadow: cardStyle.glow,
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        transition: 'all 300ms ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = `0 18px 40px rgba(0,0,0,0.3), ${cardStyle.glow.replace('0 12px 30px', '0 16px 40px')}`;
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.24)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = cardStyle.glow;
        e.currentTarget.style.borderColor = cardStyle.border.match(/rgba\([^)]*\)/)?.[0] || design.accent || 'rgba(255,255,255,0.16)';
      }}
    >
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '12px',
          backgroundColor: COLORS.bgAlt,
          aspectRatio: design.aspectRatio || '1',
          border: `1px solid rgba(255,255,255,0.06)`,
        }}
      >
        {media || (isVideoAsset(design.src) ? (
          <video
            src={design.src}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            style={{ width: '100%', height: '100%', objectFit: design.objectFit || 'cover', transition: 'transform 420ms ease' }}
          />
        ) : (
          <img
            src={design.src}
            alt={design.alt}
            style={{ width: '100%', height: '100%', objectFit: design.objectFit || 'cover', transition: 'transform 420ms ease' }}
            onMouseEnter={(event) => {
              if (zoomOnly) event.currentTarget.style.transform = 'scale(1.08)';
            }}
            onMouseLeave={(event) => {
              if (zoomOnly) event.currentTarget.style.transform = 'scale(1)';
            }}
            loading="eager"
            decoding="async"
          />
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, padding: '0 4px 2px' }}>
        <ColorDots colors={design.colors || []} />
        <PriceCard label={design.format || '.PNG'} price={design.price || '—'} badge={design.badge} />
      </div>
    </div>
  );
}
