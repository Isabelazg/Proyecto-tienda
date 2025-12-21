import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

/**
 * Componente de tarjeta de estadística reutilizable
 * @param {string} title - Título de la estadística
 * @param {string|number} value - Valor de la estadística
 * @param {React.Component} icon - Icono a mostrar
 * @param {string} trend - Tendencia ('up' o 'down')
 * @param {string} trendValue - Valor de la tendencia
 * @param {string} iconColor - Color del icono
 * @param {string} iconBg - Color de fondo del icono
 * @param {boolean} isLoading - Estado de carga
 * @param {string} className - Clases CSS adicionales
 */
const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
  trendValue,
  iconColor = 'text-lime-600',
  iconBg = 'bg-lime-100',
  isLoading = false,
  className,
}) => {
  const isPositiveTrend = trend === 'up';

  return (
    <Card className={cn('hover:shadow-md transition-shadow', className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
            {isLoading ? (
              <div className="h-8 bg-gray-200 rounded animate-pulse w-24"></div>
            ) : (
              <p className="text-3xl font-bold text-gray-900">{value}</p>
            )}
            {trendValue && (
              <div className="flex items-center mt-2">
                {isPositiveTrend ? (
                  <ArrowUpRight className="h-4 w-4 text-green-600" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-600" />
                )}
                <span
                  className={cn(
                    'text-sm font-medium ml-1',
                    isPositiveTrend ? 'text-green-600' : 'text-red-600'
                  )}
                >
                  {trendValue}
                </span>
              </div>
            )}
          </div>
          {Icon && (
            <div className={cn('p-3 rounded-full', iconBg)}>
              <Icon className={cn('h-6 w-6', iconColor)} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
