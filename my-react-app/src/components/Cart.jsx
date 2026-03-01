import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, clearCart, getTotalPrice, getTotalQuantity } = useCart();

    if (cart.length === 0) {
        return (
            <div className="max-w-4xl mx-auto p-6 text-center">
                <h2 className="text-3xl font-bold mb-4">🛒 Tu carrito está vacío</h2>
                <Link 
                    to="/" 
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                    Volver a comprar
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6">🛒 Mi Carrito</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                    {cart.map(item => (
                        <div key={item.id} className="bg-white rounded-lg shadow p-4 flex gap-4">
                            <img 
                                src={item.image} 
                                alt={item.title} 
                                className="w-24 h-24 object-contain"
                            />

                            <div className="flex-1">
                                <h3 className="font-bold text-lg">{item.title}</h3>
                                <p className="text-green-600 font-semibold">${item.price}</p>
                            </div>

                            <div className="flex items-center gap-3">
                                <button 
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="bg-red-500 text-white w-8 h-8 rounded hover:bg-red-600">
                                    −
                                </button>

                                <span className="font-bold w-8 text-center">{item.quantity}</span>

                                <button 
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    disabled={item.quantity >= item.stock}
                                    className="bg-green-500 text-white w-8 h-8 rounded hover:bg-green-600 disabled:opacity-50">
                                    +
                                </button>

                                <button 
                                    onClick={() => removeFromCart(item.id)}
                                    className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 ml-2">
                                    Eliminar
                                </button>
                            </div>

                            <div className="text-right">
                                <p className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                                <p className="text-sm text-gray-500">Stock: {item.stock}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-lg shadow p-6 h-fit">
                    <h3 className="text-2xl font-bold mb-4">Resumen</h3>

                    <div className="space-y-3 mb-6 border-b pb-4">
                        <div className="flex justify-between">
                            <span>Productos:</span>
                            <span className="font-bold">{getTotalQuantity()}</span>
                        </div>
                        <div className="flex justify-between text-xl font-bold">
                            <span>Total:</span>
                            <span className="text-green-600">${getTotalPrice().toFixed(2)}</span>
                        </div>
                    </div>

                    
                    <Link 
                        to="/checkout"
                        className="bg-green-600 text-white w-full py-3 rounded-lg hover:bg-green-700 font-bold mb-2 block text-center">
                        Proceder al pago
                    </Link>

                    <button 
                        onClick={clearCart}
                        className="bg-red-600 text-white w-full py-2 rounded-lg hover:bg-red-700">
                        Vaciar carrito
                    </button>

                    <Link 
                        to="/" 
                        className="block text-center mt-4 text-blue-600 hover:underline">
                        Seguir comprando
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;