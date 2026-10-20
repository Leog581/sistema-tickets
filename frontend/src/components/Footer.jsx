const Footer = () => {
    // Obtenemos la fecha actual formateada en español
    const currentDate = new Date().toLocaleDateString('es-AR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <footer className="bg-gray-800 text-white text-center p-4 mt-auto w-full">
            <p>Sistema de Tickets - Soporte Técnico</p>
            <p className="text-sm text-gray-400">Contacto: leogon581@gmail.com</p>
            <p className="text-sm text-gray-400 mt-2">Fecha actual: {currentDate}</p>
        </footer>
    );
};

export default Footer;