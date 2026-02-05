
import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Icons } from '../components/Icons';
import { Badge } from '../components/ui/Badge';
import { FormField } from '../components/ui/FormField';
import { Modal } from '../components/ui/Modal';
import { useToast } from '../context/ToastContext';
import { cn } from '../lib/utils';

export const DesignSystemPage: React.FC = () => {
  const { addToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-12 pb-20 max-w-6xl mx-auto">
      {/* Header da Página */}
      <header className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">Design System</h1>
        <p className="text-lg text-slate-500 dark:text-slate-400">Guia de componentes e padrões visuais da InfoInsight.</p>
      </header>

      {/* 1. Tipografia e Identidade */}
      <section className="space-y-6">
        <SectionHeader title="Identidade & Cores" icon={Icons.Shield} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader title="Tipografia" subtitle="Fontes Inter e Plus Jakarta Sans" />
            <CardContent className="space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Display - Headings</span>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white font-display">InfoInsight Dashboard</h2>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Sans - Body Text</span>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  O corpo do texto utiliza a fonte Inter para máxima legibilidade em densidades de dados elevadas.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader title="Paleta Principal" subtitle="Cores semânticas do sistema" />
            <CardContent>
               <div className="grid grid-cols-4 gap-3">
                 <ColorSwatch color="bg-blue-600" label="Primary" />
                 <ColorSwatch color="bg-emerald-500" label="Success" />
                 <ColorSwatch color="bg-amber-500" label="Warning" />
                 <ColorSwatch color="bg-red-500" label="Danger" />
               </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 2. Feedback & Status (Badges e Toasts) */}
      <section className="space-y-6">
        <SectionHeader title="Feedback & Notificações" icon={Icons.Bell} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader title="Badges" subtitle="Indicadores de status e tags" />
            <CardContent className="flex flex-wrap gap-3">
              <Badge variant="default">Padrão</Badge>
              <Badge variant="success">Ativo / Sucesso</Badge>
              <Badge variant="warning">Pendente</Badge>
              <Badge variant="error">Erro / Crítico</Badge>
              <Badge variant="info">Informação</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="Sistema de Toasts" subtitle="Notificações em tempo real" />
            <CardContent className="flex flex-wrap gap-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => addToast({ type: 'success', title: 'Operação realizada', message: 'Os dados foram salvos na nuvem.' })}
              >
                Toast Sucesso
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => addToast({ type: 'error', title: 'Erro de conexão', message: 'Não foi possível sincronizar os dados.' })}
              >
                Toast Erro
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => addToast({ type: 'info', title: 'Nova Mensagem', message: 'Você recebeu um novo alerta no sistema.' })}
              >
                Toast Info
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 3. Botões & Interação */}
      <section className="space-y-6">
        <SectionHeader title="Botões & Ações" icon={Icons.Menu} />
        <Card>
          <CardContent className="space-y-8">
            <div className="flex flex-wrap gap-4 items-center">
              <Button variant="primary">Primary Action</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost Button</Button>
              <Button variant="danger">Destructive</Button>
              <Button size="icon" variant="primary"><Icons.Plus className="w-5 h-5" /></Button>
            </div>
            <div className="flex flex-wrap gap-4 items-center">
               <Button variant="primary" size="sm">Pequeno</Button>
               <Button variant="primary" size="md">Médio (Padrão)</Button>
               <Button variant="primary" size="lg">Grande</Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 4. Formulários & Validação */}
      <section className="space-y-6">
        <SectionHeader title="Formulários & Inputs" icon={Icons.Edit} />
        <Card>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <FormField label="Input com Ícone" icon={Icons.User}>
                <input placeholder="Digite seu nome..." className="w-full pl-12 pr-4 py-3 border border-slate-200 dark:border-slate-700 rounded-2xl bg-slate-50 dark:bg-slate-800 outline-none focus:border-blue-500 transition-all" />
              </FormField>

              <FormField label="Input com Erro de Validação" icon={Icons.Email} error="Este endereço de e-mail já está em uso">
                <input defaultValue="erro@exemplo.com" className="w-full pl-12 pr-4 py-3 border border-red-300 rounded-2xl bg-red-50/30 outline-none transition-all" />
              </FormField>
            </div>

            <div className="space-y-6">
              <FormField label="Select Customizado" icon={Icons.Shield}>
                <select className="w-full pl-12 pr-10 py-3 border border-slate-200 dark:border-slate-700 rounded-2xl bg-slate-50 dark:bg-slate-800 outline-none appearance-none cursor-pointer">
                  <option>Administrador</option>
                  <option>Editor</option>
                  <option>Visualizador</option>
                </select>
                <Icons.ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </FormField>

              <div className="p-6 bg-blue-50 dark:bg-blue-900/10 rounded-3xl border border-blue-100 dark:border-blue-900/30 flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-bold text-blue-900 dark:text-blue-300">Modais de Confirmação</p>
                  <p className="text-xs text-blue-700/70 dark:text-blue-400/70">Teste a experiência de diálogos modais.</p>
                </div>
                <Button variant="primary" size="sm" onClick={() => setIsModalOpen(true)}>Abrir Modal</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 5. Biblioteca de Ícones */}
      <section className="space-y-6">
        <SectionHeader title="Biblioteca de Ícones" icon={Icons.Search} />
        <Card>
          <CardContent className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-10 gap-6">
            {Object.entries(Icons).map(([name, Icon]) => (
              <div key={name} className="flex flex-col items-center justify-center p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all group">
                <Icon className="w-6 h-6 text-slate-400 group-hover:text-blue-600 transition-colors" />
                <span className="text-[10px] mt-2 text-slate-400 group-hover:text-slate-600 font-medium text-center truncate w-full">{name}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      {/* Modal de Exemplo */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Exemplo de Modal"
        description="Esta é a estrutura padrão para diálogos de confirmação ou formulários rápidos."
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Fechar Guia</Button>
            <Button variant="primary" onClick={() => { setIsModalOpen(false); addToast({ type: 'success', title: 'Confirmado!', message: 'Ação executada via modal.' }); }}>Entendido</Button>
          </>
        }
      >
        <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl">
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Nossos modais são acessíveis, suportam fechamento via backdrop e possuem animações de entrada suaves para não quebrar o fluxo do usuário.
          </p>
        </div>
      </Modal>
    </div>
  );
};

/* Componentes Auxiliares Internos para Clean Code */

const SectionHeader: React.FC<{ title: string; icon: React.ElementType }> = ({ title, icon: Icon }) => (
  <div className="flex items-center space-x-3 pb-2 border-b border-slate-200 dark:border-slate-800">
    <div className="p-2 bg-blue-600/10 rounded-lg">
      <Icon className="w-5 h-5 text-blue-600" />
    </div>
    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">{title}</h2>
  </div>
);

const ColorSwatch: React.FC<{ color: string; label: string }> = ({ color, label }) => (
  <div className="space-y-2">
    <div className={cn("h-16 w-full rounded-2xl shadow-inner", color)} />
    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter block text-center">{label}</span>
  </div>
);
