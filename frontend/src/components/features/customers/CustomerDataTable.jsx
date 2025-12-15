import React from 'react';
import { Edit, Trash2, Eye } from 'lucide-react';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell,
  TableEmpty 
} from '@/components/ui/table/Table';
import { EmptyState } from '@/components/ui/empty-state/EmptyState';
import { LoadingOverlay } from '@/components/ui/spinner/Spinner';
import { formatCurrency, formatDate } from '@/utils/format';
import { getCustomerStatusBadge } from '@/utils/badges';
import { Users, Plus, Check, X as XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const CustomerDataTable = ({ 
  customers, 
  isLoading, 
  sortConfig,
  onSort,
  onView,
  onEdit,
  onDelete,
  onToggleStatus,
  onCreateNew
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead 
            sortable 
            sortDirection={sortConfig.key === 'nombre' ? sortConfig.direction : null}
            onSort={() => onSort('nombre')}
          >
            Cliente
          </TableHead>
          <TableHead>Contacto</TableHead>
          <TableHead>Documento</TableHead>
          <TableHead 
            sortable 
            sortDirection={sortConfig.key === 'total_compras' ? sortConfig.direction : null}
            onSort={() => onSort('total_compras')}
          >
            Total Compras
          </TableHead>
          <TableHead 
            sortable 
            sortDirection={sortConfig.key === 'total_gastado' ? sortConfig.direction : null}
            onSort={() => onSort('total_gastado')}
          >
            Total Gastado
          </TableHead>
          <TableHead>Estado</TableHead>
          <TableHead className="text-center">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableEmpty colSpan={7}>
            <LoadingOverlay>Cargando clientes...</LoadingOverlay>
          </TableEmpty>
        ) : customers.length === 0 ? (
          <TableEmpty colSpan={7}>
            <EmptyState
              icon={Users}
              title="No se encontraron clientes"
              description="Intenta ajustar los filtros o registra un nuevo cliente"
              action={
                <Button
                  onClick={onCreateNew}
                  className="bg-black text-white hover:bg-gray-900"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Registrar Cliente
                </Button>
              }
            />
          </TableEmpty>
        ) : (
          customers.map(customer => (
            <TableRow key={customer.id}>
              <TableCell>
                <div>
                  <p className="font-medium text-gray-900">{customer.nombre}</p>
                  <p className="text-sm text-gray-500">
                    Registrado: {formatDate(customer.fecha_registro)}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <p className="text-sm text-gray-900">{customer.email}</p>
                  <p className="text-sm text-gray-500">{customer.telefono}</p>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <p className="text-sm text-gray-900">{customer.tipo_documento}</p>
                  <p className="text-sm text-gray-500">{customer.documento}</p>
                </div>
              </TableCell>
              <TableCell>
                <span className="font-medium text-gray-900">
                  {customer.total_compras}
                </span>
              </TableCell>
              <TableCell>
                <span className="font-semibold text-gray-900">
                  {formatCurrency(customer.total_gastado)}
                </span>
              </TableCell>
              <TableCell>
                {getCustomerStatusBadge(customer.estado)}
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => onView(customer)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Ver detalles"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onEdit(customer)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Editar"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onToggleStatus(customer.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      customer.estado
                        ? 'text-yellow-600 hover:bg-yellow-50'
                        : 'text-green-600 hover:bg-green-50'
                    }`}
                    title={customer.estado ? 'Desactivar' : 'Activar'}
                  >
                    {customer.estado ? <XIcon className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                  </button>
                  <button
                    onClick={() => onDelete(customer)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Eliminar"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};
