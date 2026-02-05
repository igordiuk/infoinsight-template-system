
import React, { useState, useRef } from 'react';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';
import { Icons } from '../../components/Icons';
import { cn } from '../../lib/utils';

export const SettingsPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { addToast } = useToast();
  const [notifications, setNotifications] = useState({ email: true, push: false, sms: true });
  
  // Perfil State
  const [profileImage, setProfileImage] = useState<string>("https://picsum.photos/id/64/150/150");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleToggle = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB Limit
        addToast({
          type: 'error',
          title: 'Arquivo muito grande',
          message: 'A imagem deve ter no máximo 2MB.'
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadstart = () => {
        setIsUploading(true);
        setUploadProgress(0);
      };

      reader.onprogress = (data) => {
        if (data.lengthComputable) {
          const progress = Math.round((data.loaded / data.total) * 100);
          setUploadProgress(progress);
        }
      };

      reader.onload = (e) => {
        // Simular um atraso de rede para o upload parecer real
        setTimeout(() => {
          setProfileImage(e.target?.result as string);
          setIsUploading(false);
          setUploadProgress(0);
          addToast({
            type: 'success',
            title: 'Foto atualizada',
            message: 'Sua foto de perfil foi alterada com sucesso.'
          });
        }, 1500);
      };

      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setProfileImage("");
    addToast({
      type: 'info',
      title: 'Foto removida',
      message: 'Sua foto de perfil foi removida.'
    });
  };

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Seção de Perfil / Avatar */}
      <Card className="overflow-visible">
        <CardHeader title="Meu Perfil" subtitle="Gerencie suas informações públicas e foto de perfil" />
        <CardContent>
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            <div className="relative group">
              <div className="w-32 h-32 rounded-3xl overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <Icons.User className="w-12 h-12 text-slate-400" />
                )}
                
                {isUploading && (
                  <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm flex flex-col items-center justify-center p-4">
                    <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden mb-2">
                      <div 
                        className="bg-blue-500 h-full transition-all duration-300" 
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-white font-bold uppercase tracking-widest">{uploadProgress}%</span>
                  </div>
                )}
              </div>
              
              <button 
                disabled={isUploading}
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-2 -right-2 p-2.5 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition-all active:scale-90 disabled:opacity-50"
              >
                <Icons.Edit className="w-4 h-4" />
              </button>
              
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept="image/*"
              />
            </div>

            <div className="flex-1 space-y-4 text-center md:text-left">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Lucas Silva</h3>
                <p className="text-sm text-slate-500">Administrador de Sistemas • Membro desde Jan 2024</p>
              </div>
              
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                  Trocar Foto
                </Button>
                {profileImage && (
                  <Button variant="ghost" size="sm" onClick={removePhoto} className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                    Remover
                  </Button>
                )}
              </div>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-medium">PNG, JPG ou GIF. Máximo de 2MB.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Aparência */}
      <Card>
        <CardHeader title="Aparência" subtitle="Personalize como o sistema aparece para você" />
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">Modo Dark</p>
              <p className="text-sm text-slate-500">Alternar entre tema claro e escuro</p>
            </div>
            <button 
              onClick={toggleTheme}
              className={cn(
                "w-14 h-8 flex items-center rounded-full p-1 transition-all duration-300",
                theme === 'dark' ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
              )}
            >
              <div className={cn(
                "bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center",
                theme === 'dark' ? 'translate-x-6' : 'translate-x-0'
              )}>
                {theme === 'dark' ? <Icons.Moon className="w-3.5 h-3.5 text-blue-600" /> : <Icons.Sun className="w-3.5 h-3.5 text-amber-500" />}
              </div>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Notificações */}
      <Card>
        <CardHeader title="Preferências de Notificação" subtitle="Escolha quais alertas você deseja receber" />
        <CardContent className="divide-y divide-slate-100 dark:divide-slate-800">
          {(Object.keys(notifications) as Array<keyof typeof notifications>).map(key => (
            <div key={key} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                   {key === 'email' ? <Icons.Email className="w-4 h-4 text-slate-500" /> : 
                    key === 'push' ? <Icons.Bell className="w-4 h-4 text-slate-500" /> : 
                    <Icons.ID className="w-4 h-4 text-slate-500" />}
                </div>
                <div>
                  <p className="font-semibold capitalize text-slate-900 dark:text-white">Notificações por {key}</p>
                  <p className="text-xs text-slate-500">Receba alertas importantes via {key === 'sms' ? 'Mensagem de Texto' : key}</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={notifications[key]} 
                  onChange={() => handleToggle(key)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Segurança */}
      <Card>
        <CardHeader title="Segurança da Conta" subtitle="Ações críticas de proteção" />
        <CardContent className="flex flex-col sm:flex-row gap-4">
           <Button variant="outline" className="flex-1 rounded-xl h-12">
             <Icons.Lock className="w-4 h-4 mr-2" /> Alterar Senha
           </Button>
           <Button variant="danger" className="flex-1 rounded-xl h-12 shadow-lg shadow-red-500/20">
             <Icons.Logout className="w-4 h-4 mr-2" /> Encerrar Todas as Sessões
           </Button>
        </CardContent>
      </Card>
    </div>
  );
};
