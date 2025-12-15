import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Store global de autenticación usando Zustand
 * 
 * Maneja:
 * - Estado de autenticación del usuario
 * - Información del usuario (perfil, rol, permisos)
 * - Token de autenticación
 * - Funciones de login/logout
 */

const useAuthStore = create(
  persist(
    (set, get) => ({
      // Estado
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      // Acciones
      /**
       * Establece el usuario autenticado y su token
       * @param {Object} user - Información del usuario
       * @param {string} token - Token de autenticación
       */
      setAuth: (user, token) => {
        set({
          user,
          token,
          isAuthenticated: true,
        });
      },

      /**
       * Actualiza la información del usuario
       * @param {Object} userData - Datos actualizados del usuario
       */
      updateUser: (userData) => {
        set((state) => ({
          user: { ...state.user, ...userData },
        }));
      },

      /**
       * Cierra la sesión del usuario
       */
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
        // Limpiar localStorage
        localStorage.removeItem('auth-storage');
      },

      /**
       * Verifica si el usuario tiene un rol específico
       * @param {string} role - Rol a verificar
       * @returns {boolean}
       */
      hasRole: (role) => {
        const { user } = get();
        return user?.role?.nombre === role;
      },

      /**
       * Verifica si el usuario tiene alguno de los roles especificados
       * @param {string[]} roles - Array de roles a verificar
       * @returns {boolean}
       */
      hasAnyRole: (roles) => {
        const { user } = get();
        return roles.includes(user?.role?.nombre);
      },

      /**
       * Verifica si el usuario tiene un permiso específico
       * @param {string} permission - Permiso a verificar
       * @returns {boolean}
       */
      hasPermission: (permission) => {
        const { user } = get();
        return user?.role?.permisos?.includes(permission) || false;
      },

      /**
       * Verifica si el usuario tiene todos los permisos especificados
       * @param {string[]} permissions - Array de permisos a verificar
       * @returns {boolean}
       */
      hasAllPermissions: (permissions) => {
        const { user } = get();
        const userPermissions = user?.role?.permisos || [];
        return permissions.every(permission => userPermissions.includes(permission));
      },

      /**
       * Verifica si el usuario tiene al menos uno de los permisos especificados
       * @param {string[]} permissions - Array de permisos a verificar
       * @returns {boolean}
       */
      hasAnyPermission: (permissions) => {
        const { user } = get();
        const userPermissions = user?.role?.permisos || [];
        return permissions.some(permission => userPermissions.includes(permission));
      },
    }),
    {
      name: 'auth-storage', // nombre en localStorage
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export { useAuthStore };
