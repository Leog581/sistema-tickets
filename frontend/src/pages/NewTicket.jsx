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
            // Hacemos el POST al backend con los datos del formulario
            await api('/tickets', {
                method: 'POST',
                body: JSON.stringify({ title, description }),
            });
            
            // Si sale bien, volvemos a la lista de tickets
            navigate('/tickets');
        } catch (err) {
            // Si el backend rebota (ej: falta un campo), mostramos el error
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded shadow-md">
            <h2 className="text-2xl font-bold mb-6">Nuevo Ticket de Soporte</h2>
            
            {error && (
                <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 mb-1">Título del problema</label>
                    <input 
                        type="text" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Ej: La PC no prende"
                        className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required 
                    />
                </div>
                
                <div>
                    <label className="block text-gray-700 mb-1">Descripción detallada</label>
                    <textarea 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Explicá qué pasó, cuándo empezó y qué mensajes de error ves..."
                        rows="5"
                        className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required 
                    ></textarea>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                    <button 
                        type="button" 
                        onClick={() => navigate('/tickets')}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                    >
                        Cancelar
                    </button>
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
                    >
                        {loading ? 'Creando...' : 'Crear Ticket'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewTicket;