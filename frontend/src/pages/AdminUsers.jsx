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

            <div className="bg-white rounded shadow overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="p-3">ID</th>
                            <th className="p-3">Nombre</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Rol Actual</th>
                            <th className="p-3">Cambiar Rol</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u) => {
                            // ¿Esta fila es mi propio usuario?
                            const isSelf = u.id === currentUser.id;

                            return (
                                <tr key={u.id} className={`border-b hover:bg-gray-50 ${isSelf ? 'bg-blue-50' : ''}`}>
                                    <td className="p-3 font-medium text-gray-500">#{u.id}</td>
                                    <td className="p-3 font-bold">
                                        {u.name} {isSelf && <span className="text-xs text-blue-600 ml-2">(Vos)</span>}
                                    </td>
                                    <td className="p-3 text-sm text-gray-600">{u.email}</td>
                                    <td className="p-3">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${u.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}`}>
                                            {u.role}
                                        </span>
                                    </td>
                                    <td className="p-3">
                                        <select 
                                            value={u.role}
                                            onChange={(e) => handleRoleChange(u.id, e.target.value)}
                                            disabled={isSelf} // Bloqueamos si es el admin actual (RN-07)
                                            className={`border p-1 rounded text-sm bg-white ${isSelf ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            title={isSelf ? "No podés cambiar tu propio rol" : ""}
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