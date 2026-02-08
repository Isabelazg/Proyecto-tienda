import { useState } from "react"
import {
    LayoutDashboard,
    ShoppingCart,
    Package,
    Users,
    Settings,
    FolderTree,
    UserCog,
    Shield,
    ClipboardList,
    DollarSign,
    BarChart3,
    LogOut,
    Menu,
    X,
} from "lucide-react"

import { getAvatarUrl } from "@/lib/avatar"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useAuthStore } from "@/store/authStore"
import { Link, useLocation, useNavigate } from "react-router-dom"

const navItems = [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Ventas", url: "/ventas", icon: ShoppingCart },
    { title: "Pedidos", url: "/pedidos", icon: ClipboardList },
    { title: "Caja", url: "/caja", icon: DollarSign },
    { title: "Productos", url: "/productos", icon: Package },
    { title: "Clientes", url: "/clientes", icon: Users },
    { title: "Categorías", url: "/categorias", icon: FolderTree },
    { title: "Usuarios", url: "/usuarios", icon: UserCog },
    { title: "Roles", url: "/roles", icon: Shield },
    { title: "Reportes", url: "/reportes", icon: BarChart3 },
]

function getUserInitials(user) {
    if (!user) return "US"
    const nombre = user.nombre || user.nombres || ""
    const apellido = user.apellidos || ""
    const n = nombre[0] || ""
    const a = apellido[0] || ""
    return `${n}${a}`.toUpperCase() || "US"
}

function Navbar({ ...props }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { user, isAuthenticated, logout } = useAuthStore()
    const location = useLocation()
    const navigate = useNavigate()
    const initials = getUserInitials(user)
    const avatarUrl = user ? getAvatarUrl(initials) : "/avatars/default.jpg"

    const isActiveItem = (url) => {
        return location.pathname === url
    }

    const handleLogout = () => {
        logout()
        navigate('/auth/login')
    }

    return (
        <>
            <Sidebar {...props}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="flex justify-between items-center h-16">
                        <SidebarHeader>
                            <Link to="/dashboard" className="flex items-center space-x-2">
                                <div className="bg-lime-500 p-2 rounded-lg">
                                    <Package className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <span className="text-xl font-bold text-gray-900">Sistema Tienda</span>
                                </div>
                            </Link>
                        </SidebarHeader>

                        <SidebarContent className="hidden md:flex">
                            <SidebarMenu>
                                {navItems.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild isActive={isActiveItem(item.url)}>
                                            <Link to={item.url}>
                                                <item.icon className="h-4 w-4" />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarContent>

                        <SidebarFooter>
                            <div className="flex items-center space-x-4">
                                {isAuthenticated ? (
                                    <>
                                        <div className="hidden md:flex items-center space-x-3">
                                            <img 
                                                src={avatarUrl} 
                                                alt={user?.nombre || "Usuario"} 
                                                className="h-8 w-8 rounded-full"
                                            />
                                            <div className="text-right">
                                                <p className="text-sm font-medium text-gray-900">
                                                    {user?.nombre || 'Usuario'}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {user?.role?.nombre || 'Sin rol'}
                                                </p>
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
                                ) : null}

                                {/* Mobile menu button */}
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="md:hidden p-2 text-gray-700"
                                >
                                    {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                                </button>
                            </div>
                        </SidebarFooter>
                    </div>
                </div>
            </Sidebar>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-200 shadow-md">
                    <div className="px-4 py-4 space-y-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.title}
                                to={item.url}
                                onClick={() => setIsMenuOpen(false)}
                                className={`flex items-center space-x-2 px-3 py-3 rounded-lg transition-colors ${
                                    isActiveItem(item.url)
                                        ? "bg-lime-50 text-lime-600"
                                        : "text-gray-700 hover:bg-lime-50 hover:text-lime-600"
                                }`}
                            >
                                <item.icon className="h-5 w-5" />
                                <span>{item.title}</span>
                            </Link>
                        ))}
                        
                        {isAuthenticated && (
                            <>
                                <div className="border-t border-gray-200 pt-4 mt-4">
                                    <div className="flex items-center space-x-3 px-3 py-2">
                                        <img 
                                            src={avatarUrl} 
                                            alt={user?.nombre || "Usuario"} 
                                            className="h-8 w-8 rounded-full"
                                        />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">
                                                {user?.nombre || 'Usuario'}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {user?.role?.nombre || 'Sin rol'}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setIsMenuOpen(false)
                                            navigate('/configuracion')
                                        }}
                                        className="w-full flex items-center space-x-2 px-3 py-3 rounded-lg text-gray-700 hover:bg-gray-100"
                                    >
                                        <Settings className="h-5 w-5" />
                                        <span>Configuración</span>
                                    </button>
                                    <button
                                        onClick={() => {
                                            setIsMenuOpen(false)
                                            handleLogout()
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
        </>
    )
}

export { Navbar }
export default Navbar