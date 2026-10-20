import { products } from '../data/products';

const Products = () => {
    return (
        <div className="max-w-6xl mx-auto mt-6">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-extrabold text-gray-800 mb-2">Nuestros Servicios</h2>
                <p className="text-gray-500 text-lg">Soluciones tecnológicas diseñadas para potenciar tu trabajo.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map((product) => (
                    <div key={product.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group">
                        <div>
                            <div className="mb-4 overflow-hidden rounded-xl h-40">
                                <img 
                                    src={product.image} 
                                    alt={product.name} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                                />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-gray-800">{product.name}</h3>
                            <p className="text-gray-500 mb-6 text-sm leading-relaxed">{product.description}</p>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                            <span className="text-2xl font-extrabold text-blue-600">{product.price}</span>
                            <button className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg font-bold text-sm hover:bg-blue-600 hover:text-white transition-colors">
                                Consultar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;