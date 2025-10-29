
import React, { useState } from "react";
import { useCart } from "../context/cartContext";
import CartModal from "./cartModal";

const CartBadge: React.FC<{ className?: string }> = ({ className = "" }) => {
  const { totalItems } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={`relative ${className}`}>
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
          aria-label="Open cart"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 7h12l-2-7M9 21a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z" />
          </svg>
          <span className="hidden md:inline">Cart</span>
        </button>

        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2">
            {totalItems}
          </span>
        )}
      </div>

      <CartModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default CartBadge;
