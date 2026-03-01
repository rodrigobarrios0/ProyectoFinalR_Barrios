import { useState } from "react";
import Toastify from 'toastify-js';

const ItemCount = ({ onAddToCart, stock = 10 }) => {
    const [count, setCount] = useState(1);

    const handleDecrement = () => {
        if (count > 1) setCount(count - 1);
    };

    const handleIncrement = () => {
        if (count < stock) {
            setCount(count + 1);
        } else {
            Toastify({
                text: `❌ Stock máximo: ${stock}`,
                duration: 3000,
                backgroundColor: "#FF9800",
                position: "right",
                gravity: "top"
            }).showToast();
        }
    };

    const handleAddToCart = () => {
        if (onAddToCart) {
            onAddToCart(count);
        }
        setCount(1);
    };

    return (
        <div className="flex items-center gap-4 mb-6 bg-gray-100 p-4 rounded-lg">
            <button 
                onClick={handleDecrement}
                disabled={count <= 1}
                className="bg-red-500 text-white w-10 h-10 rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-lg">
                −
            </button>

            <span className="text-2xl font-bold min-w-12 text-center">
                {count}
            </span>

            <button 
                onClick={handleIncrement}
                disabled={count >= stock}
                className="bg-green-500 text-white w-10 h-10 rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-lg">
                +
            </button>

            <button 
                onClick={handleAddToCart}
                className="ml-auto bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold">
                Agregar al carrito
            </button>
        </div>
    );
};

export default ItemCount;