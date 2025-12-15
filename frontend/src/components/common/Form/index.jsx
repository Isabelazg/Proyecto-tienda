import React from "react";
import { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter } from "@/components/ui/modal/Modal";
import { Button as UIButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card/Card";
import { Badge } from "@/components/ui/badge/Badge";

export const Input = ({ label, type = "text", error, ...props }) => (
  <div>
    {label && <label className="input-label">{label}</label>}
    <input
      type={type}
      className="input-field"
      {...props}
    />
    {error && <p className="input-error">{error}</p>}
  </div>
);

export const Button = ({ children, className = "", variant = "primary", ...props }) => {
  const variantClasses = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    lime: "btn-lime",
  };
  return (
    <button className={`${variantClasses[variant] || "btn-primary"} ${className}`} {...props}>
      {children}
    </button>
  );
};

// FormViewDialog Component
export const FormViewDialog = ({ 
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

// FormViewField Component
export const FormViewField = ({ 
  label, 
  value, 
  placeholder = "No disponible",
  className = "" 
}) => {
  return (
    <div className={`space-y-1 ${className}`}>
      <label className="text-sm font-medium text-gray-700 dark:text-slate-300">
        {label}
      </label>
      <div className="p-3 bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
        <p className="text-sm text-gray-900 dark:text-white">
          {value || placeholder}
        </p>
      </div>
    </div>
  );
};

// FormDialog Component
export const FormDialog = ({
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

// FormInput Component
export const FormInput = ({
  label,
  id,
  placeholder,
  value,
  onChange,
  error,
  icon: Icon,
  required = false,
  disabled = false,
  type = "text",
  ...props
}) => {
  return (
    <div className="space-y-1">
      <label 
        htmlFor={id} 
        className="text-sm font-medium text-gray-700 dark:text-slate-300"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon className="h-4 w-4" />
          </div>
        )}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-full ${Icon ? 'pl-10' : 'pl-3'} pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500 disabled:bg-gray-100 disabled:cursor-not-allowed ${
            error 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-gray-300 dark:border-slate-600'
          } bg-white dark:bg-slate-800 text-gray-900 dark:text-white`}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

// FormTextarea Component
export const FormTextarea = ({
  label,
  id,
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  rows = 3,
  ...props
}) => {
  return (
    <div className="space-y-1">
      <label 
        htmlFor={id} 
        className="text-sm font-medium text-gray-700 dark:text-slate-300"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <textarea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        rows={rows}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500 disabled:bg-gray-100 disabled:cursor-not-allowed resize-none ${
          error 
            ? 'border-red-500 focus:ring-red-500' 
            : 'border-gray-300 dark:border-slate-600'
        } bg-white dark:bg-slate-800 text-gray-900 dark:text-white`}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

// FormSelect Component
export const FormSelect = ({
  label,
  id,
  value,
  onChange,
  error,
  icon: Icon,
  required = false,
  disabled = false,
  options = [],
  ...props
}) => {
  return (
    <div className="space-y-1">
      <label 
        htmlFor={id} 
        className="text-sm font-medium text-gray-700 dark:text-slate-300"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon className="h-4 w-4" />
          </div>
        )}
        <select
          id={id}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-full ${Icon ? 'pl-10' : 'pl-3'} pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500 disabled:bg-gray-100 disabled:cursor-not-allowed ${
            error 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-gray-300 dark:border-slate-600'
          } bg-white dark:bg-slate-800 text-gray-900 dark:text-white`}
          {...props}
        >
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

// FormSummaryCard Component - Para mostrar tarjetas de resumen con label y valor
export const FormSummaryCard = ({ label, value, variant = "default", className = "" }) => {
  const variantClasses = {
    default: "bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-700",
    success: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700",
    info: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700",
    warning: "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-700",
    lime: "bg-lime-50 dark:bg-lime-900/20 border-lime-300 dark:border-lime-700",
    purple: "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-700"
  };

  const textVariants = {
    default: "text-gray-900 dark:text-white",
    success: "text-green-600",
    info: "text-blue-600",
    warning: "text-orange-600 dark:text-orange-400",
    lime: "text-lime-700 dark:text-lime-400",
    purple: "text-purple-600"
  };

  return (
    <div className={`p-3 rounded-lg border ${variantClasses[variant]} ${className}`}>
      <p className="text-xs text-gray-600 dark:text-slate-400 mb-1">{label}</p>
      <p className={`text-lg font-semibold ${textVariants[variant]}`}>
        {value}
      </p>
    </div>
  );
};

// FormSummaryGrid Component - Para mostrar grids de resumen financiero
export const FormSummaryGrid = ({ title, IconComponent, children, cols = 2 }) => {
  return (
    <div className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-4">
      {title && (
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          {IconComponent && <IconComponent className="h-4 w-4" />}
          {title}
        </h4>
      )}
      <div className={`grid grid-cols-${cols} gap-3`}>
        {children}
      </div>
    </div>
  );
};

// FormAlertBox Component - Para alertas y avisos con diferentes variantes
export const FormAlertBox = ({ 
  variant = "info", 
  title, 
  message, 
  IconComponent,
  children 
}) => {
  const variantClasses = {
    success: "bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700 text-green-900 dark:text-green-300",
    info: "bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700 text-blue-900 dark:text-blue-300",
    warning: "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-700 text-yellow-900 dark:text-yellow-300",
    error: "bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700 text-red-900 dark:text-red-300"
  };

  const iconColors = {
    success: "text-green-600",
    info: "text-blue-600",
    warning: "text-yellow-600",
    error: "text-red-600"
  };

  const messageColors = {
    success: "text-green-700 dark:text-green-400",
    info: "text-blue-700 dark:text-blue-400",
    warning: "text-yellow-700 dark:text-yellow-400",
    error: "text-red-700 dark:text-red-400"
  };

  return (
    <div className={`border rounded-lg p-3 ${variantClasses[variant]}`}>
      <div className="flex items-start gap-2">
        {IconComponent && (
          <IconComponent className={`h-5 w-5 mt-0.5 ${iconColors[variant]}`} />
        )}
        <div className="flex-1">
          {title && (
            <h5 className="text-sm font-semibold mb-1">{title}</h5>
          )}
          {message && (
            <p className={`text-sm ${messageColors[variant]}`}>{message}</p>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

// FormDifferenceBox Component - Para mostrar diferencias de caja (sobrante/faltante)
export const FormDifferenceBox = ({ 
  diferencia, 
  IconComponents = { exact: null, surplus: null, deficit: null },
  labels = { exact: "Caja Cuadrada", surplus: "Sobrante", deficit: "Faltante" }
}) => {
  const isExact = diferencia === 0;
  const isSurplus = diferencia > 0;
  
  const variant = isExact ? "success" : isSurplus ? "info" : "error";
  const Icon = isExact ? IconComponents.exact : isSurplus ? IconComponents.surplus : IconComponents.deficit;
  const label = isExact ? labels.exact : isSurplus ? labels.surplus : labels.deficit;
  
  const variantClasses = {
    success: "bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700",
    info: "bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700",
    error: "bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700"
  };

  const iconColors = {
    success: "text-green-600",
    info: "text-blue-600",
    error: "text-red-600"
  };

  const titleColors = {
    success: "text-green-900 dark:text-green-300",
    info: "text-blue-900 dark:text-blue-300",
    error: "text-red-900 dark:text-red-300"
  };

  const valueColors = {
    success: "text-green-700 dark:text-green-400",
    info: "text-blue-700 dark:text-blue-400",
    error: "text-red-700 dark:text-red-400"
  };

  return (
    <div className={`p-4 rounded-lg border-2 ${variantClasses[variant]}`}>
      <div className="flex items-center gap-2 mb-2">
        {Icon && <Icon className={`h-5 w-5 ${iconColors[variant]}`} />}
        <h4 className={`text-sm font-semibold ${titleColors[variant]}`}>
          {label}
        </h4>
      </div>
      <p className={`text-2xl font-bold ${valueColors[variant]}`}>
        {diferencia}
      </p>
    </div>
  );
};

// FormInfoBanner Component - Para mostrar banners informativos con icono
export const FormInfoBanner = ({ 
  variant = "info", 
  title, 
  message, 
  IconComponent 
}) => {
  const variantClasses = {
    info: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700",
    warning: "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-700"
  };

  const iconColors = {
    info: "text-blue-600",
    warning: "text-orange-600"
  };

  const titleColors = {
    info: "text-blue-900 dark:text-blue-300",
    warning: "text-orange-900 dark:text-orange-300"
  };

  const messageColors = {
    info: "text-blue-700 dark:text-blue-400",
    warning: "text-orange-700 dark:text-orange-400"
  };

  return (
    <div className={`border rounded-lg p-4 ${variantClasses[variant]}`}>
      <div className="flex items-start gap-3">
        {IconComponent && (
          <IconComponent className={`h-5 w-5 mt-0.5 ${iconColors[variant]}`} />
        )}
        <div>
          <h4 className={`text-sm font-semibold mb-1 ${titleColors[variant]}`}>
            {title}
          </h4>
          <p className={`text-sm ${messageColors[variant]}`}>
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

// FormTransactionList Component - Para mostrar listas de transacciones
export const FormTransactionList = ({ 
  transactions = [], 
  title,
  emptyMessage = "No hay transacciones registradas",
  getBadge,
  formatAmount,
  formatDate,
  maxHeight = "max-h-64"
}) => {
  if (!transactions || transactions.length === 0) {
    return (
      <Card className="p-6 text-center bg-gray-50 dark:bg-slate-800">
        <p className="text-sm text-gray-600 dark:text-slate-400">
          {emptyMessage}
        </p>
      </Card>
    );
  }

  return (
    <div>
      {title && (
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
          {title}
        </h4>
      )}
      <div className={`space-y-2 ${maxHeight} overflow-y-auto`}>
        {transactions.map((transaction, index) => (
          <Card key={index} className="p-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {getBadge && getBadge(transaction)}
                  {formatAmount && formatAmount(transaction)}
                </div>
                {transaction.concepto && (
                  <p className="text-sm text-gray-700 dark:text-slate-300 mb-1">
                    {transaction.concepto}
                  </p>
                )}
                {formatDate && formatDate(transaction)}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// FormStatusBadge Component - Badge genérico para estados
export const FormStatusBadge = ({ status, config }) => {
  const statusConfig = config[status] || config.default || { variant: 'default', label: status };
  return <Badge variant={statusConfig.variant}>{statusConfig.label}</Badge>;
};

// FormAmountBadge Component - Badge para mostrar montos con variantes
export const FormAmountBadge = ({ amount, variant = 'default', prefix = '', suffix = '' }) => {
  return (
    <Badge variant={variant}>
      {prefix}{amount}{suffix}
    </Badge>
  );
};

// FormStatusBanner Component - Banner de estado con acciones
export const FormStatusBanner = ({ 
  variant = 'info',
  icon: Icon,
  title,
  subtitle,
  actions,
  children
}) => {
  const variantClasses = {
    success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700',
    warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-700',
    info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700',
    error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700'
  };

  const iconBgClasses = {
    success: 'bg-green-100 dark:bg-green-800/30',
    warning: 'bg-yellow-100 dark:bg-yellow-800/30',
    info: 'bg-blue-100 dark:bg-blue-800/30',
    error: 'bg-red-100 dark:bg-red-800/30'
  };

  const iconColors = {
    success: 'text-green-600',
    warning: 'text-yellow-600',
    info: 'text-blue-600',
    error: 'text-red-600'
  };

  const titleColors = {
    success: 'text-green-700 dark:text-green-300',
    warning: 'text-yellow-700 dark:text-yellow-300',
    info: 'text-blue-700 dark:text-blue-300',
    error: 'text-red-700 dark:text-red-300'
  };

  const subtitleColors = {
    success: 'text-green-600 dark:text-green-400',
    warning: 'text-yellow-600 dark:text-yellow-400',
    info: 'text-blue-600 dark:text-blue-400',
    error: 'text-red-600 dark:text-red-400'
  };

  return (
    <div className={`border rounded-lg p-4 ${variantClasses[variant]}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {Icon && (
            <div className={`p-3 rounded-full ${iconBgClasses[variant]}`}>
              <Icon className={`h-6 w-6 ${iconColors[variant]}`} />
            </div>
          )}
          <div>
            {title && (
              <p className={`text-sm font-medium ${titleColors[variant]}`}>{title}</p>
            )}
            {subtitle && (
              <p className={`text-xs ${subtitleColors[variant]}`}>{subtitle}</p>
            )}
            {children}
          </div>
        </div>
        {actions && (
          <div className="flex items-center gap-2">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};
