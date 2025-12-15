import { useState, useEffect } from 'react';
import { getRolePermissions } from '@/utils/roles';
import { PERMISSIONS } from '@/utils/roles';

export const useRoleTable = () => {
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });
  const [filters, setFilters] = useState({
    search: '',
    status: 'all', // all, active, inactive
  });
  const [sortConfig, setSortConfig] = useState({
    key: 'nombre',
    direction: 'asc',
  });

  useEffect(() => {
    fetchRoles();
  }, [pagination.currentPage, filters, sortConfig]);

  const fetchRoles = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Reemplazar con llamada real a la API
      await new Promise(resolve => setTimeout(resolve, 500));

      // Datos mock - estructura basada en la BD
      const mockRoles = [
        {
          id: 1,
          nombre: 'Administrador',
          descripcion: 'Acceso completo al sistema. Puede gestionar todos los módulos, usuarios y configuraciones.',
          permisos: getRolePermissions('Administrador'),
          total_usuarios: 2,
          estado: true,
          created_at: '2024-01-01',
        },
        {
          id: 2,
          nombre: 'Empleado',
          descripcion: 'Puede gestionar productos, ventas y clientes. Sin acceso a configuración del sistema.',
          permisos: getRolePermissions('Empleado'),
          total_usuarios: 5,
          estado: true,
          created_at: '2024-01-01',
        },
        {
          id: 3,
          nombre: 'Mesero',
          descripcion: 'Acceso limitado para tomar pedidos y ver productos disponibles.',
          permisos: getRolePermissions('Mesero'),
          total_usuarios: 8,
          estado: true,
          created_at: '2024-01-01',
        },
        {
          id: 4,
          nombre: 'Cajero',
          descripcion: 'Gestión de ventas y cobros. Sin acceso a inventario ni reportes.',
          permisos: [
            PERMISSIONS.VENTAS_VER,
            PERMISSIONS.VENTAS_CREAR,
            PERMISSIONS.CLIENTES_VER,
            PERMISSIONS.PRODUCTOS_VER,
            PERMISSIONS.DASHBOARD_VER,
          ],
          total_usuarios: 3,
          estado: true,
          created_at: '2024-02-01',
        },
        {
          id: 5,
          nombre: 'Supervisor',
          descripcion: 'Puede ver reportes y gestionar productos. Sin acceso a usuarios.',
          permisos: [
            PERMISSIONS.PRODUCTOS_VER,
            PERMISSIONS.PRODUCTOS_CREAR,
            PERMISSIONS.PRODUCTOS_EDITAR,
            PERMISSIONS.CATEGORIAS_VER,
            PERMISSIONS.CATEGORIAS_CREAR,
            PERMISSIONS.VENTAS_VER,
            PERMISSIONS.CLIENTES_VER,
            PERMISSIONS.REPORTES_VER,
            PERMISSIONS.DASHBOARD_VER,
          ],
          total_usuarios: 0,
          estado: false,
          created_at: '2024-02-15',
        },
      ];

      // Aplicar filtros
      let filteredRoles = [...mockRoles];

      // Filtro de búsqueda
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredRoles = filteredRoles.filter(role =>
          role.nombre.toLowerCase().includes(searchLower) ||
          role.descripcion.toLowerCase().includes(searchLower)
        );
      }

      // Filtro de estado
      if (filters.status !== 'all') {
        filteredRoles = filteredRoles.filter(role =>
          filters.status === 'active' ? role.estado : !role.estado
        );
      }

      // Ordenamiento
      filteredRoles.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (sortConfig.key === 'total_usuarios') {
          aValue = Number(aValue);
          bValue = Number(bValue);
        } else {
          aValue = String(aValue).toLowerCase();
          bValue = String(bValue).toLowerCase();
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });

      // Paginación
      const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
      const paginatedRoles = filteredRoles.slice(startIndex, startIndex + pagination.itemsPerPage);

      setRoles(paginatedRoles);
      setPagination({
        ...pagination,
        totalPages: Math.ceil(filteredRoles.length / pagination.itemsPerPage),
        totalItems: filteredRoles.length,
      });
    } catch (err) {
      setError('Error al cargar los roles');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (value) => {
    setFilters({ ...filters, search: value });
    setPagination({ ...pagination, currentPage: 1 });
  };

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
    setPagination({ ...pagination, currentPage: 1 });
  };

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc',
    });
  };

  const handlePageChange = (page) => {
    setPagination({ ...pagination, currentPage: page });
  };

  return {
    roles,
    isLoading,
    error,
    pagination,
    filters,
    sortConfig,
    handleSearch,
    handleFilterChange,
    handleSort,
    handlePageChange,
    refetch: fetchRoles,
  };
};
