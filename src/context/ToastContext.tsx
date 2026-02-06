
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Icons } from '../components/Icons';
import { cn } from '../lib/utils';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}

interface ToastContextType {
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-[100] flex flex-col gap-3 w-full max-w-sm pointer-events-none">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

const ToastItem: React.FC<{ toast: Toast; onRemove: (id: string) => void }> = ({ toast, onRemove }) => {
  useEffect(() => {
    const timer = setTimeout(() => onRemove(toast.id), 5000);
    return () => clearTimeout(timer);
  }, [toast.id, onRemove]);

  const icons = {
    success: <Icons.Shield className="w-5 h-5 text-emerald-500" />,
    error: <Icons.Close className="w-5 h-5 text-red-500" />,
    info: <Icons.Bell className="w-5 h-5 text-blue-500" />,
    warning: <Icons.Bell className="w-5 h-5 text-amber-500" />,
  };

  const backgrounds = {
    success: 'border-emerald-100 bg-emerald-50 dark:bg-emerald-950/30 dark:border-emerald-900/50',
    error: 'border-red-100 bg-red-50 dark:bg-red-950/30 dark:border-red-900/50',
    info: 'border-blue-100 bg-blue-50 dark:bg-blue-950/30 dark:border-blue-900/50',
    warning: 'border-amber-100 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-900/50',
  };

  return (
    <div className={cn(
      "pointer-events-auto flex w-full items-start gap-4 rounded-2xl border p-4 shadow-lg animate-in slide-in-from-right-full duration-300",
      backgrounds[toast.type]
    )}>
      <div className="shrink-0 pt-0.5">
        {icons[toast.type]}
      </div>
      <div className="flex-1 space-y-1">
        <p className="text-sm font-bold text-slate-900 dark:text-white leading-none">{toast.title}</p>
        {toast.message && <p className="text-xs text-slate-500 dark:text-slate-400">{toast.message}</p>}
      </div>
      <button 
        onClick={() => onRemove(toast.id)}
        className="shrink-0 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
      >
        <Icons.Close className="w-4 h-4" />
      </button>
    </div>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
};
