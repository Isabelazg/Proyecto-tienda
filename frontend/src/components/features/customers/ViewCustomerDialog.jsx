import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { 
  Modal, 
  ModalHeader, 
  ModalTitle, 
  ModalBody, 
  ModalFooter 
} from '@/components/ui/modal/Modal';
import { formatCurrency, formatDate } from '@/utils/format';
import { Mail, Phone, MapPin, FileText, Calendar, ShoppingBag, DollarSign, History } from 'lucide-react';

export const ViewCustomerDialog = ({ 
  isOpen, 
  customer, 
  onClose,
  onViewHistory
}) => {
  if (!customer) return null;

  const getDocumentTypeLabel = (type) => {
    const types = {
      CC: 'Cédula de Ciudadanía',
      CE: 'Cédula de Extranjería',
      NIT: 'NIT',
      PP: 'Pasaporte',
    };
    return types[type] || type;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader onClose={onClose}>
        <ModalTitle>Detalles del Cliente</ModalTitle>
      </ModalHeader>

      <ModalBody>
        <div className="space-y-6">
          {/* Información Personal */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Información Personal</h3>
            <div className="space-y-3">
              <div>
                <Label>Nombre Completo</Label>
                <p className="text-gray-900 font-medium">{customer.nombre}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-gray-500" />
                    Tipo de Documento
                  </Label>
                  <p className="text-gray-900">{getDocumentTypeLabel(customer.tipo_documento)}</p>
                </div>
                <div>
                  <Label>Número de Documento</Label>
                  <p className="text-gray-900 font-medium">{customer.documento}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Información de Contacto */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Información de Contacto</h3>
            <div className="space-y-3">
              <div>
                <Label className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  Email
                </Label>
                <p className="text-gray-900">{customer.email}</p>
              </div>

              <div>
                <Label className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  Teléfono
                </Label>
                <p className="text-gray-900 font-medium">{customer.telefono}</p>
              </div>

              <div>
                <Label className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  Dirección
                </Label>
                <p className="text-gray-600">{customer.direccion || 'No especificada'}</p>
              </div>
            </div>
          </div>

          {/* Información de Compras */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Historial de Compras</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <Label className="flex items-center gap-2 text-blue-700">
                  <ShoppingBag className="h-4 w-4" />
                  Total de Compras
                </Label>
                <p className="text-2xl font-bold text-blue-900 mt-1">
                  {customer.total_compras}
                </p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <Label className="flex items-center gap-2 text-green-700">
                  <DollarSign className="h-4 w-4" />
                  Total Gastado
                </Label>
                <p className="text-2xl font-bold text-green-900 mt-1">
                  {formatCurrency(customer.total_gastado)}
                </p>
              </div>
            </div>
          </div>

          {/* Información Adicional */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Información Adicional</h3>
            <div className="space-y-3">
              <div>
                <Label className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  Fecha de Registro
                </Label>
                <p className="text-gray-900">{formatDate(customer.fecha_registro)}</p>
              </div>

              <div>
                <Label>Estado</Label>
                <p className={`font-medium ${customer.estado ? 'text-green-600' : 'text-red-600'}`}>
                  {customer.estado ? 'Activo' : 'Inactivo'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </ModalBody>

      <ModalFooter>
        <Button 
          onClick={() => onViewHistory && onViewHistory(customer)}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <History className="h-4 w-4 mr-2" />
          Ver Historial Completo
        </Button>
        <Button onClick={onClose} className="bg-black text-white hover:bg-gray-900">
          Cerrar
        </Button>
      </ModalFooter>
    </Modal>
  );
};
