import { useState, useEffect } from 'react';

export const useCashRegisterManagement = () => {
  const [cashRegisters, setCashRegisters] = useState([]);
  const [activeCashRegister, setActiveCashRegister] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Modales
  const [isOpenDialogOpen, setIsOpenDialogOpen] = useState(false);
  const [isCloseDialogOpen, setIsCloseDialogOpen] = useState(false);
  const [isTransactionDialogOpen, setIsTransactionDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [transactionType, setTransactionType] = useState('ingreso'); // ingreso o egreso
  const [selectedCashRegister, setSelectedCashRegister] = useState(null);

  // Filtros
  const [filters, setFilters] = useState({
    search: '',
    estado: '', // abierta, cerrada
    fecha_desde: '',
    fecha_hasta: ''
  });

  // Paginación
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });

  // Ordenamiento
  const [sortConfig, setSortConfig] = useState({
    key: 'fecha_apertura',
    direction: 'desc'
  });

  // Mock data - Cajas registradoras
  const mockCashRegisters = [
    {
      id: 1,
      usuario: 'Juan Pérez',
      fecha_apertura: '2024-12-14T08:00:00',
      fecha_cierre: null,
      monto_inicial: 100000,
      total_ventas: 450000,
      total_ingresos: 20000,
      total_egresos: 15000,
      efectivo_esperado: 555000,
      efectivo_contado: null,
      diferencia: null,
      estado: 'abierta',
      transacciones: [
        { tipo: 'ingreso', monto: 20000, concepto: 'Pago de deuda cliente', fecha: '2024-12-14T10:30:00' }
      ]
    },
    {
      id: 2,
      usuario: 'María López',
      fecha_apertura: '2024-12-13T08:00:00',
      fecha_cierre: '2024-12-13T20:00:00',
      monto_inicial: 100000,
      total_ventas: 680000,
      total_ingresos: 30000,
      total_egresos: 25000,
      efectivo_esperado: 785000,
      efectivo_contado: 783000,
      diferencia: -2000,
      estado: 'cerrada',
      transacciones: [
        { tipo: 'ingreso', monto: 30000, concepto: 'Venta productos fuera de sistema', fecha: '2024-12-13T11:00:00' },
        { tipo: 'egreso', monto: 25000, concepto: 'Compra de insumos', fecha: '2024-12-13T14:30:00' }
      ]
    },
    {
      id: 3,
      usuario: 'Carlos Gómez',
      fecha_apertura: '2024-12-12T08:00:00',
      fecha_cierre: '2024-12-12T20:00:00',
      monto_inicial: 100000,
      total_ventas: 520000,
      total_ingresos: 0,
      total_egresos: 30000,
      efectivo_esperado: 590000,
      efectivo_contado: 590000,
      diferencia: 0,
      estado: 'cerrada',
      transacciones: [
        { tipo: 'egreso', monto: 30000, concepto: 'Pago a proveedor', fecha: '2024-12-12T16:00:00' }
      ]
    },
    {
      id: 4,
      usuario: 'Ana Martínez',
      fecha_apertura: '2024-12-11T08:00:00',
      fecha_cierre: '2024-12-11T20:00:00',
      monto_inicial: 100000,
      total_ventas: 750000,
      total_ingresos: 15000,
      total_egresos: 20000,
      efectivo_esperado: 845000,
      efectivo_contado: 847000,
      diferencia: 2000,
      estado: 'cerrada',
      transacciones: [
        { tipo: 'ingreso', monto: 15000, concepto: 'Propina adicional', fecha: '2024-12-11T12:00:00' },
        { tipo: 'egreso', monto: 20000, concepto: 'Servicio de domicilio', fecha: '2024-12-11T18:00:00' }
      ]
    }
  ];

  useEffect(() => {
    fetchCashRegisters();
    checkActiveCashRegister();
  }, [filters, sortConfig, pagination.page]);

  const fetchCashRegisters = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      let filtered = [...mockCashRegisters];

      // Aplicar filtros
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filtered = filtered.filter(cr =>
          cr.id.toString().includes(searchLower) ||
          cr.usuario.toLowerCase().includes(searchLower)
        );
      }

      if (filters.estado) {
        filtered = filtered.filter(cr => cr.estado === filters.estado);
      }

      if (filters.fecha_desde) {
        filtered = filtered.filter(cr => 
          new Date(cr.fecha_apertura) >= new Date(filters.fecha_desde)
        );
      }

      if (filters.fecha_hasta) {
        filtered = filtered.filter(cr => 
          new Date(cr.fecha_apertura) <= new Date(filters.fecha_hasta + 'T23:59:59')
        );
      }

      // Ordenamiento
      filtered.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (sortConfig.key === 'fecha_apertura' || sortConfig.key === 'fecha_cierre') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        }

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });

      // Paginación
      const total = filtered.length;
      const totalPages = Math.ceil(total / pagination.limit);
      const start = (pagination.page - 1) * pagination.limit;
      const paginated = filtered.slice(start, start + pagination.limit);

      setCashRegisters(paginated);
      setPagination(prev => ({ ...prev, total, totalPages }));
    } catch (err) {
      setError('Error al cargar las cajas');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const checkActiveCashRegister = () => {
    // Buscar si hay una caja abierta
    const active = mockCashRegisters.find(cr => cr.estado === 'abierta');
    setActiveCashRegister(active || null);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handlePageChange = (page) => {
    setPagination(prev => ({ ...prev, page }));
  };

  // Operaciones de caja
  const openOpenDialog = () => {
    setIsOpenDialogOpen(true);
  };

  const openCloseDialog = () => {
    if (activeCashRegister) {
      setSelectedCashRegister(activeCashRegister);
      setIsCloseDialogOpen(true);
    }
  };

  const openTransactionDialog = (type) => {
    if (activeCashRegister) {
      setTransactionType(type);
      setIsTransactionDialogOpen(true);
    }
  };

  const openViewDialog = (cashRegister) => {
    setSelectedCashRegister(cashRegister);
    setIsViewDialogOpen(true);
  };

  const closeDialogs = () => {
    setIsOpenDialogOpen(false);
    setIsCloseDialogOpen(false);
    setIsTransactionDialogOpen(false);
    setIsViewDialogOpen(false);
    setSelectedCashRegister(null);
  };

  const handleOpenCashRegister = async (data) => {
    try {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));

      console.log('Abriendo caja:', data);

      // Simular creación de nueva caja
      const newCashRegister = {
        id: mockCashRegisters.length + 1,
        usuario: 'Usuario Actual',
        fecha_apertura: new Date().toISOString(),
        fecha_cierre: null,
        monto_inicial: data.monto_inicial,
        total_ventas: 0,
        total_ingresos: 0,
        total_egresos: 0,
        efectivo_esperado: data.monto_inicial,
        efectivo_contado: null,
        diferencia: null,
        estado: 'abierta',
        transacciones: []
      };

      setActiveCashRegister(newCashRegister);
      await fetchCashRegisters();
      closeDialogs();

      return { success: true, message: 'Caja abierta exitosamente' };
    } catch (err) {
      console.error('Error al abrir caja:', err);
      return { success: false, message: 'Error al abrir la caja' };
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseCashRegister = async (data) => {
    try {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));

      console.log('Cerrando caja:', data);

      // Actualizar caja cerrada
      setActiveCashRegister(null);
      await fetchCashRegisters();
      closeDialogs();

      return { success: true, message: 'Caja cerrada exitosamente' };
    } catch (err) {
      console.error('Error al cerrar caja:', err);
      return { success: false, message: 'Error al cerrar la caja' };
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTransaction = async (data) => {
    try {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));

      console.log('Agregando transacción:', data);

      // Actualizar caja activa
      await fetchCashRegisters();
      closeDialogs();

      return { success: true, message: `${transactionType === 'ingreso' ? 'Ingreso' : 'Egreso'} registrado exitosamente` };
    } catch (err) {
      console.error('Error al registrar transacción:', err);
      return { success: false, message: 'Error al registrar la transacción' };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    cashRegisters,
    activeCashRegister,
    isLoading,
    error,
    filters,
    pagination,
    sortConfig,
    selectedCashRegister,
    isOpenDialogOpen,
    isCloseDialogOpen,
    isTransactionDialogOpen,
    isViewDialogOpen,
    transactionType,
    handleFilterChange,
    handleSort,
    handlePageChange,
    openOpenDialog,
    openCloseDialog,
    openTransactionDialog,
    openViewDialog,
    closeDialogs,
    handleOpenCashRegister,
    handleCloseCashRegister,
    handleAddTransaction
  };
};
