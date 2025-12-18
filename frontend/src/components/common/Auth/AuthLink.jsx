import { Link } from 'react-router-dom';

/**
 * Componente de enlace para redirección en formularios de autenticación
 * @param {string} to - Ruta de destino
 * @param {string} text - Texto antes del enlace
 * @param {string} linkText - Texto del enlace
 */
const AuthLink = ({ to, text, linkText }) => {
  return (
    <div className="text-center text-sm mt-4">
      {text}{' '}
      <Link to={to} className="text-lime-600 font-semibold hover:underline">
        {linkText}
      </Link>
    </div>
  );
};

export default AuthLink;
