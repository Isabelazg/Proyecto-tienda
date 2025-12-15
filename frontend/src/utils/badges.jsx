import React from 'react';
import { Badge } from '@/components/ui/badge/Badge';

// Badge para estados de venta
export const getSaleStatusBadge = (estado) => {
  const variants = {
    completada: 'success',
    pendiente: 'warning',
    anulada: 'error'
  };
  
  const labels = {
    completada: 'Completada',
    pendiente: 'Pendiente',
    anulada: 'Anulada'
  };
  
  return (
    <Badge variant={variants[estado] || 'default'}>
      {labels[estado] || estado}
    </Badge>
  );
};

// Badge para métodos de pago
export const getPaymentMethodBadge = (metodo) => {
  const variants = {
    'Efectivo': 'success',
    'Tarjeta': 'info',
    'Transferencia': 'lime'
  };
  
  return (
    <Badge variant={variants[metodo] || 'default'}>
      {metodo}
    </Badge>
  );
};

// Badge para estados de producto
export const getProductStatusBadge = (estado, showToggle = false) => {
  const isActive = estado === 'activo' || estado === 'active';
  
  return (
    <Badge variant={isActive ? 'success' : 'error'}>
      {isActive ? 'Activo' : 'Inactivo'}
    </Badge>
  );
};

// Badge para nivel de stock
export const getStockBadge = (stock) => {
  let variant = 'default';
  
  if (stock === 0) {
    variant = 'error';
  } else if (stock <= 5) {
    variant = 'warning';
  }
  
  return (
    <Badge variant={variant}>
      Stock: {stock}
    </Badge>
  );
};

// Badge para roles de usuario
export const getRoleBadge = (roleId) => {
  const roles = {
    1: { label: 'Administrador', variant: 'info' },
    2: { label: 'Cajero', variant: 'lime' },
    3: { label: 'Mesero', variant: 'default' }
  };
  
  const role = roles[roleId] || { label: 'Desconocido', variant: 'default' };
  
  return (
    <Badge variant={role.variant}>
      {role.label}
    </Badge>
  );
};

// Badge para estados de cliente
export const getCustomerStatusBadge = (estado) => {
  return (
    <Badge variant={estado ? 'success' : 'error'}>
      {estado ? 'Activo' : 'Inactivo'}
    </Badge>
  );
};

// Badge genérico con contador
export const getCountBadge = (count, label = 'items') => {
  return (
    <Badge variant="default" className="text-xs">
      {count} {count === 1 ? label.slice(0, -1) : label}
    </Badge>
  );
};
