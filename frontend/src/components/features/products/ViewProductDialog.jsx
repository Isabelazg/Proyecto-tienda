import { FormViewDialog, FormViewField } from '@/components/common';
import { formatCurrency } from '@/utils/format';

export const ViewProductDialog = ({ 
  isOpen, 
  product, 
  onClose 
}) => {
  return (
    <FormViewDialog
      isOpen={isOpen}
      onClose={onClose}
      title="Detalles del Producto"
    >
      {product ? (
        <div className="space-y-4">
          {product.imagen && (
            <div className="flex justify-center mb-6">
              <img
                src={product.imagen}
                alt={product.nombre}
                className="w-48 h-48 object-cover rounded-lg shadow-md"
              />
            </div>
          )}
          
          <FormViewField label="Nombre" value={product.nombre} />
          <FormViewField label="Descripción" value={product.descripcion || 'Sin descripción'} />
          
          <div className="grid grid-cols-2 gap-4">
            <FormViewField label="Precio" value={formatCurrency(product.precio)} />
            <FormViewField label="Stock" value={product.stock} />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <FormViewField label="Categoría" value={product.categoria_nombre} />
            <FormViewField 
              label="Estado" 
              value={
                <span className={product.estado ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                  {product.estado ? 'Activo' : 'Inactivo'}
                </span>
              } 
            />
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
