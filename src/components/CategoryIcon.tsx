import React from 'react';
import { AlertTriangle, Trash2, Droplets, Lightbulb, Construction, ShieldAlert } from 'lucide-react';
import { IssueCategory } from '../types';

interface CategoryIconProps {
  category: IssueCategory;
  className?: string;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({ category, className = 'w-4 h-4' }) => {
  switch (category) {
    case 'pothole':
      return <AlertTriangle className={className} />;
    case 'garbage':
      return <Trash2 className={className} />;
    case 'drainage':
      return <Droplets className={className} />;
    case 'streetlight':
      return <Lightbulb className={className} />;
    case 'infrastructure':
      return <Construction className={className} />;
    case 'sanitation_other':
    default:
      return <ShieldAlert className={className} />;
  }
};
