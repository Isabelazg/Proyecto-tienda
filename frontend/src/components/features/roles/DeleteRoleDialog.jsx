import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter } from '@/components/ui/modal/Modal';

export const DeleteRoleDialog = ({ isOpen, role, onClose, onConfirm }) => {
  if (!role) return null;

  const hasUsers = role.total_usuarios > 0;
  const isSystemRole = role.id <= 3; // Roles básicos del sistema

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader onClose={onClose}>
        <ModalTitle>Confirmar Eliminación</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <div className="text-center py-4">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
          
          {isSystemRole ? (
            <>
              <p className="text-gray-900 font-medium mb-2">
                No se puede eliminar este rol
              </p>
              <p className="text-gray-600 text-sm mb-1">{role.nombre}</p>
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800 text-sm">
                  ⚠️ Este es un rol del sistema y no puede ser eliminado
                </p>
              </div>
            </>
          ) : (
            <>
              <p className="text-gray-900 font-medium mb-2">
                ¿Estás seguro de eliminar este rol?
              </p>
              <p className="text-gray-600 text-sm mb-1">{role.nombre}</p>
              
              {hasUsers ? (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-800 text-sm font-medium">
                    ⚠️ Este rol tiene {role.total_usuarios} usuario(s) asignado(s)
                  </p>
                  <p className="text-yellow-700 text-xs mt-1">
                    Los usuarios quedarán sin rol asignado
                  </p>
                </div>
              ) : (
                <p className="text-gray-500 text-sm mt-4">
                  Esta acción no se puede deshacer
                </p>
              )}
            </>
          )}
        </div>
      </ModalBody>
      <ModalFooter>
        <Button onClick={onClose} variant="ghost">
          {isSystemRole ? 'Entendido' : 'Cancelar'}
        </Button>
        {!isSystemRole && (
          <Button 
            onClick={onConfirm}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            Eliminar Rol
          </Button>
        )}
      </ModalFooter>
    </Modal>
  );
};
