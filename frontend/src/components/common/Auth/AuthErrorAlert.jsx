/**
 * Alerta de error para formularios de autenticación
 * @param {string} error - Mensaje de error
 */
const AuthErrorAlert = ({ error }) => {
  if (!error) return null;

  return (
    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
      <span className="text-red-600 text-sm">{error}</span>
    </div>
  );
};

export default AuthErrorAlert;
