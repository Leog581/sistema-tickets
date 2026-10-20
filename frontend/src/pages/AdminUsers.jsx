import { useState, useEffect } from 'react';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    // Necesitamos saber quién es el admin logueado para bloquear su propio selector
    const { user: currentUser } = useAuth();

    // 1. Traemos todos los usuarios
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await api('/users');
                setUsers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    // 2. Función para cambiar el rol
    const handleRoleChange = async (id, newRole) => {
        try {
            await api(`/users/${id}/role`, {
                method: 'PATCH',
                body: JSON.stringify({ role: newRole })
            });
            
            // Actualizamos la lista local
            setUsers(users.map(u => u.id === id ? { ...u, role: newRole } : u));
        } catch (err) {
            alert('Error al cambiar rol: ' + err.message);
        }
    };

    if (loading) return <Loading />;
    if (error) return <div className="text-center mt-10 text-red-600">Error: {error}</div>;

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Administrar Usuarios</h2>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-800 text-white text-xs uppercase tracking-wider">
                            <th className="p-4 font-semibold">ID</th>
                            <th className="p-4 font-semibold">Nombre</th>
                            <th className="p-4 font-semibold">Email</th>
                            <th className="p-4 font-semibold">Rol</th>
                            <th className="p-4 font-semibold">Cambiar Rol</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {users.map((u) => {
                            const isSelf = u.id === currentUser.id;
                            return (
                                <tr key={u.id} className={`hover:bg-blue-50/50 transition-colors even:bg-gray-50/50 ${isSelf ? 'bg-blue-50/30' : ''}`}>
                                    <td className="p-4 font-bold text-gray-400">#{u.id}</td>
                                    <td className="p-4 font-bold text-gray-800">
                                        {u.name} {isSelf && <span className="text-xs text-blue-600 ml-2 bg-blue-100 px-2 py-0.5 rounded-full">(Vos)</span>}
                                    </td>
                                    <td className="p-4 text-sm text-gray-600">{u.email}</td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${u.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}`}>
                                            {u.role}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <select 
                                            value={u.role}
                                            onChange={(e) => handleRoleChange(u.id, e.target.value)}
                                            disabled={isSelf}
                                            className={`border border-gray-300 p-1.5 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none ${isSelf ? 'opacity-50 cursor-not-allowed bg-gray-100' : 'cursor-pointer'}`}
                                        >
                                            <option value="user">Usuario</option>
                                            <option value="admin">Administrador</option>
                                        </select>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminUsers;