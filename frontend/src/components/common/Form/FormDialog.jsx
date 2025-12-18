import { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter } from "@/components/ui/modal/Modal";
import { Button as UIButton } from "@/components/ui/button";

/**
 * Componente de diálogo de formulario reutilizable
 * @param {boolean} isOpen - Estado de apertura del modal
 * @param {function} onOpenChange - Función para cambiar el estado de apertura
 * @param {string} title - Título del diálogo
 * @param {string} description - Descripción del diálogo
 * @param {function} onSubmit - Función para manejar el envío del formulario
 * @param {string} submitText - Texto del botón de envío
 * @param {string} cancelText - Texto del botón de cancelar
 * @param {string} maxWidth - Ancho máximo del modal
 * @param {boolean} isLoading - Estado de carga
 * @param {boolean} submitDisabled - Deshabilitar botón de envío
 * @param {React.ReactNode} children - Contenido del formulario
 */
const FormDialog = ({
  isOpen,
  onOpenChange,
  title,
  description,
  onSubmit,
  submitText = "Guardar",
  cancelText = "Cancelar",
  maxWidth = "max-w-2xl",
  isLoading = false,
  submitDisabled = false,
  children
}) => {
  return (
    <Modal isOpen={isOpen} onClose={() => onOpenChange(false)} size={maxWidth}>
      <form onSubmit={onSubmit}>
        <ModalHeader onClose={() => onOpenChange(false)}>
          <div>
            <ModalTitle>{title}</ModalTitle>
            {description && (
              <p className="text-sm text-gray-600 dark:text-slate-400 mt-1">{description}</p>
            )}
          </div>
        </ModalHeader>
        <ModalBody>
          {children}
        </ModalBody>
        <ModalFooter>
          <UIButton 
            type="button" 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            {cancelText}
          </UIButton>
          <UIButton 
            type="submit" 
            disabled={submitDisabled || isLoading}
            className="bg-lime-600 hover:bg-lime-700 text-white"
          >
            {submitText}
          </UIButton>
        </ModalFooter>
      </form>
    </Modal>
  );
};

export default FormDialog;
