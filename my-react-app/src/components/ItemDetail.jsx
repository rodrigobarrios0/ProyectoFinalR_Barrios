import ItemCount from "./ItemCount";
import { useCart } from "../context/CartContext";
import Toastify from 'toastify-js';

const ItemDetail = ({ id, title, description, price, image, stock = 10 }) => {
    const { addToCart } = useCart();

    const handleAddToCart = (quantity) => {
        if (quantity > stock) {
            Toastify({
                text: `❌ Solo hay ${stock} productos disponibles`,
                duration: 3000,
                backgroundColor: "#f44336",
                position: "right",
                gravity: "top"
            }).showToast();
            return;
        }

        addToCart({
            id,
            title,
            price,
            image,
            stock,
            quantity
        });

        Toastify({
            text: "✅ ¡Producto agregado al carrito!",
            duration: 3000,
            backgroundColor: "#4CAF50",
            position: "right",
            gravity: "top"
        }).showToast();
    }

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">{title}</h2>
            
            <img 
                src={image} 
                alt={title} 
                className="w-full h-80 object-contain mb-4 bg-gray-100 rounded" 
            />

            <p className="text-gray-600 mb-4 text-lg">{description}</p>
            
            <div className="flex justify-between items-center mb-4">
                <p className="text-3xl font-bold text-green-600">${price}</p>
                <span className={`text-lg font-semibold ${stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {stock > 0 ? `📦 Stock: ${stock}` : "❌ Sin stock"}
                </span>
            </div>

            {stock > 0 ? (
                <>
                    <ItemCount onAddToCart={handleAddToCart} stock={stock} />
                    <button 
                        onClick={() => handleAddToCart(1)} 
                        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 w-full font-bold text-lg transition">
                        🛒 Comprar Ahora
                    </button>
                </>
            ) : (
                <button 
                    disabled
                    className="bg-gray-400 text-white px-6 py-3 rounded-lg w-full font-bold text-lg cursor-not-allowed">
                    Sin stock
                </button>
            )}
        </div>
    );
};

export default ItemDetail;