
import { User, MapPin, School, ArrowLeft, Plus, Edit } from 'lucide-react';
import { Student, School as SchoolType } from '@/types/driver';

interface StudentsListProps {
  students: Student[];
  schools: SchoolType[];
  onBack: () => void;
  onAddStudent: () => void;
  onEditStudent: (student: Student) => void;
}

export const StudentsList = ({ students, schools, onBack, onAddStudent, onEditStudent }: StudentsListProps) => {
  const getSchoolName = (schoolId: string) => {
    const school = schools.find(s => s.id === schoolId);
    return school?.name || 'Escola não encontrada';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="text-gray-600 hover:text-gray-800">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-semibold text-gray-800">Alunos Cadastrados</h1>
          </div>
          <button
            onClick={onAddStudent}
            className="w-10 h-10 bg-orange-500 hover:bg-orange-600 text-white rounded-full flex items-center justify-center transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-6 max-w-md mx-auto">
        {students.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <User className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="mb-2">Nenhum aluno cadastrado</p>
            <p className="text-sm mb-4">Comece cadastrando seu primeiro aluno</p>
            <button
              onClick={onAddStudent}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Cadastrar Aluno
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {students.map((student) => (
              <div key={student.id} className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{student.name}</h3>
                    
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      {student.pickupPoint}
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <School className="w-4 h-4 mr-1" />
                      {getSchoolName(student.schoolId)}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => onEditStudent(student)}
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
