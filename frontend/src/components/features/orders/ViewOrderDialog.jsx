import { FormViewDialog, FormViewField, FormInfoBanner, FormSectionTitle, FormSummaryCard } from '@/components/common';
import { Badge } from '@/components/ui/Badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { formatCurrency, formatDateTime } from '@/utils/format';

const getOrderStatusBadge = (status) => {
  const statusConfig = {
    pendiente: { variant: 'warning', label: 'Pendiente' },
    en_preparacion: { variant: 'info', label: 'En Preparación' },
    entregado: { variant: 'success', label: 'Entregado' },
    pagado: { variant: 'default', label: 'Pagado' }
  };

  const config = statusConfig[status] || statusConfig.pendiente;
  return <Badge variant={config.variant}>{config.label}</Badge>;
};

export const ViewOrderDialog = ({ 
  isOpen, 
  order, 
  onClose 
}) => {
  return (
    <FormViewDialog
      isOpen={isOpen}
      onClose={onClose}
      title={order ? `Detalles del Pedido #${order.id}` : 'Detalles del Pedido'}
      size="large"
    >
      {order ? (
        <div className="space-y-6">
          {/* Información del pedido */}
          <div className="grid grid-cols-2 gap-4">
            <FormViewField 
              label="Mesa" 
              value={`Mesa ${order.mesa_numero}`} 
            />
            <FormViewField 
              label="Estado" 
              value={getOrderStatusBadge(order.estado)} 
            />
            <FormViewField 
              label="Mesero" 
              value={order.mesero} 
            />
            <FormViewField 
              label="Total de Items" 
              value={`${order.items.length} productos`} 
            />
            <FormViewField 
              label="Fecha de Creación" 
              value={formatDateTime(order.created_at)} 
            />
            <FormViewField 
              label="Última Actualización" 
              value={formatDateTime(order.updated_at)} 
            />
          </div>

          {/* Notas */}
          {order.notas && (
            <FormInfoBanner
              variant="warning"
              title="Notas del Pedido"
              message={order.notas}
            />
          )}

          {/* Productos */}
          <div>
            <FormSectionTitle className="mb-3">Productos del Pedido</FormSectionTitle>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Producto</TableHead>
                  <TableHead className="text-center">Cantidad</TableHead>
                  <TableHead className="text-right">Precio Unit.</TableHead>
                  <TableHead className="text-right">Subtotal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.producto}</TableCell>
                    <TableCell className="text-center">{item.cantidad}</TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(item.precio)}
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {formatCurrency(item.subtotal)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Total */}
          <FormSummaryCard
            label="Total"
            value={formatCurrency(order.total)}
            className="border-2"
          />
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No hay información disponible
        </div>
      )}
    </FormViewDialog>
  );
};
