import { useState, useEffect } from 'react';

export const useCashRegisterTable = () => {
  const [cashRegisters, setCashRegisters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });
  const [filters, setFilters] = useState({
    search: '',
    estado: '', // abierta, cerrada
    fecha_desde: '',
    fecha_hasta: ''
  });
  const [sortConfig, setSortConfig] = useState({
    key: 'fecha_apertura',
    direction: 'desc',
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
  }, [pagination.currentPage, filters, sortConfig]);

  const fetchCashRegisters = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Reemplazar con llamada real a la API
      await new Promise(resolve => setTimeout(resolve, 500));

      // Aplicar filtros
      let filteredCashRegisters = [...mockCashRegisters];

      // Filtro de búsqueda (ID o usuario)
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredCashRegisters = filteredCashRegisters.filter(cr =>
          cr.id.toString().includes(searchLower) ||
          cr.usuario.toLowerCase().includes(searchLower)
        );
      }

      // Filtro de estado
      if (filters.estado) {
        filteredCashRegisters = filteredCashRegisters.filter(cr => cr.estado === filters.estado);
      }

      // Filtro de fecha desde
      if (filters.fecha_desde) {
        filteredCashRegisters = filteredCashRegisters.filter(cr => 
          new Date(cr.fecha_apertura) >= new Date(filters.fecha_desde)
        );
      }

      // Filtro de fecha hasta
      if (filters.fecha_hasta) {
        filteredCashRegisters = filteredCashRegisters.filter(cr => 
          new Date(cr.fecha_apertura) <= new Date(filters.fecha_hasta + 'T23:59:59')
        );
      }

      // Ordenamiento
      filteredCashRegisters.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (sortConfig.key === 'fecha_apertura' || sortConfig.key === 'fecha_cierre') {
          aValue = aValue ? new Date(aValue) : new Date(0);
          bValue = bValue ? new Date(bValue) : new Date(0);
        } else if (typeof aValue === 'number') {
          aValue = Number(aValue);
          bValue = Number(bValue);
        } else {
          aValue = String(aValue).toLowerCase();
          bValue = String(bValue).toLowerCase();
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });

      // Paginación
      const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
      const paginatedCashRegisters = filteredCashRegisters.slice(startIndex, startIndex + pagination.itemsPerPage);

      setCashRegisters(paginatedCashRegisters);
      setPagination({
        ...pagination,
        totalPages: Math.ceil(filteredCashRegisters.length / pagination.itemsPerPage),
        totalItems: filteredCashRegisters.length,
      });
    } catch (err) {
      setError('Error al cargar las cajas');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const checkActiveCashRegister = () => {
    // Buscar si hay una caja abierta
    const activeCashRegister = mockCashRegisters.find(cr => cr.estado === 'abierta');
    return activeCashRegister || null;
  };

  const handleSearch = (value) => {
    setFilters({ ...filters, search: value });
    setPagination({ ...pagination, currentPage: 1 });
  };

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
    setPagination({ ...pagination, currentPage: 1 });
  };

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc',
    });
  };

  const handlePageChange = (page) => {
    setPagination({ ...pagination, currentPage: page });
  };

  return {
    cashRegisters,
    isLoading,
    error,
    pagination,
    filters,
    sortConfig,
    handleSearch,
    handleFilterChange,
    handleSort,
    handlePageChange,
    checkActiveCashRegister,
    refetch: fetchCashRegisters
  };
};
