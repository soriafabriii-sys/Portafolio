import { useEffect } from 'react';

export function useProtectionMode(enabled = true) {
  useEffect(() => {
    if (!enabled) return undefined;

    const preventContextMenu = (event) => {
      event.preventDefault();
    };

    const preventImageDrag = (event) => {
      if (event.target instanceof HTMLImageElement) event.preventDefault();
    };

    const preventImageSelection = (event) => {
      if (event.target instanceof HTMLImageElement) event.preventDefault();
    };

    const preventDevToolsShortcuts = (event) => {
      const key = event.key.toLowerCase();
      const isFunctionInspector = event.key === 'F12';
      const isDevToolsShortcut =
        (event.ctrlKey && event.shiftKey && ['i', 'j', 'c'].includes(key)) ||
        (event.ctrlKey && key === 'u');

      if (isFunctionInspector || isDevToolsShortcut) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    document.addEventListener('contextmenu', preventContextMenu);
    document.addEventListener('dragstart', preventImageDrag);
    document.addEventListener('selectstart', preventImageSelection);
    document.addEventListener('keydown', preventDevToolsShortcuts, true);

    return () => {
      document.removeEventListener('contextmenu', preventContextMenu);
      document.removeEventListener('dragstart', preventImageDrag);
      document.removeEventListener('selectstart', preventImageSelection);
      document.removeEventListener('keydown', preventDevToolsShortcuts, true);
    };
  }, [enabled]);
}