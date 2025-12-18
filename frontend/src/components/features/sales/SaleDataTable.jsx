import { Eye, XCircle } from 'lucide-react';
import { DataTable, TableActionsDropdown, FormStatusBadge, LoadingState, EmptyState } from '@/components/common';
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

  if (isLoading) {
    return <LoadingState message={`Cargando ${entityConfig.namePlural.toLowerCase()}...`} />;
  }

  if (!Array.isArray(sales) || sales.length === 0) {
    return (
      <EmptyState
        icon={entityConfig.icon}
        title={`No se encontraron ${entityConfig.namePlural.toLowerCase()}`}
        description={`No hay ${entityConfig.namePlural.toLowerCase()} que coincidan con los filtros aplicados.`}
        isError={!Array.isArray(sales)}
      />
    );
  }

  const columns = [
    {
      key: 'venta_id',
      label: 'ID',
      sortable: true,
      render: (sale) => (
        <span className="font-medium text-gray-900 dark:text-white">
          #{sale.venta_id}
        </span>
      )
    },
    {
      key: 'fecha',
      label: 'Fecha',
      sortable: true,
      render: (sale) => (
        <span className="text-sm text-gray-600 dark:text-slate-300">
          {formatDateTime(sale.fecha)}
        </span>
      )
    },
    {
      key: 'usuario',
      label: 'Usuario',
      render: (sale) => (
        <span className="text-gray-900 dark:text-white">{sale.usuario}</span>
      )
    },
    {
      key: 'items',
      label: 'Items',
      render: (sale) => getCountBadge(sale.items?.length || 0, 'items')
    },
    {
      key: 'total',
      label: 'Total',
      sortable: true,
      render: (sale) => (
        <span className="font-semibold text-lime-600 dark:text-lime-400">
          {formatCurrency(sale.total)}
        </span>
      )
    },
    {
      key: 'metodo_pago',
      label: 'Método Pago',
      render: (sale) => getPaymentMethodBadge(sale?.metodo_pago)
    },
    {
      key: 'estado',
      label: 'Estado',
      align: 'center',
      render: (sale) => (
        <FormStatusBadge status={sale?.estado} config={STATUS_CONFIGS.sale} />
      )
    },
    {
      key: 'actions',
      label: 'Acciones',
      align: 'right',
      render: (sale) => {
        if (!sale) return null;
        
        const actions = [
          {
            label: 'Ver detalles',
            icon: Eye,
            onClick: () => onView(sale)
          }
        ];

        if (sale?.estado === 'completada') {
          actions.push({
            label: 'Anular venta',
            icon: XCircle,
            onClick: () => onCancel(sale),
            destructive: true
          });
        }

        return <TableActionsDropdown actions={actions} align="right" />;
      }
    }
  ];

  return (
    <DataTable 
      data={sales}
      columns={columns}
      sortConfig={sortConfig}
      onSort={onSort}
    />
  );
};
