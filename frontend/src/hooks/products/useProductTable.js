import { useState, useEffect } from 'react';

export const useProductTable = () => {
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
      let filteredProducts = [...mockProducts];

      // Filtro de búsqueda
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredProducts = filteredProducts.filter(product =>
          product.nombre.toLowerCase().includes(searchLower) ||
          product.descripcion.toLowerCase().includes(searchLower)
        );
      }

      // Filtro de categoría
      if (filters.category) {
        filteredProducts = filteredProducts.filter(product =>
          product.categoria_id === parseInt(filters.category)
        );
      }

      // Filtro de estado
      if (filters.status !== 'all') {
        filteredProducts = filteredProducts.filter(product =>
          filters.status === 'active' ? product.estado : !product.estado
        );
      }

      // Ordenamiento
      filteredProducts.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (sortConfig.key === 'precio' || sortConfig.key === 'stock') {
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
      const paginatedProducts = filteredProducts.slice(startIndex, startIndex + pagination.itemsPerPage);

      setProducts(paginatedProducts);
      setPagination({
        ...pagination,
        totalPages: Math.ceil(filteredProducts.length / pagination.itemsPerPage),
        totalItems: filteredProducts.length,
      });
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

  const toggleProductStatus = async (productId) => {
    try {
      // TODO: Reemplazar con llamada real a la API
      await new Promise(resolve => setTimeout(resolve, 300));

      console.log('Toggling product status:', productId);
      await fetchProducts();

      return { success: true, message: 'Estado actualizado exitosamente' };
    } catch (err) {
      console.error('Error toggling product status:', err);
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
    toggleProductStatus,
    refetch: fetchProducts
  };
};
