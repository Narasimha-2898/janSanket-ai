import React from 'react';
import { IssueStatus } from '../types';
import { useI18n } from '../i18n/I18nContext';

interface StatusBadgeProps {
  status: IssueStatus;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const { t } = useI18n();

  const getStatusInfo = () => {
    switch (status) {
      case 'submitted':
        return {
          label: t.statuses.submitted,
          textColor: 'text-amber-800',
          dot: 'bg-amber-500',
        };
      case 'under_review':
        return {
          label: t.statuses.under_review,
          textColor: 'text-sky-800',
          dot: 'bg-sky-500',
        };
      case 'in_progress':
        return {
          label: t.statuses.in_progress,
          textColor: 'text-indigo-800',
          dot: 'bg-indigo-500 animate-pulse',
        };
      case 'resolved':
        return {
          label: t.statuses.resolved,
          textColor: 'text-emerald-800',
          dot: 'bg-emerald-600',
        };
      case 'rejected':
      default:
        return {
          label: t.statuses.rejected,
          textColor: 'text-slate-600',
          dot: 'bg-slate-400',
        };
    }
  };

  const info = getStatusInfo();

  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${info.textColor} ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${info.dot}`} aria-hidden="true" />
      <span>{info.label}</span>
    </span>
  );
};
