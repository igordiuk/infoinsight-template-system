
import React from 'react';
import { Outlet } from 'react-router-dom';

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 animate-in zoom-in-95 duration-300">
        <div className="text-center mb-8">
          <div className="inline-flex w-12 h-12 rounded-xl overflow-hidden items-center justify-center mb-4 shadow-lg shadow-blue-500/20">
            <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">InfoInsight</h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">Plataforma Inteligente de Gestão</p>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none">
          <Outlet />
        </div>
        <p className="text-center text-sm text-slate-400 dark:text-slate-600">
          &copy; {new Date().getFullYear()} InfoInsight. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
};
