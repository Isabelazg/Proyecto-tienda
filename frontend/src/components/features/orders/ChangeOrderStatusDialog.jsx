import React, { useState } from 'react';
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
import { ArrowRight, CheckCircle, Clock, Truck, CreditCard } from 'lucide-react';
import { formatCurrency } from '@/utils/format';

const ORDER_STATUSES = [
  { 
    value: 'pendiente', 
    label: 'Pendiente', 
    icon: Clock, 
    color: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    description: 'El pedido está esperando ser preparado'
  },
  { 
    value: 'en_preparacion', 
    label: 'En Preparación', 
    icon: Truck, 
    color: 'bg-blue-100 text-blue-700 border-blue-300',
    description: 'El pedido está siendo preparado en cocina'
  },
  { 
    value: 'entregado', 
    label: 'Entregado', 
    icon: CheckCircle, 
    color: 'bg-green-100 text-green-700 border-green-300',
    description: 'El pedido ha sido entregado a la mesa'
  },
  { 
    value: 'pagado', 
    label: 'Pagado', 
    icon: CreditCard, 
    color: 'bg-gray-100 text-gray-700 border-gray-300',
    description: 'El pedido ha sido pagado y finalizado'
  }
];

export const ChangeOrderStatusDialog = ({ 
  isOpen, 
  order, 
  onClose, 
  onConfirm 
}) => {
  const [selectedStatus, setSelectedStatus] = useState(order?.estado || 'pendiente');

  if (!order) return null;

  const currentStatusIndex = ORDER_STATUSES.findIndex(s => s.value === order.estado);
  const newStatusIndex = ORDER_STATUSES.findIndex(s => s.value === selectedStatus);

  const handleConfirm = () => {
    onConfirm(selectedStatus);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader onClose={onClose}>
        <ModalTitle>Cambiar Estado del Pedido</ModalTitle>
      </ModalHeader>

      <ModalBody>
        <div className="space-y-4">
          {/* Información del pedido */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-sm text-gray-600">Pedido</p>
                <p className="font-bold text-lg text-gray-900">#{order.id}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Mesa</p>
                <p className="font-bold text-lg text-gray-900">{order.mesa_numero}</p>
              </div>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-gray-200">
              <span className="text-sm text-gray-600">Total:</span>
              <span className="font-bold text-lime-600">{formatCurrency(order.total)}</span>
            </div>
          </div>

          {/* Estado actual */}
          <div>
            <Label className="mb-2 block">Estado Actual</Label>
            <div className="flex items-center gap-2 p-3 border-2 border-gray-300 rounded-lg bg-gray-50">
              {(() => {
                const currentStatus = ORDER_STATUSES.find(s => s.value === order.estado);
                const Icon = currentStatus?.icon || Clock;
                return (
                  <>
                    <Icon className="h-5 w-5 text-gray-600" />
                    <span className="font-medium text-gray-900">{currentStatus?.label}</span>
                  </>
                );
              })()}
            </div>
          </div>

          {/* Selección de nuevo estado */}
          <div>
            <Label className="mb-2 block">Nuevo Estado</Label>
            <div className="space-y-2">
              {ORDER_STATUSES.map((status, index) => {
                const Icon = status.icon;
                const isSelected = selectedStatus === status.value;
                const isCurrent = order.estado === status.value;
                const isDisabled = isCurrent;

                return (
                  <button
                    key={status.value}
                    type="button"
                    onClick={() => !isDisabled && setSelectedStatus(status.value)}
                    disabled={isDisabled}
                    className={`
                      w-full text-left p-3 rounded-lg border-2 transition-all
                      ${isSelected && !isCurrent ? 'border-lime-500 bg-lime-50' : 'border-gray-200 hover:border-gray-300'}
                      ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                    `}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${status.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-gray-900">{status.label}</p>
                          {isCurrent && (
                            <Badge variant="default" className="text-xs">Actual</Badge>
                          )}
                          {isSelected && !isCurrent && (
                            <Badge variant="success" className="text-xs">Seleccionado</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{status.description}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Indicador de progreso */}
          {selectedStatus !== order.estado && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-center gap-2">
              <ArrowRight className="h-5 w-5 text-blue-600" />
              <p className="text-sm text-blue-800">
                El estado cambiará de <strong>{ORDER_STATUSES[currentStatusIndex]?.label}</strong> a{' '}
                <strong>{ORDER_STATUSES[newStatusIndex]?.label}</strong>
              </p>
            </div>
          )}
        </div>
      </ModalBody>

      <ModalFooter>
        <Button onClick={onClose} variant="ghost">
          Cancelar
        </Button>
        <Button 
          onClick={handleConfirm}
          className="bg-lime-600 hover:bg-lime-700 text-white"
          disabled={selectedStatus === order.estado}
        >
          Confirmar Cambio
        </Button>
      </ModalFooter>
    </Modal>
  );
};
