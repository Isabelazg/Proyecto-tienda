import { useAuthStore } from "@/store/authStore"
import { Navigate } from "react-router-dom"

const PrivateRoute = ({ children }) => {
    const token = useAuthStore((state) => state.token) || localStorage.getItem("token")
    return token ? children : <Navigate to="/ingresar" replace />
}

export default PrivateRoute