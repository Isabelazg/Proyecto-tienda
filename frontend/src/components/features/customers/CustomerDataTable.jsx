import { Edit, Trash2, Eye, Check, X as XIcon } from 'lucide-react';
import { DataTable, TableActionsDropdown, FormStatusBadge } from '@/components/common';
import { ENTITY_CONFIG, STATUS_CONFIGS } from '@/config';
import { formatCurrency, formatDate } from '@/utils/format';

export const CustomerDataTable = ({ 
  customers, 
  isLoading, 
  sortConfig,
  onSort,
  onView,
  onEdit,
  onDelete,
  onToggleStatus
}) => {
  const entityConfig = ENTITY_CONFIG.customer;

  const columns = [
    {
      key: 'nombre',
      label: 'Cliente',
      sortable: true,
      render: (nombre, customer) => (
        <div>
          <p className="font-medium text-gray-900 dark:text-white">{nombre || '-'}</p>
          {customer?.fecha_registro && (
            <p className="text-sm text-gray-500 dark:text-slate-400">
              Registrado: {formatDate(customer.fecha_registro)}
            </p>
          )}
        </div>
      )
    },
    {
      key: 'email',
      label: 'Contacto',
      render: (email, customer) => (
        <div>
          <p className="text-sm text-gray-900 dark:text-white">{email || '-'}</p>
          {customer?.telefono && (
            <p className="text-sm text-gray-500 dark:text-slate-400">{customer.telefono}</p>
          )}
        </div>
      )
    },
    {
      key: 'documento',
      label: 'Documento',
      align: 'center',
      render: (documento, customer) => (
        <div>
          {customer?.tipo_documento && (
            <p className="text-sm text-gray-900 dark:text-white">{customer.tipo_documento}</p>
          )}
          <p className="text-sm text-gray-500 dark:text-slate-400">{documento || '-'}</p>
        </div>
      )
    },
    {
      key: 'total_compras',
      label: 'Total Compras',
      sortable: true,
      align: 'center',
      className: 'font-medium text-gray-900 dark:text-white',
      render: (total_compras) => total_compras || 0
    },
    {
      key: 'total_gastado',
      label: 'Total Gastado',
      sortable: true,
      align: 'right',
      className: 'font-semibold text-gray-900 dark:text-white',
      render: (total_gastado) => formatCurrency(total_gastado || 0)
    },
    {
      key: 'estado',
      label: 'Estado',
      align: 'center',
      render: (estado) => (
        <FormStatusBadge 
          status={estado} 
          config={STATUS_CONFIGS.general} 
        />
      )
    },
    {
      key: 'actions',
      label: 'Acciones',
      align: 'center',
      render: (_, customer) => (
        <TableActionsDropdown
          actions={[
            {
              icon: Eye,
              label: 'Ver detalles',
              onClick: () => onView(customer)
            },
            {
              icon: Edit,
              label: 'Editar',
              onClick: () => onEdit(customer)
            },
            {
              icon: customer?.estado ? XIcon : Check,
              label: customer?.estado ? 'Desactivar' : 'Activar',
              onClick: () => onToggleStatus(customer.id)
            },
            {
              icon: Trash2,
              label: 'Eliminar',
              onClick: () => onDelete(customer),
              destructive: true
            }
          ]}
        />
      )
    }
  ];

  return (
    <DataTable
      columns={columns}
      data={customers}
      isLoading={isLoading}
      loadingMessage={`Cargando ${entityConfig.namePlural.toLowerCase()}...`}
      emptyTitle={`No se encontraron ${entityConfig.namePlural.toLowerCase()}`}
      emptyDescription={`No hay ${entityConfig.namePlural.toLowerCase()} que coincidan con los filtros aplicados.`}
      emptyIcon={entityConfig.icon}
    />
  );
};
