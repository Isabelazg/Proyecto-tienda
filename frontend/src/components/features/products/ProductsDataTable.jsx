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
import { formatCurrency } from '@/utils/format';
import { getStockBadge, getProductStatusBadge } from '@/utils/badges';
import { Package, Plus, Check, X as XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ProductsDataTable = ({ 
  products, 
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
          <TableHead>Imagen</TableHead>
          <TableHead 
            sortable 
            sortDirection={sortConfig.key === 'nombre' ? sortConfig.direction : null}
            onSort={() => onSort('nombre')}
          >
            Nombre
          </TableHead>
          <TableHead>Categoría</TableHead>
          <TableHead 
            sortable 
            sortDirection={sortConfig.key === 'precio' ? sortConfig.direction : null}
            onSort={() => onSort('precio')}
          >
            Precio
          </TableHead>
          <TableHead 
            sortable 
            sortDirection={sortConfig.key === 'stock' ? sortConfig.direction : null}
            onSort={() => onSort('stock')}
          >
            Stock
          </TableHead>
          <TableHead>Estado</TableHead>
          <TableHead className="text-center">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableEmpty colSpan={7}>
            <LoadingOverlay>Cargando productos...</LoadingOverlay>
          </TableEmpty>
        ) : products.length === 0 ? (
          <TableEmpty colSpan={7}>
            <EmptyState
              icon={Package}
              title="No se encontraron productos"
              description="Intenta ajustar los filtros o crea un nuevo producto"
              action={
                <Button
                  onClick={onCreateNew}
                  className="bg-black text-white hover:bg-gray-900"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Crear Producto
                </Button>
              }
            />
          </TableEmpty>
        ) : (
          products.map(product => (
            <TableRow key={product.id}>
              <TableCell>
                <img
                  src={product.imagen}
                  alt={product.nombre}
                  className="w-12 h-12 object-cover rounded-lg"
                />
              </TableCell>
              <TableCell>
                <div>
                  <p className="font-medium text-gray-900">{product.nombre}</p>
                  <p className="text-sm text-gray-500 line-clamp-1">
                    {product.descripcion}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-sm text-gray-600">
                  {product.categoria_nombre}
                </span>
              </TableCell>
              <TableCell>
                <span className="font-semibold text-gray-900">
                  {formatCurrency(product.precio)}
                </span>
              </TableCell>
              <TableCell>
                {getStockBadge(product.stock)}
              </TableCell>
              <TableCell>
                <div 
                  className="cursor-pointer inline-block"
                  onClick={() => onToggleStatus(product)}
                >
                  {getProductStatusBadge(product.estado ? 'activo' : 'inactivo')}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => onView(product)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Ver detalles"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onEdit(product)}
                    className="p-2 text-lime-600 hover:bg-lime-50 rounded-lg transition-colors"
                    title="Editar"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDelete(product)}
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
