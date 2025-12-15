import { useState, useEffect } from 'react';

export const useCategoryTable = () => {
  const [categories, setCategories] = useState([]);
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
    fetchCategories();
  }, [pagination.currentPage, filters, sortConfig]);

  const fetchCategories = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Reemplazar con llamada real a la API
      await new Promise(resolve => setTimeout(resolve, 500));

      // Datos mock - estructura basada en la BD
      const mockCategories = [
        {
          id: 1,
          nombre: 'Bebidas',
          descripcion: 'Bebidas calientes y frías',
          total_productos: 12,
          productos_activos: 10,
          estado: true,
          created_at: '2024-01-10',
        },
        {
          id: 2,
          nombre: 'Comida',
          descripcion: 'Platos principales y entradas',
          total_productos: 25,
          productos_activos: 22,
          estado: true,
          created_at: '2024-01-10',
        },
        {
          id: 3,
          nombre: 'Postres',
          descripcion: 'Postres y dulces',
          total_productos: 8,
          productos_activos: 7,
          estado: true,
          created_at: '2024-01-15',
        },
        {
          id: 4,
          nombre: 'Snacks',
          descripcion: 'Bocadillos y aperitivos',
          total_productos: 15,
          productos_activos: 14,
          estado: true,
          created_at: '2024-02-01',
        },
        {
          id: 5,
          nombre: 'Lácteos',
          descripcion: 'Productos lácteos y derivados',
          total_productos: 6,
          productos_activos: 5,
          estado: true,
          created_at: '2024-02-10',
        },
        {
          id: 6,
          nombre: 'Panadería',
          descripcion: 'Pan, pasteles y productos horneados',
          total_productos: 10,
          productos_activos: 8,
          estado: true,
          created_at: '2024-02-15',
        },
        {
          id: 7,
          nombre: 'Frutas y Verduras',
          descripcion: 'Productos frescos',
          total_productos: 0,
          productos_activos: 0,
          estado: false,
          created_at: '2024-03-01',
        },
      ];

      // Aplicar filtros
      let filteredCategories = [...mockCategories];

      // Filtro de búsqueda
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredCategories = filteredCategories.filter(category =>
          category.nombre.toLowerCase().includes(searchLower) ||
          category.descripcion.toLowerCase().includes(searchLower)
        );
      }

      // Filtro de estado
      if (filters.status !== 'all') {
        filteredCategories = filteredCategories.filter(category =>
          filters.status === 'active' ? category.estado : !category.estado
        );
      }

      // Ordenamiento
      filteredCategories.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (sortConfig.key === 'total_productos' || sortConfig.key === 'productos_activos') {
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
      const paginatedCategories = filteredCategories.slice(startIndex, startIndex + pagination.itemsPerPage);

      setCategories(paginatedCategories);
      setPagination({
        ...pagination,
        totalPages: Math.ceil(filteredCategories.length / pagination.itemsPerPage),
        totalItems: filteredCategories.length,
      });
    } catch (err) {
      setError('Error al cargar las categorías');
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

  const toggleCategoryStatus = async (categoryId) => {
    try {
      // TODO: Reemplazar con llamada real a la API
      await new Promise(resolve => setTimeout(resolve, 300));

      console.log('Toggling category status:', categoryId);
      await fetchCategories();

      return { success: true, message: 'Estado actualizado exitosamente' };
    } catch (err) {
      console.error('Error toggling category status:', err);
      return { success: false, message: 'Error al cambiar el estado' };
    }
  };

  return {
    categories,
    isLoading,
    error,
    pagination,
    filters,
    sortConfig,
    handleSearch,
    handleFilterChange,
    handleSort,
    handlePageChange,
    toggleCategoryStatus,
    refetch: fetchCategories
  };
};
