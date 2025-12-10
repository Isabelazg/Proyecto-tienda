import { useState, useEffect } from 'react';

export const useDashboard = () => {
  const [stats, setStats] = useState({
    totalVentasHoy: 0,
    totalVentasMes: 0,
    productosVendidosHoy: 0,
    ventasPendientes: 0
  });
  const [recentSales, setRecentSales] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      // TODO: Reemplazar con llamadas reales a la API
      await new Promise(resolve => setTimeout(resolve, 500));

      // Datos de ejemplo - estadísticas
      const mockStats = {
        totalVentasHoy: 2450000,
        totalVentasMes: 45800000,
        productosVendidosHoy: 45,
        ventasPendientes: 3
      };

      // Ventas recientes
      const mockRecentSales = [
        {
          id: 1,
          fecha: new Date().toISOString(),
          total: 250000,
          usuario: 'Juan Pérez',
          metodo_pago: 'Efectivo',
          items: 3
        },
        {
          id: 2,
          fecha: new Date(Date.now() - 3600000).toISOString(),
          total: 450000,
          usuario: 'María García',
          metodo_pago: 'Tarjeta',
          items: 5
        },
        {
          id: 3,
          fecha: new Date(Date.now() - 7200000).toISOString(),
          total: 180000,
          usuario: 'Carlos López',
          metodo_pago: 'Efectivo',
          items: 2
        },
        {
          id: 4,
          fecha: new Date(Date.now() - 10800000).toISOString(),
          total: 320000,
          usuario: 'Ana Martínez',
          metodo_pago: 'Transferencia',
          items: 4
        }
      ];

      // Productos más vendidos
      const mockTopProducts = [
        {
          id: 1,
          nombre: 'Laptop Dell Inspiron',
          cantidad: 12,
          total: 30000000,
          imagen: 'https://via.placeholder.com/80x80?text=Laptop'
        },
        {
          id: 2,
          nombre: 'iPhone 14 Pro',
          cantidad: 8,
          total: 38400000,
          imagen: 'https://via.placeholder.com/80x80?text=iPhone'
        },
        {
          id: 3,
          nombre: 'Audífonos Sony',
          cantidad: 15,
          total: 18000000,
          imagen: 'https://via.placeholder.com/80x80?text=Audifonos'
        },
        {
          id: 4,
          nombre: 'Smart TV Samsung',
          cantidad: 6,
          total: 19200000,
          imagen: 'https://via.placeholder.com/80x80?text=TV'
        },
        {
          id: 5,
          nombre: 'PlayStation 5',
          cantidad: 10,
          total: 28000000,
          imagen: 'https://via.placeholder.com/80x80?text=PS5'
        }
      ];

      setStats(mockStats);
      setRecentSales(mockRecentSales);
      setTopProducts(mockTopProducts);
      setError(null);
    } catch (err) {
      setError('Error al cargar los datos del dashboard');
      console.error('Error fetching dashboard data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    stats,
    recentSales,
    topProducts,
    isLoading,
    error,
    refreshData: fetchDashboardData
  };
};
