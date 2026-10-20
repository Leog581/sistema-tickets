import { products } from '../data/products';

const Products = () => {
    return (
        <div>
            <h2 className="text-3xl font-bold text-center mb-8">Nuestros Servicios</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <div key={product.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-lg transition-shadow flex flex-col justify-between">
                        <div>
                            <h3 className="text-xl font-bold mb-2 text-blue-600">{product.name}</h3>
                            <p className="text-gray-600 mb-4 text-sm">{product.description}</p>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                            <span className="text-lg font-bold">{product.price}</span>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition-colors">
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