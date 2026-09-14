import { useState } from 'react';
import { useNavigation } from '../../hooks/useNavigation';
import { useLanguage } from '../../hooks/useLanguage';
import { t } from '../../utils/translations';
import { COLORS } from '../../utils/constants';
import Icon from '../Common/Icon';

export default function Sidebar() {
  const { currentCategory, goToCategory, goHome } = useNavigation();
  const { language } = useLanguage();
  const [logoLoaded, setLogoLoaded] = useState(true);

  const navItems = [
    { id: 'home', label: t('home', language), icon: 'home' },
    { id: 'xatspaces', label: 'Xatspace', icon: 'sparkles' },
    { id: 'animated', label: 'Gif', icon: 'film' },
    { id: 'static', label: 'Pcback', icon: 'image' },
    { id: 'pstyle', label: 'Pstyle', icon: 'paint' },
    { id: 'sala', label: 'Sala', icon: 'sala' },
    { id: 'reproductores', label: 'Reproductores', icon: 'music' },
  ];

  return (
    <aside
      className="sidebar"
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100px',
        height: '100vh',
        backgroundColor: COLORS.bg,
        borderRight: `1px solid ${COLORS.bgAlt}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '20px',
        paddingBottom: '20px',
        gap: '15px',
        overflowY: 'auto',
        overflowX: 'hidden',
        flexShrink: 0,
        zIndex: 50,
      }}
    >
      {/* Logo Brand */}
      <div
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '12px',
          border: `2px solid ${COLORS.primary}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          fontSize: '14px',
          color: COLORS.primary,
          marginBottom: '10px',
          overflow: 'hidden',
        }}
      >
        {logoLoaded ? (
          <img
            src={`${import.meta.env.BASE_URL}logo/logo.png`}
            alt="Logo"
            onError={() => setLogoLoaded(false)}
            style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
          />
        ) : (
          '3M2'
        )}
      </div>

      {/* Navigation Items */}
      {navItems.map((item) => {
        const isActive =
          (item.id === 'home' && currentCategory === 'home') ||
          (item.id !== 'home' && currentCategory === item.id);

        return (
          <button
            key={item.id}
            className="nav-item"
            onClick={() => {
              if (item.id === 'home') {
                goHome();
              } else {
                goToCategory(item.id);
              }
            }}
            title={item.label}
            style={{
              width: '60px',
              height: '60px',
              border: 'none',
              borderRadius: '12px',
              backgroundColor: isActive ? COLORS.primary : 'transparent',
              color: isActive ? COLORS.bg : COLORS.textSecondary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 300ms ease',
              boxShadow: isActive ? `0 0 20px ${COLORS.primaryShadow}` : 'none',
              position: 'relative',
              flex: '0 0 60px',
            }}
          >
            <Icon
              name={item.icon}
              size={28}
              color={isActive ? COLORS.bg : COLORS.textSecondary}
            />
          </button>
        );
      })}
    </aside>
  );
}
