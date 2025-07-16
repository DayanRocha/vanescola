
import { Edit, Play, Trash2, Clock, Calendar, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Route } from '@/types/driver';

interface RoutesListProps {
  routes: Route[];
  onEdit: (route: Route) => void;
  onStart: (routeId: string) => void;
  onDelete: (routeId: string) => void;
  hasActiveTrip: boolean;
  onBack: () => void;
}

const weekDayLabels: Record<string, string> = {
  'Mon': 'Seg',
  'Tue': 'Ter',
  'Wed': 'Qua',
  'Thu': 'Qui',
  'Fri': 'Sex',
  'Sat': 'Sáb',
  'Sun': 'Dom'
};

export const RoutesList = ({ routes, onEdit, onStart, onDelete, hasActiveTrip, onBack }: RoutesListProps) => {
  return (
    <div className="p-6 max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="text-gray-600">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Minhas Rotas</h1>
      </div>
      
      {routes.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>Nenhuma rota cadastrada</p>
          <p className="text-sm">Cadastre sua primeira rota na aba "Rotas"</p>
        </div>
      ) : (
        <div className="space-y-4">
          {routes.map((route) => (
            <div key={route.id} className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-gray-800">{route.name}</h3>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <Clock className="w-4 h-4 mr-1" />
                    {route.startTime}
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {route.students.length} alunos
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1 mb-3">
                {route.weekDays.map((day) => (
                  <span
                    key={day}
                    className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded"
                  >
                    {weekDayLabels[day]}
                  </span>
                ))}
              </div>
              
              <div className="flex gap-2">
                <Button
                  onClick={() => onEdit(route)}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Editar
                </Button>
                
                <Button
                  onClick={() => onStart(route.id)}
                  disabled={hasActiveTrip}
                  size="sm"
                  className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-300"
                >
                  <Play className="w-4 h-4 mr-1" />
                  Iniciar
                </Button>
                
                <Button
                  onClick={() => onDelete(route.id)}
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
