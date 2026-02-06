
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/Button';
import { Icons } from '@/components/Icons';
import { Card, CardContent } from '@/components/ui/Card';
import { FormField } from '@/components/ui/FormField';
import { useToast } from '@/context/ToastContext';
import { cn } from '@/lib/utils';
import { User } from './UserList';

interface UserFormProps {
  user?: User;
  onCancel: () => void;
  onSuccess: (data: Partial<User>) => void;
}

export const UserForm: React.FC<UserFormProps> = ({ user, onCancel, onSuccess }) => {
  const { addToast } = useToast();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: user || {
      status: 'Ativo',
      role: 'User'
    }
  });

  const onSubmit = async (data: any) => {
    // Simular latência de rede para demonstrar feedback visual
    await new Promise(resolve => setTimeout(resolve, 800));

    addToast({
      type: 'success',
      title: user ? 'Registro Atualizado' : 'Usuário Criado',
      message: `As informações de ${data.name} foram salvas no sistema.`
    });

    onSuccess(data);
  };

  return (
    <Card className="border-none sm:border animate-in fade-in zoom-in-95 duration-400">
      <CardContent className="space-y-8 py-8 sm:px-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-xl shadow-blue-500/20">
              {user ? <Icons.Edit className="w-6 h-6" /> : <Icons.Plus className="w-6 h-6" />}
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {user ? 'Editar Registro' : 'Novo Usuário'}
              </h3>
              <p className="text-sm text-slate-500">Preencha os campos abaixo com atenção.</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onCancel} className="rounded-full hover:bg-red-50 hover:text-red-500 transition-colors">
            <Icons.Close className="w-5 h-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Nome Completo" icon={Icons.User} error={errors.name?.message as string}>
              <input
                {...register('name', {
                  required: "O nome é obrigatório",
                  minLength: { value: 3, message: "Mínimo de 3 caracteres" }
                })}
                placeholder="Ex: Lucas Silva"
                className={cn(
                  "w-full pl-12 pr-4 py-3 border rounded-2xl bg-white dark:bg-slate-800 outline-none transition-all",
                  errors.name ? "border-red-300" : "border-slate-200 dark:border-slate-700 focus:border-blue-500"
                )}
              />
            </FormField>

            <FormField label="E-mail Corporativo" icon={Icons.Email} error={errors.email?.message as string}>
              <input
                {...register('email', {
                  required: "E-mail é obrigatório",
                  pattern: { value: /^\S+@\S+$/i, message: "E-mail inválido" }
                })}
                placeholder="nome@empresa.com"
                className={cn(
                  "w-full pl-12 pr-4 py-3 border rounded-2xl bg-white dark:bg-slate-800 outline-none transition-all",
                  errors.email ? "border-red-300" : "border-slate-200 dark:border-slate-700 focus:border-blue-500"
                )}
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Permissão de Acesso" icon={Icons.Shield} error={errors.role?.message as string}>
              <select
                {...register('role', { required: "Selecione uma permissão" })}
                className="w-full pl-12 pr-10 py-3 border border-slate-200 dark:border-slate-700 rounded-2xl bg-white dark:bg-slate-800 outline-none appearance-none cursor-pointer"
              >
                <option value="Admin">Administrador</option>
                <option value="Editor">Editor</option>
                <option value="User">Usuário Comum</option>
              </select>
              <Icons.ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </FormField>

            <FormField label="Status da Conta" icon={Icons.Bell} error={errors.status?.message as string}>
              <select
                {...register('status', { required: "Selecione um status" })}
                className="w-full pl-12 pr-10 py-3 border border-slate-200 dark:border-slate-700 rounded-2xl bg-white dark:bg-slate-800 outline-none appearance-none cursor-pointer"
              >
                <option value="Ativo">Ativo</option>
                <option value="Inativo">Inativo</option>
              </select>
              <Icons.ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </FormField>
          </div>

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-4 pt-8 border-t border-slate-100 dark:border-slate-800">
            <Button variant="ghost" type="button" onClick={onCancel} disabled={isSubmitting} className="px-8 h-12 rounded-xl font-semibold">
              Descartar
            </Button>
            <Button type="submit" disabled={isSubmitting} className="px-10 h-12 rounded-xl font-bold shadow-lg shadow-blue-500/20 min-w-[140px]">
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                user ? 'Salvar Alterações' : 'Criar Usuário'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
