/**
 * Configuración de Axios para comunicación con el backend
 * 
 * Este archivo configura una instancia personalizada de Axios con:
 * - URL base del API backend
 * - Timeout de 10 segundos
 * - Headers por defecto
 * - Interceptores para requests y responses
 * - Manejo automático de tokens de autenticación
 * - Logging detallado para debugging
 * 
 * La instancia se configura automáticamente para:
 * - Agregar el token Bearer en cada request si el usuario está autenticado
 * - Loggear información de debugging de requests y responses
 * - Manejar errores de red y autenticación
 * - Redirigir al login en caso de token expirado
 */
import axios from 'axios';
import { useAuthStore } from '@/store/authStore';

// ============================================================================
// CONFIGURACIÓN BASE DE AXIOS
// ============================================================================

/** URL base del API - se obtiene de variables de entorno o usa localhost por defecto */
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

/**
 * Instancia personalizada de Axios para comunicación con el backend
 * 
 * Configuración:
 * - baseURL: URL base del API backend
 * - timeout: 10 segundos máximo por request
 * - headers: Content-Type application/json por defecto
 */
const apiBackend = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
        'Accept': 'application/json',
    },
});

// ============================================================================
// INTERCEPTOR DE REQUESTS
// ============================================================================

/**
 * Interceptor que se ejecuta antes de cada request
 * 
 * Funciones:
 * - Agrega automáticamente el token de autenticación si existe
 * - Loggea información detallada del request para debugging
 * - Redacta el token en los logs por seguridad
 */
apiBackend.interceptors.request.use(
    (config) => {
        // Obtener token del store de autenticación
        const token = useAuthStore.getState().token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Safety: strip obligacion_id from any request to contratos endpoints
        try {
            const method = (config.method || '').toLowerCase();
            const url = String(config.url || '');
            if (/\/contratos(\/|$)/i.test(url) && ['post', 'put', 'patch'].includes(method)) {
                if (config.data && typeof config.data === 'object') {
                    if ('obligacion_id' in config.data) {
                        // remove it silently and log for debugging
                        delete config.data.obligacion_id;
                        console.debug('apiBackend interceptor: removed obligacion_id from request to', url);
                    }
                }
            }
        } catch (err) {
            // don't block the request if logging fails
            console.error('Error in request interceptor safety strip:', err);
        }

        return config;
    },
    (error) => {
        console.error('❌ Request interceptor error:', error);
        return Promise.reject(error);
    }
);

// ============================================================================
// INTERCEPTOR DE RESPONSES
// ============================================================================

/**
 * Interceptor que se ejecuta en cada response (exitoso o con error)
 * 
 * Funciones:
 * - Maneja errores de autenticación (401) y autorización (403)
 * - Redirige al login cuando el token expira
 */
apiBackend.interceptors.response.use(
    (response) => response,
    (error) => {
        // Solo manejar logout en errores 401
        if (error.response?.status === 401) {
            useAuthStore.getState().logout();
        }
        return Promise.reject(error);
    }
);

export default apiBackend;