import { useState, useEffect } from 'react';

export const useUserTable = () => {
  const [users, setUsers] = useState([]);
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
    role: '',
    status: 'all', // all, active, inactive
  });
  const [sortConfig, setSortConfig] = useState({
    key: 'nombre',
    direction: 'asc',
  });

  useEffect(() => {
    fetchUsers();
  }, [pagination.currentPage, filters, sortConfig]);

  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Reemplazar con llamada real a la API
      await new Promise(resolve => setTimeout(resolve, 500));

      // Datos mock - estructura basada en la BD
      const mockUsers = [
        {
          id: 1,
          nombre: 'Admin Principal',
          email: 'admin@tienda.com',
          role: { id: 1, nombre: 'Administrador' },
          estado: true,
          ultimo_acceso: '2024-03-10T10:30:00',
          created_at: '2024-01-01',
        },
        {
          id: 2,
          nombre: 'Carlos Empleado',
          email: 'carlos@tienda.com',
          role: { id: 2, nombre: 'Empleado' },
          estado: true,
          ultimo_acceso: '2024-03-10T09:15:00',
          created_at: '2024-01-15',
        },
        {
          id: 3,
          nombre: 'Ana Mesera',
          email: 'ana@tienda.com',
          role: { id: 3, nombre: 'Mesero' },
          estado: true,
          ultimo_acceso: '2024-03-09T20:45:00',
          created_at: '2024-02-01',
        },
        {
          id: 4,
          nombre: 'Juan Empleado',
          email: 'juan@tienda.com',
          role: { id: 2, nombre: 'Empleado' },
          estado: true,
          ultimo_acceso: '2024-03-10T08:00:00',
          created_at: '2024-02-10',
        },
        {
          id: 5,
          nombre: 'María Mesera',
          email: 'maria@tienda.com',
          role: { id: 3, nombre: 'Mesero' },
          estado: false,
          ultimo_acceso: '2024-02-28T18:30:00',
          created_at: '2024-02-15',
        },
      ];

      // Aplicar filtros
      let filteredUsers = [...mockUsers];

      // Filtro de búsqueda
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredUsers = filteredUsers.filter(user =>
          user.nombre.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower)
        );
      }

      // Filtro por rol
      if (filters.role) {
        filteredUsers = filteredUsers.filter(user =>
          user.role.nombre === filters.role
        );
      }

      // Filtro de estado
      if (filters.status !== 'all') {
        filteredUsers = filteredUsers.filter(user =>
          filters.status === 'active' ? user.estado : !user.estado
        );
      }

      // Ordenamiento
      filteredUsers.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        // Ordenamiento especial para rol
        if (sortConfig.key === 'role') {
          aValue = a.role.nombre;
          bValue = b.role.nombre;
        }

        aValue = String(aValue).toLowerCase();
        bValue = String(bValue).toLowerCase();

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
      const paginatedUsers = filteredUsers.slice(startIndex, startIndex + pagination.itemsPerPage);

      setUsers(paginatedUsers);
      setPagination({
        ...pagination,
        totalPages: Math.ceil(filteredUsers.length / pagination.itemsPerPage),
        totalItems: filteredUsers.length,
      });
    } catch (err) {
      setError('Error al cargar los usuarios');
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

  const toggleUserStatus = async (userId) => {
    try {
      // TODO: Reemplazar con llamada real a la API
      await new Promise(resolve => setTimeout(resolve, 300));

      console.log('Toggling user status:', userId);
      await fetchUsers();

      return { success: true, message: 'Estado actualizado exitosamente' };
    } catch (err) {
      console.error('Error toggling user status:', err);
      return { success: false, message: 'Error al cambiar el estado' };
    }
  };

  return {
    users,
    isLoading,
    error,
    pagination,
    filters,
    sortConfig,
    handleSearch,
    handleFilterChange,
    handleSort,
    handlePageChange,
    toggleUserStatus,
    refetch: fetchUsers
  };
};
