import React, { useState } from 'react';
import { useNotifications } from '../context/NotificationContext';
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  Camera,
  Award,
  Clock,
  X,
  ExternalLink,
  CheckCheck,
  ShieldCheck,
} from 'lucide-react';

interface NotificationDrawerProps {
  navigate: (path: string) => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ navigate }) => {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    activeToast,
    dismissToast,
  } = useNotifications();

  const [isOpen, setIsOpen] = useState(false);

  const getIcon = (type: string) => {
    switch (type) {
      case 'assignment':
        return <ShieldCheck className="w-4 h-4 text-sky-600" />;
      case 'status_change':
        return <Clock className="w-4 h-4 text-amber-600" />;
      case 'evidence_uploaded':
        return <Camera className="w-4 h-4 text-indigo-600" />;
      case 'resolved':
        return <Award className="w-4 h-4 text-emerald-600" />;
      default:
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
    }
  };

  const handleNotificationClick = (item: any) => {
    markAsRead(item.id);
    if (item.actionUrl) {
      navigate(item.actionUrl);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative">
      {/* Bell Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-stone-100 transition-colors focus-visible:outline-2 focus-visible:outline-emerald-600"
        title="Smart Notifications"
        aria-label="View notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-600 text-[10px] font-bold text-white shadow-xs">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown Drawer */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl border border-stone-200 shadow-xl py-3 z-50 divide-y divide-stone-100 animate-in fade-in slide-in-from-top-2 duration-150">
          {/* Header */}
          <div className="px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-slate-900">
                Civic Notifications
              </span>
              {unreadCount > 0 && (
                <span className="text-[10px] font-mono font-bold bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded-full">
                  {unreadCount} unread
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-[11px] font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 hover:underline"
                >
                  <CheckCheck className="w-3.5 h-3.5" />
                  Mark all read
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Notification List */}
          <div className="max-h-96 overflow-y-auto divide-y divide-stone-50">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500">
                No notifications right now.
              </div>
            ) : (
              notifications.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleNotificationClick(item)}
                  className={`p-3.5 hover:bg-stone-50 transition-colors cursor-pointer flex items-start gap-3 text-xs ${
                    !item.read ? 'bg-emerald-50/40' : ''
                  }`}
                >
                  <div className="p-2 bg-stone-100 rounded-lg shrink-0 mt-0.5">
                    {getIcon(item.type)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`font-bold ${!item.read ? 'text-slate-900' : 'text-slate-700'}`}>
                        {item.title}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono shrink-0">
                        {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-slate-600 leading-snug line-clamp-2">
                      {item.message}
                    </p>
                    <div className="flex items-center justify-between pt-1 text-[11px]">
                      <span className="font-mono text-emerald-800 font-medium">
                        {item.reportId}
                      </span>
                      <span className="text-emerald-900 font-semibold flex items-center gap-1 hover:underline">
                        <span>View</span>
                        <ExternalLink className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                  {!item.read && (
                    <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0 mt-2" />
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Floating Real-Time Toast Notification */}
      {activeToast && (
        <div className="fixed bottom-5 right-5 z-50 max-w-sm w-full bg-white rounded-xl border border-emerald-200 shadow-2xl p-4 animate-in slide-in-from-bottom-5 duration-200 flex items-start gap-3">
          <div className="p-2 bg-emerald-100 rounded-lg shrink-0 text-emerald-800">
            {getIcon(activeToast.type)}
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-slate-900">
                {activeToast.title}
              </span>
              <button
                onClick={dismissToast}
                className="text-slate-400 hover:text-slate-600 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-xs text-slate-600 leading-snug">
              {activeToast.message}
            </p>
            {activeToast.actionUrl && (
              <button
                onClick={() => {
                  navigate(activeToast.actionUrl!);
                  dismissToast();
                }}
                className="text-[11px] font-bold text-emerald-900 hover:underline pt-0.5 block"
              >
                Open Report Details →
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
