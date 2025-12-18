import { Eye, Edit, ArrowRight, Send } from 'lucide-react';
import { DataTable, TableActionsDropdown, FormStatusBadge } from '@/components/common';
import { ENTITY_CONFIG, STATUS_CONFIGS } from '@/config';
import { formatCurrency, formatDateTime } from '@/utils/format';

export const OrderDataTable = ({ 
  orders, 
  isLoading, 
  sortConfig,
  onSort,
  onView,
  onEdit,
  onChangeStatus,
  onSendToCashier
}) => {
  const entityConfig = ENTITY_CONFIG.order;

  const columns = [
    {
      key: 'id',
      label: 'Pedido',
      sortable: true,
      className: 'font-semibold text-gray-900 dark:text-white',
      render: (id) => `#${id}`
    },
    {
      key: 'mesa_numero',
      label: 'Mesa',
      render: (mesa_numero) => mesa_numero ? (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-lime-100 dark:bg-lime-900/20 rounded-lg flex items-center justify-center">
            <span className="text-lime-700 font-bold text-sm">{mesa_numero}</span>
          </div>
          <span className="text-gray-700 dark:text-slate-300">Mesa {mesa_numero}</span>
        </div>
      ) : '-'
    },
    {
      key: 'mesero',
      label: 'Mesero',
      align: 'center'
    },
    {
      key: 'items',
      label: 'Items',
      align: 'center',
      render: (_, order) => (
        <span className="text-gray-900 dark:text-white">{order?.items?.length || 0} items</span>
      )
    },
    {
      key: 'total',
      label: 'Total',
      align: 'right',
      className: 'font-semibold text-gray-900 dark:text-white',
      render: (total) => formatCurrency(total || 0)
    },
    {
      key: 'estado',
      label: 'Estado',
      align: 'center',
      render: (estado) => (
        <FormStatusBadge status={estado} config={STATUS_CONFIGS.order} />
      )
    },
    {
      key: 'created_at',
      label: 'Fecha',
      sortable: true,
      align: 'center',
      render: (fecha) => (
        <span className="text-sm text-gray-600 dark:text-slate-300">
          {formatDateTime(fecha)}
        </span>
      )
    },
    {
      key: 'actions',
      label: 'Acciones',
      align: 'center',
      render: (_, order) => (
        <TableActionsDropdown
          actions={[
            {
              icon: Eye,
              label: 'Ver detalles',
              onClick: () => onView(order)
            },
            {
              icon: Edit,
              label: 'Editar',
              onClick: () => onEdit(order)
            },
            {
              icon: ArrowRight,
              label: 'Cambiar estado',
              onClick: () => onChangeStatus(order)
            },
            {
              icon: Send,
              label: 'Enviar a caja',
              onClick: () => onSendToCashier(order)
            }
          ]}
        />
      )
    }
  ];

  return (
    <DataTable
      columns={columns}
      data={orders}
      isLoading={isLoading}
      loadingMessage={`Cargando ${entityConfig.namePlural.toLowerCase()}...`}
      emptyTitle={`No se encontraron ${entityConfig.namePlural.toLowerCase()}`}
      emptyDescription={`No hay ${entityConfig.namePlural.toLowerCase()} que coincidan con los filtros aplicados.`}
      emptyIcon={entityConfig.icon}
    />
  );
};
