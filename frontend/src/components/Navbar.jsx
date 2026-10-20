import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout, isAdmin } = useAuth();

    return (
        <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <div className="flex gap-4">
                <Link to="/" className="font-bold hover:text-gray-300">Inicio</Link>
                <Link to="/products" className="hover:text-gray-300">Productos</Link>
            </div>

            <div className="flex gap-4 items-center">
                {/* Si NO hay usuario (Visitante) */}
                {!user && (
                    <>
                        <Link to="/login" className="hover:text-gray-300">Login</Link>
                        <Link to="/register" className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700">Registro</Link>
                    </>
                )}

                {/* Si HAY usuario (Usuario o Admin) */}
                {user && (
                    <>
                        <Link to="/tickets" className="hover:text-gray-300">Mis tickets</Link>
                        <Link to="/tickets/new" className="hover:text-gray-300">Nuevo ticket</Link>
                
                        {/* Opciones solo para Admin */}
                        {isAdmin && (
                            <>
                                <Link to="/admin/tickets" className="text-yellow-400 hover:text-yellow-300">Admin Tickets</Link>
                                <Link to="/admin/users" className="text-yellow-400 hover:text-yellow-300">Admin Usuarios</Link>
                            </>
                        )}

                        <span className="text-sm text-gray-400 ml-4">Hola, {user.name}</span>
                        <button onClick={logout} className="bg-red-600 px-3 py-1 rounded hover:bg-red-700">
                            Cerrar sesión
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;