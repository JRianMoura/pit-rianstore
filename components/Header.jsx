"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Nav from "./Nav";
import CartSidebar from "./CartSidebar";
import { CgShoppingBag } from "react-icons/cg";

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const handleCartClick = () => {
    setIsCartOpen((prev) => !prev);
  };

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const cartItems = JSON.parse(storedCart);
      setCartCount(cartItems.length);
    }
  }, []);

  return (
    <div className="bg-white shadow-lg sticky top-0 py-8 z-40">
      <div className="container mx-auto flex justify-between items-center">
        <Link href={"/"} className="hover:text-current">
          <h1 className="text-[20px] md:text-[26px]">Rian Store</h1>
        </Link>
        <div className="flex items-center gap-[26px]">
          <Nav containerStyles="flex gap-[15px]" />
          <div onClick={handleCartClick} className="relative cursor-pointer">
            <CgShoppingBag className="text-[26px]" />
            {cartCount > 0 && (
              <div className="bg-accent w-[18px] h-[18px] absolute -right-1 -bottom-1 rounded-full text-white flex items-center justify-center text-sm font-medium">
                {cartCount}
              </div>
            )}
          </div>
        </div>
      </div>

      {isCartOpen && <CartSidebar onClose={handleCartClick} />}
    </div>
  );
};

export default Header;
