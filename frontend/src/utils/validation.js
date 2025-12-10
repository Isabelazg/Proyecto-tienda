/**
 * Valida un email
 * @param {string} email
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida un teléfono colombiano
 * @param {string} phone
 * @returns {boolean}
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^3\d{9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

/**
 * Valida que un string no esté vacío
 * @param {string} value
 * @returns {boolean}
 */
export const isNotEmpty = (value) => {
  return value && value.trim().length > 0;
};

/**
 * Valida que un número sea positivo
 * @param {number} value
 * @returns {boolean}
 */
export const isPositiveNumber = (value) => {
  return !isNaN(value) && Number(value) > 0;
};

/**
 * Valida que un número esté en un rango
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {boolean}
 */
export const isInRange = (value, min, max) => {
  const num = Number(value);
  return !isNaN(num) && num >= min && num <= max;
};

/**
 * Valida longitud mínima de string
 * @param {string} value
 * @param {number} minLength
 * @returns {boolean}
 */
export const hasMinLength = (value, minLength) => {
  return value && value.length >= minLength;
};

/**
 * Valida que dos valores sean iguales
 * @param {any} value1
 * @param {any} value2
 * @returns {boolean}
 */
export const areEqual = (value1, value2) => {
  return value1 === value2;
};

/**
 * Valida contraseña fuerte
 * @param {string} password
 * @returns {boolean}
 */
export const isStrongPassword = (password) => {
  // Al menos 8 caracteres, una mayúscula, una minúscula y un número
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
};

/**
 * Valida un precio
 * @param {number} price
 * @returns {boolean}
 */
export const isValidPrice = (price) => {
  return !isNaN(price) && Number(price) >= 0;
};

/**
 * Valida stock
 * @param {number} stock
 * @returns {boolean}
 */
export const isValidStock = (stock) => {
  return !isNaN(stock) && Number(stock) >= 0 && Number.isInteger(Number(stock));
};
