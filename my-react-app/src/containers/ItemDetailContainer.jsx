import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../data/products";
import ItemDetail from "../components/ItemDetail";

const ItemDetailContainer = () => {
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const { itemId } = useParams();

    useEffect(() => {
        setLoading(true);
        getProductById(itemId).then(data => {
            setItem(data);
            setLoading(false);
        });
    }, [itemId]);

    if (loading) return <p className="text-center py-8">Cargando...</p>;
    if (!item) return <p className="text-center py-8 text-red-600">❌ Producto no encontrado</p>;

    return <ItemDetail {...item} />;
};

export default ItemDetailContainer;