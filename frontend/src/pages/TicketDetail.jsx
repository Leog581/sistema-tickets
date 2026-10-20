import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api } from '../api/client';
import StatusBadge from '../components/StatusBadge';
import Loading from '../components/Loading';

const TicketDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ticket, setTicket] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');

    useEffect(() => {
        const fetchTicket = async () => {
            try {
                const data = await api(`/tickets/${id}`);
                setTicket(data);
                setEditTitle(data.title);
                setEditDescription(data.description);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchTicket();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const updated = await api(`/tickets/${id}`, {
                method: 'PATCH',
                body: JSON.stringify({ title: editTitle, description: editDescription }),
            });
            setTicket(updated);
            setIsEditing(false);
            setError('');
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('¿Estás seguro de que querés eliminar este ticket definitivamente?')) return;
        try {
            await api(`/tickets/${id}`, { method: 'DELETE' });
            navigate('/tickets');
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <Loading />;
    if (error) return <div className="text-center mt-10 text-red-600 font-bold bg-red-50 p-4 rounded max-w-lg mx-auto">{error}</div>;
    if (!ticket) return <div className="text-center mt-10">Ticket no encontrado</div>;

    const isOpen = ticket.status === 'open';

    return (
        <div className="max-w-3xl mx-auto mt-8 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex justify-between items-start mb-6 border-b border-gray-100 pb-6">
                <div>
                    <h2 className="text-3xl font-extrabold text-gray-800 flex items-center gap-3">
                        <span className="text-gray-300 text-2xl">#{ticket.id}</span>
                        {ticket.title}
                    </h2>
                    <p className="text-sm text-gray-500 mt-2 font-medium">
                        📅 Reportado el {new Date(ticket.createdAt).toLocaleString('es-AR')}
                    </p>
                </div>
                <StatusBadge status={ticket.status} />
            </div>

            {isEditing ? (
                <form onSubmit={handleUpdate} className="space-y-5 bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Título</label>
                        <input 
                            type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)}
                            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none" required 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Descripción</label>
                        <textarea 
                            value={editDescription} onChange={(e) => setEditDescription(e.target.value)} rows="5"
                            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none resize-none" required 
                        ></textarea>
                    </div>
                    <div className="flex gap-3">
                        <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700 shadow-md transition-colors">
                            Guardar Cambios
                        </button>
                        <button type="button" onClick={() => setIsEditing(false)} className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-bold hover:bg-gray-50 transition-colors">
                            Cancelar
                        </button>
                    </div>
                </form>
            ) : (
                <div>
                    <h3 className="font-bold text-gray-800 mb-3 text-lg">Descripción del problema:</h3>
                    <div className="text-gray-700 whitespace-pre-wrap bg-blue-50/50 p-6 rounded-xl border border-blue-100 leading-relaxed">
                        {ticket.description}
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3 border-t border-gray-100 pt-6 items-center">
                        <Link to="/tickets" className="text-blue-600 font-bold hover:underline mr-auto">
                            ← Volver a mis tickets
                        </Link>
                        
                        {isOpen && (
                            <>
                                <button onClick={() => setIsEditing(true)} className="bg-yellow-500 text-white px-5 py-2 rounded-lg font-bold hover:bg-yellow-600 shadow-md transition-colors">
                                    ✏️ Editar
                                </button>
                                <button onClick={handleDelete} className="bg-red-600 text-white px-5 py-2 rounded-lg font-bold hover:bg-red-700 shadow-md transition-colors">
                                    🗑️ Eliminar
                                </button>
                            </>
                        )}
                    </div>
                    
                    {!isOpen && (
                        <div className="mt-6 bg-gray-50 text-gray-500 p-4 rounded-lg text-center text-sm font-medium border border-gray-200">
                            🔒 Este ticket está {ticket.status === 'in_progress' ? 'en proceso' : 'cerrado'} y ya no se puede editar ni eliminar.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default TicketDetail;