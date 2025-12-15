import React, { useState } from 'react';
import { ShoppingCart, Trash2, Plus, Minus, Search, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select/Select';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card/Card';
import { Badge } from '@/components/ui/badge/Badge';
import { Alert, AlertDescription } from '@/components/ui/alert/Alert';
import { formatCurrency } from '@/utils/format';
import { PAYMENT_METHODS } from '@/utils/constants';

export const POSInterface = ({
  products,
  cart,
  selectedPaymentMethod,
  selectedWaiter,
  selectedCustomer,
  cartSubtotal,
  cartTotal,
  isLoading,
  error,
  onAddToCart,
  onRemoveFromCart,
  onUpdateQuantity,
  onClearCart,
  onPaymentMethodChange,
  onWaiterChange,
  onCustomerChange,
  onCompleteSale
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(product =>
    product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) &&
    product.estado === 'activo'
  );

  const handleCompleteSale = async () => {
    const success = await onCompleteSale();
    if (success) {
      setSearchTerm('');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Productos Disponibles */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Productos Disponibles</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Búsqueda */}
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Grid de productos */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto">
              {filteredProducts.map((product) => (
                <div
                  key={product.producto_id}
                  className="border rounded-lg p-4 hover:border-lime-500 hover:shadow-md transition-all cursor-pointer"
                  onClick={() => onAddToCart(product)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-sm mb-1">
                        {product.nombre}
                      </h3>
                      <Badge variant="lime" className="text-xs">
                        {product.categoria}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3">
                    <p className="text-lg font-bold text-lime-600">
                      {formatCurrency(product.precio)}
                    </p>
                    <Badge 
                      variant={product.stock > 10 ? 'default' : product.stock > 0 ? 'warning' : 'error'}
                      className="text-xs"
                    >
                      Stock: {product.stock}
                    </Badge>
                  </div>

                  <Button
                    size="sm"
                    className="w-full mt-3 bg-lime-600 hover:bg-lime-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(product);
                    }}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Agregar
                  </Button>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <Search className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>No se encontraron productos</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Carrito y Pago */}
      <div className="lg:col-span-1">
        <Card className="sticky top-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Carrito ({cart.length})
              </CardTitle>
              {cart.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClearCart}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="error" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Items del carrito */}
            <div className="space-y-3 mb-4 max-h-[300px] overflow-y-auto">
              {cart.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <ShoppingCart className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">Carrito vacío</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.producto_id}
                    className="flex items-center gap-3 p-3 border rounded-lg"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-gray-900 truncate">
                        {item.nombre}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatCurrency(item.precio)}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onUpdateQuantity(item.producto_id, item.cantidad - 1)}
                        className="h-7 w-7 p-0"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      
                      <span className="font-semibold text-sm min-w-[2ch] text-center">
                        {item.cantidad}
                      </span>
                      
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onUpdateQuantity(item.producto_id, item.cantidad + 1)}
                        className="h-7 w-7 p-0"
                        disabled={item.cantidad >= item.stock}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onRemoveFromCart(item.producto_id)}
                        className="h-7 w-7 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Método de pago */}
            {cart.length > 0 && (
              <>
                <div className="mb-4">
                  <Label>Método de Pago</Label>
                  <Select
                    value={selectedPaymentMethod}
                    onChange={(e) => onPaymentMethodChange(e.target.value)}
                  >
                    {Object.entries(PAYMENT_METHODS).map(([id, name]) => (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    ))}
                  </Select>
                </div>

                {/* Mesero asignado */}
                <div className="mb-4">
                  <Label>Mesero (Opcional)</Label>
                  <Select
                    value={selectedWaiter}
                    onChange={(e) => onWaiterChange(e.target.value)}
                  >
                    <option value="">Sin asignar</option>
                    <option value="1">Carlos Ramírez</option>
                    <option value="2">Ana Torres</option>
                    <option value="3">Luis Martínez</option>
                    <option value="4">Sofía Rodríguez</option>
                    <option value="5">Miguel Álvarez</option>
                  </Select>
                </div>

                {/* Cliente asociado */}
                <div className="mb-4">
                  <Label>Cliente (Opcional)</Label>
                  <Select
                    value={selectedCustomer}
                    onChange={(e) => onCustomerChange(e.target.value)}
                  >
                    <option value="">Sin cliente</option>
                    <option value="1">María García Rodríguez</option>
                    <option value="2">Carlos Andrés Pérez</option>
                    <option value="3">Ana María López</option>
                    <option value="4">Juan David Martínez</option>
                    <option value="5">Laura Camila Sánchez</option>
                  </Select>
                </div>

                {/* Totales */}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium">{formatCurrency(cartSubtotal)}</span>
                  </div>
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-lime-600">{formatCurrency(cartTotal)}</span>
                  </div>
                </div>

                {/* Botón completar venta */}
                <Button
                  className="w-full mt-4 bg-lime-600 hover:bg-lime-700"
                  size="lg"
                  onClick={handleCompleteSale}
                  disabled={isLoading}
                >
                  <Check className="h-5 w-5 mr-2" />
                  {isLoading ? 'Procesando...' : 'Completar Venta'}
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
