import { cn } from "@/lib/utils";

const colsClassNames = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4"
};

const FormViewGrid = ({ children, className = "", cols = 2, gridClassName = "" }) => {
  const colsClassName = colsClassNames[Number(cols)] || colsClassNames[2];

  return (
    <div className={cn("grid gap-4", gridClassName || colsClassName, className)}>
      {children}
    </div>
  );
};

export default FormViewGrid;
