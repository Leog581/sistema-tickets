import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    // 1. Estados para los inputs y los errores
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // 2. Traemos la función login del contexto y el navigate para redirigir
    const { login } = useAuth();
    const navigate = useNavigate();

    // 3. Función que se ejecuta al enviar el formulario
    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita que la página se recargue
        setError('');
        setLoading(true);

        try {
            await login(email, password);
            navigate('/tickets'); // Si el login es exitoso, lo mandamos a sus tickets
        } catch (err) {
            setError(err.message); // Mostramos el error que devolvió el backend
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
            
            {error && (
                <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 mb-1">Email</label>
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required 
                    />
                </div>
                <div>
                    <label className="block text-gray-700 mb-1">Contraseña</label>
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required 
                    />
                </div>
                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
                >
                    {loading ? 'Ingresando...' : 'Ingresar'}
                </button>
            </form>

            <p className="mt-4 text-center text-sm text-gray-600">
                ¿No tenés cuenta? <Link to="/register" className="text-blue-600 hover:underline">Registrate acá</Link>
            </p>
        </div>
    );
};

export default Login;