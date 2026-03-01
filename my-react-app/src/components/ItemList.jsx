import Item from "./Item";

const ItemList = ({ items }) => {
    if (items.length === 0) {
        return <p className="text-center py-8 text-gray-500">No se encontraron productos</p>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {items.map(item => (
                <Item
                    key={item.firebaseId || item.id}
                    id={item.id}
                    title={item.title}
                    price={item.price}
                    image={item.image}
                    stock={item.stock || 10}
                />
            ))}
        </div>
    );
};

export default ItemList;