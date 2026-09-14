import { createContext, useState, useEffect, useCallback } from 'react';
import { STORAGE_KEYS, LANGUAGES } from '../utils/constants';

export const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.language);
    return stored && LANGUAGES.includes(stored) ? stored : 'es';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.language, language);
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === 'es' ? 'en' : 'es'));
  }, []);

  const value = {
    language,
    setLanguage,
    toggleLanguage,
    isEnglish: language === 'en',
    isSpanish: language === 'es',
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
