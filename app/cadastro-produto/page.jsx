"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "../../components/ui/input";

const page = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [customizationOptions, setCustomizationOptions] = useState("");
  const [image, setImage] = useState(null);
  const router = useRouter();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const storedProducts = localStorage.getItem("products");
    const products = storedProducts ? JSON.parse(storedProducts) : [];
    const newProduct = {
      id: products.length + 1,
      name,
      description,
      price: parseFloat(price),
      customizationOptions: customizationOptions.split(","),
      image,
    };
    products.push(newProduct);
    localStorage.setItem("products", JSON.stringify(products));
    router.push("/"); // Redireciona para a página inicial após o cadastro
  };

  return (
    <section className="py-40 px-20 md:py-10 md:h-[585px] relative overflow-hidden bg-white border-2">
      <div className="container mx-auto">
        <h4 className="mb-5">Cadastrar Produtos</h4>
        <form className="flex gap-3 flex-col" onSubmit={handleAddProduct}>
          <Input
            placeholder="Nome do produto"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Descrição"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            placeholder="Preço"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Input
            placeholder="Personalização (Separar por Vírgula)"
            type="text"
            value={customizationOptions}
            onChange={(e) => setCustomizationOptions(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border p-2 rounded w-full"
          />
          <button
            type="submit"
            className="btn w-full xl:max-w-[150px] h-[60px] btn-accent rounded-md"
          >
            Enviar
          </button>
        </form>
      </div>
    </section>
  );
};

export default page;
