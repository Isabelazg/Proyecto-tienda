import React from 'react';
import { Edit, Trash2, Eye, Package, FolderTree, Check, X as XIcon, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell
} from '@/components/ui/table/Table';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { FormStatusBadge } from '@/components/common/Form';
import { formatDate } from '@/utils/format';
import LoadingState from '@/components/common/LoadingState';
import EmptyState from '@/components/common/EmptyState';

const CATEGORY_STATUS_CONFIG = {
  true: { variant: 'success', label: 'Activa' },
  false: { variant: 'error', label: 'Inactiva' }
};

export const CategoryDataTable = ({ 
  categories, 
  isLoading, 
  sortConfig,
  onSort,
  onView,
  onEdit,
  onDelete,
  onToggleStatus
}) => {
  if (isLoading) {
    return <LoadingState message="Cargando categorías..." />;
  }

  if (!Array.isArray(categories) || categories.length === 0) {
    return (
      <EmptyState
        icon={FolderTree}
        title="No se encontraron categorías"
        description="No hay categorías que coincidan con los filtros aplicados."
        isError={!Array.isArray(categories)}
      />
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table className="w-full">
        <TableHeader>
          <TableRow className="border-slate-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/50">
            <TableHead 
              sortable 
              sortDirection={sortConfig.key === 'nombre' ? sortConfig.direction : null}
              onSort={() => onSort('nombre')}
              className="font-semibold text-gray-700 dark:text-slate-300"
            >
              Nombre
            </TableHead>
            <TableHead className="font-semibold text-gray-700 dark:text-slate-300">
              Descripción
            </TableHead>
            <TableHead 
              sortable 
              sortDirection={sortConfig.key === 'total_productos' ? sortConfig.direction : null}
              onSort={() => onSort('total_productos')}
              className="font-semibold text-gray-700 dark:text-slate-300 text-center"
            >
              Total Productos
            </TableHead>
            <TableHead className="font-semibold text-gray-700 dark:text-slate-300 text-center">
              Productos Activos
            </TableHead>
            <TableHead className="font-semibold text-gray-700 dark:text-slate-300 text-center">
              Estado
            </TableHead>
            <TableHead className="font-semibold text-gray-700 dark:text-slate-300 text-center">
              Acciones
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map(category => (
            <TableRow key={category.id} className="transition-colors border-slate-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/30">
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="bg-lime-100 dark:bg-lime-900/20 p-2 rounded-lg">
                    <FolderTree className="h-5 w-5 text-lime-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{category.nombre}</p>
                    <p className="text-xs text-gray-500 dark:text-slate-400">
                      Creado: {formatDate(category.created_at)}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <p className="text-sm text-gray-600 dark:text-slate-300 line-clamp-2">
                  {category.descripcion}
                </p>
              </TableCell>
              <TableCell className="text-center">
                <div className="flex items-center justify-center gap-2">
                  <Package className="h-4 w-4 text-gray-500 dark:text-slate-400" />
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {category.total_productos}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-center">
                <FormStatusBadge 
                  status={category.productos_activos > 0}
                  config={{
                    true: { variant: 'success', label: category.productos_activos.toString() },
                    false: { variant: 'default', label: '0' }
                  }}
                />
              </TableCell>
              <TableCell className="text-center">
                <FormStatusBadge status={category.estado} config={CATEGORY_STATUS_CONFIG} />
              </TableCell>
              <TableCell className="text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost"
                      size="sm" 
                      className="text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-700"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600" align="end">
                    <DropdownMenuItem
                      onClick={() => onView(category)}
                      className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-600 cursor-pointer"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Ver detalles
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onEdit(category)}
                      className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-600 cursor-pointer"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onToggleStatus(category.id)}
                      className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-600 cursor-pointer"
                    >
                      {category.estado ? (
                        <>
                          <XIcon className="w-4 h-4 mr-2" />
                          Desactivar
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Activar
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onDelete(category)}
                      className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
