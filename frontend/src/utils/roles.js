/**
 * Constantes de roles del sistema
 */
export const ROLES = {
  ADMINISTRADOR: 'Administrador',
  EMPLEADO: 'Empleado',
  MESERO: 'Mesero',
};

/**
 * Constantes de permisos del sistema
 */
export const PERMISSIONS = {
  // Productos
  PRODUCTOS_VER: 'productos.ver',
  PRODUCTOS_CREAR: 'productos.crear',
  PRODUCTOS_EDITAR: 'productos.editar',
  PRODUCTOS_ELIMINAR: 'productos.eliminar',
  
  // Categorías
  CATEGORIAS_VER: 'categorias.ver',
  CATEGORIAS_CREAR: 'categorias.crear',
  CATEGORIAS_EDITAR: 'categorias.editar',
  CATEGORIAS_ELIMINAR: 'categorias.eliminar',
  
  // Ventas
  VENTAS_VER: 'ventas.ver',
  VENTAS_CREAR: 'ventas.crear',
  VENTAS_ANULAR: 'ventas.anular',
  
  // Clientes
  CLIENTES_VER: 'clientes.ver',
  CLIENTES_CREAR: 'clientes.crear',
  CLIENTES_EDITAR: 'clientes.editar',
  CLIENTES_ELIMINAR: 'clientes.eliminar',
  
  // Usuarios
  USUARIOS_VER: 'usuarios.ver',
  USUARIOS_CREAR: 'usuarios.crear',
  USUARIOS_EDITAR: 'usuarios.editar',
  USUARIOS_ELIMINAR: 'usuarios.eliminar',
  
  // Reportes
  REPORTES_VER: 'reportes.ver',
  REPORTES_EXPORTAR: 'reportes.exportar',
  
  // Dashboard
  DASHBOARD_VER: 'dashboard.ver',
};

/**
 * Permisos por rol
 */
export const ROLE_PERMISSIONS = {
  [ROLES.ADMINISTRADOR]: [
    // Acceso total a todo
    PERMISSIONS.PRODUCTOS_VER,
    PERMISSIONS.PRODUCTOS_CREAR,
    PERMISSIONS.PRODUCTOS_EDITAR,
    PERMISSIONS.PRODUCTOS_ELIMINAR,
    PERMISSIONS.CATEGORIAS_VER,
    PERMISSIONS.CATEGORIAS_CREAR,
    PERMISSIONS.CATEGORIAS_EDITAR,
    PERMISSIONS.CATEGORIAS_ELIMINAR,
    PERMISSIONS.VENTAS_VER,
    PERMISSIONS.VENTAS_CREAR,
    PERMISSIONS.VENTAS_ANULAR,
    PERMISSIONS.CLIENTES_VER,
    PERMISSIONS.CLIENTES_CREAR,
    PERMISSIONS.CLIENTES_EDITAR,
    PERMISSIONS.CLIENTES_ELIMINAR,
    PERMISSIONS.USUARIOS_VER,
    PERMISSIONS.USUARIOS_CREAR,
    PERMISSIONS.USUARIOS_EDITAR,
    PERMISSIONS.USUARIOS_ELIMINAR,
    PERMISSIONS.REPORTES_VER,
    PERMISSIONS.REPORTES_EXPORTAR,
    PERMISSIONS.DASHBOARD_VER,
  ],
  
  [ROLES.EMPLEADO]: [
    // Puede gestionar productos, ventas y clientes
    PERMISSIONS.PRODUCTOS_VER,
    PERMISSIONS.PRODUCTOS_CREAR,
    PERMISSIONS.PRODUCTOS_EDITAR,
    PERMISSIONS.CATEGORIAS_VER,
    PERMISSIONS.VENTAS_VER,
    PERMISSIONS.VENTAS_CREAR,
    PERMISSIONS.CLIENTES_VER,
    PERMISSIONS.CLIENTES_CREAR,
    PERMISSIONS.CLIENTES_EDITAR,
    PERMISSIONS.DASHBOARD_VER,
  ],
  
  [ROLES.MESERO]: [
    // Solo puede ver productos y crear ventas
    PERMISSIONS.PRODUCTOS_VER,
    PERMISSIONS.VENTAS_VER,
    PERMISSIONS.VENTAS_CREAR,
    PERMISSIONS.CLIENTES_VER,
    PERMISSIONS.DASHBOARD_VER,
  ],
};

/**
 * Verifica si un rol tiene un permiso específico
 * @param {string} role - Nombre del rol
 * @param {string} permission - Permiso a verificar
 * @returns {boolean}
 */
export const roleHasPermission = (role, permission) => {
  const permissions = ROLE_PERMISSIONS[role] || [];
  return permissions.includes(permission);
};

/**
 * Obtiene todos los permisos de un rol
 * @param {string} role - Nombre del rol
 * @returns {string[]}
 */
export const getRolePermissions = (role) => {
  return ROLE_PERMISSIONS[role] || [];
};
