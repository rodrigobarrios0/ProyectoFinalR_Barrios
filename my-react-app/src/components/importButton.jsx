import { useState } from "react"
import { migrateProductsToFirestore } from "../data/importFakeStore.jsx";

const MigrateButton = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleMigrate = async () => {
        setLoading(true);
        setMessage("Migrando datos...");

        const succes = await migrateProductsToFirestore();

        if (succes) {
            setMessage("Migración completada con éxito.");
        } else {
            setMessage("Error durante la migración. Revisa la consola para más detalles.");
        }
        setLoading(false);
    };

    return (
        <div className="p-4 bg-yellow-100 rounded mb-4">
            <button 
                onClick={handleMigrate}
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400">
                {loading ? "Migrando..." : "Migrar datos a FireStore"}    
                </button>
            {message && <p className="mt-2 font-semibold">{message}</p>}
        </div>
    );
};

export default MigrateButton;