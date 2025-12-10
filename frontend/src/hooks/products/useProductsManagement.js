import { useState, useEffect } from 'react';

export const useProductsManagement = () => {
  const [products, setProducts] = useState([]);
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
    category: '',
    status: 'all', // all, active, inactive
  });
  const [sortConfig, setSortConfig] = useState({
    key: 'nombre',
    direction: 'asc',
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [pagination.currentPage, filters, sortConfig]);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Reemplazar con llamada real a la API
      await new Promise(resolve => setTimeout(resolve, 500));

      // Datos mock - estructura basada en la BD
      const mockProducts = [
        {
          id: 1,
          nombre: 'Café Colombiano Premium',
          descripcion: 'Café de origen colombiano, tostado medio',
          precio: 25000,
          stock: 50,
          categoria_id: 1,
          categoria_nombre: 'Bebidas',
          imagen: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400',
          estado: true,
          created_at: '2024-01-15',
        },
        {
          id: 2,
          nombre: 'Hamburguesa Clásica',
          descripcion: 'Hamburguesa de carne con queso, lechuga y tomate',
          precio: 18000,
          stock: 0,
          categoria_id: 2,
          categoria_nombre: 'Comida',
          imagen: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
          estado: true,
          created_at: '2024-01-20',
        },
        {
          id: 3,
          nombre: 'Pizza Margherita',
          descripcion: 'Pizza artesanal con tomate, mozzarella y albahaca',
          precio: 35000,
          stock: 25,
          categoria_id: 2,
          categoria_nombre: 'Comida',
          imagen: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400',
          estado: true,
          created_at: '2024-02-01',
        },
        {
          id: 4,
          nombre: 'Jugo Natural de Naranja',
          descripcion: 'Jugo recién exprimido de naranjas frescas',
          precio: 8000,
          stock: 100,
          categoria_id: 1,
          categoria_nombre: 'Bebidas',
          imagen: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400',
          estado: true,
          created_at: '2024-02-05',
        },
        {
          id: 5,
          nombre: 'Ensalada César',
          descripcion: 'Ensalada con pollo, lechuga romana, crutones y aderezo césar',
          precio: 22000,
          stock: 30,
          categoria_id: 2,
          categoria_nombre: 'Comida',
          imagen: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400',
          estado: true,
          created_at: '2024-02-10',
        },
        {
          id: 6,
          nombre: 'Té Helado',
          descripcion: 'Té frío con limón y hierbabuena',
          precio: 7000,
          stock: 45,
          categoria_id: 1,
          categoria_nombre: 'Bebidas',
          imagen: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400',
          estado: false,
          created_at: '2024-02-12',
        },
        {
          id: 7,
          nombre: 'Pasta Carbonara',
          descripcion: 'Pasta fresca con salsa carbonara y tocino',
          precio: 28000,
          stock: 20,
          categoria_id: 2,
          categoria_nombre: 'Comida',
          imagen: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400',
          estado: true,
          created_at: '2024-02-15',
        },
        {
          id: 8,
          nombre: 'Brownie con Helado',
          descripcion: 'Brownie de chocolate caliente con helado de vainilla',
          precio: 15000,
          stock: 35,
          categoria_id: 3,
          categoria_nombre: 'Postres',
          imagen: 'https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=400',
          estado: true,
          created_at: '2024-02-18',
        },
      ];

      // Aplicar filtros
      let filteredProducts = mockProducts.filter(product => {
        const matchesSearch = product.nombre.toLowerCase().includes(filters.search.toLowerCase()) ||
                            product.descripcion.toLowerCase().includes(filters.search.toLowerCase());
        const matchesCategory = !filters.category || product.categoria_id === parseInt(filters.category);
        const matchesStatus = filters.status === 'all' || 
                            (filters.status === 'active' && product.estado) ||
                            (filters.status === 'inactive' && !product.estado);
        
        return matchesSearch && matchesCategory && matchesStatus;
      });

      // Aplicar ordenamiento
      filteredProducts.sort((a, b) => {
        let aVal = a[sortConfig.key];
        let bVal = b[sortConfig.key];

        if (typeof aVal === 'string') {
          aVal = aVal.toLowerCase();
          bVal = bVal.toLowerCase();
        }

        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });

      // Paginación
      const totalItems = filteredProducts.length;
      const totalPages = Math.ceil(totalItems / pagination.itemsPerPage);
      const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
      const endIndex = startIndex + pagination.itemsPerPage;
      const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

      setProducts(paginatedProducts);
      setPagination(prev => ({
        ...prev,
        totalPages,
        totalItems,
      }));

    } catch (err) {
      setError('Error al cargar los productos');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      // TODO: Reemplazar con llamada real a la API
      const mockCategories = [
        { id: 1, nombre: 'Bebidas', descripcion: 'Bebidas calientes y frías' },
        { id: 2, nombre: 'Comida', descripcion: 'Platos principales y entradas' },
        { id: 3, nombre: 'Postres', descripcion: 'Postres y dulces' },
      ];
      setCategories(mockCategories);
    } catch (err) {
      console.error('Error al cargar categorías:', err);
    }
  };

  const handleSearch = (searchTerm) => {
    setFilters(prev => ({ ...prev, search: searchTerm }));
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handlePageChange = (page) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
  };

  const createProduct = async (productData) => {
    try {
      // TODO: Llamada a la API para crear producto
      console.log('Creando producto:', productData);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      await fetchProducts();
      return { success: true, message: 'Producto creado exitosamente' };
    } catch (err) {
      console.error('Error al crear producto:', err);
      return { success: false, message: 'Error al crear el producto' };
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      // TODO: Llamada a la API para actualizar producto
      console.log('Actualizando producto:', id, productData);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      await fetchProducts();
      return { success: true, message: 'Producto actualizado exitosamente' };
    } catch (err) {
      console.error('Error al actualizar producto:', err);
      return { success: false, message: 'Error al actualizar el producto' };
    }
  };

  const deleteProduct = async (id) => {
    try {
      // TODO: Llamada a la API para eliminar producto
      console.log('Eliminando producto:', id);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      await fetchProducts();
      return { success: true, message: 'Producto eliminado exitosamente' };
    } catch (err) {
      console.error('Error al eliminar producto:', err);
      return { success: false, message: 'Error al eliminar el producto' };
    }
  };

  const toggleProductStatus = async (id, currentStatus) => {
    try {
      // TODO: Llamada a la API para cambiar estado
      console.log('Cambiando estado del producto:', id, !currentStatus);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      await fetchProducts();
      return { success: true, message: 'Estado actualizado exitosamente' };
    } catch (err) {
      console.error('Error al cambiar estado:', err);
      return { success: false, message: 'Error al cambiar el estado' };
    }
  };

  return {
    products,
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
    createProduct,
    updateProduct,
    deleteProduct,
    toggleProductStatus,
    refreshProducts: fetchProducts,
  };
};
