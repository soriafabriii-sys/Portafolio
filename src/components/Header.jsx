function Header({ query, setQuery, language, setLanguage, currentText, setMobileOpen }) {
  return (
    <header className="top-header">
      <div className="mobile-menu-trigger">
        <button type="button" className="menu-button" onClick={() => setMobileOpen((prev) => !prev)} aria-label="Toggle menu">
          ☰
        </button>
      </div>

      <div className="header-title-wrap">
        <span className="eyebrow">{currentText.headerTitle}</span>
      </div>

      <div className="header-actions">
        <label className="search-box" aria-label="Search">
          <span>⌕</span>
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={currentText.searchPlaceholder}
          />
        </label>

        <div className="language-toggle" aria-label="Select language">
          <button type="button" className={language === 'es' ? 'lang active' : 'lang'} onClick={() => setLanguage('es')}>
            ES
          </button>
          <button type="button" className={language === 'en' ? 'lang active' : 'lang'} onClick={() => setLanguage('en')}>
            EN
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
