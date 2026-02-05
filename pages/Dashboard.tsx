
import React from 'react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Icons } from '../components/Icons';

export const DashboardPage: React.FC = () => {
  const stats = [
    { label: 'Usuários Ativos', value: '12,450', change: '+12%', icon: Icons.Users, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { label: 'Receita Mensal', value: 'R$ 45.200', change: '+8%', icon: Icons.Dashboard, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
    { label: 'Projetos Concluídos', value: '154', change: '+24%', icon: Icons.Shield, color: 'text-indigo-600', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
    { label: 'Alertas Pendentes', value: '12', change: '-5%', icon: Icons.Bell, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20' },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="group hover:border-blue-500/50 cursor-pointer">
            <CardContent className="flex items-center p-6">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} mr-4 transition-transform group-hover:scale-110`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
                <div className="flex items-baseline space-x-2">
                  <h4 className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</h4>
                  <span className={`text-xs font-semibold ${stat.change.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader title="Atividade Recente" subtitle="Veja o fluxo de trabalho dos últimos 7 dias" />
          <CardContent>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-lg">
              <p className="text-slate-400">Gráfico de Atividade (D3/Recharts aqui)</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Próximas Tarefas" />
          <CardContent className="space-y-4">
            {[1, 2, 3, 4].map(t => (
              <div key={t} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium dark:text-white">Revisão do Sprint {t}</p>
                  <p className="text-xs text-slate-500">Hoje às 14:00</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
