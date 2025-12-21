import { cn } from "@/lib/utils";

const maxHeightClasses = {
  200: "max-h-[200px]",
  300: "max-h-[300px]",
  400: "max-h-[400px]"
};

const FormListContainer = ({ children, className = "", maxHeight = 300 }) => {
  const maxHeightClassName = maxHeightClasses[Number(maxHeight)] || maxHeightClasses[300];

  return (
    <div
      className={cn(
        "border border-gray-200 dark:border-slate-700 rounded-lg divide-y overflow-y-auto",
        maxHeightClassName,
        className
      )}
    >
      {children}
    </div>
  );
};

export default FormListContainer;
