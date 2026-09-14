import { createContext, useState, useCallback } from 'react';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [currentCategory, setCurrentCategory] = useState('home');
  const [currentGroup, setCurrentGroup] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const openLightbox = useCallback((image) => {
    setSelectedImage(image);
    setIsLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false);
    setSelectedImage(null);
  }, []);

  const navigateCategory = useCallback((category) => {
    setCurrentCategory(category);
    setCurrentGroup(1);
  }, []);

  const navigateGroup = useCallback((group) => {
    setCurrentGroup(group);
  }, []);

  const value = {
    currentCategory,
    currentGroup,
    searchQuery,
    selectedImage,
    isLightboxOpen,
    setCurrentCategory: navigateCategory,
    setCurrentGroup: navigateGroup,
    setSearchQuery,
    openLightbox,
    closeLightbox,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}
