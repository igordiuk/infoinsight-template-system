
import React from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Icons } from '../../components/Icons';

export const RecoverPage: React.FC = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => alert('Link de recuperação enviado para: ' + data.email);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <NavLink to="/login" className="inline-flex items-center text-sm text-slate-500 hover:text-blue-600 mb-2">
          <Icons.ArrowLeft className="w-4 h-4 mr-2" /> Voltar ao Login
        </NavLink>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Recuperar senha</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">Enviaremos um link para redefinir sua senha.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">E-mail</label>
          <input
            type="email"
            placeholder="seu@email.com"
            {...register('email', { required: true })}
            className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-900 dark:text-white"
          />
        </div>
        <Button type="submit" className="w-full py-3">Enviar Link</Button>
      </form>
    </div>
  );
};
