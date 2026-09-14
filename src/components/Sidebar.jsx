const iconMap = {
  home: '🏠',
  xatspaces: '🎨',
  animated: '✨',
  static: '🖼️',
  pstyle: '👤',
};

function Sidebar({ activeSection, setActiveSection, language, mobileOpen, setMobileOpen, items }) {
  return (
    <>
      <aside className={`sidebar ${mobileOpen ? 'is-open' : ''}`}>
        <div className="brand-block">
          <div className="brand-mark">3M2</div>
        </div>

        <nav className="nav-menu" aria-label="Main navigation">
          {items.map((item) => (
            <button
              key={item.key}
              type="button"
              className={activeSection === item.key ? 'nav-item active' : 'nav-item'}
              onClick={() => {
                setActiveSection(item.key);
                setMobileOpen(false);
              }}
              title={item.label[language]}
            >
              <span className="nav-icon">{iconMap[item.key]}</span>
            </button>
          ))}
        </nav>
      </aside>

      {mobileOpen && <div className="sidebar-backdrop" onClick={() => setMobileOpen(false)} />}
    </>
  );
}

export default Sidebar;
