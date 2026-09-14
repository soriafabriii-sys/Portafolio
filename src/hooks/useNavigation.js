import { useCallback } from 'react';
import { useAppContext } from './useAppContext';

export function useNavigation() {
  const { currentCategory, currentGroup, setCurrentCategory, setCurrentGroup } =
    useAppContext();

  const goToCategory = useCallback((category) => {
    setCurrentCategory(category);
    setCurrentGroup(1);
  }, [setCurrentCategory, setCurrentGroup]);

  const goToGroup = useCallback((group) => {
    setCurrentGroup(group);
  }, [setCurrentGroup]);

  const goHome = useCallback(() => {
    setCurrentCategory('home');
    setCurrentGroup(1);
  }, [setCurrentCategory, setCurrentGroup]);

  return {
    currentCategory,
    currentGroup,
    goToCategory,
    goToGroup,
    goHome,
  };
}
