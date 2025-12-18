import { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter } from "@/components/ui/modal/Modal";
import { Button as UIButton } from "@/components/ui/button";

/**
 * Componente de diálogo para visualizar información
 * @param {boolean} isOpen - Estado de apertura del modal
 * @param {function} onOpenChange - Función para cambiar el estado de apertura
 * @param {function} onClose - Función para cerrar el modal
 * @param {string} title - Título del diálogo
 * @param {string} description - Descripción del diálogo
 * @param {React.Component} IconComponent - Componente de icono
 * @param {string} maxWidth - Ancho máximo del modal
 * @param {React.ReactNode} children - Contenido del modal
 */
const FormViewDialog = ({ 
  isOpen, 
  onOpenChange, 
  onClose, 
  title, 
  description,
  IconComponent,
  maxWidth = "max-w-2xl",
  children 
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={maxWidth}>
      <ModalHeader onClose={onClose}>
        <div className="flex items-center gap-3">
          {IconComponent && (
            <div className="p-2 bg-lime-100 rounded-lg">
              <IconComponent className="h-6 w-6 text-lime-600" />
            </div>
          )}
          <div>
            <ModalTitle>{title}</ModalTitle>
            {description && (
              <p className="text-sm text-gray-600 dark:text-slate-400 mt-1">{description}</p>
            )}
          </div>
        </div>
      </ModalHeader>
      <ModalBody>
        {children}
      </ModalBody>
      <ModalFooter>
        <UIButton variant="outline" onClick={onClose}>
          Cerrar
        </UIButton>
      </ModalFooter>
    </Modal>
  );
};

export default FormViewDialog;
