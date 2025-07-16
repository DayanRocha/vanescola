
import { useState } from 'react';
import { ArrowLeft, Info, UserPlus, School, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StudentSelectionDialog } from './StudentSelectionDialog';
import { EditInfoPage } from './EditInfoPage';
import { RouteMountingPage } from './RouteMountingPage';
import { Student, School as SchoolType } from '@/types/driver';

interface RouteItem {
  id: string;
  type: 'student' | 'school';
  item: Student | SchoolType;
  direction?: 'embarque' | 'desembarque';
}

interface RouteSetupPageProps {
  onBack: () => void;
  onSave: () => void;
  onAddStudent: () => void;
  onAddSchool: () => void;
  students: Student[];
  schools: SchoolType[];
}

export const RouteSetupPage = ({ 
  onBack, 
  onSave, 
  onAddStudent, 
  onAddSchool,
  students,
  schools 
}: RouteSetupPageProps) => {
  const [routeItems, setRouteItems] = useState<RouteItem[]>([]);
  const [showSelectionDialog, setShowSelectionDialog] = useState(false);
  const [selectionType, setSelectionType] = useState<'student' | 'school'>('student');
  const [showEditInfo, setShowEditInfo] = useState(false);
  const [showRouteMounting, setShowRouteMounting] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Student | SchoolType | null>(null);

  const handleAddStudent = () => {
    setSelectionType('student');
    setShowSelectionDialog(true);
  };

  const handleAddSchool = () => {
    setSelectionType('school');
    setShowSelectionDialog(true);
  };

  const handleStudentSelect = (student: Student) => {
    setSelectedItem(student);
    setShowEditInfo(true);
  };

  const handleSchoolSelect = (school: SchoolType) => {
    setSelectedItem(school);
    setShowEditInfo(true);
  };

  const handleConfirmDirection = (direction: 'embarque' | 'desembarque') => {
    if (selectedItem) {
      const newRouteItem: RouteItem = {
        id: Date.now().toString(),
        type: selectionType,
        item: selectedItem,
        direction
      };
      setRouteItems(prev => [...prev, newRouteItem]);
      setShowEditInfo(false);
      setShowRouteMounting(true);
      setSelectedItem(null);
    }
  };

  const handleBackFromEditInfo = () => {
    setShowEditInfo(false);
    setSelectedItem(null);
  };

  const handleBackFromRouteMounting = () => {
    setShowRouteMounting(false);
  };

  if (showRouteMounting) {
    return (
      <RouteMountingPage
        onBack={handleBackFromRouteMounting}
        onSave={onSave}
        routeItems={routeItems}
      />
    );
  }

  if (showEditInfo) {
    return (
      <EditInfoPage
        onBack={handleBackFromEditInfo}
        onConfirm={handleConfirmDirection}
        selectedItem={selectedItem}
        type={selectionType}
      />
    );
  }

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
      </div>

      {/* Content */}
      <div className="bg-gray-100 min-h-screen rounded-t-3xl p-4">
        <h1 className="text-xl font-bold text-gray-800 mb-2">
          Montagem da rota "Rota da Manhã"
        </h1>

        {/* Info Box */}
        <div className="bg-blue-100 border-l-4 border-blue-500 p-4 mb-6 rounded">
          <div className="flex items-start gap-2">
            <Info className="w-5 h-5 text-blue-500 mt-0.5" />
            <div>
              <p className="text-blue-800 text-sm">
                <strong>Monte abaixo o percurso do motorista</strong>, indicando a ordem de 
                embarque ou desembarque nas casas dos alunos e das paradas nas escolas.
              </p>
            </div>
          </div>
        </div>

        {/* Route Items */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Itens da Rota</h2>
          
          <div className="space-y-3">
            <Button
              onClick={handleAddStudent}
              variant="outline"
              className="w-full p-4 border-2 border-dashed border-gray-300 hover:border-orange-300 hover:bg-orange-50"
            >
              <UserPlus className="w-5 h-5 mr-2" />
              Adicionar estudante
            </Button>

            <Button
              onClick={handleAddSchool}
              variant="outline"
              className="w-full p-4 border-2 border-dashed border-gray-300 hover:border-orange-300 hover:bg-orange-50"
            >
              <School className="w-5 h-5 mr-2" />
              Adicionar escola
            </Button>
          </div>

          {routeItems.length === 0 && (
            <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-4 mt-4 text-center">
              <p className="text-yellow-800">Esta rota não tem itens</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={onSave}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3"
          >
            Cadastrar Rota
          </Button>

          <Button
            onClick={onBack}
            variant="outline"
            className="w-full border-gray-300 text-gray-700 py-3"
          >
            Voltar
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-400 text-sm">
          VanEscola 2024
        </div>
      </div>

      {/* Selection Dialog */}
      <StudentSelectionDialog
        open={showSelectionDialog}
        onClose={() => setShowSelectionDialog(false)}
        students={students}
        schools={schools}
        onStudentSelect={handleStudentSelect}
        onSchoolSelect={handleSchoolSelect}
        type={selectionType}
      />
    </div>
  );
};
