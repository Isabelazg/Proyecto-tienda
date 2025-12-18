import { Edit, Trash2, Eye, Shield, Users, Check, X as XIcon } from 'lucide-react';
import { DataTable, TableActionsDropdown, IconCell, FormStatusBadge } from '@/components/common';
import { ENTITY_CONFIG, STATUS_CONFIGS, CONTAINER_STYLES, ICON_STYLES } from '@/config';
import { formatDate } from '@/utils/format';
import { Badge } from '@/components/ui/badge/Badge';

export const RoleDataTable = ({ 
  roles, 
  isLoading, 
  sortConfig,
  onSort,
  onView,
  onEdit,
  onDelete,
  onToggleStatus
}) => {
  const entityConfig = ENTITY_CONFIG.role;

  const columns = [
    {
      key: 'nombre',
      label: 'Rol',
      sortable: true,
      render: (nombre, role) => (
        <IconCell 
          title={nombre || '-'}
          subtitle={role?.created_at ? `Creado: ${formatDate(role.created_at)}` : ''}
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
      key: 'permisos',
      label: 'Permisos',
      align: 'center',
      render: (permisos) => {
        const cantidad = Array.isArray(permisos) ? permisos.length : 0;
        return (
          <Badge variant="info">
            {cantidad} permisos
          </Badge>
        );
      }
    },
    {
      key: 'total_usuarios',
      label: 'Usuarios',
      sortable: true,
      align: 'center',
      render: (total_usuarios) => (
        <div className={CONTAINER_STYLES.flexCenter}>
          <Users className={`${ICON_STYLES.sm} text-gray-500 dark:text-slate-400`} />
          <span className="font-semibold text-gray-900 dark:text-white">
            {total_usuarios || 0}
          </span>
        </div>
      )
    },
    {
      key: 'estado',
      label: 'Estado',
      align: 'center',
      render: (estado) => (
        <FormStatusBadge status={estado} config={STATUS_CONFIGS.general} />
      )
    },
    {
      key: 'actions',
      label: 'Acciones',
      align: 'center',
      render: (_, role) => (
        <TableActionsDropdown
          actions={[
            {
              icon: Eye,
              label: 'Ver permisos',
              onClick: () => onView(role)
            },
            {
              icon: Edit,
              label: 'Editar',
              onClick: () => onEdit(role)
            },
            {
              icon: role?.estado ? XIcon : Check,
              label: role?.estado ? 'Desactivar' : 'Activar',
              onClick: () => onToggleStatus(role.id)
            },
            {
              icon: Trash2,
              label: 'Eliminar',
              onClick: () => onDelete(role),
              destructive: true,
              disabled: role?.id <= 3 // No permitir eliminar roles básicos
            }
          ]}
        />
      )
    }
  ];

  return (
    <DataTable
      columns={columns}
      data={roles}
      isLoading={isLoading}
      loadingMessage={`Cargando ${entityConfig.namePlural.toLowerCase()}...`}
      emptyTitle={`No se encontraron ${entityConfig.namePlural.toLowerCase()}`}
      emptyDescription={`No hay ${entityConfig.namePlural.toLowerCase()} que coincidan con los filtros aplicados.`}
      emptyIcon={entityConfig.icon}
    />
  );
};
