import { useEffect, useCallback } from 'react';
import { useAppContext } from './useAppContext';

export function useLightbox(designs) {
  const { selectedImage, isLightboxOpen, closeLightbox, openLightbox } =
    useAppContext();

  const currentIndex = designs.findIndex((d) => d.id === selectedImage?.id) ?? -1;

  const goToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      openLightbox(designs[currentIndex - 1]);
    }
  }, [currentIndex, designs, openLightbox]);

  const goToNext = useCallback(() => {
    if (currentIndex < designs.length - 1) {
      openLightbox(designs[currentIndex + 1]);
    }
  }, [currentIndex, designs, openLightbox]);

  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < designs.length - 1;

  // Manejo de teclas
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, closeLightbox, goToPrevious, goToNext]);

  return {
    selectedImage,
    isOpen: isLightboxOpen,
    open: openLightbox,
    close: closeLightbox,
    goToPrevious,
    goToNext,
    hasPrevious,
    hasNext,
    currentIndex: currentIndex + 1,
    total: designs.length,
  };
}
