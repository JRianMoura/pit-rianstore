"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const page = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  const handleAddToCart = (product) => {
    const storedCart = localStorage.getItem("cart");
    const cart = storedCart ? JSON.parse(storedCart) : [];

    const cartItem = {
      ...product,
    };
    cart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  return (
    <section className="py-40 px-20 md:py-10 relative overflow-hidden bg-white border-2">
      <div className="container mx-auto">
        <div>
          <h3>Lista de Produtos</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            {products.map((product) => (
              <div
                key={product.id || `product-${index}`}
                className="p-4 border rounded shadow flex flex-col justify-between h-[400px] bg-gray-100"
              >
                {product.image && (
                  <div className="w-full aspect-[4/3] overflow-hidden mb-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                )}
                <div className="flex flex-col gap-2 flex-1">
                  <h6 className="font-bold text-lg">{product.name}</h6>
                  <p className="text-gray-700 text-sm flex-grow">
                    {product.description}
                  </p>
                  <p className="text-lg font-semibold text-gray-900">
                    R$ {parseFloat(product.price).toFixed(2)}
                  </p>
                </div>
                <div className="flex justify-around items-center mt-4">
                  <Link href={`/produto/${product.id}`}>
                    <button className="btn btn-accent rounded-md">Ver</button>
                  </Link>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="btn btn-accent rounded-md"
                  >
                    Carrinho
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
