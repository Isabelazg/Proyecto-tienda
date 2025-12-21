import { cn } from "@/lib/utils";

const FormSectionTitle = ({ children, className = "" }) => {
  return (
    <p className={cn("text-sm font-medium text-gray-700 dark:text-slate-200", className)}>
      {children}
    </p>
  );
};

export default FormSectionTitle;
