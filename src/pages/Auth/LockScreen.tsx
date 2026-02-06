
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Icons } from '@/components/Icons';

export const LockScreenPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-sm text-center space-y-8 animate-in fade-in duration-700">
        <div className="space-y-4">
          <div className="relative inline-block">
            <img src="https://picsum.photos/120/120" className="w-24 h-24 rounded-full border-4 border-slate-800 mx-auto shadow-2xl" />
            <div className="absolute bottom-0 right-0 bg-blue-600 p-1.5 rounded-full border-2 border-slate-900">
              <Icons.Lock className="w-3 h-3 text-white" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Sessão Bloqueada</h2>
            <p className="text-slate-400">Olá, Lucas Silva. Digite sua senha para voltar.</p>
          </div>
        </div>

        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); navigate('/dashboard'); }}>
          <input
            type="password"
            placeholder="Sua senha..."
            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white text-center"
            autoFocus
          />
          <Button className="w-full py-3 rounded-xl">Desbloquear</Button>
        </form>

        <button onClick={() => navigate('/login')} className="text-slate-500 hover:text-blue-400 text-sm flex items-center justify-center mx-auto">
          <Icons.Logout className="w-4 h-4 mr-2" /> Sair e entrar como outro usuário
        </button>
      </div>
    </div>
  );
};
