import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <h1 className="text-9xl font-extrabold text-blue-600 mb-4">404</h1>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Opción no disponible</h2>
            <p className="text-gray-500 mb-8 max-w-md">
                La página que estás buscando no existe, fue movida o no tenés permiso para verla.
            </p>
            <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-lg">
                Volver al Inicio
            </Link>
        </div>
    );
};

export default NotFound;