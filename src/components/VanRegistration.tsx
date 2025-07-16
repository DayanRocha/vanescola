import { useState } from 'react';
import { Camera, Save, Truck, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Van } from '@/types/driver';

interface VanRegistrationProps {
  van: Van;
  onUpdate: (updates: Partial<Van>) => void;
  onBack: () => void;
}

export const VanRegistration = ({ van, onUpdate, onBack }: VanRegistrationProps) => {
  const [formData, setFormData] = useState(van);

  const handleSave = () => {
    onUpdate(formData);
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const photoUrl = e.target?.result as string;
        setFormData(prev => ({ ...prev, photo: photoUrl }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="p-4 sm:p-6 max-w-md mx-auto">
        <div className="flex items-center gap-3 mb-8 pt-4">
          <button 
            onClick={onBack} 
            className="text-gray-600 hover:text-gray-800 p-2 rounded-xl hover:bg-white/50 transition-all duration-200 active:scale-95"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-3">
              <Truck className="w-5 h-5 text-white" />
            </div>
            Cadastro da Van
          </h1>
        </div>
        
        <div className="mb-6">
          <Label className="text-gray-700 font-medium">Foto da Van</Label>
          <div className="mt-3 relative">
            <div className="w-full h-40 bg-white rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
              {formData.photo ? (
                <img
                  src={formData.photo}
                  alt="Foto da van"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center text-gray-500">
                  <Camera className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm">Adicionar foto da van</p>
                </div>
              )}
            </div>
            <label className="absolute bottom-2 right-2 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
              <Camera className="w-5 h-5 text-white" />
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="model">Modelo</Label>
            <Input
              id="model"
              value={formData.model || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, model: e.target.value }))}
              placeholder="Ex: Sprinter 415"
            />
          </div>

          <div>
            <Label htmlFor="plate">Placa</Label>
            <Input
              id="plate"
              value={formData.plate || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, plate: e.target.value }))}
              placeholder="Ex: ABC-1234"
            />
          </div>

          <div>
            <Label htmlFor="capacity">Capacidade</Label>
            <Input
              id="capacity"
              type="number"
              value={formData.capacity || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, capacity: parseInt(e.target.value) || 0 }))}
              placeholder="Ex: 20"
            />
          </div>

          <div>
            <Label htmlFor="year">Ano</Label>
            <Input
              id="year"
              type="number"
              value={formData.year || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, year: parseInt(e.target.value) || 0 }))}
              placeholder="Ex: 2020"
            />
          </div>

          <div>
            <Label htmlFor="observations">Observações</Label>
            <Input
              id="observations"
              value={formData.observations || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, observations: e.target.value }))}
              placeholder="Observações adicionais"
            />
          </div>
        </div>

        <Button
          onClick={handleSave}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700"
        >
          <Save className="w-4 h-4 mr-2" />
          Salvar Van
        </Button>
      </div>
    </div>
  );
};