import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AuthContainer from "./AuthContainer";
import AuthCard from "./AuthCard";

/**
 * Mensaje de éxito para operaciones de autenticación
 * @param {string} title - Título del mensaje
 * @param {string} message - Mensaje de éxito
 * @param {string} buttonText - Texto del botón
 * @param {string} buttonLink - Enlace del botón
 */
const AuthSuccessMessage = ({ title, message, buttonText, buttonLink }) => {
  return (
    <AuthContainer>
      <AuthCard className="text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          {title}
        </h2>
        <p className="text-gray-600 mb-6">
          {message}
        </p>
        <Link to={buttonLink}>
          <Button className="w-full bg-black text-white hover:bg-gray-900">
            {buttonText}
          </Button>
        </Link>
      </AuthCard>
    </AuthContainer>
  );
};

export default AuthSuccessMessage;
