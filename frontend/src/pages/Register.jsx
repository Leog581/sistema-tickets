import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await register(name, email, password);
            navigate('/tickets'); // Si se registra bien, ya queda logueado y va a sus tickets
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Crear Cuenta</h2>
            
            {error && (
                <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 mb-1">Nombre</label>
                    <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required 
                    />
                </div>
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
                    <label className="block text-gray-700 mb-1">Contraseña (mínimo 6 caracteres)</label>
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required 
                        minLength={6}
                    />
                </div>
                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 disabled:bg-green-300"
                >
                    {loading ? 'Registrando...' : 'Registrarse'}
                </button>
            </form>

            <p className="mt-4 text-center text-sm text-gray-600">
                ¿Ya tenés cuenta? <Link to="/login" className="text-blue-600 hover:underline">Iniciá sesión</Link>
            </p>
        </div>
    );
};

export default Register;