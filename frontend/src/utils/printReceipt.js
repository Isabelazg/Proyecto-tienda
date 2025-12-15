import { formatCurrency, formatDateTime } from './format';

/**
 * Genera el comprobante de venta en formato HTML para impresión
 * @param {Object} sale - Objeto de venta con toda la información
 * @param {string} businessInfo - Información del negocio (opcional)
 * @returns {void}
 */
export const printReceipt = (sale, businessInfo = {}) => {
  const {
    nombre = 'Tienda POS',
    direccion = 'Calle Principal #123',
    telefono = '(123) 456-7890',
    nit = '900.123.456-7'
  } = businessInfo;

  const receiptHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Comprobante de Venta #${sale.venta_id}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Courier New', monospace;
          width: 80mm;
          padding: 10px;
          font-size: 12px;
          line-height: 1.4;
        }
        
        .header {
          text-align: center;
          border-bottom: 2px dashed #000;
          padding-bottom: 10px;
          margin-bottom: 10px;
        }
        
        .header h1 {
          font-size: 18px;
          margin-bottom: 5px;
        }
        
        .header p {
          font-size: 10px;
          margin: 2px 0;
        }
        
        .info-section {
          margin: 10px 0;
          padding: 8px 0;
          border-bottom: 1px dashed #000;
        }
        
        .info-row {
          display: flex;
          justify-content: space-between;
          margin: 3px 0;
        }
        
        .info-label {
          font-weight: bold;
        }
        
        .items-table {
          width: 100%;
          margin: 10px 0;
          border-collapse: collapse;
        }
        
        .items-table th {
          text-align: left;
          border-bottom: 1px solid #000;
          padding: 5px 0;
          font-size: 11px;
        }
        
        .items-table td {
          padding: 5px 0;
          border-bottom: 1px dashed #ddd;
        }
        
        .items-table .item-name {
          width: 50%;
        }
        
        .items-table .item-qty {
          width: 15%;
          text-align: center;
        }
        
        .items-table .item-price {
          width: 35%;
          text-align: right;
        }
        
        .totals {
          margin-top: 10px;
          padding-top: 10px;
          border-top: 2px solid #000;
        }
        
        .total-row {
          display: flex;
          justify-content: space-between;
          margin: 5px 0;
          font-size: 13px;
        }
        
        .total-row.grand-total {
          font-size: 16px;
          font-weight: bold;
          margin-top: 8px;
          padding-top: 8px;
          border-top: 1px dashed #000;
        }
        
        .footer {
          text-align: center;
          margin-top: 15px;
          padding-top: 10px;
          border-top: 2px dashed #000;
          font-size: 10px;
        }
        
        .footer p {
          margin: 3px 0;
        }
        
        .status-badge {
          display: inline-block;
          padding: 2px 8px;
          border-radius: 3px;
          font-size: 10px;
          font-weight: bold;
        }
        
        .status-completada {
          background: #d4edda;
          color: #155724;
        }
        
        .status-anulada {
          background: #f8d7da;
          color: #721c24;
        }
        
        @media print {
          body {
            width: 80mm;
          }
        }
      </style>
    </head>
    <body>
      <!-- Encabezado del negocio -->
      <div class="header">
        <h1>${nombre}</h1>
        <p>${direccion}</p>
        <p>Tel: ${telefono}</p>
        <p>NIT: ${nit}</p>
      </div>
      
      <!-- Información de la venta -->
      <div class="info-section">
        <div class="info-row">
          <span class="info-label">Comprobante:</span>
          <span>#${sale.venta_id}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Fecha:</span>
          <span>${formatDateTime(sale.fecha)}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Atendido por:</span>
          <span>${sale.usuario}</span>
        </div>
        ${sale.mesero && sale.mesero !== sale.usuario ? `
        <div class="info-row">
          <span class="info-label">Mesero:</span>
          <span>${sale.mesero}</span>
        </div>
        ` : ''}
        <div class="info-row">
          <span class="info-label">Método de pago:</span>
          <span>${sale.metodo_pago}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Estado:</span>
          <span class="status-badge status-${sale.estado}">${sale.estado.toUpperCase()}</span>
        </div>
      </div>
      
      <!-- Productos -->
      <table class="items-table">
        <thead>
          <tr>
            <th class="item-name">Producto</th>
            <th class="item-qty">Cant.</th>
            <th class="item-price">Precio</th>
          </tr>
        </thead>
        <tbody>
          ${sale.items.map(item => `
            <tr>
              <td class="item-name">${item.producto}</td>
              <td class="item-qty">${item.cantidad}</td>
              <td class="item-price">${formatCurrency(item.subtotal)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      
      <!-- Totales -->
      <div class="totals">
        <div class="total-row">
          <span>Subtotal:</span>
          <span>${formatCurrency(sale.total)}</span>
        </div>
        <div class="total-row grand-total">
          <span>TOTAL:</span>
          <span>${formatCurrency(sale.total)}</span>
        </div>
      </div>
      
      <!-- Pie de página -->
      <div class="footer">
        <p>¡Gracias por su compra!</p>
        <p>Vuelva pronto</p>
        <p style="margin-top: 10px; font-size: 9px;">
          Este documento es un comprobante de venta
        </p>
      </div>
    </body>
    </html>
  `;

  // Crear ventana de impresión
  const printWindow = window.open('', '_blank', 'width=300,height=600');
  
  if (printWindow) {
    printWindow.document.write(receiptHTML);
    printWindow.document.close();
    
    // Esperar a que se cargue el contenido antes de imprimir
    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
    };
  } else {
    alert('Por favor, permite las ventanas emergentes para imprimir el comprobante');
  }
};

/**
 * Descarga el comprobante como archivo HTML
 * @param {Object} sale - Objeto de venta
 */
export const downloadReceipt = (sale) => {
  const receiptHTML = printReceipt(sale);
  const blob = new Blob([receiptHTML], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `comprobante-${sale.venta_id}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
