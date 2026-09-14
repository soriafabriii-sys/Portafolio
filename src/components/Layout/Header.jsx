import { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { t } from '../../utils/translations';
import { COLORS } from '../../utils/constants';
import Icon from '../Common/Icon';
import SearchBar from '../Common/SearchBar';
import { useNotifications } from '../../hooks/useNotifications';

export default function Header() {
  const { language, toggleLanguage } = useLanguage();
  const [avatarLoaded, setAvatarLoaded] = useState(true);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { notifications, unreadCount, markNotificationsAsRead } = useNotifications();

  const categoryNames = {
    xatspaces: 'Xatspace',
    animated: 'GIF',
    static: 'Pcback',
    pstyle: 'Pstyle',
    sala: 'Sala',
    reproductores: 'Reproductor',
  };

  const handleNotificationsClick = () => {
    setNotificationsOpen((isOpen) => !isOpen);
    if (unreadCount > 0) markNotificationsAsRead();
  };

  return (
    <header
      className="top-header"
      style={{
        position: 'fixed',
        top: 0,
        left: 100,
        right: 0,
        height: '70px',
        backgroundColor: COLORS.bg,
        borderBottom: `1px solid ${COLORS.bgAlt}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: '20px',
        paddingRight: '30px',
        zIndex: 40,
      }}
    >
      <div
        className="header-brand-group"
        style={{
          flex: 1,
          minWidth: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
        }}
      >
        {/* Buscador */}
        <div
          className="search-box"
          style={{
            flex: '1 1 460px',
            width: '100%',
            maxWidth: '460px',
            minWidth: 0,
          }}
        >
          <SearchBar />
        </div>

        {/* Marca junto al buscador */}
        <div
          className="header-title"
          style={{
            flex: '0 0 auto',
            fontSize: '20px',
            fontWeight: '900',
            letterSpacing: '4px',
            color: COLORS.textPrimary,
            whiteSpace: 'nowrap',
          }}
        >
          FABRICIO <span className="header-title-subtitle">GRAPHIC DESIGNER</span>
        </div>
      </div>

      {/* Status */}
      <div
        className="header-status"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginRight: '30px',
          fontSize: '11px',
          color: COLORS.status,
          fontWeight: '600',
        }}
      >
        <span
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: COLORS.status,
            boxShadow: `0 0 8px ${COLORS.status}`,
            animation: 'pulse 2s infinite',
          }}
        />
        ● {t('available', language)}
      </div>

      {/* Notificaciones */}
      <div className="notification-wrapper">
        <button
          className="header-notification"
          aria-label="Notificaciones"
          aria-expanded={notificationsOpen}
          onClick={handleNotificationsClick}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: COLORS.textPrimary,
            position: 'relative',
            marginRight: '20px',
            padding: '8px',
            borderRadius: '8px',
            transition: 'all 300ms ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = COLORS.bgAlt;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <Icon name="bell" size={24} />
          {unreadCount > 0 && (
            <span className="notification-badge">{unreadCount > 9 ? '9+' : unreadCount}</span>
          )}
        </button>

        {notificationsOpen && (
          <div className="notifications-panel" role="dialog" aria-label="Cambios recientes">
            <div className="notifications-header">
              <strong>Cambios recientes</strong>
              <span>{unreadCount ? `${unreadCount} nuevo${unreadCount === 1 ? '' : 's'}` : 'Al día'}</span>
            </div>
            {notifications.length > 0 ? (
              <div className="notifications-list">
                {notifications.map((notification) => (
                  <div className="notification-item" key={`${notification.id}-${notification.createdAt}`}>
                    <span className="notification-dot" />
                    <div>
                      <strong>{notification.title}</strong>
                      <p>{categoryNames[notification.category] || 'Diseño'} · {notification.subcategory}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="notifications-empty">No hay diseños nuevos.</p>
            )}
          </div>
        )}
      </div>

      {/* Avatar placeholder */}
      <div
        className="header-avatar"
        style={{
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          backgroundColor: COLORS.primary,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: COLORS.bg,
          fontWeight: 'bold',
          fontSize: '14px',
          marginRight: '15px',
          cursor: 'pointer',
          transition: 'all 300ms ease',
          boxShadow: `0 0 12px ${COLORS.primaryShadow}`,
          overflow: 'hidden',
        }}
      >
        {avatarLoaded ? (
          <img
            src={`${import.meta.env.BASE_URL}avatar/avatar.png`}
            alt="Avatar"
            onError={() => setAvatarLoaded(false)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          '3M'
        )}
      </div>

      {/* Selector de idioma */}
      <button
        className="header-language"
        onClick={toggleLanguage}
        style={{
          background: 'none',
          border: `1px solid ${COLORS.textMuted}`,
          cursor: 'pointer',
          color: COLORS.textSecondary,
          fontSize: '11px',
          fontWeight: '600',
          padding: '6px 12px',
          borderRadius: '6px',
          transition: 'all 300ms ease',
        }}
        onMouseEnter={(e) => {
          e.target.style.borderColor = COLORS.primary;
          e.target.style.color = COLORS.primary;
        }}
        onMouseLeave={(e) => {
          e.target.style.borderColor = COLORS.textMuted;
          e.target.style.color = COLORS.textSecondary;
        }}
      >
        {language === 'es' ? 'EN' : 'ES'}
      </button>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </header>
  );
}
