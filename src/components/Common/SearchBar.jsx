import { useAppContext } from '../../hooks/useAppContext';
import { useLanguage } from '../../hooks/useLanguage';
import { useNavigation } from '../../hooks/useNavigation';
import { t } from '../../utils/translations';
import { COLORS } from '../../utils/constants';
import Icon from './Icon';

const searchKeywordMap = {
  xatspace: 'xatspaces',
  xatspaces: 'xatspaces',
  gif: 'animated',
  gifs: 'animated',
  pcback: 'static',
  pstyle: 'pstyle',
  sala: 'sala',
  reproductor: 'reproductores',
  reproductores: 'reproductores',
  home: 'home',
  inicio: 'home',
};

export default function SearchBar() {
  const { currentCategory, searchQuery, setSearchQuery } = useAppContext();
  const { goToCategory } = useNavigation();
  const { language } = useLanguage();

  const getCategoryFromQuery = (value) => {
    const normalized = value.trim().toLowerCase();

    if (!normalized) {
      return null;
    }

    const cleanValue = normalized
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    const words = cleanValue.split(' ');

    for (const word of words) {
      if (searchKeywordMap[word]) {
        return searchKeywordMap[word];
      }
    }

    return null;
  };

  const handleChange = (event) => {
    const nextValue = event.target.value;
    setSearchQuery(nextValue);

    const matchedCategory = getCategoryFromQuery(nextValue);

    if (matchedCategory && matchedCategory !== currentCategory) {
      goToCategory(matchedCategory);
    }
  };

  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
      <Icon name="search" size={20} color={COLORS.textMuted} />

      <input
        className="search-input"
        type="text"
        placeholder={t('searchPlaceholder', language)}
        value={searchQuery}
        onChange={handleChange}
        style={{
          backgroundColor: COLORS.bgAlt,
          border: `1px solid ${COLORS.bgAlt}`,
          borderRadius: '8px',
          color: COLORS.textPrimary,
          padding: '10px 12px 10px 36px',
          width: '100%',
          fontSize: '14px',
          outline: 'none',
          transition: 'all 300ms ease',
          marginLeft: '-28px',
          paddingLeft: '36px',
        }}
        onFocus={(e) => {
          e.target.style.borderColor = COLORS.primary;
          e.target.style.backgroundColor = 'transparent';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = COLORS.bgAlt;
          e.target.style.backgroundColor = COLORS.bgAlt;
        }}
      />

      {searchQuery && (
        <button
          onClick={() => setSearchQuery('')}
          style={{
            position: 'absolute',
            right: '12px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: COLORS.textMuted,
            padding: '4px',
          }}
        >
          <Icon name="x" size={18} />
        </button>
      )}
    </div>
  );
}

