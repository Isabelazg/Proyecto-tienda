import { formatDate } from '@/utils/format';
import { FormViewDialog, FormViewField } from '@/components/common';

export const ViewCategoryDialog = ({ 
  isOpen, 
  category, 
  onClose 
}) => {
  return (
    <FormViewDialog
      isOpen={isOpen}
      onClose={onClose}
      title="Detalles de la Categoría"
    >
      {category ? (
        <div className="space-y-4">
          <FormViewField label="Nombre" value={category.nombre} />
          <FormViewField label="Descripción" value={category.descripcion || 'Sin descripción'} />

          <div className="grid grid-cols-2 gap-4">
            <FormViewField label="Fecha de Creación" value={formatDate(category.created_at)} />
            <FormViewField
              label="Estado"
              value={
                <span
                  className={
                    category.estado
                      ? 'text-green-600 font-medium'
                      : 'text-red-600 font-medium'
                  }
                >
                  {category.estado ? 'Activo' : 'Inactivo'}
                </span>
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormViewField label="Total de Productos" value={category.total_productos ?? 0} />
            <FormViewField label="Productos Activos" value={category.productos_activos ?? 0} />
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No hay información disponible
        </div>
      )}
    </FormViewDialog>
  );
};
