import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Users, 
  Menu, 
  X, 
  LogOut,
  BarChart3,
  Settings,
  FolderTree
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // TODO: Conectar con el estado real del usuario autenticado
  const isAuthenticated = true;
  const userName = 'Administrador';

  const handleLogout = () => {
    // TODO: Implementar lógica de logout
    console.log('Cerrando sesión...');
    navigate('/auth/login');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="bg-lime-500 p-2 rounded-lg">
              <Package className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900">Sistema Tienda</span>
              <p className="text-xs text-gray-500">Panel Administrativo</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link 
              to="/dashboard" 
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-lime-50 hover:text-lime-600 transition-colors"
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link 
              to="/ventas" 
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-lime-50 hover:text-lime-600 transition-colors"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Ventas</span>
            </Link>
            <Link 
              to="/productos" 
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-lime-50 hover:text-lime-600 transition-colors"
            >
              <Package className="h-4 w-4" />
              <span>Productos</span>
            </Link>
            <Link 
              to="/categorias" 
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-lime-50 hover:text-lime-600 transition-colors"
            >
              <FolderTree className="h-4 w-4" />
              <span>Categorías</span>
            </Link>
            <Link 
              to="/usuarios" 
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-lime-50 hover:text-lime-600 transition-colors"
            >
              <Users className="h-4 w-4" />
              <span>Usuarios</span>
            </Link>
            <Link 
              to="/reportes" 
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-lime-50 hover:text-lime-600 transition-colors"
            >
              <BarChart3 className="h-4 w-4" />
              <span>Reportes</span>
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="hidden md:flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{userName}</p>
                    <p className="text-xs text-gray-500">Admin</p>
                  </div>
                  <button
                    onClick={() => navigate('/configuracion')}
                    className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Settings className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              </>
            ) : (
              <Button
                onClick={() => navigate('/auth/login')}
                className="bg-black text-white hover:bg-gray-900"
              >
                Iniciar sesión
              </Button>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-2">
            <Link
              to="/dashboard"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center space-x-2 px-3 py-3 rounded-lg text-gray-700 hover:bg-lime-50 hover:text-lime-600"
            >
              <LayoutDashboard className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/ventas"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center space-x-2 px-3 py-3 rounded-lg text-gray-700 hover:bg-lime-50 hover:text-lime-600"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Ventas</span>
            </Link>
            <Link
              to="/productos"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center space-x-2 px-3 py-3 rounded-lg text-gray-700 hover:bg-lime-50 hover:text-lime-600"
            >
              <Package className="h-5 w-5" />
              <span>Productos</span>
            </Link>
            <Link
              to="/categorias"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center space-x-2 px-3 py-3 rounded-lg text-gray-700 hover:bg-lime-50 hover:text-lime-600"
            >
              <FolderTree className="h-5 w-5" />
              <span>Categorías</span>
            </Link>
            <Link
              to="/usuarios"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center space-x-2 px-3 py-3 rounded-lg text-gray-700 hover:bg-lime-50 hover:text-lime-600"
            >
              <Users className="h-5 w-5" />
              <span>Usuarios</span>
            </Link>
            <Link
              to="/reportes"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center space-x-2 px-3 py-3 rounded-lg text-gray-700 hover:bg-lime-50 hover:text-lime-600"
            >
              <BarChart3 className="h-5 w-5" />
              <span>Reportes</span>
            </Link>
            
            {isAuthenticated && (
              <>
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium text-gray-900">{userName}</p>
                    <p className="text-xs text-gray-500">Admin</p>
                  </div>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full flex items-center space-x-2 px-3 py-3 rounded-lg text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Cerrar sesión</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
