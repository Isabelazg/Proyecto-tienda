import { Edit, Trash2, Eye, Package, Check, X as XIcon } from 'lucide-react';
import { 
  FormStatusBadge, 
  DataTable, 
  TableActionsDropdown, 
  IconCell
} from '@/components/common';
import { 
  STATUS_CONFIGS,
  ENTITY_CONFIG,
  ICON_STYLES,
  CONTAINER_STYLES
} from '@/config';
import { formatDate } from '@/utils/format';

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
  const entityConfig = ENTITY_CONFIG.category;

  const columns = [
    {
      key: 'nombre',
      label: 'Nombre',
      sortable: true,
      render: (nombre, category) => (
        <IconCell 
          title={nombre || '-'}
          subtitle={category?.created_at ? `Creado: ${formatDate(category.created_at)}` : ''}
          icon={entityConfig.icon}
          iconBgColor={entityConfig.iconBgColor}
          iconColor={entityConfig.iconColor}
        />
      )
    },
    {
      key: 'descripcion',
      label: 'Descripción',
      render: (descripcion) => (
        <p className="text-sm text-gray-600 dark:text-slate-300 line-clamp-2">
          {descripcion || '-'}
        </p>
      )
    },
    {
      key: 'total_productos',
      label: 'Total Productos',
      sortable: true,
      align: 'center',
      render: (total_productos) => (
        <div className={CONTAINER_STYLES.flexCenter}>
          <Package className={`${ICON_STYLES.sm} text-gray-500 dark:text-slate-400`} />
          <span className="font-semibold text-gray-900 dark:text-white">
            {total_productos || 0}
          </span>
        </div>
      )
    },
    {
      key: 'productos_activos',
      label: 'Productos Activos',
      align: 'center',
      render: (productos_activos) => {
        const cantidad = productos_activos || 0;
        return (
          <FormStatusBadge 
            status={cantidad > 0}
            config={{
              true: { variant: 'success', label: cantidad.toString() },
              false: { variant: 'default', label: '0' }
            }}
          />
        );
      }
    },
    {
      key: 'estado',
      label: 'Estado',
      align: 'center',
      render: (estado) => (
        <FormStatusBadge status={estado} config={STATUS_CONFIGS.category} />
      )
    },
    {
      key: 'actions',
      label: 'Acciones',
      align: 'center',
      render: (_, category) => (
        <TableActionsDropdown
          actions={[
            {
              icon: Eye,
              label: 'Ver detalles',
              onClick: () => onView(category)
            },
            {
              icon: Edit,
              label: 'Editar',
              onClick: () => onEdit(category)
            },
            {
              icon: category?.estado ? XIcon : Check,
              label: category?.estado ? 'Desactivar' : 'Activar',
              onClick: () => onToggleStatus(category.id)
            },
            {
              icon: Trash2,
              label: 'Eliminar',
              onClick: () => onDelete(category),
              destructive: true
            }
          ]}
        />
      )
    }
  ];

  return (
    <DataTable
      columns={columns}
      data={categories}
      isLoading={isLoading}
      loadingMessage={`Cargando ${entityConfig.namePlural.toLowerCase()}...`}
      emptyTitle={`No se encontraron ${entityConfig.namePlural.toLowerCase()}`}
      emptyDescription={`No hay ${entityConfig.namePlural.toLowerCase()} que coincidan con los filtros aplicados.`}
      emptyIcon={entityConfig.icon}
    />
  );
};
