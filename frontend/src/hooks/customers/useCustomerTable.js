import { useState, useEffect } from 'react';

export const useCustomerTable = () => {
  const [customers, setCustomers] = useState([]);
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
    fetchCustomers();
  }, [pagination.currentPage, filters, sortConfig]);

  const fetchCustomers = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Reemplazar con llamada real a la API
      await new Promise(resolve => setTimeout(resolve, 500));

      // Datos mock - estructura basada en la BD
      const mockCustomers = [
        {
          id: 1,
          nombre: 'María García Rodríguez',
          email: 'maria.garcia@email.com',
          telefono: '3101234567',
          direccion: 'Calle 45 #12-34, Bogotá',
          documento: '1234567890',
          tipo_documento: 'CC',
          fecha_registro: '2024-01-15',
          total_compras: 15,
          total_gastado: 450000,
          estado: true,
        },
        {
          id: 2,
          nombre: 'Carlos Andrés Pérez',
          email: 'carlos.perez@email.com',
          telefono: '3209876543',
          direccion: 'Carrera 7 #89-12, Medellín',
          documento: '9876543210',
          tipo_documento: 'CC',
          fecha_registro: '2024-01-20',
          total_compras: 8,
          total_gastado: 280000,
          estado: true,
        },
        {
          id: 3,
          nombre: 'Ana María López',
          email: 'ana.lopez@email.com',
          telefono: '3156789012',
          direccion: 'Avenida 15 #23-45, Cali',
          documento: '5678901234',
          tipo_documento: 'CC',
          fecha_registro: '2024-02-01',
          total_compras: 25,
          total_gastado: 1200000,
          estado: true,
        },
        {
          id: 4,
          nombre: 'Juan David Martínez',
          email: 'juan.martinez@email.com',
          telefono: '3187654321',
          direccion: 'Calle 100 #56-78, Barranquilla',
          documento: '3456789012',
          tipo_documento: 'CC',
          fecha_registro: '2024-02-10',
          total_compras: 3,
          total_gastado: 95000,
          estado: true,
        },
        {
          id: 5,
          nombre: 'Laura Camila Sánchez',
          email: 'laura.sanchez@email.com',
          telefono: '3145678901',
          direccion: 'Carrera 50 #34-12, Cartagena',
          documento: '7890123456',
          tipo_documento: 'CC',
          fecha_registro: '2024-02-15',
          total_compras: 12,
          total_gastado: 380000,
          estado: true,
        },
        {
          id: 6,
          nombre: 'Diego Fernando Torres',
          email: 'diego.torres@email.com',
          telefono: '3198765432',
          direccion: 'Calle 80 #67-89, Bucaramanga',
          documento: '2345678901',
          tipo_documento: 'CC',
          fecha_registro: '2024-03-01',
          total_compras: 0,
          total_gastado: 0,
          estado: false,
        },
      ];

      // Aplicar filtros
      let filteredCustomers = [...mockCustomers];

      // Filtro de búsqueda
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredCustomers = filteredCustomers.filter(customer =>
          customer.nombre.toLowerCase().includes(searchLower) ||
          customer.email.toLowerCase().includes(searchLower) ||
          customer.telefono.includes(searchLower) ||
          customer.documento.includes(searchLower)
        );
      }

      // Filtro de estado
      if (filters.status !== 'all') {
        filteredCustomers = filteredCustomers.filter(customer =>
          filters.status === 'active' ? customer.estado : !customer.estado
        );
      }

      // Ordenamiento
      filteredCustomers.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (sortConfig.key === 'total_compras' || sortConfig.key === 'total_gastado') {
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
      const paginatedCustomers = filteredCustomers.slice(startIndex, startIndex + pagination.itemsPerPage);

      setCustomers(paginatedCustomers);
      setPagination({
        ...pagination,
        totalPages: Math.ceil(filteredCustomers.length / pagination.itemsPerPage),
        totalItems: filteredCustomers.length,
      });
    } catch (err) {
      setError('Error al cargar los clientes');
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

  const handleItemsPerPageChange = (itemsPerPage) => {
    setPagination({
      ...pagination,
      itemsPerPage: Number(itemsPerPage),
      currentPage: 1,
    });
  };

  const toggleCustomerStatus = async (customerId) => {
    try {
      // TODO: Reemplazar con llamada real a la API
      await new Promise(resolve => setTimeout(resolve, 300));

      console.log('Toggling customer status:', customerId);
      await fetchCustomers();

      return { success: true, message: 'Estado actualizado exitosamente' };
    } catch (err) {
      console.error('Error toggling customer status:', err);
      return { success: false, message: 'Error al cambiar el estado' };
    }
  };

  return {
    customers,
    isLoading,
    error,
    pagination,
    filters,
    sortConfig,
    handleSearch,
    handleFilterChange,
    handleSort,
    handlePageChange,
    handleItemsPerPageChange,
    toggleCustomerStatus,
    refetch: fetchCustomers
  };
};
