
import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Icons } from '../components/Icons';
import { Button } from '../components/ui/Button';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../lib/utils';

interface HeaderProps {
  onOpenSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSidebar }) => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getPageTitle = () => {
    const titles: Record<string, string> = {
      '/dashboard': 'Dashboard',
      '/users': 'Gestão de Usuários',
      '/design-system': 'Design System',
      '/settings': 'Configurações'
    };
    return titles[location.pathname] || 'Admin';
  };

  return (
    <header className="h-16 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40 px-4 md:px-6 flex items-center justify-between">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" className="lg:hidden mr-2 md:mr-4" onClick={onOpenSidebar}>
          <Icons.Menu className="w-6 h-6" />
        </Button>
        <div className="flex flex-col">
          <h2 className="text-sm font-bold text-slate-800 dark:text-white leading-tight">{getPageTitle()}</h2>
          <p className="text-[10px] text-slate-500 uppercase tracking-tighter hidden sm:block">Visão em Tempo Real</p>
        </div>
      </div>

      <div className="flex items-center space-x-1 sm:space-x-2">
        <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full h-9 w-9">
          {theme === 'dark' ? <Icons.Sun className="w-5 h-5" /> : <Icons.Moon className="w-5 h-5" />}
        </Button>
        
        <div className="relative hidden xs:block">
          <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 relative">
            <Icons.Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full border-2 border-white dark:border-slate-900"></span>
          </Button>
        </div>

        <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-1 sm:mx-2" />

        <div className="relative" ref={menuRef}>
          <button 
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            className={cn(
              "flex items-center space-x-2 md:space-x-3 p-1.5 pl-2 sm:pl-3 rounded-full transition-all duration-200 border border-transparent",
              profileMenuOpen ? "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700" : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
            )}
          >
            <span className="hidden sm:inline-block text-xs font-semibold text-slate-700 dark:text-slate-300">Lucas Silva</span>
            <img src="https://picsum.photos/id/64/32/32" className="w-8 h-8 rounded-full border border-slate-200 shrink-0" alt="Avatar" />
            <Icons.ChevronDown className={cn("w-3.5 h-3.5 text-slate-400 transition-transform", profileMenuOpen && "rotate-180")} />
          </button>

          {profileMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
              <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 text-xs">
                <p className="text-slate-500">Conectado como</p>
                <p className="font-bold text-slate-800 dark:text-white truncate">lucas.silva@infoinsight.com</p>
              </div>
              <div className="p-1.5 space-y-0.5">
                {[
                  { label: 'Meu Perfil', icon: Icons.User, path: '/settings' },
                  { label: 'Configurações', icon: Icons.Settings, path: '/settings' },
                  { label: 'Bloquear', icon: Icons.Lock, path: '/lock' },
                ].map(item => (
                  <button 
                    key={item.label}
                    onClick={() => { setProfileMenuOpen(false); navigate(item.path); }}
                    className="w-full flex items-center px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors group"
                  >
                    <item.icon className="w-4 h-4 mr-3 text-slate-400 group-hover:text-blue-500" />
                    {item.label}
                  </button>
                ))}
              </div>
              <div className="p-1.5 border-t border-slate-100 dark:border-slate-800">
                <button onClick={() => navigate('/login')} className="w-full flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors">
                  <Icons.Logout className="w-4 h-4 mr-3" /> Sair
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
