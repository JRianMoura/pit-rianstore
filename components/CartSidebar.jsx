"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../components/ui/sheet";

const CartSidebar = ({ onClose }) => {
  const [cartItems, setCartItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const handleRemoveItem = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + parseFloat(item.price), 0)
      .toFixed(2);
  };

  const handleCheckout = () => {
    const total = calculateTotal();
    localStorage.removeItem("cart");
    setCartItems([]);
    toast.success(`Compra no valor de R$${total} realizada com sucesso!`, {
      duration: 4000,
    });
    onClose();
    router.push("/");
  };

  return (
    <Sheet open={true} onOpenChange={onClose}>
      <SheetContent className="bg-white p-6 rounded-lg shadow-md">
        <SheetHeader>
          <SheetTitle className="text-left mb-12">Minha Carteira</SheetTitle>
        </SheetHeader>

        <div className="space-y-4">
          {cartItems.length === 0 ? (
            <p className="text-gray-500">Seu carrinho está vazio.</p>
          ) : (
            cartItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b pb-4 mb-4"
              >
                <div className="flex items-center gap-4">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  )}
                  <div>
                    <h3 className="font-bold">{item.name}</h3>

                    {item.size && (
                      <p className="text-sm text-gray-600">
                        Tamanho:{" "}
                        <span className="font-semibold">{item.size}</span>
                      </p>
                    )}

                    {item.customization && (
                      <p className="text-sm text-gray-500">
                        Personalização: {item.customization}
                      </p>
                    )}
                    <p className="font-semibold">
                      R$ {parseFloat(item.price).toFixed(2)}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleRemoveItem(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remover
                </button>
              </div>
            ))
          )}

          {cartItems.length > 0 && (
            <div className="border-t pt-4">
              <p className="font-bold text-lg mb-4">
                Total: R$ {calculateTotal()}
              </p>
              <button
                onClick={handleCheckout}
                className="btn bg-green-500 w-full text-white"
              >
                Finalizar Compra
              </button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar;
