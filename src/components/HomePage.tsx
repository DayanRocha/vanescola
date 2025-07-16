
import { Users, UserCheck, School, Settings, Menu, Truck } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface HomePageProps {
  onTabChange: (tab: string) => void;
  onClientsClick: () => void;
  onDriversClick: () => void;
  onSettingsClick: () => void;
  activeTopButton?: 'clients' | 'drivers' | 'settings' | null;
}

export const HomePage = ({ 
  onTabChange, 
  onClientsClick, 
  onDriversClick, 
  onSettingsClick,
  activeTopButton 
}: HomePageProps) => {
  const menuItems = [
    {
      id: 'students',
      title: 'Estudantes',
      icon: Users,
      description: 'Gerenciar estudantes'
    },
    {
      id: 'guardians',
      title: 'Responsáveis', 
      icon: UserCheck,
      description: 'Contatos dos responsáveis'
    },
    {
      id: 'schools',
      title: 'Escolas',
      icon: School,
      description: 'Escolas cadastradas'
    }
  ];

  const bottomSections = [
    {
      title: 'Recursos para os seus clientes',
      icon: Users,
      action: onClientsClick
    },
    {
      title: 'Recursos para o motorista',
      icon: Truck,
      action: onDriversClick
    }
  ];

  return (
    <div className="min-h-screen safe-area" style={{ background: 'linear-gradient(135deg, #FF8C00 0%, #FFA500 50%, #FFB84D 100%)' }}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-8 sm:pt-12">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-orange-500 font-bold text-lg">V</span>
          </div>
          <span className="text-white font-bold text-xl tracking-wide">VANESCOLA</span>
        </div>
        <button 
          className="text-white p-2 rounded-xl hover:bg-white/20 transition-all duration-200 active:scale-95" 
          onClick={onSettingsClick}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Top Icons - Always visible */}
      <div className="flex justify-center gap-4 sm:gap-8 px-4 mb-8">
        <button 
          className={`w-16 h-16 sm:w-18 sm:h-18 rounded-2xl flex items-center justify-center hover:bg-white/30 transition-all duration-300 transform hover:scale-105 active:scale-95 ${
            activeTopButton === 'clients' ? 'bg-white/40 shadow-xl scale-105' : 'bg-white/20 shadow-lg'
          }`}
          onClick={onClientsClick}
        >
          <Users className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
        </button>
        <button 
          className={`w-16 h-16 sm:w-18 sm:h-18 rounded-2xl flex items-center justify-center hover:bg-white/30 transition-all duration-300 transform hover:scale-105 active:scale-95 ${
            activeTopButton === 'drivers' ? 'bg-white/40 shadow-xl scale-105' : 'bg-white/20 shadow-lg'
          }`}
          onClick={onDriversClick}
        >
          <Truck className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
        </button>
        <button 
          className={`w-16 h-16 sm:w-18 sm:h-18 rounded-2xl flex items-center justify-center hover:bg-white/30 transition-all duration-300 transform hover:scale-105 active:scale-95 ${
            activeTopButton === 'settings' ? 'bg-white/40 shadow-xl scale-105' : 'bg-white/20 shadow-lg'
          }`}
          onClick={onSettingsClick}
        >
          <Settings className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
        </button>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6">
        <h2 className="text-white text-xl font-semibold mb-6 text-center">Sobre seus clientes</h2>
        
        <div className="space-y-4 mb-8">
          {menuItems.map((item, index) => (
            <Card 
              key={item.id}
              className="bg-white/95 backdrop-blur-sm p-5 rounded-2xl shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] border-0"
              onClick={() => onTabChange(item.id)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <span className="text-gray-800 font-semibold text-lg">{item.title}</span>
                    <p className="text-gray-500 text-sm">{item.description}</p>
                  </div>
                </div>
                <div className="text-orange-500 text-2xl font-light">
                  <span>›</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {bottomSections.map((section, index) => (
            <button
              key={index}
              className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-left hover:bg-white/30 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
              onClick={section.action}
            >
              <div className="flex items-center gap-3 text-white">
                <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
                  <section.icon className="w-5 h-5" />
                </div>
                <span className="font-medium">{section.title}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Support Link */}
        <button className="w-full bg-white/20 backdrop-blur-sm rounded-2xl p-4 mb-6 hover:bg-white/30 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg">
          <div className="flex items-center justify-center gap-2">
            <span className="text-white font-medium">Falar com o suporte</span>
            <span className="text-xl">💬</span>
          </div>
        </button>

        {/* Footer */}
        <div className="text-center text-white/80 text-sm font-medium pb-20">
          VanEscola 2024
        </div>
      </div>
    </div>
  );
};
