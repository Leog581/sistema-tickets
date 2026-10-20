import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/client';

const NewTicket = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await api('/tickets', {
                method: 'POST',
                body: JSON.stringify({ title, description }),
            });
            navigate('/tickets');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <h2 className="text-2xl font-extrabold text-gray-800 mb-2">Reportar un Problema</h2>
            <p className="text-gray-500 mb-8">Describí tu problema con el mayor detalle posible para que podamos ayudarte rápido.</p>
            
            {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm border border-red-100">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Título del ticket</label>
                    <input 
                        type="text" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Ej: La impresora no enciende"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-gray-50 focus:bg-white"
                        required 
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Descripción detallada</label>
                    <textarea 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Contanos qué pasó, cuándo empezó y qué mensajes de error aparecen..."
                        rows="6"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-gray-50 focus:bg-white resize-none"
                        required 
                    ></textarea>
                </div>

                <div className="flex justify-end gap-4 pt-4 border-t">
                    <button 
                        type="button" 
                        onClick={() => navigate('/tickets')}
                        className="px-6 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        Cancelar
                    </button>
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="bg-blue-600 text-white px-8 py-2 rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50 shadow-md transition-colors"
                    >
                        {loading ? 'Creando...' : 'Crear Ticket'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewTicket;