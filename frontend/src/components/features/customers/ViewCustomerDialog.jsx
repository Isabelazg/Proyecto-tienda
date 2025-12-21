import { FormViewDialog, FormViewField } from '@/components/common';
import { formatCurrency, formatDate } from '@/utils/format';

export const ViewCustomerDialog = ({ 
  isOpen, 
  customer, 
  onClose
}) => {
  const getDocumentTypeLabel = (type) => {
    const types = {
      CC: 'Cédula de Ciudadanía',
      CE: 'Cédula de Extranjería',
      NIT: 'NIT',
      PP: 'Pasaporte',
    };
    return types[type] || type;
  };

  return (
    <FormViewDialog
      isOpen={isOpen}
      onClose={onClose}
      title="Detalles del Cliente"
    >
      {customer ? (
        <div className="space-y-4">
          <FormViewField label="Nombre Completo" value={customer.nombre} />

          <div className="grid grid-cols-2 gap-4">
            <FormViewField
              label="Tipo de Documento"
              value={getDocumentTypeLabel(customer.tipo_documento)}
            />
            <FormViewField label="Número de Documento" value={customer.documento} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormViewField label="Email" value={customer.email} />
            <FormViewField label="Teléfono" value={customer.telefono} />
          </div>

          <FormViewField
            label="Dirección"
            value={customer.direccion || 'No especificada'}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormViewField label="Total de Compras" value={customer.total_compras ?? 0} />
            <FormViewField
              label="Total Gastado"
              value={formatCurrency(customer.total_gastado ?? 0)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormViewField
              label="Fecha de Registro"
              value={formatDate(customer.fecha_registro)}
            />
            <FormViewField
              label="Estado"
              value={
                <span
                  className={
                    customer.estado
                      ? 'text-green-600 font-medium'
                      : 'text-red-600 font-medium'
                  }
                >
                  {customer.estado ? 'Activo' : 'Inactivo'}
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
