import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ requireAdmin = false }) => {
    // Traemos los datos del contexto global
    const { user, loading, isAdmin } = useAuth();

    // 1. Si React todavía está chequeando la sesión en localStorage, mostramos esto
    if (loading) {
        return <div className="text-center mt-10">Cargando sesión...</div>;
    }

    // 2. Si no hay usuario, lo pateamos al login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // 3. Si la ruta pide admin y el usuario es común, lo pateamos al inicio
    if (requireAdmin && !isAdmin) {
        return <Navigate to="/" replace />;
    }

    // 4. Si pasó todo, el <Outlet /> muestra la página que quería ver
    return <Outlet />;
};

export default ProtectedRoute;