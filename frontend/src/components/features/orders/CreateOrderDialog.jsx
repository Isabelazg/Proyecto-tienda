import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select/Select';
import { Textarea } from '@/components/ui/textarea/Textarea';
import { 
  Modal, 
  ModalHeader, 
  ModalTitle, 
  ModalBody, 
  ModalFooter 
} from '@/components/ui/modal/Modal';
import { Plus, Minus, Trash2, Search } from 'lucide-react';
import { formatCurrency } from '@/utils/format';

export const CreateOrderDialog = ({ 
  isOpen, 
  products,
  tables,
  onClose, 
  onSubmit 
}) => {
  const [formData, setFormData] = useState({
    mesa_id: '',
    items: [],
    notas: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      setFormData({
        mesa_id: '',
        items: [],
        notas: ''
      });
      setFormErrors({});
      setSearchTerm('');
    }
  }, [isOpen]);

  const filteredProducts = products.filter(product =>
    product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addProduct = (product) => {
    const existingItem = formData.items.find(item => item.producto_id === product.id);
    
    if (existingItem) {
      setFormData({
        ...formData,
        items: formData.items.map(item =>
          item.producto_id === product.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      });
    } else {
      setFormData({
        ...formData,
        items: [...formData.items, {
          producto_id: product.id,
          nombre: product.nombre,
          precio: product.precio,
          cantidad: 1
        }]
      });
    }
  };

  const updateQuantity = (producto_id, cantidad) => {
    if (cantidad <= 0) {
      removeProduct(producto_id);
      return;
    }

    setFormData({
      ...formData,
      items: formData.items.map(item =>
        item.producto_id === producto_id
          ? { ...item, cantidad }
          : item
      )
    });
  };

  const removeProduct = (producto_id) => {
    setFormData({
      ...formData,
      items: formData.items.filter(item => item.producto_id !== producto_id)
    });
  };

  const calculateTotal = () => {
    return formData.items.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.mesa_id) {
      errors.mesa_id = 'Debes seleccionar una mesa';
    }

    if (formData.items.length === 0) {
      errors.items = 'Debes agregar al menos un producto';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const orderData = {
      ...formData,
      mesa_id: parseInt(formData.mesa_id),
      total: calculateTotal()
    };

    onSubmit(orderData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="large">
      <ModalHeader onClose={onClose}>
        <ModalTitle>Nuevo Pedido</ModalTitle>
      </ModalHeader>

      <ModalBody>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Selección de Mesa */}
          <div>
            <Label htmlFor="mesa">Mesa *</Label>
            <Select
              id="mesa"
              value={formData.mesa_id}
              onChange={(e) => setFormData({ ...formData, mesa_id: e.target.value })}
            >
              <option value="">Seleccionar mesa</option>
              {tables.map(table => (
                <option key={table.id} value={table.id}>
                  Mesa {table.numero} - {table.ubicacion} (Cap: {table.capacidad})
                </option>
              ))}
            </Select>
            {formErrors.mesa_id && (
              <p className="text-red-600 text-sm mt-1">{formErrors.mesa_id}</p>
            )}
          </div>

          {/* Búsqueda de Productos */}
          <div>
            <Label>Agregar Productos *</Label>
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Grid de productos disponibles */}
            {searchTerm && (
              <div className="grid grid-cols-2 gap-2 mb-4 max-h-[200px] overflow-y-auto border rounded-lg p-3 bg-gray-50">
                {filteredProducts.map(product => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => addProduct(product)}
                    className="text-left p-2 border rounded bg-white hover:bg-lime-50 hover:border-lime-500 transition-colors"
                  >
                    <p className="font-medium text-sm text-gray-900">{product.nombre}</p>
                    <p className="text-xs text-lime-600">{formatCurrency(product.precio)}</p>
                  </button>
                ))}
                {filteredProducts.length === 0 && (
                  <p className="col-span-2 text-center text-gray-500 text-sm py-4">
                    No se encontraron productos
                  </p>
                )}
              </div>
            )}

            {formErrors.items && (
              <p className="text-red-600 text-sm mt-1">{formErrors.items}</p>
            )}
          </div>

          {/* Items del pedido */}
          <div>
            <Label>Productos en el Pedido ({formData.items.length})</Label>
            <div className="border rounded-lg divide-y max-h-[300px] overflow-y-auto">
              {formData.items.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-sm">No hay productos agregados</p>
                </div>
              ) : (
                formData.items.map(item => (
                  <div
                    key={item.producto_id}
                    className="flex items-center gap-3 p-3 hover:bg-gray-50"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-gray-900 truncate">
                        {item.nombre}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatCurrency(item.precio)} c/u
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => updateQuantity(item.producto_id, item.cantidad - 1)}
                        className="h-7 w-7 p-0"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      
                      <span className="font-semibold text-sm min-w-[2ch] text-center">
                        {item.cantidad}
                      </span>
                      
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => updateQuantity(item.producto_id, item.cantidad + 1)}
                        className="h-7 w-7 p-0"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => removeProduct(item.producto_id)}
                        className="h-7 w-7 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>

                    <div className="text-right min-w-[80px]">
                      <p className="font-bold text-sm text-gray-900">
                        {formatCurrency(item.precio * item.cantidad)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Total */}
          {formData.items.length > 0 && (
            <div className="bg-lime-50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">Total:</span>
                <span className="text-2xl font-bold text-lime-600">
                  {formatCurrency(calculateTotal())}
                </span>
              </div>
            </div>
          )}

          {/* Notas */}
          <div>
            <Label htmlFor="notas">Notas del Pedido</Label>
            <Textarea
              id="notas"
              value={formData.notas}
              onChange={(e) => setFormData({ ...formData, notas: e.target.value })}
              placeholder="Ej: Sin cebolla, término medio, etc."
              rows={3}
            />
          </div>
        </form>
      </ModalBody>

      <ModalFooter>
        <Button onClick={onClose} variant="ghost">
          Cancelar
        </Button>
        <Button 
          onClick={handleSubmit}
          className="bg-lime-600 hover:bg-lime-700 text-white"
          disabled={formData.items.length === 0}
        >
          Crear Pedido
        </Button>
      </ModalFooter>
    </Modal>
  );
};
