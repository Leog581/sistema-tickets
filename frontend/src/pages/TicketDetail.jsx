import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api } from '../api/client';
import StatusBadge from '../components/StatusBadge';
import { useAuth } from '../context/AuthContext';

const TicketDetail = () => {
    const { id } = useParams(); // Agarramos el ID de la URL
    const navigate = useNavigate();
    const { isAdmin } = useAuth(); // Para saber si es admin

    const [ticket, setTicket] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    // Estados para la edición
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');

    // 1. Buscamos el ticket apenas carga la pantalla
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

    // 2. Función para guardar los cambios (PATCH)
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const updated = await api(`/tickets/${id}`, {
                method: 'PATCH',
                body: JSON.stringify({ title: editTitle, description: editDescription }),
            });
            setTicket(updated);
            setIsEditing(false); // Salimos del modo edición
            setError('');
        } catch (err) {
            setError(err.message);
        }
    };

    // 3. Función para eliminar (DELETE)
    const handleDelete = async () => {
        // Confirmación nativa del navegador (RF de usabilidad)
        if (!window.confirm('¿Estás seguro de que querés eliminar este ticket? Esta acción no se puede deshacer.')) {
            return;
        }

        try {
            await api(`/tickets/${id}`, { method: 'DELETE' });
            navigate('/tickets'); // Volvemos a la lista
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <div className="text-center mt-10">Cargando ticket...</div>;
    if (error) return <div className="text-center mt-10 text-red-600">Error: {error}</div>;
    if (!ticket) return <div className="text-center mt-10">Ticket no encontrado</div>;

    // ¿El ticket está abierto? Solo si lo está, mostramos botones de acción
    const isOpen = ticket.status === 'open';
    
    // ¿Puede editarlo? Solo si está abierto (el backend ya sabe si es el dueño, pero en el frontend 
    // mostramos el botón si está abierto. Si el admin mira un ticket ajeno abierto, 
    // el backend lo va a rebotar con 404 si intenta editar. Para el MVP está bien así).
    const canEditOrDelete = isOpen; 

    return (
        <div className="max-w-3xl mx-auto mt-8 bg-white p-8 rounded shadow-md">
            <div className="flex justify-between items-start mb-6 border-b pb-4">
                <div>
                    <h2 className="text-3xl font-bold">
                        <span className="text-gray-400 mr-2">#{ticket.id}</span>
                        {ticket.title}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Creado el {new Date(ticket.createdAt).toLocaleString('es-AR')}
                    </p>
                </div>
                <StatusBadge status={ticket.status} />
            </div>

            {/* MODO EDICIÓN */}
            {isEditing ? (
                <form onSubmit={handleUpdate} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-1 font-medium">Título</label>
                        <input 
                            type="text" 
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
                            required 
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1 font-medium">Descripción</label>
                        <textarea 
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                            rows="5"
                            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
                            required 
                        ></textarea>
                    </div>
                    <div className="flex gap-2">
                        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                            Guardar Cambios
                        </button>
                        <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">
                            Cancelar
                        </button>
                    </div>
                </form>
            ) : (
                /* MODO LECTURA */
                <div>
                    <h3 className="font-bold text-gray-700 mb-2">Descripción:</h3>
                    <p className="text-gray-800 whitespace-pre-wrap bg-gray-50 p-4 rounded border">
                        {ticket.description}
                    </p>

                    {/* Botones de acción: solo si el ticket está abierto */}
                    <div className="mt-8 flex gap-4 border-t pt-6">
                        <Link to="/tickets" className="text-blue-600 hover:underline mr-auto">
                            ← Volver a mis tickets
                        </Link>
                        
                        {canEditOrDelete && (
                            <>
                                <button 
                                    onClick={() => setIsEditing(true)}
                                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                                >
                                    Editar
                                </button>
                                <button 
                                    onClick={handleDelete}
                                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                                >
                                    Eliminar
                                </button>
                            </>
                        )}
                    </div>
                    
                    {/* Aviso si está cerrado */}
                    {!canEditOrDelete && (
                        <p className="text-sm text-gray-500 mt-4 text-center">
                            Este ticket ya no se puede editar ni eliminar porque fue tomado por un administrador.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default TicketDetail;