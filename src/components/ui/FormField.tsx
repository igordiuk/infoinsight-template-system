
import React from 'react';
import { cn } from '../../lib/utils';

interface FormFieldProps {
  label?: string;
  error?: string;
  icon?: React.ElementType;
  children: React.ReactNode;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({ label, error, icon: Icon, children, className }) => {
  return (
    <div className={cn("space-y-1.5 group w-full", className)}>
      {label && (
        <label className={cn(
          "text-sm font-bold transition-colors block",
          error ? "text-red-500" : "text-slate-700 dark:text-slate-300 group-focus-within:text-blue-600"
        )}>
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className={cn(
            "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors pointer-events-none",
            error ? "text-red-400" : "text-slate-400 group-focus-within:text-blue-500"
          )} />
        )}
        {children}
      </div>
      {error && <p className="text-xs text-red-500 mt-1 font-medium animate-in fade-in slide-in-from-top-1">{error}</p>}
    </div>
  );
};
