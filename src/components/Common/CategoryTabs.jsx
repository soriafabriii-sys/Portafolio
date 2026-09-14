import React from 'react';
import { COLORS } from '../../utils/constants';

export default function CategoryTabs({ tabs = [], active, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange && onChange(t.id)}
          style={{
            padding: '8px 14px',
            borderRadius: 10,
            background: active === t.id ? COLORS.primary : 'transparent',
            color: active === t.id ? COLORS.bg : COLORS.textPrimary,
            border: `1px solid ${active === t.id ? 'transparent' : 'rgba(255,255,255,0.04)'}`,
            cursor: 'pointer',
            fontWeight: 700
          }}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
