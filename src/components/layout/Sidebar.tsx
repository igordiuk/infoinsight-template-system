
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icons } from '@/components/Icons';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface SidebarProps {
  isOpen: boolean;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, isCollapsed, onToggleCollapse, onClose }) => {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: Icons.Dashboard },
    { name: 'Usuários', path: '/users', icon: Icons.Users },
    { name: 'Design System', path: '/design-system', icon: Icons.Shield },
    { name: 'Configurações', path: '/settings', icon: Icons.Settings },
  ];

  return (
    <aside className={cn(
      "fixed inset-y-0 left-0 z-50 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 ease-in-out transform lg:static lg:translate-x-0",
      isOpen ? "translate-x-0" : "-translate-x-full",
      isCollapsed ? "lg:w-20" : "lg:w-64",
      "w-64"
    )}>
      <div className="h-full flex flex-col">
        {/* Sidebar Header */}
        <div className={cn(
          "px-4 py-6 flex items-center transition-all duration-300 relative",
          isCollapsed ? "justify-center" : "justify-between"
        )}>
          <div className="flex items-center space-x-3 overflow-hidden">
            <div className="min-w-[32px] w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/30">
              <span className="text-white font-bold">i</span>
            </div>
            {(!isCollapsed || isOpen) && (
              <span className="text-xl font-bold tracking-tight text-slate-800 dark:text-white truncate animate-in fade-in duration-500">
                InfoInsight
              </span>
            )}
          </div>

          <Button variant="ghost" size="icon" className="lg:hidden h-8 w-8" onClick={onClose}>
            <Icons.Close className="w-5 h-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "hidden lg:flex h-8 w-8 text-slate-400 hover:text-slate-600 transition-all",
              isCollapsed && "absolute -right-4 top-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full shadow-sm z-10 hover:scale-110"
            )}
            onClick={onToggleCollapse}
          >
            {isCollapsed ? <Icons.SidebarOpen className="w-4 h-4" /> : <Icons.SidebarClose className="w-4 h-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-1.5">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              title={isCollapsed && !isOpen ? item.name : ""}
              className={({ isActive }) => cn(
                "flex items-center rounded-xl transition-all duration-200 group text-sm font-medium h-10",
                isCollapsed && !isOpen ? "justify-center px-0" : "px-4",
                isActive
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-100"
              )}
            >
              <item.icon className={cn("w-5 h-5", isCollapsed && !isOpen ? "" : "mr-3")} />
              {(!isCollapsed || isOpen) && <span className="truncate">{item.name}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Version */}
        {(!isCollapsed || isOpen) && (
          <div className="p-6 text-[10px] text-slate-400 dark:text-slate-600 font-medium uppercase tracking-widest text-center">
            v1.1.0 Clean
          </div>
        )}
      </div>
    </aside>
  );
};
