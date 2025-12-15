import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter } from '@/components/ui/modal/Modal';
import { formatDate } from '@/utils/format';
import { Mail, Calendar, Shield, Clock } from 'lucide-react';

export const ViewUserDialog = ({ isOpen, user, onClose }) => {
  if (!user) return null;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader onClose={onClose}><ModalTitle>Detalles del Usuario</ModalTitle></ModalHeader>
      <ModalBody>
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Información Personal</h4>
            <div className="space-y-3">
              <div><Label>Nombre Completo</Label><p className="text-gray-900 font-medium">{user.nombre}</p></div>
              <div><Label className="flex items-center gap-2"><Mail className="h-4 w-4 text-gray-500" />Email</Label><p className="text-gray-900">{user.email}</p></div>
              <div><Label className="flex items-center gap-2"><Shield className="h-4 w-4 text-gray-500" />Rol</Label><p className="text-gray-900 font-medium">{user.role.nombre}</p></div>
              <div><Label className="flex items-center gap-2"><Clock className="h-4 w-4 text-gray-500" />Último Acceso</Label><p className="text-gray-900">{formatDate(user.ultimo_acceso)}</p></div>
              <div><Label className="flex items-center gap-2"><Calendar className="h-4 w-4 text-gray-500" />Fecha de Registro</Label><p className="text-gray-900">{formatDate(user.created_at)}</p></div>
              <div><Label>Estado</Label><p className={`font-medium ${user.estado ? 'text-green-600' : 'text-red-600'}`}>{user.estado ? 'Activo' : 'Inactivo'}</p></div>
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter><Button onClick={onClose} className="bg-black text-white hover:bg-gray-900">Cerrar</Button></ModalFooter>
    </Modal>
  );
};
