import React from 'react';

const tagColors = ['html', 'css', 'js', 'react', 'ps', 'png', 'gif'];

export default function PricingPanel({ tags, price, priceRows }) {
  return (
    <>
      <style>{`
        @keyframes pricingBorderFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes pricingShimmer {
          0% { transform: translateX(-120%) skewX(-18deg); opacity: 0; }
          20% { opacity: 0.9; }
          50% { opacity: 0.72; }
          100% { transform: translateX(160%) skewX(-18deg); opacity: 0; }
        }

        .pricing-panel {
          position: relative;
          display: inline-block;
          border-radius: 18px;
          padding: 1px;
          background: linear-gradient(120deg, #ff4d8d, #6f7cff, #2dd4bf, #ffb866, #ff4d8d);
          background-size: 220% 220%;
          animation: pricingBorderFlow 6s ease-in-out infinite;
          box-shadow: 0 0 22px rgba(98, 119, 255, 0.28), 0 6px 28px rgba(0, 0, 0, 0.35);
          overflow: hidden;
        }

        .pricing-panel::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: rgba(10, 12, 18, 0.7);
          z-index: 0;
        }

        .pricing-panel-inner {
          position: relative;
          z-index: 1;
          background: rgba(12, 14, 22, 0.72);
          border-radius: 17px;
          padding: 16px 18px 14px;
          min-width: 290px;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .pricing-panel-glow {
          position: absolute;
          top: -10%;
          left: -30%;
          width: 42%;
          height: 120%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), rgba(255,255,255,0.2), transparent);
          filter: blur(18px);
          animation: pricingShimmer 4s ease-in-out infinite;
          z-index: 2;
          pointer-events: none;
        }

        .pricing-panel-tags {
          display: flex;
          justify-content: flex-end;
          gap: 8px;
          margin-bottom: 12px;
          flex-wrap: wrap;
        }

        .pricing-panel-tag {
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

        .pricing-panel-tag.html { color: #ff7b72; }
        .pricing-panel-tag.css { color: #79b8ff; }
        .pricing-panel-tag.js { color: #f7d154; }
        .pricing-panel-tag.react { color: #7ce7ff; }
        .pricing-panel-tag.ps { color: #d8a5ff; }
        .pricing-panel-tag.png { color: #7dd3fc; background: rgba(125, 211, 252, 0.12); border-color: rgba(125, 211, 252, 0.32); }
        .pricing-panel-tag.gif { color: #f9a8d4; background: rgba(249, 168, 212, 0.12); border-color: rgba(249, 168, 212, 0.32); }

        .pricing-panel-label {
          font-size: 11px;
          letter-spacing: 0.02em;
          color: rgba(255,255,255,0.75);
          margin-bottom: 8px;
        }

        .pricing-panel-list {
          display: grid;
          gap: 8px;
        }

        .pricing-panel-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          color: #f5f7ff;
          font-size: 14px;
          font-weight: 700;
        }

        .pricing-panel-row .name {
          color: #f4f6fb;
          min-width: 70px;
        }

        .pricing-panel-row .value {
          color: #8ae7ff;
          font-weight: 800;
          letter-spacing: 0.02em;
        }

        .pricing-panel-row .unit {
          color: rgba(255,255,255,0.7);
          font-size: 11px;
          font-weight: 600;
          margin-left: 2px;
        }

        @media (max-width: 700px) {
          .pricing-panel-inner { min-width: 0; width: 100%; }
          .pricing-panel { width: 100%; }
        }
      `}</style>

      <div className="pricing-panel">
        <div className="pricing-panel-glow" />
        <div className="pricing-panel-inner">
          <div className="pricing-panel-tags">
            {tags.map((tag) => (
              <span key={tag} className={`pricing-panel-tag ${tagColors.find((color) => tag.toLowerCase().includes(color)) || ''}`}>
                {tag}
              </span>
            ))}
          </div>

          <div className="pricing-panel-label">Precio base:</div>
          <div className="pricing-panel-list">
            {priceRows && priceRows.length > 0 ? (
              priceRows.map((row) => (
                <div className="pricing-panel-row" key={row.label}>
                  <span className="name">{row.label}</span>
                  <div>
                    <span className="value">{row.value}</span>
                    <span className="unit">xats</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="pricing-panel-row">
                <span className="name">Desde</span>
                <div>
                  <span className="value">{price}</span>
                  <span className="unit">xats</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
