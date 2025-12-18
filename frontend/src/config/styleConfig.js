/**
 * Clases de estilos comunes y reutilizables
 * Centraliza todas las clases de Tailwind que se usan frecuentemente
 */

// Clases de texto
export const TEXT_STYLES = {
  title: 'text-2xl font-bold text-gray-900 dark:text-white',
  subtitle: 'text-sm text-gray-500 dark:text-slate-400',
  heading: 'text-lg font-semibold text-gray-900 dark:text-white',
  body: 'text-sm text-gray-600 dark:text-slate-300',
  label: 'text-sm font-medium text-gray-700 dark:text-slate-300',
  error: 'text-red-600 dark:text-red-400',
  success: 'text-green-600 dark:text-green-400',
  muted: 'text-gray-500 dark:text-slate-400'
};

// Clases de contenedores
export const CONTAINER_STYLES = {
  card: 'bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700',
  cardPadding: 'p-6',
  section: 'space-y-4',
  grid2: 'grid grid-cols-2 gap-4',
  flex: 'flex items-center gap-3',
  flexCenter: 'flex items-center justify-center gap-2'
};

// Clases de bordes y divisores
export const BORDER_STYLES = {
  divider: 'border-b border-gray-200 dark:border-slate-700',
  rounded: 'rounded-lg',
  roundedFull: 'rounded-full',
  roundedXl: 'rounded-xl'
};

// Clases de iconos
export const ICON_STYLES = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-8 w-8',
  container: 'p-2 rounded-lg',
  containerLg: 'p-4 rounded-xl'
};

// Clases de hover y transiciones
export const INTERACTIVE_STYLES = {
  hover: 'hover:bg-gray-50 dark:hover:bg-slate-700/30',
  transition: 'transition-colors',
  clickable: 'cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700'
};

// Clases de tablas
export const TABLE_STYLES = {
  header: 'font-semibold text-gray-700 dark:text-slate-300',
  cell: 'text-gray-900 dark:text-white',
  row: 'transition-colors border-slate-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/30',
  centerAlign: 'text-center'
};

// Colores de badges/estadísticas
export const STAT_COLORS = {
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    text: 'text-blue-700 dark:text-blue-400',
    icon: 'text-blue-600'
  },
  green: {
    bg: 'bg-green-50 dark:bg-green-900/20',
    text: 'text-green-700 dark:text-green-400',
    icon: 'text-green-600'
  },
  orange: {
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    text: 'text-orange-700 dark:text-orange-400',
    icon: 'text-orange-600'
  },
  purple: {
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    text: 'text-purple-700 dark:text-purple-400',
    icon: 'text-purple-600'
  },
  red: {
    bg: 'bg-red-50 dark:bg-red-900/20',
    text: 'text-red-700 dark:text-red-400',
    icon: 'text-red-600'
  }
};
