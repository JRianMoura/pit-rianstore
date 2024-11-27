"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { toast } from "react-hot-toast";
import Link from "next/link";

const page = () => {
  const [product, setProduct] = useState(null);
  const [customization, setCustomization] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      const products = JSON.parse(storedProducts);
      const selectedProduct = products.find((p) => p.id === parseInt(id));
      if (selectedProduct) setProduct(selectedProduct);
    }
  }, [id]);

  const handleAddToCart = () => {
    try {
      const storedCart = localStorage.getItem("cart");
      const cart = storedCart ? JSON.parse(storedCart) : [];

      const existingItemIndex = cart.findIndex(
        (item) => item.id === product.id && item.size === selectedSize
      );

      if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += 1;
      } else {
        const cartItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          customization: customization || "",
          size: selectedSize || "",
          quantity: 1,
        };
        cart.push(cartItem);
      }

      const cartData = JSON.stringify(cart);
      if (cartData.length > 5 * 1024 * 1024) {
        toast.error(
          "O carrinho está cheio. Remova alguns itens para adicionar novos."
        );
        return;
      }

      localStorage.setItem("cart", cartData);
      toast.success("Item adicionado ao carrinho com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar ao carrinho:", error);
      toast.error("Erro ao adicionar ao carrinho. Tente novamente.");
    }
  };

  if (!product) return <div>Carregando...</div>;

  const availableSizes = ["P", "M", "G", "GG"];

  return (
    <section className="py-40 px-20 md:py-10 md:h-auto relative overflow-hidden bg-white border-2">
      <div className="flex flex-row gap-1">
        <div className="w-[500px] flex-1">
          <div className="xl:flex-1 h-[460px] bg-white/5 border xl:w-[500px] xl:h-[440px] flex justify-center items-center">
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                className="w-[400px] h-[430px] object-cover rounded mb-4"
              />
            )}
          </div>
        </div>
        <div className="flex-1 p-5 justify-between flex-col flex">
          <div className="flex flex-col gap-6 items-start">
            <div>
              <h3 className="text-2xl font-bold">{product.name}</h3>
              <p className="text-lg font-semibold">
                R$ {parseFloat(product.price).toFixed(2)}
              </p>
            </div>
            <p>{product.description}</p>
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Selecione o tamanho:
            </label>
            <div className="flex gap-2 mb-4">
              {availableSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded border ${
                    selectedSize === size
                      ? "bg-accent text-white"
                      : "bg-gray-100 text-black"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            {selectedSize && (
              <p className="text-sm text-gray-600">
                Tamanho selecionado:{" "}
                <span className="font-bold">{selectedSize}</span>
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 font-semibold">Personalização:</label>
            <input
              type="text"
              value={customization}
              onChange={(e) => setCustomization(e.target.value)}
              className="border p-2 rounded w-[400px] mb-4 bg-slate-100 text-black"
              placeholder="Digite a personalização desejada"
            />
            <button
              onClick={handleAddToCart}
              className="btn btn-accent px-4 py-2 rounded"
            >
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col xl:flex-row gap-14">
        <div className="flex-1 flex flex-col justify-center items-start gap-10">
          <Link
            href="/nossos-produtos"
            className="flex items-center gap-2 font-semibold"
          >
            <span>&lt; Voltar</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default page;
