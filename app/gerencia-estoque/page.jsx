"use client";
import { useState, useEffect } from "react";

const page = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedPrice, setEditedPrice] = useState("");
  const [editedCustomizationOptions, setEditedCustomizationOptions] =
    useState("");

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  const deleteProduct = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  const startEditing = (product) => {
    setEditingProduct(product.id);
    setEditedName(product.name);
    setEditedDescription(product.description);
    setEditedPrice(product.price);
    setEditedCustomizationOptions(product.customizationOptions.join(","));
  };

  const saveEdits = () => {
    const updatedProducts = products.map((product) =>
      product.id === editingProduct
        ? {
            ...product,
            name: editedName,
            description: editedDescription,
            price: parseFloat(editedPrice),
            customizationOptions: editedCustomizationOptions.split(","),
          }
        : product
    );
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setEditingProduct(null);
  };

  return (
    <section className="py-40 px-20 md:py-10 md:h-auto relative overflow-hidden bg-white border-2">
      <div className="container mx-auto">
        <h3 className="mb-5 text-xl font-bold">Gerenciamento de Estoque</h3>
        <div className="bg-gray-100 p-4 rounded-md">
          {products.map((product) => (
            <div key={product.id} className="p-4 border rounded mb-4">
              {editingProduct === product.id ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="border p-2 rounded w-full"
                    placeholder="Nome do Produto"
                  />
                  <textarea
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    className="border p-2 rounded w-full"
                    placeholder="Descrição"
                  />
                  <input
                    type="number"
                    value={editedPrice}
                    onChange={(e) => setEditedPrice(e.target.value)}
                    className="border p-2 rounded w-full"
                    placeholder="Preço"
                  />
                  <input
                    type="text"
                    value={editedCustomizationOptions}
                    onChange={(e) =>
                      setEditedCustomizationOptions(e.target.value)
                    }
                    className="border p-2 rounded w-full"
                    placeholder="Personalização (separada por vírgula)"
                  />
                  <button
                    onClick={saveEdits}
                    className="btn bg-green-500 mt-2 px-4 py-2 rounded"
                  >
                    Salvar Alterações
                  </button>
                </div>
              ) : (
                <div>
                  <h2 className="font-bold">{product.name}</h2>
                  <p>{product.description}</p>
                  <p className="text-lg font-semibold">
                    R$ {parseFloat(product.price).toFixed(2)}
                  </p>
                  {product.customizationOptions && (
                    <p>
                      <strong>Personalizações:</strong>{" "}
                      {product.customizationOptions.join(", ")}
                    </p>
                  )}
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded mt-2"
                    />
                  )}
                  <div className="flex space-x-4 mt-4">
                    <button
                      onClick={() => startEditing(product)}
                      className="btn btn-primary px-4 py-2 rounded"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="btn bg-red-500 px-4 py-2 rounded"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default page;
