import { useState, useEffect } from 'react';

export const useOrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [tables, setTables] = useState([]);
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
    mesa: ''
  });
  const [sortConfig, setSortConfig] = useState({
    key: 'created_at',
    direction: 'desc',
  });

  // Mock data - Productos disponibles
  const mockProducts = [
    { id: 1, nombre: 'Café Colombiano Premium', precio: 8500, categoria: 'Bebidas', stock: 45 },
    { id: 2, nombre: 'Hamburguesa Especial', precio: 25000, categoria: 'Comida', stock: 30 },
    { id: 3, nombre: 'Pizza Margarita', precio: 35000, categoria: 'Comida', stock: 20 },
    { id: 4, nombre: 'Jugo Natural de Naranja', precio: 6000, categoria: 'Bebidas', stock: 60 },
    { id: 5, nombre: 'Ensalada César', precio: 18000, categoria: 'Comida', stock: 25 },
    { id: 6, nombre: 'Té Helado', precio: 5500, categoria: 'Bebidas', stock: 50 },
    { id: 7, nombre: 'Pasta Carbonara', precio: 28000, categoria: 'Comida', stock: 20 },
    { id: 8, nombre: 'Brownie con Helado', precio: 15000, categoria: 'Postres', stock: 35 }
  ];

  // Mock data - Mesas disponibles
  const mockTables = [
    { id: 1, numero: '1', capacidad: 4, ubicacion: 'Interior', estado: 'disponible' },
    { id: 2, numero: '2', capacidad: 2, ubicacion: 'Interior', estado: 'ocupada' },
    { id: 3, numero: '3', capacidad: 6, ubicacion: 'Terraza', estado: 'disponible' },
    { id: 4, numero: '4', capacidad: 4, ubicacion: 'Interior', estado: 'ocupada' },
    { id: 5, numero: '5', capacidad: 8, ubicacion: 'Terraza', estado: 'disponible' },
    { id: 6, numero: '6', capacidad: 2, ubicacion: 'Interior', estado: 'disponible' },
    { id: 7, numero: '7', capacidad: 4, ubicacion: 'Terraza', estado: 'ocupada' },
    { id: 8, numero: '8', capacidad: 6, ubicacion: 'Interior', estado: 'disponible' }
  ];

  // Mock data - Pedidos
  const mockOrders = [
    {
      id: 1,
      mesa_id: 2,
      mesa_numero: '2',
      mesero: 'Carlos Ramírez',
      estado: 'pendiente',
      items: [
        { producto_id: 1, producto: 'Café Colombiano Premium', cantidad: 2, precio: 8500, subtotal: 17000 },
        { producto_id: 2, producto: 'Hamburguesa Especial', cantidad: 1, precio: 25000, subtotal: 25000 }
      ],
      total: 42000,
      notas: 'Sin cebolla en la hamburguesa',
      created_at: '2024-12-13T10:30:00',
      updated_at: '2024-12-13T10:30:00'
    },
    {
      id: 2,
      mesa_id: 4,
      mesa_numero: '4',
      mesero: 'Ana Torres',
      estado: 'en_preparacion',
      items: [
        { producto_id: 3, producto: 'Pizza Margarita', cantidad: 1, precio: 35000, subtotal: 35000 },
        { producto_id: 4, producto: 'Jugo Natural de Naranja', cantidad: 2, precio: 6000, subtotal: 12000 }
      ],
      total: 47000,
      notas: '',
      created_at: '2024-12-13T11:15:00',
      updated_at: '2024-12-13T11:20:00'
    },
    {
      id: 3,
      mesa_id: 7,
      mesa_numero: '7',
      mesero: 'Luis Martínez',
      estado: 'entregado',
      items: [
        { producto_id: 5, producto: 'Ensalada César', cantidad: 2, precio: 18000, subtotal: 36000 },
        { producto_id: 6, producto: 'Té Helado', cantidad: 2, precio: 5500, subtotal: 11000 }
      ],
      total: 47000,
      notas: 'Aderezo aparte',
      created_at: '2024-12-13T12:00:00',
      updated_at: '2024-12-13T12:30:00'
    },
    {
      id: 4,
      mesa_id: 4,
      mesa_numero: '4',
      mesero: 'Ana Torres',
      estado: 'pagado',
      items: [
        { producto_id: 7, producto: 'Pasta Carbonara', cantidad: 1, precio: 28000, subtotal: 28000 },
        { producto_id: 8, producto: 'Brownie con Helado', cantidad: 1, precio: 15000, subtotal: 15000 }
      ],
      total: 43000,
      notas: '',
      created_at: '2024-12-13T13:00:00',
      updated_at: '2024-12-13T13:45:00'
    },
    {
      id: 5,
      mesa_id: 2,
      mesa_numero: '2',
      mesero: 'Sofía Rodríguez',
      estado: 'pendiente',
      items: [
        { producto_id: 2, producto: 'Hamburguesa Especial', cantidad: 2, precio: 25000, subtotal: 50000 },
        { producto_id: 1, producto: 'Café Colombiano Premium', cantidad: 2, precio: 8500, subtotal: 17000 }
      ],
      total: 67000,
      notas: 'Término medio las hamburguesas',
      created_at: '2024-12-13T14:15:00',
      updated_at: '2024-12-13T14:15:00'
    }
  ];

  useEffect(() => {
    setProducts(mockProducts);
    setTables(mockTables);
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [pagination.currentPage, filters, sortConfig]);

  const fetchOrders = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Reemplazar con llamada real a la API
      await new Promise(resolve => setTimeout(resolve, 500));

      let filteredOrders = [...mockOrders];

      // Aplicar filtros
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredOrders = filteredOrders.filter(order =>
          order.id.toString().includes(searchLower) ||
          order.mesa_numero.includes(searchLower) ||
          order.mesero.toLowerCase().includes(searchLower) ||
          order.items.some(item => item.producto.toLowerCase().includes(searchLower))
        );
      }

      if (filters.estado) {
        filteredOrders = filteredOrders.filter(order => order.estado === filters.estado);
      }

      if (filters.mesa) {
        filteredOrders = filteredOrders.filter(order => order.mesa_id.toString() === filters.mesa);
      }

      // Ordenamiento
      filteredOrders.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (sortConfig.key === 'created_at' || sortConfig.key === 'updated_at') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        }

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });

      // Paginación
      const totalItems = filteredOrders.length;
      const totalPages = Math.ceil(totalItems / pagination.itemsPerPage);
      const start = (pagination.currentPage - 1) * pagination.itemsPerPage;
      const paginatedOrders = filteredOrders.slice(start, start + pagination.itemsPerPage);

      setOrders(paginatedOrders);
      setPagination(prev => ({
        ...prev,
        totalItems,
        totalPages
      }));
    } catch (err) {
      setError('Error al cargar los pedidos');
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
    fetchOrders();
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId
          ? { ...order, estado: newStatus, updated_at: new Date().toISOString() }
          : order
      )
    );
  };

  return {
    orders,
    products,
    tables,
    isLoading,
    error,
    filters,
    pagination,
    sortConfig,
    handleFilterChange,
    handleSort,
    handlePageChange,
    refetch,
    updateOrderStatus
  };
};
