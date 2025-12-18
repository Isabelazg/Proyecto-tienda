/**
 * Encabezado de formulario de autenticación
 * @param {string} title - Título del formulario
 * @param {string} description - Descripción del formulario
 */
const AuthHeader = ({ title, description }) => {
  return (
    <div className="flex flex-col items-center text-center mb-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      {description && (
        <p className="text-sm text-gray-500 mt-2">
          {description}
        </p>
      )}
    </div>
  );
};

export default AuthHeader;
