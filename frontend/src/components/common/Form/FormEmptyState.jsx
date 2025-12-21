import { cn } from "@/lib/utils";

const FormEmptyState = ({ children = "No hay información disponible", className = "" }) => {
  return (
    <div className={cn("text-center py-8 text-gray-500", className)}>
      {children}
    </div>
  );
};

export default FormEmptyState;
