import { cn } from "@/lib/utils";

const maxHeightClasses = {
  200: "max-h-[200px]",
  300: "max-h-[300px]",
  400: "max-h-[400px]"
};

const FormScrollPanel = ({ children, className = "", maxHeight = 200 }) => {
  const maxHeightClassName = maxHeightClasses[Number(maxHeight)] || maxHeightClasses[200];

  return (
    <div
      className={cn(
        "bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-3 overflow-y-auto",
        maxHeightClassName,
        className
      )}
    >
      {children}
    </div>
  );
};

export default FormScrollPanel;
