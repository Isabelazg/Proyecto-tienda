import { Eye, XCircle } from 'lucide-react';
import { DataTable, TableActionsDropdown, FormStatusBadge } from '@/components/common';
import { ENTITY_CONFIG, STATUS_CONFIGS } from '@/config';
import { formatCurrency, formatDateTime } from '@/utils/format';
import { getPaymentMethodBadge, getCountBadge } from '@/utils/badges';

export const SaleDataTable = ({ 
  sales, 
  isLoading, 
  sortConfig,
  onSort,
  onView,
  onCancel
}) => {
  const entityConfig = ENTITY_CONFIG.sale;

  const columns = [
    {
      key: 'venta_id',
      label: 'ID',
      sortable: true,
      render: (venta_id) => (
        <span className="font-medium text-gray-900 dark:text-white">
          #{venta_id}
        </span>
      )
    },
    {
      key: 'fecha',
      label: 'Fecha',
      sortable: true,
      render: (fecha) => (
        <span className="text-sm text-gray-600 dark:text-slate-300">
          {formatDateTime(fecha)}
        </span>
      )
    },
    {
      key: 'usuario',
      label: 'Usuario',
      render: (usuario) => (
        <span className="text-gray-900 dark:text-white">{usuario || '-'}</span>
      )
    },
    {
      key: 'items',
      label: 'Items',
      align: 'center',
      render: (items) => getCountBadge(items?.length || 0, 'items')
    },
    {
      key: 'total',
      label: 'Total',
      sortable: true,
      align: 'right',
      className: 'font-semibold text-lime-600 dark:text-lime-400',
      render: (total) => formatCurrency(total || 0)
    },
    {
      key: 'metodo_pago',
      label: 'Método Pago',
      align: 'center',
      render: (metodo_pago) => getPaymentMethodBadge(metodo_pago)
    },
    {
      key: 'estado',
      label: 'Estado',
      align: 'center',
      render: (estado) => (
        <FormStatusBadge status={estado} config={STATUS_CONFIGS.sale} />
      )
    },
    {
      key: 'actions',
      label: 'Acciones',
      align: 'center',
      render: (_, sale) => {
        const actions = [
          {
            icon: Eye,
            label: 'Ver detalles',
            onClick: () => onView(sale)
          }
        ];

        if (sale?.estado === 'completada') {
          actions.push({
            icon: XCircle,
            label: 'Anular venta',
            onClick: () => onCancel(sale),
            variant: 'destructive'
          });
        }

        return <TableActionsDropdown actions={actions} />;
      }
    }
  ];

  return (
    <DataTable
      columns={columns}
      data={sales}
      isLoading={isLoading}
      sortConfig={sortConfig}
      onSort={onSort}
      loadingMessage={`Cargando ${entityConfig.namePlural.toLowerCase()}...`}
      emptyTitle={`No se encontraron ${entityConfig.namePlural.toLowerCase()}`}
      emptyDescription={`No hay ${entityConfig.namePlural.toLowerCase()} que coincidan con los filtros aplicados.`}
      emptyIcon={entityConfig.icon}
    />
  );
};
