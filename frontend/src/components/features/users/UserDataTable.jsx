import { Edit, Trash2, Eye } from 'lucide-react';
import { DataTable, TableActionsDropdown, FormStatusBadge } from '@/components/common';
import { ENTITY_CONFIG, STATUS_CONFIGS } from '@/config';
import { formatDate } from '@/utils/format';
import { Badge } from '@/components/ui/Badge';

const getRoleBadge = (roleName) => {
  if (!roleName) return <Badge variant="default">Sin rol</Badge>;
  
  const variants = {
    'Administrador': 'info',
    'Empleado': 'lime',
    'Mesero': 'default',
  };
  return <Badge variant={variants[roleName] || 'default'}>{roleName}</Badge>;
};

export const UsersDataTable = ({ 
  users, 
  isLoading, 
  sortConfig,
  onSort,
  onView,
  onEdit,
  onDelete,
  onToggleStatus
}) => {
  const entityConfig = ENTITY_CONFIG.user;

  const columns = [
    {
      key: 'nombre',
      label: 'Nombre',
      sortable: true,
      render: (nombre, user) => (
        <div>
          <p className="font-medium text-gray-900 dark:text-white">{nombre || '-'}</p>
          {user?.id && (
            <p className="text-xs text-gray-500 dark:text-slate-400">ID: {user.id}</p>
          )}
        </div>
      )
    },
    {
      key: 'email',
      label: 'Email',
      align: 'center',
      render: (email) => (
        <p className="text-sm text-gray-900 dark:text-white">{email || '-'}</p>
      )
    },
    {
      key: 'role',
      label: 'Rol',
      sortable: true,
      align: 'center',
      render: (role) => getRoleBadge(role?.nombre)
    },
    {
      key: 'ultimo_acceso',
      label: 'Último Acceso',
      align: 'center',
      render: (ultimo_acceso) => ultimo_acceso ? (
        <p className="text-sm text-gray-600 dark:text-slate-300">
          {formatDate(ultimo_acceso)}
        </p>
      ) : (
        <p className="text-sm text-gray-500 dark:text-slate-400">-</p>
      )
    },
    {
      key: 'estado',
      label: 'Estado',
      align: 'center',
      render: (estado, user) => (
        <div className="cursor-pointer inline-block" onClick={() => onToggleStatus(user)}>
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
      render: (_, user) => (
        <TableActionsDropdown
          actions={[
            {
              icon: Eye,
              label: 'Ver detalles',
              onClick: () => onView(user)
            },
            {
              icon: Edit,
              label: 'Editar',
              onClick: () => onEdit(user)
            },
            {
              icon: Trash2,
              label: 'Eliminar',
              onClick: () => onDelete(user),
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
      data={users}
      isLoading={isLoading}
      loadingMessage={`Cargando ${entityConfig.namePlural.toLowerCase()}...`}
      emptyTitle={`No se encontraron ${entityConfig.namePlural.toLowerCase()}`}
      emptyDescription={`No hay ${entityConfig.namePlural.toLowerCase()} que coincidan con los filtros aplicados.`}
      emptyIcon={entityConfig.icon}
    />
  );
};
