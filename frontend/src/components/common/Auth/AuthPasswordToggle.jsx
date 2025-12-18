import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

/**
 * Botón para mostrar/ocultar contraseña
 * @param {boolean} showPassword - Estado de visibilidad
 * @param {function} onToggle - Función para cambiar visibilidad
 */
const AuthPasswordToggle = ({ showPassword, onToggle }) => {
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
      onClick={onToggle}
      tabIndex={-1}
    >
      {showPassword ? (
        <EyeOff className="h-4 w-4 text-gray-500" />
      ) : (
        <Eye className="h-4 w-4 text-gray-500" />
      )}
    </Button>
  );
};

export default AuthPasswordToggle;
