import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "@/pages/Auth/Login/LoginPage";
import RegisterPage from "@/pages/Auth/Register/RegisterPage";
import ForgotPasswordPage from "@/pages/Auth/ForgotPassword/ForgotPasswordPage";
import DashboardPage from "@/pages/dashboard/DashboardPage";
import ProductsManagementPage from "@/pages/products/ProductsManagementPage";
import SalesPage from "@/pages/Sales/SalesPage";
import CustomersManagementPage from "@/pages/Customers/CustomersManagementPage";
import CategoriesManagementPage from "@/pages/Categories/CategoriesManagementPage";
import UsersManagementPage from "@/pages/Users/UsersManagementPage";
import RolesManagementPage from "@/pages/Roles/RolesManagementPage";
import OrdersManagementPage from "@/pages/Orders/OrdersManagementPage";
import CashRegisterManagementPage from "@/pages/CashRegister/CashRegisterManagementPage";

const AppRoutes = () => {
	return (
		<Routes>
			{/* Auth Routes */}
			<Route path="/auth/login" element={<LoginPage />} />
			<Route path="/auth/register" element={<RegisterPage />} />
			<Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
			
			{/* Protected Routes - POS System */}
			<Route path="/dashboard" element={<DashboardPage />} />
			<Route path="/ventas" element={<SalesPage />} />
			<Route path="/productos" element={<ProductsManagementPage />} />
			<Route path="/clientes" element={<CustomersManagementPage />} />
			<Route path="/categorias" element={<CategoriesManagementPage />} />
			<Route path="/usuarios" element={<UsersManagementPage />} />
			<Route path="/roles" element={<RolesManagementPage />} />
			<Route path="/pedidos" element={<OrdersManagementPage />} />
			<Route path="/caja" element={<CashRegisterManagementPage />} />
			
			{/* Redirect root to dashboard */}
			<Route path="/" element={<Navigate to="/dashboard" />} />
			
			{/* Redirect unknown routes to dashboard */}
			<Route path="*" element={<Navigate to="/dashboard" />} />
		</Routes>
	);
};

export default AppRoutes;
