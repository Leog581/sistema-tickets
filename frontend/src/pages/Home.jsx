import { useState, useEffect } from 'react';
import { slides } from '../data/slides';

const Home = () => {
    // Estado para saber en qué slide estamos
    const [currentSlide, setCurrentSlide] = useState(0);

    // useEffect para que cambie automáticamente cada 4 segundos
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 4000);

        return () => clearInterval(timer); // Limpia el timer si el componente se desmonta
    }, []);

    return (
        <div className="space-y-8">
            {/* Carrusel */}
            <div className={`relative h-64 md:h-96 rounded-xl overflow-hidden shadow-lg transition-colors duration-500 ${slides[currentSlide].bgColor}`}>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
                    <h1 className="text-4xl font-bold mb-4">{slides[currentSlide].title}</h1>
                    <p className="text-lg md:text-xl">{slides[currentSlide].description}</p>
                </div>
                
                {/* Botones de navegación manual */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-white/50'}`}
                        />
                    ))}
                </div>
            </div>

            {/* Presentación */}
            <div className="text-center max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
                <h2 className="text-2xl font-bold mb-4">Bienvenido al Sistema de Tickets</h2>
                <p className="text-gray-600 mb-6">
                    Somos tu aliado en soporte técnico. Registrate o iniciá sesión para comenzar a gestionar tus problemas de informática.
                </p>
                {/* Aquí puedes agregar botones de llamada a la acción */}
            </div>
        </div>
    );
};

export default Home;