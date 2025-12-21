import { AlertCircle } from 'lucide-react';
import { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter } from "@/components/ui/modal/Modal";
import { Button } from "@/components/ui/button";

/**
 * Componente de diálogo de confirmación reutilizable
 * @param {boolean} isOpen - Estado de apertura del modal
 * @param {function} onClose - Función para cerrar el modal
 * @param {string} title - Título del diálogo
 * @param {string} message - Mensaje principal
 * @param {string} description - Descripción adicional (opcional)
 * @param {function} onConfirm - Función para confirmar la acción
 * @param {string} confirmText - Texto del botón de confirmar
 * @param {string} cancelText - Texto del botón de cancelar
 * @param {boolean} isLoading - Estado de carga
 * @param {string} variant - Variante del diálogo (danger, warning, info)
 * @param {React.Component} icon - Icono personalizado
 */
const FormConfirmDialog = ({
  isOpen,
  onClose,
  title = "Confirmar Acción",
  message,
  description,
  onConfirm,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  isLoading = false,
  variant = "danger", // danger, warning, info
  icon: CustomIcon
}) => {
  const variantStyles = {
    danger: {
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      buttonClass: "bg-red-600 hover:bg-red-700"
    },
    warning: {
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
      buttonClass: "bg-yellow-600 hover:bg-yellow-700"
    },
    info: {
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      buttonClass: "bg-blue-600 hover:bg-blue-700"
    }
  };

  const styles = variantStyles[variant] || variantStyles.danger;
  const Icon = CustomIcon || AlertCircle;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader onClose={onClose}>
        <ModalTitle>{title}</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <div className="text-center py-4">
          <div className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full ${styles.iconBg} mb-4`}>
            <Icon className={`h-6 w-6 ${styles.iconColor}`} />
          </div>
          <p className="text-gray-900 font-medium mb-2">
            {message}
          </p>
          {description && (
            <p className="text-gray-500 text-sm mt-2">
              {description}
            </p>
          )}
        </div>
      </ModalBody>
      <ModalFooter>
        <Button 
          onClick={onClose} 
          variant="outline"
          disabled={isLoading}
        >
          {cancelText}
        </Button>
        <Button 
          onClick={onConfirm}
          disabled={isLoading}
          className={`${styles.buttonClass} text-white`}
        >
          {isLoading ? "Procesando..." : confirmText}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default FormConfirmDialog;
