
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
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #FF8C00 0%, #FFA500 100%)' }}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-12">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-orange-500 font-bold text-sm">V</span>
          </div>
          <span className="text-white font-semibold text-lg">VANESCOLA</span>
        </div>
        <button className="text-white" onClick={onSettingsClick}>
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Top Icons - Always visible */}
      <div className="flex justify-center gap-8 px-4 mb-8">
        <button 
          className={`w-16 h-16 rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors ${
            activeTopButton === 'clients' ? 'bg-white/40 shadow-lg' : 'bg-white/20'
          }`}
          onClick={onClientsClick}
        >
          <Users className="w-8 h-8 text-white" />
        </button>
        <button 
          className={`w-16 h-16 rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors ${
            activeTopButton === 'drivers' ? 'bg-white/40 shadow-lg' : 'bg-white/20'
          }`}
          onClick={onDriversClick}
        >
          <Truck className="w-8 h-8 text-white" />
        </button>
        <button 
          className={`w-16 h-16 rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors ${
            activeTopButton === 'settings' ? 'bg-white/40 shadow-lg' : 'bg-white/20'
          }`}
          onClick={onSettingsClick}
        >
          <Settings className="w-8 h-8 text-white" />
        </button>
      </div>

      {/* Main Content */}
      <div className="px-4">
        <h2 className="text-white text-lg font-medium mb-4">Sobre seus clientes</h2>
        
        <div className="space-y-3 mb-8">
          {menuItems.map((item) => (
            <Card 
              key={item.id}
              className="bg-white p-4 rounded-xl shadow-sm cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onTabChange(item.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-gray-800 font-medium">{item.title}</span>
                </div>
                <div className="text-gray-400">
                  <span>›</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom Sections */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {bottomSections.map((section, index) => (
            <button
              key={index}
              className="bg-white/20 rounded-lg p-3 text-left hover:bg-white/30 transition-colors"
              onClick={section.action}
            >
              <div className="flex items-center gap-2 text-white text-sm">
                <section.icon className="w-4 h-4" />
                <span>{section.title}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Support Link */}
        <button className="w-full bg-white/20 rounded-lg p-3 mb-4 hover:bg-white/30 transition-colors">
          <span className="text-white text-sm">Falar com o suporte 💬</span>
        </button>

        {/* Footer */}
        <div className="text-center text-white/70 text-xs">
          VanEscola 2024
        </div>
      </div>
    </div>
  );
};
