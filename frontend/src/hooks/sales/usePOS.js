import { useState, useEffect } from 'react';

export const usePOS = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('1'); // 1=Efectivo
  const [selectedWaiter, setSelectedWaiter] = useState(''); // Mesero asignado
  const [selectedCustomer, setSelectedCustomer] = useState(''); // Cliente asociado
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mock data - Productos disponibles
  const mockProducts = [
    { 
      producto_id: 1, 
      nombre: 'Café Colombiano Premium', 
      precio: 8500, 
      stock: 45,
      categoria: 'Bebidas',
      estado: 'activo'
    },
    { 
      producto_id: 2, 
      nombre: 'Hamburguesa Especial', 
      precio: 25000, 
      stock: 30,
      categoria: 'Comida',
      estado: 'activo'
    },
    { 
      producto_id: 3, 
      nombre: 'Pizza Margarita', 
      precio: 35000, 
      stock: 20,
      categoria: 'Comida',
      estado: 'activo'
    },
    { 
      producto_id: 4, 
      nombre: 'Jugo Natural de Naranja', 
      precio: 6000, 
      stock: 60,
      categoria: 'Bebidas',
      estado: 'activo'
    },
    { 
      producto_id: 5, 
      nombre: 'Ensalada César', 
      precio: 18000, 
      stock: 25,
      categoria: 'Comida',
      estado: 'activo'
    },
    { 
      producto_id: 6, 
      nombre: 'Té Helado', 
      precio: 5500, 
      stock: 50,
      categoria: 'Bebidas',
      estado: 'activo'
    }
  ];

  // Cargar productos disponibles
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // TODO: Reemplazar con llamada real a la API
      // const response = await fetch('/api/productos?estado=activo');
      // const data = await response.json();
      // setProducts(data);
      
      setProducts(mockProducts);
    } catch (err) {
      console.error('Error loading products:', err);
      setError('Error al cargar los productos');
    }
  };

  // Funciones del carrito
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.producto_id === product.producto_id);
    
    if (existingItem) {
      // Verificar stock
      if (existingItem.cantidad >= product.stock) {
        setError(`Stock insuficiente para ${product.nombre}`);
        return;
      }
      
      setCart(cart.map(item =>
        item.producto_id === product.producto_id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      ));
    } else {
      setCart([...cart, {
        producto_id: product.producto_id,
        nombre: product.nombre,
        precio: product.precio,
        cantidad: 1,
        stock: product.stock
      }]);
    }
    
    setError(null);
  };

  const removeFromCart = (producto_id) => {
    setCart(cart.filter(item => item.producto_id !== producto_id));
  };

  const updateCartQuantity = (producto_id, cantidad) => {
    if (cantidad <= 0) {
      removeFromCart(producto_id);
      return;
    }

    const item = cart.find(item => item.producto_id === producto_id);
    if (item && cantidad > item.stock) {
      setError(`Stock insuficiente. Disponible: ${item.stock}`);
      return;
    }

    setCart(cart.map(item =>
      item.producto_id === producto_id
        ? { ...item, cantidad }
        : item
    ));
    
    setError(null);
  };

  const clearCart = () => {
    setCart([]);
    setSelectedPaymentMethod('1');
    setSelectedWaiter('');
    setSelectedCustomer('');
    setError(null);
  };

  // Calcular totales
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  const cartTotal = cartSubtotal; // Aquí se pueden agregar impuestos o descuentos

  // Completar venta
  const completeSale = async () => {
    if (cart.length === 0) {
      setError('El carrito está vacío');
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      // TODO: Reemplazar con llamada real a la API
      // const response = await fetch('/api/ventas', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     items: cart.map(item => ({
      //       producto_id: item.producto_id,
      //       cantidad: item.cantidad,
      //       precio: item.precio
      //     })),
      //     metodo_pago_id: selectedPaymentMethod,
      //     mesero_id: selectedWaiter || null,
      //     cliente_id: selectedCustomer || null,
      //     total: cartTotal
      //   })
      // });
      // 
      // if (!response.ok) {
      //   throw new Error('Error al completar la venta');
      // }

      // Simular API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simular respuesta exitosa
      console.log('Venta completada:', {
        items: cart,
        metodo_pago_id: selectedPaymentMethod,
        mesero_id: selectedWaiter,
        cliente_id: selectedCustomer,
        total: cartTotal
      });

      clearCart();
      setIsLoading(false);
      return true;
    } catch (err) {
      console.error('Error completing sale:', err);
      setError('Error al completar la venta');
      setIsLoading(false);
      return false;
    }
  };

  return {
    products,
    cart,
    selectedPaymentMethod,
    selectedWaiter,
    selectedCustomer,
    cartSubtotal,
    cartTotal,
    isLoading,
    error,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    setSelectedPaymentMethod,
    setSelectedWaiter,
    setSelectedCustomer,
    completeSale,
    fetchProducts
  };
};
