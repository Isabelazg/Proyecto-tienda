import { Edit, Trash2, Eye, Package } from 'lucide-react';
import { DataTable, TableActionsDropdown, FormStatusBadge } from '@/components/common';
import { ENTITY_CONFIG, STATUS_CONFIGS } from '@/config';
import { formatCurrency } from '@/utils/format';
import { getStockBadge } from '@/utils/badges';

export const ProductDataTable = ({ 
  products, 
  isLoading, 
  sortConfig,
  onSort,
  onView,
  onEdit,
  onDelete,
  onToggleStatus
}) => {
  const entityConfig = ENTITY_CONFIG.product;

  const columns = [
    {
      key: 'imagen',
      label: 'Imagen',
      render: (imagen, product) => imagen ? (
        <img
          src={imagen}
          alt={product?.nombre || 'Producto'}
          className="w-12 h-12 object-cover rounded-lg"
        />
      ) : (
        <div className="w-12 h-12 bg-gray-200 dark:bg-slate-700 rounded-lg flex items-center justify-center">
          <Package className="w-6 h-6 text-gray-400" />
        </div>
      )
    },
    {
      key: 'nombre',
      label: 'Nombre',
      sortable: true,
      render: (nombre, product) => (
        <div>
          <p className="font-medium text-gray-900 dark:text-white">{nombre || '-'}</p>
          {product?.descripcion && (
            <p className="text-sm text-gray-500 dark:text-slate-400 line-clamp-1">
              {product.descripcion}
            </p>
          )}
        </div>
      )
    },
    {
      key: 'categoria_nombre',
      label: 'Categoría',
      align: 'center',
      render: (categoria_nombre) => (
        <span className="text-sm text-gray-600 dark:text-slate-300">
          {categoria_nombre || '-'}
        </span>
      )
    },
    {
      key: 'precio',
      label: 'Precio',
      sortable: true,
      align: 'right',
      className: 'font-semibold text-gray-900 dark:text-white',
      render: (precio) => formatCurrency(precio || 0)
    },
    {
      key: 'stock',
      label: 'Stock',
      sortable: true,
      align: 'center',
      render: (stock) => getStockBadge(stock)
    },
    {
      key: 'estado',
      label: 'Estado',
      align: 'center',
      render: (estado, product) => (
        <div className="cursor-pointer inline-block" onClick={() => onToggleStatus(product)}>
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
      render: (_, product) => (
        <TableActionsDropdown
          actions={[
            {
              icon: Eye,
              label: 'Ver detalles',
              onClick: () => onView(product)
            },
            {
              icon: Edit,
              label: 'Editar',
              onClick: () => onEdit(product)
            },
            {
              icon: Trash2,
              label: 'Eliminar',
              onClick: () => onDelete(product),
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
      data={products}
      isLoading={isLoading}
      loadingMessage={`Cargando ${entityConfig.namePlural.toLowerCase()}...`}
      emptyTitle={`No se encontraron ${entityConfig.namePlural.toLowerCase()}`}
      emptyDescription={`No hay ${entityConfig.namePlural.toLowerCase()} que coincidan con los filtros aplicados.`}
      emptyIcon={entityConfig.icon}
    />
  );
};
