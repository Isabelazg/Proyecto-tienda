import { Package, FileText, DollarSign, Hash, FolderOpen, ImageIcon } from "lucide-react"
import { FormDialog, FormInput, FormSelect, FormTextarea } from "@/components/common"

export const EditProductDialog = ({
  isOpen,
  setIsOpen,
  productData = {},
  categories = [],
  errors = {},
  isLoading = false,
  handleSubmit,
  handleFieldChange
}) => {

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    try {
      const result = handleSubmit(e);
      if (result?.success === true) {
        setIsOpen(false);
      }
    } catch {
      // No cerrar el diálogo en caso de error
    }
  };

  const handleOpenChange = (open) => {
    setIsOpen(open);
  };

  // Validación de formulario
  const isFormValid = () => {
    const hasErrors = errors && Object.values(errors).some(error => error !== "")
    const requiredFieldsFilled = productData?.nombre?.trim() &&
                                productData?.precio > 0 &&
                                productData?.stock >= 0 &&
                                productData?.categoria_id
    
    return !hasErrors && requiredFieldsFilled
  }

  return (
    <FormDialog
      isOpen={isOpen}
      onOpenChange={handleOpenChange}
      title="Editar Producto"
      description="Actualiza la información del producto"
      onSubmit={handleFormSubmit}
      submitText={isLoading ? "Guardando..." : "Guardar Cambios"}
      cancelText="Cancelar"
      maxWidth="2xl"
      isLoading={isLoading}
      submitDisabled={!isFormValid() || isLoading}
    >
      <div className="space-y-4">
        <FormInput
          label="Nombre"
          id="nombre"
          placeholder="Ej: Café Colombiano Premium"
          value={productData.nombre || ""}
          onChange={(e) => handleFieldChange('nombre', e.target.value)}
          error={errors.nombre}
          icon={Package}
          required
          disabled={isLoading}
        />

        <FormTextarea
          label="Descripción"
          id="descripcion"
          placeholder="Descripción del producto"
          value={productData.descripcion || ""}
          onChange={(e) => handleFieldChange('descripcion', e.target.value)}
          error={errors.descripcion}
          icon={FileText}
          rows={3}
          disabled={isLoading}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormInput
            label="Precio (COP)"
            id="precio"
            type="number"
            placeholder="25000"
            value={productData.precio || ""}
            onChange={(e) => handleFieldChange('precio', e.target.value)}
            error={errors.precio}
            icon={DollarSign}
            required
            min="0"
            disabled={isLoading}
          />

          <FormInput
            label="Stock"
            id="stock"
            type="number"
            placeholder="50"
            value={productData.stock || ""}
            onChange={(e) => handleFieldChange('stock', e.target.value)}
            error={errors.stock}
            icon={Hash}
            required
            min="0"
            disabled={isLoading}
          />
        </div>

        <FormSelect
          label="Categoría"
          id="categoria_id"
          value={productData.categoria_id || ""}
          onChange={(e) => handleFieldChange('categoria_id', e.target.value)}
          error={errors.categoria_id}
          icon={FolderOpen}
          required
          disabled={isLoading}
        >
          <option value="">Seleccionar categoría</option>
          {categories && categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.nombre}
            </option>
          ))}
        </FormSelect>

        <FormInput
          label="URL de Imagen"
          id="imagen"
          placeholder="https://ejemplo.com/imagen.jpg"
          value={productData.imagen || ""}
          onChange={(e) => handleFieldChange('imagen', e.target.value)}
          error={errors.imagen}
          icon={ImageIcon}
          disabled={isLoading}
        />

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="estado"
            checked={productData.estado || false}
            onChange={(e) => handleFieldChange('estado', e.target.checked)}
            className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-2 focus:ring-gray-300"
            disabled={isLoading}
          />
          <label htmlFor="estado" className="text-sm font-medium text-gray-700">
            Producto activo
          </label>
        </div>
      </div>
    </FormDialog>
  )
}
