import { useMemo, useCallback } from 'react';
import { filterBySearch, filterByCategory, filterByGroup } from '../utils/filters';
import { useAppContext } from './useAppContext';

export function useSearch(allDesigns) {
  const { searchQuery, currentCategory, currentGroup } = useAppContext();

  const filteredDesigns = useMemo(() => {
    let results = allDesigns;

    // Filtro por búsqueda
    if (searchQuery.trim()) {
      results = filterBySearch(results, searchQuery);
    } else {
      // Si no hay búsqueda, filtrar por categoría y grupo
      results = filterByCategory(results, currentCategory);
      results = filterByGroup(results, currentGroup);
    }

    return results;
  }, [allDesigns, searchQuery, currentCategory, currentGroup]);

  return { filteredDesigns, hasResults: filteredDesigns.length > 0 };
}
