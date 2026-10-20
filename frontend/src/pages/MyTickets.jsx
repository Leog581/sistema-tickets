import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';
import StatusBadge from '../components/StatusBadge';

const MyTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // 1. Pedimos los tickets a la API cuando la pantalla se carga
    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const data = await api('/tickets');
                setTickets(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTickets();
    }, []); // El array vacío [] significa que esto se ejecuta solo una vez al entrar

    // 2. Mientras carga, mostramos un mensaje
    if (loading) {
        return <div className="text-center mt-10 text-gray-600">Cargando tus tickets...</div>;
    }

    // 3. Si hubo un error, lo mostramos
    if (error) {
        return <div className="text-center mt-10 text-red-600">Error: {error}</div>;
    }

    // 4. Si no hay tickets, mostramos un mensaje amigable
    if (tickets.length === 0) {
        return (
            <div className="text-center mt-10 bg-white p-8 rounded shadow-md max-w-lg mx-auto">
                <h2 className="text-xl font-bold mb-4">No tenés tickets todavía</h2>
                <p className="text-gray-600 mb-6">Cuando reportes un problema, aparecerá acá.</p>
                <Link to="/tickets/new" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Crear mi primer ticket
                </Link>
            </div>
        );
    }

    // 5. Si hay tickets, los mostramos en una lista
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Mis Tickets</h2>
                <Link to="/tickets/new" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">
                    + Nuevo Ticket
                </Link>
            </div>

            <div className="space-y-4">
                {tickets.map((ticket) => (
                    <div key={ticket.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
                        <div>
                            {/* Mostramos el ID y el título como pide la guía (#12 La PC no prende) */}
                            <h3 className="font-bold text-lg">
                                <span className="text-gray-400 mr-2">#{ticket.id}</span>
                                {ticket.title}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                                Creado el {new Date(ticket.createdAt).toLocaleDateString('es-AR')}
                            </p>
                        </div>
                        
                        <div className="flex items-center gap-4">
                            <StatusBadge status={ticket.status} />
                            <Link to={`/tickets/${ticket.id}`} className="text-blue-600 hover:underline text-sm font-medium">
                                Ver detalle
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyTickets;