import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage debe ser usado dentro de LanguageProvider');
  }
  return context;
}
