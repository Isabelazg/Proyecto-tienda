import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "@/pages/Auth/Login/LoginPage";
import RegisterPage from "@/pages/Auth/Register/RegisterPage";
import DashboardPage from "@/pages/dashboard/DashboardPage";
import ProductsManagementPage from "@/pages/products/ProductsManagementPage";
import SalesPage from "@/pages/Sales/SalesPage";

const AppRoutes = () => {
	return (
		<Routes>
			{/* Auth Routes */}
			<Route path="/auth/login" element={<LoginPage />} />
			<Route path="/auth/register" element={<RegisterPage />} />
			
			{/* Protected Routes - POS System */}
			<Route path="/dashboard" element={<DashboardPage />} />
			<Route path="/ventas" element={<SalesPage />} />
			<Route path="/productos" element={<ProductsManagementPage />} />
			
			{/* Redirect root to dashboard */}
			<Route path="/" element={<Navigate to="/dashboard" />} />
			
			{/* Redirect unknown routes to dashboard */}
			<Route path="*" element={<Navigate to="/dashboard" />} />
		</Routes>
	);
};

export default AppRoutes;
