import { useState, useEffect } from 'react';

export const useSalesManagement = () => {
  // State para ventas
  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // State para carrito de POS
  const [cart, setCart] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('1'); // 1=Efectivo

  // Filtros para historial
  const [filters, setFilters] = useState({
    search: '',
    estado: '',
    metodo_pago_id: '',
    fecha_desde: '',
    fecha_hasta: ''
  });

  // Paginación
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0,
    totalPages: 0
  });

  // Ordenamiento
  const [sortConfig, setSortConfig] = useState({
    key: 'fecha',
    direction: 'desc'
  });

  // Mock data - Productos disponibles
  const mockProducts = [
    { 
      producto_id: 1, 
      nombre: 'Café Colombiano Premium', 
      precio: 8500, 
      stock: 45,
      categoria: 'Bebidas',
      estado: 'activo'
    },
    { 
      producto_id: 2, 
      nombre: 'Hamburguesa Especial', 
      precio: 25000, 
      stock: 30,
      categoria: 'Comida',
      estado: 'activo'
    },
    { 
      producto_id: 3, 
      nombre: 'Pizza Margarita', 
      precio: 35000, 
      stock: 20,
      categoria: 'Comida',
      estado: 'activo'
    },
    { 
      producto_id: 4, 
      nombre: 'Jugo Natural de Naranja', 
      precio: 6000, 
      stock: 60,
      categoria: 'Bebidas',
      estado: 'activo'
    },
    { 
      producto_id: 5, 
      nombre: 'Ensalada César', 
      precio: 18000, 
      stock: 25,
      categoria: 'Comida',
      estado: 'activo'
    },
    { 
      producto_id: 6, 
      nombre: 'Té Helado', 
      precio: 5500, 
      stock: 50,
      categoria: 'Bebidas',
      estado: 'activo'
    }
  ];

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

  // Cargar productos disponibles
  useEffect(() => {
    setProducts(mockProducts);
  }, []);

  // Cargar ventas y aplicar filtros
  useEffect(() => {
    setIsLoading(true);
    
    // Simular API call
    setTimeout(() => {
      let filteredSales = [...mockSales];

      // Aplicar filtros
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredSales = filteredSales.filter(sale =>
          sale.venta_id.toString().includes(searchLower) ||
          sale.usuario.toLowerCase().includes(searchLower) ||
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

      // Aplicar ordenamiento
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
      const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
      const endIndex = startIndex + pagination.itemsPerPage;
      const paginatedSales = filteredSales.slice(startIndex, endIndex);

      setSales(paginatedSales);
      setPagination(prev => ({
        ...prev,
        totalItems,
        totalPages
      }));
      setIsLoading(false);
    }, 500);
  }, [filters, sortConfig, pagination.currentPage, pagination.itemsPerPage]);

  // Funciones de búsqueda y filtros
  const handleSearch = (value) => {
    setFilters(prev => ({ ...prev, search: value }));
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
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

  // Funciones del carrito POS
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.producto_id === product.producto_id);
    
    if (existingItem) {
      // Verificar stock
      if (existingItem.cantidad >= product.stock) {
        setError(`Stock insuficiente para ${product.nombre}`);
        return;
      }
      
      setCart(cart.map(item =>
        item.producto_id === product.producto_id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      ));
    } else {
      setCart([...cart, {
        producto_id: product.producto_id,
        nombre: product.nombre,
        precio: product.precio,
        cantidad: 1,
        stock: product.stock
      }]);
    }
    
    setError(null);
  };

  const removeFromCart = (producto_id) => {
    setCart(cart.filter(item => item.producto_id !== producto_id));
  };

  const updateCartQuantity = (producto_id, cantidad) => {
    if (cantidad <= 0) {
      removeFromCart(producto_id);
      return;
    }

    const item = cart.find(item => item.producto_id === producto_id);
    if (item && cantidad > item.stock) {
      setError(`Stock insuficiente. Disponible: ${item.stock}`);
      return;
    }

    setCart(cart.map(item =>
      item.producto_id === producto_id
        ? { ...item, cantidad }
        : item
    ));
    
    setError(null);
  };

  const clearCart = () => {
    setCart([]);
    setError(null);
  };

  // Calcular totales
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  const cartTotal = cartSubtotal; // Aquí se pueden agregar impuestos o descuentos

  // Completar venta
  const completeSale = async () => {
    if (cart.length === 0) {
      setError('El carrito está vacío');
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      // TODO: Reemplazar con llamada real a la API
      // const response = await fetch('/api/ventas', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     items: cart,
      //     metodo_pago_id: selectedPaymentMethod,
      //     total: cartTotal
      //   })
      // });

      // Simular API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simular respuesta exitosa
      console.log('Venta completada:', {
        items: cart,
        metodo_pago_id: selectedPaymentMethod,
        total: cartTotal
      });

      clearCart();
      setIsLoading(false);
      return true;
    } catch (err) {
      setError('Error al completar la venta');
      setIsLoading(false);
      return false;
    }
  };

  // Anular venta
  const cancelSale = async (venta_id) => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Reemplazar con llamada real a la API
      // await fetch(`/api/ventas/${venta_id}/anular`, { method: 'PUT' });

      // Simular API call
      await new Promise(resolve => setTimeout(resolve, 500));

      // Actualizar estado local
      setSales(sales.map(sale =>
        sale.venta_id === venta_id
          ? { ...sale, estado: 'anulada' }
          : sale
      ));

      setIsLoading(false);
      return true;
    } catch (err) {
      setError('Error al anular la venta');
      setIsLoading(false);
      return false;
    }
  };

  const refreshSales = () => {
    setFilters({
      search: '',
      estado: '',
      metodo_pago_id: '',
      fecha_desde: '',
      fecha_hasta: ''
    });
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  return {
    // State
    sales,
    products,
    cart,
    selectedPaymentMethod,
    isLoading,
    error,
    filters,
    pagination,
    sortConfig,
    cartSubtotal,
    cartTotal,
    
    // Funciones de búsqueda y filtros
    handleSearch,
    handleFilterChange,
    handleSort,
    handlePageChange,
    
    // Funciones del carrito
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    setSelectedPaymentMethod,
    
    // Funciones de ventas
    completeSale,
    cancelSale,
    refreshSales
  };
};
