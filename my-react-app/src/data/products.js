import { db } from "../context/FirebaseContext";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";

export const getProducts = async () => {
    try {
        const productsRef = collection (db, "products");
        const snapshot = await getDocs(productsRef);

        return snapshot.docs.map(doc => ({...doc.data(), firebaseId: doc.id }));
    } catch (error) {
        console.error ("Error obteniendo productos:", error);
        return[];
        }
};

export const getProductByCategory = async (category) => {
    try {
        const productsRef = collection(db, "products");
        const q = query (productsRef, where ("category", "==", category));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({...doc.data(), firebaseId: doc.id }));
    } catch (error) {
        console.error ("Error obteniendo productos por categoría:", error);
        return[];
    }
};

export const getProductById = async (id) => {
    try {
        const productsRef = collection(db, "products");
        // Cambio: Buscar por el campo 'id' de FakeStore, no por firebaseId
        const q = query(productsRef, where("id", "==", parseInt(id)));
        const snapshot = await getDocs(q);

        if (snapshot.docs.length > 0) {
            return { ...snapshot.docs[0].data(), firebaseId: snapshot.docs[0].id };
        }

        console.warn(`Producto con ID ${id} no encontrado`);
        return null;
    } catch (error) {
        console.error("Error obteniendo producto:", error);
        return null;
    }
};