import { useState, useEffect } from 'react';
import { api } from '../api/client';
import StatusBadge from '../components/StatusBadge';
import Loading from '../components/Loading';

const AdminTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    // Estado para el filtro
    const [filterStatus, setFilterStatus] = useState('all');

    // 1. Traemos TODOS los tickets
    useEffect(() => {
        const fetchAllTickets = async () => {
            try {
                const data = await api('/tickets/all');
                setTickets(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchAllTickets();
    }, []);

    // 2. Función para cambiar el estado de un ticket (PATCH)
    const handleStatusChange = async (id, newStatus) => {
        try {
            const updated = await api(`/tickets/${id}/status`, {
                method: 'PATCH',
                body: JSON.stringify({ status: newStatus })
            });
            
            // Actualizamos la lista local con el ticket modificado
            setTickets(tickets.map(t => t.id === id ? { ...t, status: updated.status } : t));
        } catch (err) {
            alert('Error al cambiar estado: ' + err.message);
        }
    };

    // 3. Función para eliminar un ticket (DELETE)
    const handleDelete = async (id) => {
        if (!window.confirm('¿Seguro que querés eliminar este ticket definitivamente?')) return;
        
        try {
            await api(`/tickets/${id}`, { method: 'DELETE' });
            // Lo sacamos de la lista local
            setTickets(tickets.filter(t => t.id !== id));
        } catch (err) {
            alert('Error al eliminar: ' + err.message);
        }
    };

    if (loading) return <Loading />;
    if (error) return <div className="text-center mt-10 text-red-600">Error: {error}</div>;

    // 4. Filtramos los tickets en el frontend según el estado elegido
    const filteredTickets = filterStatus === 'all' 
        ? tickets 
        : tickets.filter(t => t.status === filterStatus);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Administrar Todos los Tickets</h2>
                
                {/* Selector de filtro */}
                <div className="flex items-center gap-2">
                    <label className="text-sm font-medium">Filtrar por estado:</label>
                    <select 
                        value={filterStatus} 
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="border p-2 rounded bg-white text-sm"
                    >
                        <option value="all">Todos</option>
                        <option value="open">Abiertos</option>
                        <option value="in_progress">En proceso</option>
                        <option value="closed">Cerrados</option>
                    </select>
                </div>
            </div>

            <div className="bg-white rounded shadow overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="p-3">ID</th>
                            <th className="p-3">Título</th>
                            <th className="p-3">Creador</th>
                            <th className="p-3">Estado</th>
                            <th className="p-3">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTickets.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="p-4 text-center text-gray-500">
                                    No hay tickets con este filtro.
                                </td>
                            </tr>
                        ) : (
                            filteredTickets.map((ticket) => (
                                <tr key={ticket.id} className="border-b hover:bg-gray-50">
                                    <td className="p-3 font-medium text-gray-500">#{ticket.id}</td>
                                    <td className="p-3 font-bold">{ticket.title}</td>
                                    <td className="p-3 text-sm">
                                        {ticket.User.name}<br/>
                                        <span className="text-gray-400">{ticket.User.email}</span>
                                    </td>
                                    <td className="p-3">
                                        <StatusBadge status={ticket.status} />
                                    </td>
                                    <td className="p-3 flex gap-2 items-center">
                                        {/* Selector para cambiar estado rápido */}
                                        <select 
                                            value={ticket.status}
                                            onChange={(e) => handleStatusChange(ticket.id, e.target.value)}
                                            className="border p-1 rounded text-sm bg-white"
                                        >
                                            <option value="open">Abierto</option>
                                            <option value="in_progress">En proceso</option>
                                            <option value="closed">Cerrado</option>
                                        </select>
                                        
                                        <button 
                                            onClick={() => handleDelete(ticket.id)}
                                            className="text-red-600 hover:bg-red-50 px-2 py-1 rounded text-sm font-medium"
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminTickets;