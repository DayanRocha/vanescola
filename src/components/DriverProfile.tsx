
import { useState } from 'react';
import { Camera, Edit, Save, X, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Driver } from '@/types/driver';

interface DriverProfileProps {
  driver: Driver;
  onUpdate: (updates: Partial<Driver>) => void;
  onBack: () => void;
}

export const DriverProfile = ({ driver, onUpdate, onBack }: DriverProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(driver);

  const handleSave = () => {
    onUpdate(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(driver);
    setIsEditing(false);
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const photoUrl = e.target?.result as string;
        setFormData(prev => ({ ...prev, photo: photoUrl }));
        if (!isEditing) {
          onUpdate({ photo: photoUrl });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="text-gray-600">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Perfil do Motorista</h1>
      </div>
      
      {/* Profile Photo */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative w-24 h-24 mb-4">
          <img
            src={formData.photo || '/placeholder.svg'}
            alt="Foto do perfil"
            className="w-full h-full rounded-full object-cover border-4 border-blue-100"
          />
          <label className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
            <Camera className="w-4 h-4 text-white" />
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Nome Completo</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            disabled={!isEditing}
            className={!isEditing ? "bg-gray-50" : ""}
          />
        </div>

        <div>
          <Label htmlFor="phone">Telefone</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            disabled={!isEditing}
            className={!isEditing ? "bg-gray-50" : ""}
          />
        </div>

        <div>
          <Label htmlFor="address">Endereço</Label>
          <Input
            id="address"
            value={formData.address}
            onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
            disabled={!isEditing}
            className={!isEditing ? "bg-gray-50" : ""}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex gap-3">
        {!isEditing ? (
          <Button
            onClick={() => setIsEditing(true)}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            <Edit className="w-4 h-4 mr-2" />
            Editar Perfil
          </Button>
        ) : (
          <>
            <Button
              onClick={handleSave}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              <Save className="w-4 h-4 mr-2" />
              Salvar
            </Button>
            <Button
              onClick={handleCancel}
              variant="outline"
              className="flex-1"
            >
              <X className="w-4 h-4 mr-2" />
              Cancelar
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
