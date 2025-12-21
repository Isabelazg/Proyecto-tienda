import { cn } from "@/lib/utils";

const variantClassNames = {
  info: "text-blue-600",
  warning: "text-orange-600",
  success: "text-green-600",
  danger: "text-red-600",
  default: "text-gray-900 dark:text-white"
};

const FormAmountText = ({ children, variant = "default", className = "" }) => {
  const variantClassName = variantClassNames[variant] || variantClassNames.default;

  return (
    <span className={cn("text-lg font-bold", variantClassName, className)}>
      {children}
    </span>
  );
};

export default FormAmountText;
