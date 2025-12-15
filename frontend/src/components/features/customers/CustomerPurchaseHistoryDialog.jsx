import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge/Badge';
import { 
  Modal, 
  ModalHeader, 
  ModalTitle, 
  ModalBody, 
  ModalFooter 
} from '@/components/ui/modal/Modal';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from '@/components/ui/table/Table';
import { formatCurrency, formatDateTime } from '@/utils/format';
import { ShoppingBag, Calendar, CreditCard, Package } from 'lucide-react';

export const CustomerPurchaseHistoryDialog = ({ 
  isOpen, 
  customer, 
  onClose 
}) => {
  const [purchases, setPurchases] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && customer) {
      fetchPurchaseHistory();
    }
  }, [isOpen, customer]);

  const fetchPurchaseHistory = async () => {
    setIsLoading(true);
    
    // Simular carga de datos
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock data - Historial de compras del cliente
    const mockPurchases = [
      {
        id: 1,
        fecha: '2024-12-10T10:30:00',
        total: 51000,
        metodo_pago: 'Efectivo',
        items: [
          { producto: 'Café Colombiano Premium', cantidad: 2, precio: 8500, subtotal: 17000 },
          { producto: 'Hamburguesa Especial', cantidad: 1, precio: 25000, subtotal: 25000 },
          { producto: 'Jugo Natural de Naranja', cantidad: 1, precio: 6000, subtotal: 6000 }
        ]
      },
      {
        id: 2,
        fecha: '2024-12-08T15:20:00',
        total: 88000,
        metodo_pago: 'Tarjeta',
        items: [
          { producto: 'Pizza Margarita', cantidad: 2, precio: 35000, subtotal: 70000 },
          { producto: 'Ensalada César', cantidad: 1, precio: 18000, subtotal: 18000 }
        ]
      },
      {
        id: 3,
        fecha: '2024-12-05T12:45:00',
        total: 35000,
        metodo_pago: 'Transferencia',
        items: [
          { producto: 'Pizza Margarita', cantidad: 1, precio: 35000, subtotal: 35000 }
        ]
      },
      {
        id: 4,
        fecha: '2024-12-01T18:30:00',
        total: 43000,
        metodo_pago: 'Efectivo',
        items: [
          { producto: 'Pasta Carbonara', cantidad: 1, precio: 28000, subtotal: 28000 },
          { producto: 'Brownie con Helado', cantidad: 1, precio: 15000, subtotal: 15000 }
        ]
      },
      {
        id: 5,
        fecha: '2024-11-28T14:15:00',
        total: 67000,
        metodo_pago: 'Tarjeta',
        items: [
          { producto: 'Hamburguesa Especial', cantidad: 2, precio: 25000, subtotal: 50000 },
          { producto: 'Café Colombiano Premium', cantidad: 2, precio: 8500, subtotal: 17000 }
        ]
      }
    ];

    setPurchases(mockPurchases);
    setIsLoading(false);
  };

  if (!customer) return null;

  const getPaymentMethodBadge = (method) => {
    const methods = {
      'Efectivo': { variant: 'success', label: 'Efectivo' },
      'Tarjeta': { variant: 'info', label: 'Tarjeta' },
      'Transferencia': { variant: 'default', label: 'Transferencia' }
    };
    const config = methods[method] || methods.Efectivo;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="large">
      <ModalHeader onClose={onClose}>
        <ModalTitle>Historial de Compras</ModalTitle>
      </ModalHeader>

      <ModalBody>
        <div className="space-y-6">
          {/* Información del cliente */}
          <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
            <div className="bg-blue-100 p-4 rounded-xl">
              <ShoppingBag className="h-8 w-8 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900">{customer.nombre}</h3>
              <p className="text-sm text-gray-500 mt-1">
                {customer.email} • {customer.telefono}
              </p>
            </div>
          </div>

          {/* Estadísticas resumidas */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <Label className="text-blue-700 text-sm">Total Compras</Label>
              <p className="text-2xl font-bold text-blue-900 mt-1">
                {customer.total_compras}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <Label className="text-green-700 text-sm">Total Gastado</Label>
              <p className="text-2xl font-bold text-green-900 mt-1">
                {formatCurrency(customer.total_gastado)}
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <Label className="text-purple-700 text-sm">Ticket Promedio</Label>
              <p className="text-2xl font-bold text-purple-900 mt-1">
                {formatCurrency(customer.total_compras > 0 ? customer.total_gastado / customer.total_compras : 0)}
              </p>
            </div>
          </div>

          {/* Historial de compras */}
          <div>
            <Label className="text-lg font-semibold mb-3 block">Compras Recientes</Label>
            
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : purchases.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Package className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>No hay compras registradas</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[400px] overflow-y-auto">
                {purchases.map((purchase) => (
                  <div key={purchase.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    {/* Encabezado de la compra */}
                    <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-200">
                      <div className="flex items-center gap-3">
                        <div className="bg-gray-100 p-2 rounded">
                          <ShoppingBag className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Compra #{purchase.id}</p>
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDateTime(purchase.fecha)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-lime-600">
                          {formatCurrency(purchase.total)}
                        </p>
                        {getPaymentMethodBadge(purchase.metodo_pago)}
                      </div>
                    </div>

                    {/* Items de la compra */}
                    <div className="space-y-2">
                      {purchase.items.map((item, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <Package className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-700">{item.producto}</span>
                            <Badge variant="default" className="text-xs">x{item.cantidad}</Badge>
                          </div>
                          <span className="font-semibold text-gray-900">
                            {formatCurrency(item.subtotal)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </ModalBody>

      <ModalFooter>
        <Button onClick={onClose} className="bg-black text-white hover:bg-gray-900">
          Cerrar
        </Button>
      </ModalFooter>
    </Modal>
  );
};
