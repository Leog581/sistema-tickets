import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';
import StatusBadge from '../components/StatusBadge';
import Loading from '../components/Loading';

const MyTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

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
    }, []);

    if (loading) return <Loading />;
    if (error) return <div className="text-center mt-10 text-red-600 font-bold">{error}</div>;

    if (tickets.length === 0) {
        return (
            <div className="text-center mt-10 bg-white p-10 rounded-2xl shadow-sm border border-gray-100 max-w-lg mx-auto">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-2xl font-extrabold mb-2 text-gray-800">¡Todo al día!</h2>
                <p className="text-gray-500 mb-8">No tenés tickets pendientes. Si tenés algún problema, no dudes en reportarlo.</p>
                <Link to="/tickets/new" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-md inline-block">
                    + Crear nuevo ticket
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-extrabold text-gray-800">Mis Tickets</h2>
                    <p className="text-gray-500 mt-1">Gestioná tus reportes de soporte</p>
                </div>
                <Link to="/tickets/new" className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-md flex items-center gap-2">
                    <span className="text-xl">+</span> Nuevo Ticket
                </Link>
            </div>

            <div className="space-y-4">
                {tickets.map((ticket) => {
                    // Elegimos el color del borde según el estado
                    const borderColor = 
                        ticket.status === 'open' ? 'border-l-green-500' :
                        ticket.status === 'in_progress' ? 'border-l-yellow-500' : 
                        'border-l-red-500';

                    return (
                        <div 
                            key={ticket.id} 
                            className={`bg-white p-5 rounded-xl shadow-sm border border-gray-100 border-l-4 ${borderColor} hover:shadow-md transition-shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-4`}
                        >
                            <div className="flex-grow">
                                <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                                    <span className="text-gray-400 font-mono text-sm bg-gray-100 px-2 py-0.5 rounded">#{ticket.id}</span>
                                    {ticket.title}
                                </h3>
                                <p className="text-sm text-gray-500 mt-2 flex items-center gap-1">
                                    📅 Reportado el {new Date(ticket.createdAt).toLocaleDateString('es-AR')}
                                </p>
                            </div>
                            
                            <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end mt-2 md:mt-0">
                                <StatusBadge status={ticket.status} />
                                <Link 
                                    to={`/tickets/${ticket.id}`} 
                                    className="bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-200 hover:text-gray-900 transition-colors border border-gray-200"
                                >
                                    Ver detalle →
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MyTickets;