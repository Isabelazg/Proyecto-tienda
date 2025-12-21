import { Button } from '@/components/ui/button';
import { FormDialog, FormSelect, FormTextarea, FilterInput, FormSectionTitle, FormScrollPanel, FormListContainer, FormSummaryCard } from '@/components/common';
import { Plus, Minus, Trash2, Search } from 'lucide-react';
import { formatCurrency } from '@/utils/format';

export const CreateOrderDialog = ({
  isOpen,
  setIsOpen,
  orderData = {},
  tables = [],
  errors = {},
  isLoading = false,
  handleSubmit,
  handleFieldChange,
  searchTerm = '',
  setSearchTerm,
  filteredProducts = [],
  addProduct,
  removeProduct,
  updateQuantity,
  total = 0,
}) => {
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await handleSubmit(e);
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

  const isFormValid = () => {
    const hasErrors = errors && Object.values(errors).some(Boolean);
    const requiredFieldsFilled = Boolean(orderData?.mesa_id) && (orderData?.items?.length || 0) > 0;
    return !hasErrors && requiredFieldsFilled;
  };

  return (
    <FormDialog
      isOpen={isOpen}
      onOpenChange={handleOpenChange}
      title="Nuevo Pedido"
      description="Selecciona una mesa y agrega productos al pedido"
      onSubmit={handleFormSubmit}
      submitText={isLoading ? 'Creando...' : 'Crear Pedido'}
      cancelText="Cancelar"
      maxWidth="2xl"
      isLoading={isLoading}
      submitDisabled={!isFormValid() || isLoading}
    >
      <div className="space-y-4">
        <FormSelect
          label="Mesa"
          id="mesa"
          required
          value={orderData.mesa_id || ''}
          onChange={(e) => handleFieldChange('mesa_id', e.target.value)}
          error={errors.mesa_id}
          disabled={isLoading}
        >
          <option value="">Seleccionar mesa</option>
          {tables.map((table) => (
            <option key={table.id} value={table.id}>
              Mesa {table.numero} - {table.ubicacion} 
              (Cap: {table.capacidad})
            </option>
          ))}
        </FormSelect>

        <div>
          <FormSectionTitle className="mb-1">Agregar Productos</FormSectionTitle>
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <FilterInput
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              disabled={isLoading}
            />
          </div>

            {/* Grid de productos disponibles */}
            {searchTerm && (
              <FormScrollPanel maxHeight={200} className="grid grid-cols-2 gap-2 mb-4">
                {filteredProducts.map(product => (
                  <Button
                    key={product.id}
                    type="button"
                    onClick={() => addProduct(product)}
                    variant="outline"
                    className="h-auto justify-start text-left p-2"
                    disabled={isLoading}
                  >
                    <div className="min-w-0">
                      <p className="font-medium text-sm text-gray-900">{product.nombre}</p>
                      <p className="text-xs text-gray-600">{formatCurrency(product.precio)}</p>
                    </div>
                  </Button>
                ))}
                {filteredProducts.length === 0 && (
                  <p className="col-span-2 text-center text-gray-500 text-sm py-4">
                    No se encontraron productos
                  </p>
                )}
              </FormScrollPanel>
            )}

          {errors.items && (
            <p className="text-red-600 text-sm mt-1">{errors.items}</p>
          )}
        </div>

          {/* Items del pedido */}
        <div>
          <FormSectionTitle className="mb-1">
            Productos en el Pedido ({(orderData.items || []).length})
          </FormSectionTitle>
            <FormListContainer maxHeight={300}>
              {(orderData.items || []).length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-sm">No hay productos agregados</p>
                </div>
              ) : (
                (orderData.items || []).map(item => (
                  <div
                    key={item.producto_id}
                    className="flex items-center gap-3 p-3 hover:bg-gray-50"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-gray-900 truncate">
                        {item.nombre}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatCurrency(item.precio)} c/u
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => updateQuantity(item.producto_id, item.cantidad - 1)}
                        className="h-7 w-7 p-0"
                        disabled={isLoading}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      
                      <span className="font-semibold text-sm min-w-[2ch] text-center">
                        {item.cantidad}
                      </span>
                      
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => updateQuantity(item.producto_id, item.cantidad + 1)}
                        className="h-7 w-7 p-0"
                        disabled={isLoading}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => removeProduct(item.producto_id)}
                        className="h-7 w-7 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                        disabled={isLoading}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>

                    <div className="text-right min-w-[80px]">
                      <p className="font-bold text-sm text-gray-900">
                        {formatCurrency(item.precio * item.cantidad)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </FormListContainer>
          </div>

        {(orderData.items || []).length > 0 && (
          <FormSummaryCard
            label="Total"
            value={formatCurrency(total)}
            className="border-2"
          />
        )}

        <FormTextarea
          label="Notas del Pedido"
          id="notas"
          value={orderData.notas || ''}
          onChange={(e) => handleFieldChange('notas', e.target.value)}
          placeholder="Ej: Sin cebolla, término medio, etc."
          rows={3}
          disabled={isLoading}
        />
      </div>
    </FormDialog>
  );
};
