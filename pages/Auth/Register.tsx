
import React from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { Button } from '../../components/ui/Button';

export const RegisterPage: React.FC = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => console.log('Registering:', data);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Criar conta</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">Junte-se a nós e comece a gerenciar hoje.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Nome completo</label>
          <input
            placeholder="Ex: João da Silva"
            {...register('name', { required: true })}
            className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">E-mail</label>
          <input
            type="email"
            placeholder="seu@email.com"
            {...register('email', { required: true })}
            className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Senha</label>
          <input
            type="password"
            placeholder="••••••••"
            {...register('password', { required: true })}
            className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
        <Button type="submit" className="w-full py-3">Criar minha conta</Button>
      </form>

      <p className="text-center text-sm text-slate-500 dark:text-slate-400">
        Já possui conta? <NavLink to="/login" className="text-blue-600 font-semibold hover:underline">Fazer login</NavLink>
      </p>
    </div>
  );
};
