import { 
  FolderTree, 
  Package, 
  Users, 
  UserCircle, 
  ShoppingCart,
  DollarSign,
  ClipboardList,
  Settings
} from 'lucide-react';

/**
 * Configuración de entidades del sistema
 * Define iconos, colores y estilos consistentes para cada tipo de entidad
 */
export const ENTITY_CONFIG = {
  category: {
    icon: FolderTree,
    iconBgColor: 'bg-lime-100 dark:bg-lime-900/20',
    iconColor: 'text-lime-600',
    name: 'Categoría',
    namePlural: 'Categorías'
  },
  product: {
    icon: Package,
    iconBgColor: 'bg-blue-100 dark:bg-blue-900/20',
    iconColor: 'text-blue-600',
    name: 'Producto',
    namePlural: 'Productos'
  },
  user: {
    icon: Users,
    iconBgColor: 'bg-purple-100 dark:bg-purple-900/20',
    iconColor: 'text-purple-600',
    name: 'Usuario',
    namePlural: 'Usuarios'
  },
  customer: {
    icon: UserCircle,
    iconBgColor: 'bg-cyan-100 dark:bg-cyan-900/20',
    iconColor: 'text-cyan-600',
    name: 'Cliente',
    namePlural: 'Clientes'
  },
  order: {
    icon: ClipboardList,
    iconBgColor: 'bg-orange-100 dark:bg-orange-900/20',
    iconColor: 'text-orange-600',
    name: 'Pedido',
    namePlural: 'Pedidos'
  },
  sale: {
    icon: DollarSign,
    iconBgColor: 'bg-green-100 dark:bg-green-900/20',
    iconColor: 'text-green-600',
    name: 'Venta',
    namePlural: 'Ventas'
  },
  cashRegister: {
    icon: DollarSign,
    iconBgColor: 'bg-emerald-100 dark:bg-emerald-900/20',
    iconColor: 'text-emerald-600',
    name: 'Caja',
    namePlural: 'Cajas'
  },
  role: {
    icon: Settings,
    iconBgColor: 'bg-indigo-100 dark:bg-indigo-900/20',
    iconColor: 'text-indigo-600',
    name: 'Rol',
    namePlural: 'Roles'
  }
};

/**
 * Obtiene la configuración de una entidad
 * @param {string} entityType - Tipo de entidad
 * @returns {Object} Configuración de la entidad
 */
export const getEntityConfig = (entityType) => {
  return ENTITY_CONFIG[entityType] || ENTITY_CONFIG.product;
};
