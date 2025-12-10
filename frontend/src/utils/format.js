/**
 * Formatea un número a moneda colombiana (COP)
 * @param {number} amount - El monto a formatear
 * @returns {string} - El monto formateado
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(amount);
};

/**
 * Formatea una fecha
 * @param {string|Date} date - La fecha a formatear
 * @param {object} options - Opciones de formateo
 * @returns {string} - La fecha formateada
 */
export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options,
  };

  return new Intl.DateTimeFormat('es-CO', defaultOptions).format(new Date(date));
};

/**
 * Formatea una fecha con hora
 * @param {string|Date} date - La fecha a formatear
 * @returns {string} - La fecha y hora formateada
 */
export const formatDateTime = (date) => {
  return new Intl.DateTimeFormat('es-CO', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
};

/**
 * Formatea un número con separadores de miles
 * @param {number} number - El número a formatear
 * @returns {string} - El número formateado
 */
export const formatNumber = (number) => {
  return new Intl.NumberFormat('es-CO').format(number);
};

/**
 * Trunca un texto a una longitud específica
 * @param {string} text - El texto a truncar
 * @param {number} maxLength - La longitud máxima
 * @returns {string} - El texto truncado
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Capitaliza la primera letra de un string
 * @param {string} str - El string a capitalizar
 * @returns {string} - El string capitalizado
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Formatea un porcentaje
 * @param {number} value - El valor a formatear
 * @param {number} decimals - Cantidad de decimales
 * @returns {string} - El porcentaje formateado
 */
export const formatPercentage = (value, decimals = 0) => {
  return `${value.toFixed(decimals)}%`;
};
