import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext debe ser usado dentro de AppProvider');
  }
  return context;
}
