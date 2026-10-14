import React from 'react';
import { PriorityBand } from '../types';
import { useI18n } from '../i18n/I18nContext';

interface PriorityBadgeProps {
  score: number;
  band: PriorityBand;
  showScore?: boolean;
  className?: string;
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({
  score,
  band,
  showScore = true,
  className = '',
}) => {
  const { t } = useI18n();

  const getTheme = () => {
    switch (band) {
      case 'critical':
        return {
          colorText: 'text-rose-700',
          dot: 'bg-rose-600',
          label: t.priority.critical,
        };
      case 'high':
        return {
          colorText: 'text-amber-700',
          dot: 'bg-amber-600',
          label: t.priority.high,
        };
      case 'medium':
        return {
          colorText: 'text-slate-700',
          dot: 'bg-slate-500',
          label: t.priority.medium,
        };
      case 'low':
      default:
        return {
          colorText: 'text-emerald-700',
          dot: 'bg-emerald-600',
          label: t.priority.low,
        };
    }
  };

  const theme = getTheme();

  return (
    <div className={`inline-flex items-center gap-1.5 text-xs font-semibold ${theme.colorText} ${className}`}>
      <span className={`w-2 h-2 rounded-full ${theme.dot}`} aria-hidden="true" />
      <span>{theme.label}</span>
      {showScore && (
        <span className="font-mono text-slate-500 font-normal">
          ({score}/100)
        </span>
      )}
    </div>
  );
};
