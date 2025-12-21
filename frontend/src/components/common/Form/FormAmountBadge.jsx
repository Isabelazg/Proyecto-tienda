import { Badge } from "@/components/ui/Badge";

/**
 * Badge para mostrar montos con variantes
 * @param {string|number} amount - Monto a mostrar
 * @param {string} variant - Variante de color
 * @param {string} prefix - Prefijo del monto
 * @param {string} suffix - Sufijo del monto
 */
const FormAmountBadge = ({ amount, variant = 'default', prefix = '', suffix = '' }) => {
  return (
    <Badge variant={variant}>
      {prefix}{amount}{suffix}
    </Badge>
  );
};

export default FormAmountBadge;
