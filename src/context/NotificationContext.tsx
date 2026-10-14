import React, { createContext, useContext, useState, useEffect } from 'react';
import { NotificationItem, UserRole } from '../types';

interface NotificationContextType {
  notifications: NotificationItem[];
  unreadCount: number;
  addNotification: (item: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
  activeToast: NotificationItem | null;
  dismissToast: () => void;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    reportId: 'JS-HYD-2026-1001',
    type: 'assignment',
    title: 'Department Assigned',
    message: 'Report JS-HYD-2026-1001 (Road No. 36 Pothole) assigned to GHMC Road Maintenance Division Squad #4.',
    timestamp: new Date(Date.now() - 3600000 * 3).toISOString(),
    read: false,
    actionUrl: '/issues/JS-HYD-2026-1001',
    roleRecipient: 'all',
  },
  {
    id: 'notif-2',
    reportId: 'JS-HYD-2026-1002',
    type: 'status_change',
    title: 'Review Decision Updated',
    message: 'Reviewer prioritized duplicate cluster on Jubilee Hills Road 36. Field dispatch scheduled.',
    timestamp: new Date(Date.now() - 3600000 * 8).toISOString(),
    read: false,
    actionUrl: '/issues/JS-HYD-2026-1002',
    roleRecipient: 'all',
  },
  {
    id: 'notif-3',
    reportId: 'JS-HYD-2026-1003',
    type: 'evidence_uploaded',
    title: 'Repair Evidence Uploaded',
    message: 'Field contractor uploaded high-resolution completion photo for Secunderabad drainage blockage.',
    timestamp: new Date(Date.now() - 3600000 * 18).toISOString(),
    read: true,
    actionUrl: '/issues/JS-HYD-2026-1003',
    roleRecipient: 'all',
  },
  {
    id: 'notif-4',
    reportId: 'JS-HYD-2026-1015',
    type: 'resolved',
    title: 'Resolution Approved',
    message: 'Municipal Reviewer officially certified resolution and signed off on public civic ledger.',
    timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
    read: true,
    actionUrl: '/issues/JS-HYD-2026-1015',
    roleRecipient: 'all',
  },
];

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const saved = localStorage.getItem('js_notifications');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_NOTIFICATIONS;
  });

  const [activeToast, setActiveToast] = useState<NotificationItem | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('js_notifications', JSON.stringify(notifications));
    } catch {}
  }, [notifications]);

  const addNotification = (item: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => {
    const newItem: NotificationItem = {
      ...item,
      id: `notif-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      read: false,
    };
    setNotifications((prev) => [newItem, ...prev]);
    setActiveToast(newItem);

    // Auto dismiss toast after 6 seconds
    setTimeout(() => {
      setActiveToast((current) => (current?.id === newItem.id ? null : current));
    }, 6000);
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const dismissToast = () => {
    setActiveToast(null);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        clearNotifications,
        activeToast,
        dismissToast,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
