import { Eye, DollarSign } from 'lucide-react';
import { DataTable, TableActionsDropdown, FormStatusBadge, FormAmountBadge } from '@/components/common';
import { STATUS_CONFIGS, getDifferenceBadge } from '@/config';
import { formatCurrency, formatDateTime } from '@/utils/format';

export const CashRegisterDataTable = ({ 
  cashRegisters, 
  isLoading, 
  onView
}) => {
  const columns = [
    {
      key: 'id',
      label: 'ID',
      align: 'center',
      className: 'font-medium text-gray-600 dark:text-slate-300',
      render: (id) => `#${id}`
    },
    {
      key: 'usuario',
      label: 'Usuario',
      align: 'center'
    },
    {
      key: 'fecha_apertura',
      label: 'Apertura',
      align: 'center',
      render: (fecha) => <span className="text-sm">{formatDateTime(fecha)}</span>
    },
    {
      key: 'fecha_cierre',
      label: 'Cierre',
      align: 'center',
      render: (fecha) => fecha ? (
        <span className="text-sm text-gray-600">{formatDateTime(fecha)}</span>
      ) : (
        <FormAmountBadge amount="En curso" variant="warning" />
      )
    },
    {
      key: 'monto_inicial',
      label: 'Monto Inicial',
      align: 'right',
      render: (monto) => formatCurrency(monto)
    },
    {
      key: 'total_ventas',
      label: 'Total Ventas',
      align: 'right',
      className: 'font-semibold',
      render: (monto) => formatCurrency(monto)
    },
    {
      key: 'efectivo_esperado',
      label: 'Efectivo Esperado',
      align: 'right',
      className: 'font-bold text-gray-900 dark:text-white',
      render: (monto) => formatCurrency(monto)
    },
    {
      key: 'diferencia',
      label: 'Diferencia',
      align: 'center',
      render: (diferencia) => {
        const config = getDifferenceBadge(diferencia);
        return <FormAmountBadge {...config} />;
      }
    },
    {
      key: 'estado',
      label: 'Estado',
      align: 'center',
      render: (estado) => (
        <FormStatusBadge status={estado} config={STATUS_CONFIGS.cashRegister} />
      )
    },
    {
      key: 'actions',
      label: 'Acciones',
      align: 'center',
      render: (_, cashRegister) => (
        <TableActionsDropdown
          actions={[
            {
              icon: Eye,
              label: 'Ver detalles',
              onClick: () => onView(cashRegister)
            }
          ]}
        />
      )
    }
  ];

  return (
    <DataTable
      columns={columns}
      data={cashRegisters}
      isLoading={isLoading}
      loadingMessage="Cargando cajas registradoras..."
      emptyTitle="No se encontraron cajas"
      emptyDescription="No hay cajas registradas que coincidan con los filtros aplicados."
      emptyIcon={DollarSign}
    />
  );
};
