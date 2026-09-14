import React from 'react';
import { COLORS } from '../../utils/constants';

export default function ColorDots({ colors = [], size = 10, onSelect }) {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      {colors.map((c, i) => (
        <button
          key={i}
          onClick={() => onSelect && onSelect(c)}
          aria-label={`color-${i}`}
          style={{
            width: size,
            height: size,
            borderRadius: '50%',
            backgroundColor: c,
            border: `2px solid rgba(255,255,255,0.06)`,
            cursor: onSelect ? 'pointer' : 'default',
            boxShadow: `0 0 6px rgba(0,0,0,0.4)`
          }}
        />
      ))}
    </div>
  );
}
