import { useState } from "react";
import { useCart } from "../context/CartContext";
import { db } from "../context/FirebaseContext";
import { addDoc, collection } from "firebase/firestore";
import Toastify from 'toastify-js';

const Checkout = () => { 
    const { cart, getTotalPrice, clearCart } = useCart();
    const [orderId, setOrderId] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const buyer = {
            name: e.target.name.value,
            email: e.target.email.value,
            phone: e.target.phone.value
        };

        const order = {
            buyer,
            items: cart,
            total: getTotalPrice(),
            date: new Date(),
            status: "pendiente"
        };

        try {
            const docRef = await addDoc(collection(db, "orders"), order);
            setOrderId(docRef.id);
            clearCart();
            Toastify({
                text: "✅ ¡Orden creada exitosamente!",
                duration: 3000,
                backgroundColor: "#4CAF50",
                position: "right",
                gravity: "top"
            }).showToast();
        } catch (error) {
            console.error("❌ Error creando orden:", error);
            Toastify({
                text: "Error al crear la orden. Intenta de nuevo.",
                duration: 3000,
                backgroundColor: "#f44336",
                position: "right",
                gravity: "top"
            }).showToast();
        } finally {
            setLoading(false);
        }
    };

    if (orderId) {
        return (
            <div className="max-w-md mx-auto mt-10 p-6 bg-green-100 rounded-lg text-center">
                <h2 className="text-2xl font-bold text-green-600 mb-4">
                    ✅ ¡Gracias por tu compra!
                </h2>
                <p className="text-lg mb-4">Tu número de orden es:</p>
                <p className="text-3xl font-bold text-green-700 mb-6">{orderId}</p>
                <a 
                    href="/"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                    Volver al inicio
                </a>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="max-w-md mx-auto mt-10 p-6 bg-yellow-100 rounded-lg text-center">
                <h2 className="text-2xl font-bold mb-4">Tu carrito está vacío</h2>
                <a 
                    href="/"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                    Ir a comprar
                </a>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Finalizar Compra</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                    type="text"
                    name="name" 
                    placeholder="Nombre completo" 
                    required 
                    className="w-full p-2 border rounded-lg focus:outline-none focus:border-blue-600"
                />
                
                <input 
                    type="email"
                    name="email" 
                    placeholder="Email" 
                    required 
                    className="w-full p-2 border rounded-lg focus:outline-none focus:border-blue-600"
                />
                
                <input 
                    type="tel"
                    name="phone" 
                    placeholder="Teléfono" 
                    required 
                    className="w-full p-2 border rounded-lg focus:outline-none focus:border-blue-600"
                />

                <div className="bg-gray-100 p-3 rounded-lg mb-4">
                    <p className="text-gray-600">Total a pagar:</p>
                    <p className="text-2xl font-bold text-green-600">${getTotalPrice().toFixed(2)}</p>
                </div>

                <button 
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400 font-bold">
                    {loading ? "⏳ Procesando..." : "✅ Finalizar Compra"}
                </button>
            </form>
        </div>
    );
}

export default Checkout;