import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { 
  Modal, 
  ModalHeader, 
  ModalTitle, 
  ModalBody, 
  ModalFooter 
} from '@/components/ui/modal/Modal';
import { formatDate } from '@/utils/format';
import { Package, CheckCircle, Calendar } from 'lucide-react';
import { DetailsHeader, StatCard } from '@/components/common';
import { ENTITY_CONFIG } from '@/config';

export const ViewCategoryDialog = ({ 
  isOpen, 
  category, 
  onClose 
}) => {
  if (!category) return null;

  const entityConfig = ENTITY_CONFIG.category;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader onClose={onClose}>
        <ModalTitle>Detalles de la {entityConfig.name}</ModalTitle>
      </ModalHeader>

      <ModalBody>
        <div className="space-y-6">
          {/* Encabezado con icono */}
          <DetailsHeader 
            title={category.nombre}
            subtitle={entityConfig.name + ' de productos'}
            icon={entityConfig.icon}
            iconBgColor={entityConfig.iconBgColor}
            iconColor={entityConfig.iconColor}
          />

          {/* Información General */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Información General</h4>
            <div className="space-y-3">
              <div>
                <Label>Descripción</Label>
                <p className="text-gray-700 mt-1">{category.descripcion}</p>
              </div>

              <div>
                <Label className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  Fecha de Creación
                </Label>
                <p className="text-gray-900 mt-1">{formatDate(category.created_at)}</p>
              </div>

              <div>
                <Label>Estado</Label>
                <p className={`font-medium mt-1 ${category.estado ? 'text-green-600' : 'text-red-600'}`}>
                  {category.estado ? 'Activa' : 'Inactiva'}
                </p>
              </div>
            </div>
          </div>

          {/* Estadísticas de Productos */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Productos Asociados</h4>
            <div className="grid grid-cols-2 gap-4">
              <StatCard
                label="Total de Productos"
                value={category.total_productos}
                icon={Package}
                bgColor="bg-blue-50 dark:bg-blue-900/20"
                textColor="text-blue-700 dark:text-blue-400"
              />

              <StatCard
                label="Productos Activos"
                value={category.productos_activos}
                icon={CheckCircle}
                bgColor="bg-green-50 dark:bg-green-900/20"
                textColor="text-green-700 dark:text-green-400"
              />
            </div>
          </div>
        </div>
      </ModalBody>

      <ModalFooter>
        <Button onClick={onClose} className="bg-black text-white hover:bg-gray-900">
          Cerrar
        </Button>
      </ModalFooter>
    </Modal>
  );
};
