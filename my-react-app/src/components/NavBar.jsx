import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const NavBar = () => {
    const { getTotalQuantity } = useCart();
    const cartCount = getTotalQuantity ? getTotalQuantity() : 0;

    return (
        <nav className="bg-gray-900 p-5 w-full sticky top-0 z-50">
            <div className="w-full max-w-6xl mx-auto flex justify-between items-center">

                <Link
                    to="/"
                    className="text-white text-2xl font-bold tracking-wide">
                    🛍️ Mi Tienda
                </Link>

                <div className="flex gap-6 text-lg">
                    <Link
                        to="/category/electronics"
                        className="text-red-400 visited:text-red-400 hover:text-white transition">
                        Electrónica
                    </Link>

                    <Link
                        to="/category/jewelery"
                        className="text-red-400 visited:text-red-400 hover:text-white transition">
                        Joyería
                    </Link>

                    <Link
                        to="/category/men's clothing"
                        className="text-red-400 visited:text-red-400 hover:text-white transition">
                        Hombre
                    </Link>

                    <Link
                        to="/category/women's clothing"
                        className="text-red-400 visited:text-red-400 hover:text-white transition">
                        Mujer
                    </Link>
                </div>

                <Link
                    to="/cart"
                    className="relative text-white text-2xl hover:text-yellow-400 transition">
                    🛒
                    {cartCount > 0 && (
                        <span className="absolute -top-2 -right-3 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                            {cartCount}
                        </span>
                    )}
                </Link>

            </div>
        </nav>
    );
};

export default NavBar;