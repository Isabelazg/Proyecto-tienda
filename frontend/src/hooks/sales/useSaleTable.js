import { useState, useEffect } from 'react';

export const useSaleTable = () => {
  const [sales, setSales] = useState([]);
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
    estado: '',
    metodo_pago_id: '',
    fecha_desde: '',
    fecha_hasta: ''
  });
  const [sortConfig, setSortConfig] = useState({
    key: 'fecha',
    direction: 'desc',
  });

  // Mock data - Ventas
  const mockSales = [
    {
      venta_id: 1,
      fecha: '2024-12-10T10:30:00',
      total: 51000,
      estado: 'completada',
      metodo_pago_id: 1,
      metodo_pago: 'Efectivo',
      usuario: 'Juan Pérez',
      mesero: 'Carlos Ramírez',
      cliente_id: 1,
      cliente: 'María García Rodríguez',
      items: [
        { producto: 'Café Colombiano Premium', cantidad: 2, precio_unitario: 8500, subtotal: 17000 },
        { producto: 'Hamburguesa Especial', cantidad: 1, precio_unitario: 25000, subtotal: 25000 },
        { producto: 'Jugo Natural de Naranja', cantidad: 1, precio_unitario: 6000, subtotal: 6000 }
      ]
    },
    {
      venta_id: 2,
      fecha: '2024-12-10T11:15:00',
      total: 88000,
      estado: 'completada',
      metodo_pago_id: 2,
      metodo_pago: 'Tarjeta',
      usuario: 'María López',
      mesero: 'Ana Torres',
      items: [
        { producto: 'Pizza Margarita', cantidad: 2, precio_unitario: 35000, subtotal: 70000 },
        { producto: 'Ensalada César', cantidad: 1, precio_unitario: 18000, subtotal: 18000 }
      ]
    },
    {
      venta_id: 3,
      fecha: '2024-12-10T12:45:00',
      total: 35000,
      estado: 'completada',
      metodo_pago_id: 3,
      metodo_pago: 'Transferencia',
      usuario: 'Carlos Gómez',
      items: [
        { producto: 'Pizza Margarita', cantidad: 1, precio_unitario: 35000, subtotal: 35000 }
      ]
    },
    {
      venta_id: 4,
      fecha: '2024-12-10T14:20:00',
      total: 39500,
      estado: 'completada',
      metodo_pago_id: 1,
      metodo_pago: 'Efectivo',
      usuario: 'Ana Martínez',
      items: [
        { producto: 'Café Colombiano Premium', cantidad: 3, precio_unitario: 8500, subtotal: 25500 },
        { producto: 'Té Helado', cantidad: 2, precio_unitario: 5500, subtotal: 11000 }
      ]
    },
    {
      venta_id: 5,
      fecha: '2024-12-10T15:00:00',
      total: 25000,
      estado: 'anulada',
      metodo_pago_id: 2,
      metodo_pago: 'Tarjeta',
      usuario: 'Juan Pérez',
      items: [
        { producto: 'Hamburguesa Especial', cantidad: 1, precio_unitario: 25000, subtotal: 25000 }
      ]
    },
    {
      venta_id: 6,
      fecha: '2024-12-09T16:30:00',
      total: 70000,
      estado: 'completada',
      metodo_pago_id: 1,
      metodo_pago: 'Efectivo',
      usuario: 'María López',
      items: [
        { producto: 'Pizza Margarita', cantidad: 2, precio_unitario: 35000, subtotal: 70000 }
      ]
    },
    {
      venta_id: 7,
      fecha: '2024-12-09T17:45:00',
      total: 56000,
      estado: 'completada',
      metodo_pago_id: 2,
      metodo_pago: 'Tarjeta',
      usuario: 'Carlos Gómez',
      items: [
        { producto: 'Hamburguesa Especial', cantidad: 2, precio_unitario: 25000, subtotal: 50000 },
        { producto: 'Jugo Natural de Naranja', cantidad: 1, precio_unitario: 6000, subtotal: 6000 }
      ]
    },
    {
      venta_id: 8,
      fecha: '2024-12-09T18:20:00',
      total: 43000,
      estado: 'completada',
      metodo_pago_id: 3,
      metodo_pago: 'Transferencia',
      usuario: 'Ana Martínez',
      items: [
        { producto: 'Hamburguesa Especial', cantidad: 1, precio_unitario: 25000, subtotal: 25000 },
        { producto: 'Ensalada César', cantidad: 1, precio_unitario: 18000, subtotal: 18000 }
      ]
    }
  ];

  useEffect(() => {
    fetchSales();
  }, [pagination.currentPage, filters, sortConfig]);

  const fetchSales = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Reemplazar con llamada real a la API
      await new Promise(resolve => setTimeout(resolve, 500));

      let filteredSales = [...mockSales];

      // Aplicar filtros
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredSales = filteredSales.filter(sale =>
          sale.venta_id.toString().includes(searchLower) ||
          sale.usuario.toLowerCase().includes(searchLower) ||
          (sale.cliente && sale.cliente.toLowerCase().includes(searchLower)) ||
          (sale.mesero && sale.mesero.toLowerCase().includes(searchLower)) ||
          sale.items.some(item => item.producto.toLowerCase().includes(searchLower))
        );
      }

      if (filters.estado) {
        filteredSales = filteredSales.filter(sale => sale.estado === filters.estado);
      }

      if (filters.metodo_pago_id) {
        filteredSales = filteredSales.filter(sale => 
          sale.metodo_pago_id.toString() === filters.metodo_pago_id
        );
      }

      if (filters.fecha_desde) {
        filteredSales = filteredSales.filter(sale => 
          new Date(sale.fecha) >= new Date(filters.fecha_desde)
        );
      }

      if (filters.fecha_hasta) {
        filteredSales = filteredSales.filter(sale => 
          new Date(sale.fecha) <= new Date(filters.fecha_hasta + 'T23:59:59')
        );
      }

      // Ordenamiento
      filteredSales.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (sortConfig.key === 'fecha') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        }

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });

      // Paginación
      const totalItems = filteredSales.length;
      const totalPages = Math.ceil(totalItems / pagination.itemsPerPage);
      const start = (pagination.currentPage - 1) * pagination.itemsPerPage;
      const paginatedSales = filteredSales.slice(start, start + pagination.itemsPerPage);

      setSales(paginatedSales);
      setPagination(prev => ({
        ...prev,
        totalItems,
        totalPages
      }));
    } catch (err) {
      setError('Error al cargar las ventas');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handlePageChange = (page) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
  };

  const refetch = () => {
    fetchSales();
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      estado: '',
      metodo_pago_id: '',
      fecha_desde: '',
      fecha_hasta: ''
    });
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const updateSaleStatus = (ventaId, newStatus) => {
    setSales(prevSales =>
      prevSales.map(sale =>
        sale.venta_id === ventaId
          ? { ...sale, estado: newStatus }
          : sale
      )
    );
  };

  return {
    sales,
    isLoading,
    error,
    filters,
    pagination,
    sortConfig,
    handleFilterChange,
    handleSort,
    handlePageChange,
    refetch,
    resetFilters,
    updateSaleStatus
  };
};
