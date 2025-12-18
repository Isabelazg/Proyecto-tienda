import { Card } from "@/components/ui/card/Card";

/**
 * Componente para mostrar lista de transacciones
 * @param {array} transactions - Lista de transacciones
 * @param {string} title - Título de la lista
 * @param {string} emptyMessage - Mensaje cuando no hay transacciones
 * @param {function} getBadge - Función para obtener badge de transacción
 * @param {function} formatAmount - Función para formatear monto
 * @param {function} formatDate - Función para formatear fecha
 * @param {string} maxHeight - Altura máxima del contenedor
 */
const FormTransactionList = ({ 
  transactions = [], 
  title,
  emptyMessage = "No hay transacciones registradas",
  getBadge,
  formatAmount,
  formatDate,
  maxHeight = "max-h-64"
}) => {
  if (!transactions || transactions.length === 0) {
    return (
      <Card className="p-6 text-center bg-gray-50 dark:bg-slate-800">
        <p className="text-sm text-gray-600 dark:text-slate-400">
          {emptyMessage}
        </p>
      </Card>
    );
  }

  return (
    <div>
      {title && (
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
          {title}
        </h4>
      )}
      <div className={`space-y-2 ${maxHeight} overflow-y-auto`}>
        {transactions.map((transaction, index) => (
          <Card key={index} className="p-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {getBadge && getBadge(transaction)}
                  {formatAmount && formatAmount(transaction)}
                </div>
                {transaction.concepto && (
                  <p className="text-sm text-gray-700 dark:text-slate-300 mb-1">
                    {transaction.concepto}
                  </p>
                )}
                {formatDate && formatDate(transaction)}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FormTransactionList;
