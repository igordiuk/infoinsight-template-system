
import React from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Icons } from '@/components/Icons';

export const LoginPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    console.log('Login attempt:', data);
    navigate('/dashboard');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Bem-vindo de volta</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">Insira suas credenciais para acessar sua conta.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">E-mail</label>
          <div className="relative">
            <Icons.Email className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="email"
              placeholder="seu@email.com"
              {...register('email', { required: 'Email é obrigatório' })}
              className={`w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border ${errors.email ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-900 dark:text-white`}
            />
          </div>
          {errors.email && <span className="text-xs text-red-500">{errors.email.message as string}</span>}
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Senha</label>
            <NavLink to="/recover" className="text-xs text-blue-600 hover:underline">Esqueceu a senha?</NavLink>
          </div>
          <div className="relative">
            <Icons.Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="password"
              placeholder="••••••••"
              {...register('password', { required: 'Senha é obrigatória' })}
              className={`w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border ${errors.password ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-900 dark:text-white`}
            />
          </div>
          {errors.password && <span className="text-xs text-red-500">{errors.password.message as string}</span>}
        </div>

        <Button type="submit" className="w-full py-3">
          Entrar
        </Button>
      </form>

      <div className="relative py-2">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-slate-200 dark:border-slate-800"></span>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white dark:bg-slate-900 px-2 text-slate-500">Ou continue com</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" className="w-full">Google</Button>
        <Button variant="outline" className="w-full">Github</Button>
      </div>

      <p className="text-center text-sm text-slate-500 dark:text-slate-400">
        Não tem uma conta? <NavLink to="/register" className="text-blue-600 font-semibold hover:underline">Cadastre-se</NavLink>
      </p>
    </div>
  );
};
