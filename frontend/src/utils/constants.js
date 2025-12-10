// Estados de productos
export const PRODUCT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
};

// Roles de usuario
export const USER_ROLES = {
  ADMIN: 1,
  CASHIER: 2,
  WAITER: 3,
};

export const USER_ROLE_NAMES = {
  [USER_ROLES.ADMIN]: 'Administrador',
  [USER_ROLES.CASHIER]: 'Cajero',
  [USER_ROLES.WAITER]: 'Mesero',
};

// Estados de venta
export const SALE_STATUS = {
  pendiente: 'Pendiente',
  completada: 'Completada',
  anulada: 'Anulada',
};

// Métodos de pago
export const PAYMENT_METHODS = {
  '1': 'Efectivo',
  '2': 'Tarjeta',
  '3': 'Transferencia',
};

// Paginación
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_ITEMS_PER_PAGE: 10,
  ITEMS_PER_PAGE_OPTIONS: [10, 25, 50, 100],
};

// Colores de iconos para estadísticas
export const STAT_COLORS = {
  GREEN: {
    bg: 'bg-green-100',
    text: 'text-green-600',
  },
  BLUE: {
    bg: 'bg-blue-100',
    text: 'text-blue-600',
  },
  LIME: {
    bg: 'bg-lime-100',
    text: 'text-lime-600',
  },
  ORANGE: {
    bg: 'bg-orange-100',
    text: 'text-orange-600',
  },
  PURPLE: {
    bg: 'bg-purple-100',
    text: 'text-purple-600',
  },
  RED: {
    bg: 'bg-red-100',
    text: 'text-red-600',
  },
};

// Mensajes comunes
export const MESSAGES = {
  ERROR: {
    GENERIC: 'Ocurrió un error. Por favor, intenta nuevamente.',
    NETWORK: 'Error de conexión. Verifica tu internet.',
    NOT_FOUND: 'No se encontró el recurso solicitado.',
    UNAUTHORIZED: 'No tienes autorización para realizar esta acción.',
  },
  SUCCESS: {
    CREATED: 'Creado exitosamente',
    UPDATED: 'Actualizado exitosamente',
    DELETED: 'Eliminado exitosamente',
  },
};
