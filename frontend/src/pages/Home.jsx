import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { slides } from '../data/slides';

const Home = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000); // Un poquito más lento para que se pueda leer
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="space-y-12">
            {/* 1. Carrusel Mejorado */}
            <div 
                className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 bg-cover bg-center"
                style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
            >
                {/* Capa oscura para que el texto sea legible */}
                <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white text-center p-6">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
                        {slides[currentSlide].title}
                    </h1>
                    <p className="text-lg md:text-2xl font-medium mb-8 max-w-2xl drop-shadow-md">
                        {slides[currentSlide].description}
                    </p>
                    <div className="flex gap-4">
                        <Link to="/register" className="bg-white text-gray-900 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-lg">
                            Empezar ahora
                        </Link>
                        <Link to="/products" className="bg-transparent border-2 border-white px-6 py-3 rounded-full font-bold hover:bg-white/20 transition-colors shadow-lg">
                            Ver servicios
                        </Link>
                    </div>
                </div>
                
                {/* Indicadores del carrusel */}
                <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/80'}`}
                        />
                    ))}
                </div>
            </div>

            {/* 2. Sección de Características (Nueva) */}
            <div className="text-center max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-4 text-gray-800">¿Por qué elegirnos?</h2>
                <p className="text-gray-600 mb-10">Brindamos soluciones informáticas rápidas, seguras y adaptadas a tus necesidades.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="text-4xl mb-4">🚀</div>
                        <h3 className="text-xl font-bold mb-2">Rápido y Eficiente</h3>
                        <p className="text-gray-600 text-sm">Atendemos tus tickets en tiempo récord para que no frenes tus actividades.</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="text-4xl mb-4">🔧</div>
                        <h3 className="text-xl font-bold mb-2">Soporte Especializado</h3>
                        <p className="text-gray-600 text-sm">Contamos con expertos en hardware, software y redes listos para ayudarte.</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="text-4xl mb-4">💬</div>
                        <h3 className="text-xl font-bold mb-2">Seguimiento en Vivo</h3>
                        <p className="text-gray-600 text-sm">Mirá el estado de tu problema en todo momento desde tu panel de control.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;