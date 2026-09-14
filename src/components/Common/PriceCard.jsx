import React from 'react';
import { COLORS } from '../../utils/constants';

export default function PriceCard({ label = '.PNG', price = '800 xats', badge }) {
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      padding: '8px 12px',
      borderRadius: 10,
      background: 'rgba(255,255,255,0.03)',
      border: `1px solid rgba(255,255,255,0.04)`
    }}>
      <div style={{
        fontSize: 12,
        fontWeight: 800,
        color: COLORS.textPrimary,
        background: 'rgba(255,255,255,0.02)',
        padding: '6px 8px',
        borderRadius: 6,
        border: `1px solid rgba(255,255,255,0.02)`
      }}>{label}</div>

      {badge ? (
        <div
          aria-label={`GIF ${badge}`}
          title={`GIF ${badge}`}
          style={{
            width: 26,
            height: 26,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            color: COLORS.textPrimary,
            background: `linear-gradient(145deg, ${COLORS.primary}, #7dd3fc)`,
            boxShadow: `0 0 12px ${COLORS.primaryShadow}`,
            fontSize: 13,
            fontWeight: 900,
          }}
        >
          {badge}
        </div>
      ) : (
        <div style={{ fontSize: 14, fontWeight: 800, color: COLORS.primary }}>{price}</div>
      )}
    </div>
  );
}
