import React from 'react';

interface ProductProps {
  _id: string;
  name: string;
  image: string;
  price: number;
}

const ProductCard: React.FC<{ item: ProductProps; setSearchText: (text: string) => void }> = ({ item, setSearchText }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md">
      <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded-lg" />
      <h3 className="text-lg font-semibold mt-2">{item.name}</h3>
      <p className="text-gray-600">৳{item.price}</p>
      <button
        onClick={() => setSearchText('')}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        View Product
      </button>
    </div>
  );
};

export default ProductCard;