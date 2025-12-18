import { Badge } from "@/components/ui/badge/Badge";

/**
 * Badge genérico para estados
 * @param {string} status - Estado actual
 * @param {object} config - Configuración de estados con variantes y etiquetas
 */
const FormStatusBadge = ({ status, config }) => {
  const statusConfig = config[status] || config.default || { variant: 'default', label: status };
  return <Badge variant={statusConfig.variant}>{statusConfig.label}</Badge>;
};

export default FormStatusBadge;
