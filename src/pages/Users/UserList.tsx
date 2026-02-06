
import React from 'react';
import { Button } from '@/components/ui/Button';
import { Icons } from '@/components/Icons';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'Ativo' | 'Inativo';
}

interface UserListProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

export const UserList: React.FC<UserListProps> = ({ users, onEdit, onDelete }) => {
  return (
    <Card className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Usuário</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">E-mail</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Função</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors group">
                <td className="px-6 py-4 flex items-center">
                  <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 text-[10px] font-bold mr-3 shadow-sm group-hover:scale-110 transition-transform">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-slate-100 text-sm block">{user.name}</span>
                    <span className="text-[10px] text-slate-400 sm:hidden">{user.role}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500 font-medium">{user.email}</td>
                <td className="px-6 py-4 text-sm font-medium text-slate-600 dark:text-slate-400">{user.role}</td>
                <td className="px-6 py-4">
                  <Badge variant={user.status === 'Ativo' ? 'success' : 'default'}>
                    <span className={cn("w-1.5 h-1.5 rounded-full mr-1.5", user.status === 'Ativo' ? "bg-emerald-500" : "bg-slate-400")} />
                    {user.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(user)}
                      className="h-9 w-9 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl"
                    >
                      <Icons.Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(user.id)}
                      className="h-9 w-9 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl"
                    >
                      <Icons.Trash className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {users.length === 0 && (
        <div className="p-20 text-center">
          <div className="inline-flex p-4 bg-slate-50 dark:bg-slate-800 rounded-full mb-4">
            <Icons.Users className="w-8 h-8 text-slate-300" />
          </div>
          <p className="text-slate-500 font-medium">Nenhum usuário encontrado.</p>
        </div>
      )}
    </Card>
  );
};
