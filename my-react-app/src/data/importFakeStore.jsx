import { collection, addDoc } from "firebase/firestore";
import { db } from "../context/FirebaseContext";

const API_URL = "https://fakestoreapi.com/products";

export const migrateProductsToFirestore = async () => {
    try {
        console.log("Iniciando migración de productos...");
        const response = await fetch(API_URL);
        const products = await response.json();

        const productsRef = collection(db, "products");

        for (const product of products) {
            await addDoc(productsRef, {
                id: product.id,
                title: product.title,
                price: product.price,
                description: product.description,
                category: product.category,
                image: product.image,
                rating: product.rating || { rate: 0, count: 0 },
                stock: 10,
                createdAt: new Date()
            });
        }

        console.log(`✅ ${products.length} productos migrados correctamente`);
        return true;
    } catch (error) {
        console.error("❌ Error al migrar productos:", error);
        return false;
    }
};