import { formatCurrency } from '@/utils/format';

/**
 * Configuración de estados para diferentes entidades
 */
export const STATUS_CONFIGS = {
  // Estados de caja registradora
  cashRegister: {
    abierta: { variant: 'success', label: 'Abierta' },
    cerrada: { variant: 'default', label: 'Cerrada' }
  },
  
  // Estados generales (activo/inactivo)
  general: {
    active: { variant: 'success', label: 'Activo' },
    inactive: { variant: 'default', label: 'Inactivo' },
    activo: { variant: 'success', label: 'Activo' },
    inactivo: { variant: 'default', label: 'Inactivo' }
  },
  
  // Estados de pedido/orden
  order: {
    pending: { variant: 'warning', label: 'Pendiente' },
    completed: { variant: 'success', label: 'Completado' },
    cancelled: { variant: 'error', label: 'Cancelado' },
    pendiente: { variant: 'warning', label: 'Pendiente' },
    completado: { variant: 'success', label: 'Completado' },
    cancelado: { variant: 'error', label: 'Cancelado' }
  },

  // Estados de venta
  sale: {
    completed: { variant: 'success', label: 'Completada' },
    pending: { variant: 'warning', label: 'Pendiente' },
    cancelled: { variant: 'error', label: 'Cancelada' },
    completada: { variant: 'success', label: 'Completada' },
    pendiente: { variant: 'warning', label: 'Pendiente' },
    cancelada: { variant: 'error', label: 'Cancelada' }
  },

  // Estados de categoría (boolean)
  category: {
    true: { variant: 'success', label: 'Activa' },
    false: { variant: 'error', label: 'Inactiva' }
  }
};

/**
 * Obtiene la configuración del badge para una diferencia de caja
 * @param {number} diferencia - Diferencia calculada
 * @returns {object} Configuración del badge {amount, variant, prefix}
 */
export const getDifferenceBadge = (diferencia) => {
  if (diferencia === null || diferencia === undefined) {
    return { amount: 'N/A', variant: 'default' };
  }

  if (diferencia === 0) {
    return { amount: 'Exacto', variant: 'success' };
  }

  if (diferencia > 0) {
    return { amount: formatCurrency(diferencia), variant: 'success', prefix: '+' };
  }

  return { amount: formatCurrency(diferencia), variant: 'error' };
};

/**
 * Configuración de tipos de transacción
 */
export const TRANSACTION_TYPES = {
  ingreso: { 
    variant: 'info', 
    label: 'Ingreso',
    color: 'text-blue-600'
  },
  egreso: { 
    variant: 'warning', 
    label: 'Egreso',
    color: 'text-orange-600'
  }
};
