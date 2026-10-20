const StatusBadge = ({ status }) => {
    // Diccionario de colores según el estado
    const styles = {
        open: 'bg-green-100 text-green-800',
        in_progress: 'bg-yellow-100 text-yellow-800',
        closed: 'bg-red-100 text-red-800',
    };

    const labels = {
        open: 'Abierto',
        in_progress: 'En proceso',
        closed: 'Cerrado',
    };

    return (
        <span className={`px-2 py-1 rounded-full text-xs font-bold ${styles[status] || 'bg-gray-100'}`}>
            {labels[status] || status}
        </span>
    );
};

export default StatusBadge;