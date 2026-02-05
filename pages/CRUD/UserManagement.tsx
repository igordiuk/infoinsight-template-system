
import React, { useState } from 'react';
import { useTabs } from '../../context/TabContext';
import { useToast } from '../../context/ToastContext';
import { Button } from '../../components/ui/Button';
import { Icons } from '../../components/Icons';
import { Modal } from '../../components/ui/Modal';
import { cn } from '../../lib/utils';
import { UserList, User } from './UserList';
import { UserForm } from './UserForm';

const INITIAL_MOCK_USERS: User[] = [
  { id: '1', name: 'Alice Santos', email: 'alice@exemplo.com', role: 'Admin', status: 'Ativo' },
  { id: '2', name: 'Bruno Gomes', email: 'bruno@exemplo.com', role: 'Editor', status: 'Ativo' },
  { id: '3', name: 'Carla Lima', email: 'carla@exemplo.com', role: 'User', status: 'Inativo' },
  { id: '4', name: 'Daniel Oliveira', email: 'daniel@exemplo.com', role: 'User', status: 'Ativo' },
  { id: '5', name: 'Eduarda Costa', email: 'eduarda@exemplo.com', role: 'Editor', status: 'Ativo' },
  { id: '6', name: 'Fábio Souza', email: 'fabio@exemplo.com', role: 'Admin', status: 'Inativo' },
  { id: '7', name: 'Gabriela Mota', email: 'gabriela@exemplo.com', role: 'User', status: 'Ativo' },
  { id: '8', name: 'Henrique Alves', email: 'henrique@exemplo.com', role: 'Editor', status: 'Ativo' },
];

export const UserManagementPage: React.FC = () => {
  const { tabs, activeTabId, addTab, removeTab, setActiveTabId } = useTabs();
  const { addToast } = useToast();
  const [users, setUsers] = useState<User[]>(INITIAL_MOCK_USERS);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDeleteConfirm = () => {
    setUsers(prev => prev.filter(u => u.id !== deleteId));
    addToast({
      type: 'success',
      title: 'Removido',
      message: 'O usuário foi excluído permanentemente.'
    });
    setDeleteId(null);
  };

  const handleCreateOrUpdate = (data: Partial<User>) => {
    // Lógica para atualizar a lista local após sucesso no form
    removeTab(activeTabId);
  };

  return (
    <div className="space-y-6">
      {/* Dynamic Tab Bar Navigation */}
      <nav className="flex items-center border-b border-slate-200 dark:border-slate-800 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTabId(tab.id)}
            className={cn(
              "flex items-center px-6 py-4 border-b-2 text-sm font-bold transition-all whitespace-nowrap",
              activeTabId === tab.id 
                ? 'border-blue-600 text-blue-600 bg-blue-50/30 dark:bg-blue-900/10' 
                : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
            )}
          >
            {tab.type === 'list' ? <Icons.Menu className="w-4 h-4 mr-2" /> : <Icons.Edit className="w-4 h-4 mr-2" />}
            {tab.title}
            {tab.id !== 'list' && (
              <Icons.Close 
                className="w-3 h-3 ml-3 opacity-40 hover:opacity-100 hover:text-red-500 transition-all" 
                onClick={(e) => { e.stopPropagation(); removeTab(tab.id); }} 
              />
            )}
          </button>
        ))}
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => addTab({ id: `new-${Date.now()}`, title: 'Novo Usuário', type: 'create' })}
          className="ml-auto text-blue-600 font-bold hover:bg-blue-50 dark:hover:bg-blue-900/20"
        >
          <Icons.Plus className="w-4 h-4 mr-2" /> Criar Usuário
        </Button>
      </nav>

      {/* View Container */}
      <section className="min-h-[400px]">
        {activeTabId === 'list' ? (
          <UserList 
            users={users}
            onEdit={(user) => addTab({ id: user.id, title: `Editar: ${user.name}`, type: 'edit', data: user })} 
            onDelete={(id) => setDeleteId(id)}
          />
        ) : (
          tabs.map(tab => tab.id === activeTabId && (
            <UserForm 
              key={tab.id} 
              user={tab.data} 
              onCancel={() => removeTab(tab.id)} 
              onSuccess={handleCreateOrUpdate}
            />
          ))
        )}
      </section>

      {/* Confirmation Overlay */}
      <Modal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        title="Confirmar Exclusão"
        description="Esta ação removerá o acesso deste usuário imediatamente."
        variant="danger"
        footer={
          <>
            <Button variant="ghost" onClick={() => setDeleteId(null)}>Manter Usuário</Button>
            <Button variant="danger" onClick={handleDeleteConfirm} className="shadow-lg shadow-red-500/20">Remover Permanentemente</Button>
          </>
        }
      >
        <div className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 rounded-2xl">
          <p className="text-sm text-red-700 dark:text-red-400 font-medium">
            Atenção: Todos os dados vinculados a este perfil serão arquivados, mas o acesso será revogado instantaneamente.
          </p>
        </div>
      </Modal>
    </div>
  );
};
