/**
 * Punto de entrada para todas las configuraciones del sistema
 * Centraliza exports de configuraciones de entidades, estilos y estados
 */

// Configuración de entidades (iconos, colores, nombres)
export { ENTITY_CONFIG, getEntityConfig } from './entityConfig';

// Configuración de estilos comunes (clases de Tailwind reutilizables)
export { 
  TEXT_STYLES, 
  CONTAINER_STYLES, 
  BORDER_STYLES, 
  ICON_STYLES, 
  INTERACTIVE_STYLES, 
  TABLE_STYLES,
  STAT_COLORS 
} from './styleConfig';

// Configuración de estados (status badges, diferencias, transacciones)
export { 
  STATUS_CONFIGS, 
  getDifferenceBadge, 
  TRANSACTION_TYPES 
} from './statusConfig';
