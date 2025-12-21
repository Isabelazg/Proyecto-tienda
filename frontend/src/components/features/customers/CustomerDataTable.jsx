import { Edit, Trash2, Eye, UserCircle } from 'lucide-react';
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
      key: 'avatar',
      label: 'Cliente',
      render: (_, customer) => (
        <div className="w-12 h-12 bg-gray-200 dark:bg-slate-700 rounded-lg flex items-center justify-center">
          <UserCircle className="w-6 h-6 text-gray-400" />
        </div>
      )
    },
    {
      key: 'nombre',
      label: 'Nombre',
      sortable: true,
      render: (nombre, customer) => (
        <div>
          <p className="font-medium text-gray-900 dark:text-white">{nombre || '-'}</p>
          {customer?.email ? (
            <p className="text-sm text-gray-500 dark:text-slate-400 line-clamp-1">
              {customer.email}
            </p>
          ) : customer?.fecha_registro ? (
            <p className="text-sm text-gray-500 dark:text-slate-400">
              Registrado: {formatDate(customer.fecha_registro)}
            </p>
          ) : null}
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
      key: 'total_gastado',
      label: 'Total Gastado',
      sortable: true,
      align: 'right',
      className: 'font-semibold text-gray-900 dark:text-white',
      render: (total_gastado) => formatCurrency(total_gastado || 0)
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
      key: 'estado',
      label: 'Estado',
      align: 'center',
      render: (estado, customer) => (
        <div className="cursor-pointer inline-block" onClick={() => onToggleStatus(customer)}>
          <FormStatusBadge 
            status={estado ? 'activo' : 'inactivo'} 
            config={STATUS_CONFIGS.general} 
          />
        </div>
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
              icon: Trash2,
              label: 'Eliminar',
              onClick: () => onDelete(customer),
              variant: 'destructive'
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
