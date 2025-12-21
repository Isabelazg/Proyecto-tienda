import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, 
  ShoppingCart, 
  Package, 
  DollarSign,
  Clock,
  Users
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar/Navbar';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/common';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/Alert';
import { Badge } from '@/components/ui/Badge';
import { useDashboard } from '@/hooks/dashboard/useDashboard';
import { formatCurrency, formatDate } from '@/utils/format';
import { STAT_COLORS } from '@/utils/constants';

const DashboardForm = () => {
  const navigate = useNavigate();
  const { stats, recentSales, topProducts, isLoading, error, refreshData } = useDashboard();

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <Alert variant="error" className="max-w-md mx-auto">
            <AlertTitle>Error al cargar datos</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
            <Button onClick={refreshData} className="mt-4">Reintentar</Button>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Resumen de tu tienda</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Ventas Hoy"
            value={formatCurrency(stats.totalVentasHoy)}
            icon={DollarSign}
            trend="up"
            trendValue="+12.5% vs ayer"
            iconColor={STAT_COLORS.GREEN.text}
            iconBg={STAT_COLORS.GREEN.bg}
            isLoading={isLoading}
          />

          <StatCard
            title="Ventas del Mes"
            value={formatCurrency(stats.totalVentasMes)}
            icon={TrendingUp}
            trend="up"
            trendValue="+8.3% vs mes anterior"
            iconColor={STAT_COLORS.BLUE.text}
            iconBg={STAT_COLORS.BLUE.bg}
            isLoading={isLoading}
          />

          <StatCard
            title="Productos Vendidos Hoy"
            value={stats.productosVendidosHoy}
            icon={Package}
            trend="up"
            trendValue="+15.2% vs ayer"
            iconColor={STAT_COLORS.LIME.text}
            iconBg={STAT_COLORS.LIME.bg}
            isLoading={isLoading}
          />

          <StatCard
            title="Ventas Pendientes"
            value={stats.ventasPendientes}
            icon={Clock}
            trend="down"
            trendValue="2 por completar"
            iconColor={STAT_COLORS.ORANGE.text}
            iconBg={STAT_COLORS.ORANGE.bg}
            isLoading={isLoading}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Sales */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Ventas Recientes</CardTitle>
                <Button
                  variant="ghost"
                  onClick={() => navigate('/ventas')}
                  className="text-lime-600 hover:text-lime-700"
                >
                  Ver todas
                </Button>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-20 bg-gray-200 rounded"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentSales.map((sale) => (
                      <div
                        key={sale.id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-lime-100 rounded-lg">
                            <ShoppingCart className="h-5 w-5 text-lime-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">Venta #{sale.id}</p>
                            <p className="text-sm text-gray-600">{sale.usuario}</p>
                          <p className="text-xs text-gray-500">{formatDate(sale.fecha)}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">{formatCurrency(sale.total)}</p>
                        <Badge variant="default">{sale.metodo_pago}</Badge>
                        <p className="text-xs text-gray-500 mt-1">{sale.items} items</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              </CardContent>
            </Card>
          </div>

          {/* Top Products */}
          <div>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Top Productos</CardTitle>
                <Button
                  variant="ghost"
                  onClick={() => navigate('/productos')}
                  className="text-lime-600 hover:text-lime-700"
                >
                  Ver todos
                </Button>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-16 bg-gray-200 rounded"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {topProducts.map((product, index) => (
                      <div
                        key={product.id}
                        className="flex items-center space-x-4 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex-shrink-0">
                          <Badge variant="lime" className="w-8 h-8 rounded-full flex items-center justify-center text-base font-bold">
                            {index + 1}
                          </Badge>
                        </div>
                      <img
                        src={product.imagen}
                        alt={product.nombre}
                        className="w-12 h-12 rounded-lg object-cover"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/80x80?text=Producto';
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 text-sm truncate">
                          {product.nombre}
                        </p>
                        <p className="text-xs text-gray-600">
                          {product.cantidad} vendidos
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-gray-900">
                          {formatCurrency(product.total)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-gradient-to-br from-lime-500 to-green-600 rounded-xl shadow-lg p-8">
          <div className="text-center text-white mb-6">
            <h2 className="text-2xl font-bold mb-2">Acciones Rápidas</h2>
            <p className="text-lime-50">Gestiona tu tienda de forma eficiente</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button
              onClick={() => navigate('/ventas/nueva')}
              className="bg-white text-lime-600 hover:bg-gray-100 h-14"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Nueva Venta
            </Button>
            <Button
              onClick={() => navigate('/productos')}
              className="bg-white text-lime-600 hover:bg-gray-100 h-14"
            >
              <Package className="h-5 w-5 mr-2" />
              Gestionar Productos
            </Button>
            <Button
              onClick={() => navigate('/usuarios')}
              className="bg-white text-lime-600 hover:bg-gray-100 h-14"
            >
              <Users className="h-5 w-5 mr-2" />
              Gestionar Usuarios
            </Button>
            <Button
              onClick={() => navigate('/reportes')}
              className="bg-white text-lime-600 hover:bg-gray-100 h-14"
            >
              <TrendingUp className="h-5 w-5 mr-2" />
              Ver Reportes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardForm;
