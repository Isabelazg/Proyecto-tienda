import { 
  FormViewDialog, 
  FormViewField,
  FormTransactionList,
  FormSummaryCard,
  FormSummaryGrid,
  FormViewGrid,
  FormAmountText
} from '@/components/common';
import { DollarSign, Calendar, TrendingUp, TrendingDown } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency, formatDateTime } from '@/utils/format';

export const ViewCashRegisterDialog = ({ 
  isOpen, 
  onClose, 
  cashRegister
}) => {
  if (!cashRegister) {
    return null;
  }

  const isRegisterOpen = cashRegister.estado === 'abierta';

  const getBadge = (transaction) => {
    const config = {
      ingreso: { variant: 'info', label: 'Ingreso', icon: TrendingUp },
      egreso: { variant: 'warning', label: 'Egreso', icon: TrendingDown }
    };

    const transactionConfig = config[transaction.tipo] || config.ingreso;
    const Icon = transactionConfig.icon;

    return (
      <Badge variant={transactionConfig.variant}>
        <Icon className="h-3 w-3 mr-1" />
        {transactionConfig.label}
      </Badge>
    );
  };

  const formatAmount = (transaction) => {
    const variant = transaction.tipo === 'ingreso' ? 'info' : 'warning';

    return (
      <FormAmountText variant={variant}>
        {transaction.tipo === 'ingreso' ? '+' : '-'}
        {formatCurrency(transaction.monto)}
      </FormAmountText>
    );
  };

  const formatDate = (transaction) => {
    return (
      <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-slate-400">
        <Calendar className="h-3 w-3" />
        {formatDateTime(transaction.fecha)}
      </div>
    );
  };

  return (
    <FormViewDialog
      isOpen={isOpen}
      onOpenChange={onClose}
      onClose={onClose}
      title={`Caja #${cashRegister.id}`}
      description={`Usuario: ${cashRegister.usuario} - Estado: ${isRegisterOpen ? 'Abierta' : 'Cerrada'}`}
      IconComponent={DollarSign}
      maxWidth="max-w-3xl"
    >
      <div className="space-y-6">
        {/* Fechas */}
        <FormViewGrid cols={2}>
          <FormViewField
            label="Fecha de Apertura"
            value={formatDateTime(cashRegister.fecha_apertura)}
          />
          <FormViewField
            label="Fecha de Cierre"
            value={cashRegister.fecha_cierre ? formatDateTime(cashRegister.fecha_cierre) : 'En curso'}
          />
        </FormViewGrid>

        {/* Resumen Financiero */}
        <FormSummaryGrid title="Resumen Financiero" gridClassName="grid-cols-2 md:grid-cols-3">
          <FormSummaryCard 
            label="Monto Inicial" 
            value={formatCurrency(cashRegister.monto_inicial)} 
          />
          <FormSummaryCard 
            label="Total Ventas" 
            value={formatCurrency(cashRegister.total_ventas)}
            variant="success"
          />
          <FormSummaryCard 
            label="Total Ingresos" 
            value={formatCurrency(cashRegister.total_ingresos)}
            variant="info"
          />
          <FormSummaryCard 
            label="Total Egresos" 
            value={formatCurrency(cashRegister.total_egresos)}
            variant="warning"
          />
          <FormSummaryCard 
            label="Efectivo Esperado" 
            value={formatCurrency(cashRegister.efectivo_esperado)}
            variant="lime"
          />
          <FormSummaryCard 
            label="Efectivo Contado" 
            value={cashRegister.efectivo_contado !== null ? formatCurrency(cashRegister.efectivo_contado) : 'N/A'}
            variant="purple"
          />
        </FormSummaryGrid>

        {/* Diferencia */}
        {cashRegister.diferencia !== null && (
          <FormSummaryCard
            label="Diferencia de Caja"
            value={
              cashRegister.diferencia === 0 
                ? 'Exacto' 
                : (cashRegister.diferencia > 0 ? 'Sobrante: +' : 'Faltante: ') + formatCurrency(Math.abs(cashRegister.diferencia))
            }
            variant={
              cashRegister.diferencia === 0 
                ? 'success'
                : cashRegister.diferencia > 0 
                  ? 'info'
                  : 'warning'
            }
          />
        )}

        {/* Transacciones */}
        <FormTransactionList
          transactions={cashRegister.transacciones}
          title={`Transacciones (${cashRegister.transacciones?.length || 0})`}
          emptyMessage="No hay transacciones adicionales registradas"
          getBadge={getBadge}
          formatAmount={formatAmount}
          formatDate={formatDate}
        />
      </div>
    </FormViewDialog>
  );
};
