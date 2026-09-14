import { useEffect, useState } from 'react';
import { designsByCategory } from '../data/designs';

const KNOWN_DESIGNS_KEY = 'portfolio-known-designs';
const NOTIFICATIONS_KEY = 'portfolio-notifications';
const UNREAD_NOTIFICATIONS_KEY = 'portfolio-unread-notifications';

function getCurrentDesigns() {
  return Object.values(designsByCategory)
    .flat()
    .map((design) => ({
      id: design.id,
      title: design.alt || 'Nuevo diseño',
      category: design.category,
      subcategory: design.subcategory,
    }));
}

function readJson(key, fallback) {
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export function useNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [unreadIds, setUnreadIds] = useState([]);

  useEffect(() => {
    const currentDesigns = getCurrentDesigns();
    const currentIds = currentDesigns.map((design) => design.id);
    const knownIds = readJson(KNOWN_DESIGNS_KEY, null);
    const savedNotifications = readJson(NOTIFICATIONS_KEY, []);
    const savedUnreadIds = readJson(UNREAD_NOTIFICATIONS_KEY, savedNotifications.map((notification) => notification.id));

    if (!knownIds) {
      window.localStorage.setItem(KNOWN_DESIGNS_KEY, JSON.stringify(currentIds));
      setNotifications(savedNotifications);
      setUnreadIds(savedUnreadIds);
      return;
    }

    const newDesigns = currentDesigns.filter((design) => !knownIds.includes(design.id));
    const newNotifications = newDesigns.map((design) => ({
      ...design,
      createdAt: new Date().toISOString(),
    }));
    const mergedNotifications = [...newNotifications, ...savedNotifications].slice(0, 20);
    const mergedUnreadIds = [...newNotifications.map((design) => design.id), ...savedUnreadIds];

    window.localStorage.setItem(KNOWN_DESIGNS_KEY, JSON.stringify(currentIds));
    window.localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(mergedNotifications));
    window.localStorage.setItem(UNREAD_NOTIFICATIONS_KEY, JSON.stringify(mergedUnreadIds));
    setNotifications(mergedNotifications);
    setUnreadIds(mergedUnreadIds);
  }, []);

  const markNotificationsAsRead = () => {
    window.localStorage.setItem(UNREAD_NOTIFICATIONS_KEY, JSON.stringify([]));
    setUnreadIds([]);
  };

  return {
    notifications,
    unreadCount: unreadIds.length,
    markNotificationsAsRead,
  };
}
