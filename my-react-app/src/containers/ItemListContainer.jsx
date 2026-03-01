import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProducts, getProductByCategory } from "../data/products";
import ItemList from "../components/ItemList";

const ItemListContainer = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const { categoryId } = useParams();

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            if (categoryId) {
                const data = await getProductByCategory(categoryId);
                setItems(data);
            } else {
                const data = await getProducts();
                setItems(data);
            }
            setLoading(false);
        };
        fetchData();
    }, [categoryId]);

    if (loading) return <p className="text-center py-8">Cargando productos...</p>;

    return <ItemList items={items} />;
};

export default ItemListContainer;