import { Link } from 'react-router-dom';

const Footer = () => {
    const currentDate = new Date().toLocaleDateString('es-AR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <footer className="bg-slate-900 text-slate-300 mt-auto w-full border-t border-slate-800">
            {/* Redujimos py-10 a py-6 */}
            <div className="container mx-auto px-6 py-6">
                
                {/* Grid: 1 columna en celular (marca), 2 en tablets, 4 en PC */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    
                    {/* Marca: ocupa 2 columnas en celular (ancho completo) y 2 en PC */}
                    <div className="col-span-2">
                        <Link to="/" className="text-xl font-bold text-white flex items-center gap-2 mb-2 hover:text-blue-400 transition-colors w-fit">
                            🛠️ Soporte Técnico
                        </Link>
                        <p className="text-xs md:text-sm text-slate-400 leading-relaxed max-w-sm">
                            Soluciones informáticas rápidas y eficientes para que tus problemas no frenen tu día a día.
                        </p>
                    </div>

                    {/* Links: ocupa 1 columna en celular y 1 en PC */}
                    <div>
                        <h4 className="text-white text-sm font-semibold mb-3">Enlaces</h4>
                        <ul className="space-y-2 text-xs md:text-sm">
                            <li>
                                <Link to="/" className="hover:text-blue-400 transition-colors">Inicio</Link>
                            </li>
                            <li>
                                <Link to="/products" className="hover:text-blue-400 transition-colors">Servicios</Link>
                            </li>
                            <li>
                                <Link to="/login" className="hover:text-blue-400 transition-colors">Acceso Clientes</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contacto: ocupa 1 columna en celular y 1 en PC */}
                    <div>
                        <h4 className="text-white text-sm font-semibold mb-3">Contacto</h4>
                        <ul className="space-y-2 text-xs md:text-sm text-slate-400">
                            <li className="flex items-center gap-2">
                                <span>✉️</span> leogon581@gmail.com
                            </li>
                            <li className="flex items-center gap-2">
                                <span>📍</span> Santa Fe, AR
                            </li>
                            <li className="flex items-center gap-2">
                                <span>🕒</span> Lun - Vie: 9 a 18h
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Línea divisoria y Copyright - Redujimos los márgenes superiores */}
                <div className="border-t border-slate-800 mt-6 pt-4 flex flex-col md:flex-row justify-between items-center text-[11px] md:text-xs text-slate-500 gap-3">
                    <p className="text-center md:text-left">© {new Date().getFullYear()} Sistema de Tickets. Todos los derechos reservados.</p>
                    
                    <div className="flex items-center gap-2 bg-slate-800 px-3 py-1 rounded-full">
                        <span>📅</span>
                        <span className="font-medium text-slate-300">{currentDate}</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;