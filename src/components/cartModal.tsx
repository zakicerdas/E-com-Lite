import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useCart } from "../context/cartContext";
import { useNavigate } from "react-router-dom";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const CartModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { state, removeFromCart, setQuantity, clearCart, totalItems, totalPrice } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // portal target
  const container = typeof document !== "undefined" ? document.body : null;
  if (!container) return null;

  const itemsArray = Object.values(state.items);

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      <div className="absolute inset-0 bg-white/10" onClick={onClose} />
      <div
        className="relative bg-white  w-full max-w-2xl mx-4 md:mx-0 rounded-lg shadow-lg overflow-hidden z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-slate-200  flex items-center justify-between">
          <h3 className="text-lg font-semibold">Shopping Cart</h3>
          <button onClick={onClose} aria-label="Close cart" className="px-2 py-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700">✕</button>
        </div>

        <div className="p-4 max-h-[60vh] overflow-y-auto space-y-4">
          {itemsArray.length === 0 ? (
            <p className="text-center text-slate-500">Keranjang kosong.</p>
          ) : (
            itemsArray.map(({ product, quantity }) => (
              <div key={product.id} className="flex items-center gap-4">
                <img src={product.image} alt={product.title} className="w-16 h-16 object-contain rounded" />
                <div className="flex-1">
                  <div className="text-sm font-medium line-clamp-2">{product.title}</div>
                  <div className="text-sm text-slate-500">$ {Number(product.price).toLocaleString()}</div>

                  <div className="mt-1 flex items-center gap-2">
                    <label className="text-sm text-slate-400">Qty</label>
                    <input
                        placeholder="isi jumlah"
                      type="number"
                      min={1}
                      value={quantity}
                      onChange={(e) => setQuantity(Number(product.id), Math.max(1, Number(e.target.value) || 1))}
                      className="w-20 px-2 py-1 rounded bg-white/10 border"
                    />
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-semibold">${(Number(product.price) * quantity).toFixed(2)}</div>
                  <button
                    onClick={() => removeFromCart(Number(product.id))}
                    className="mt-2 px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <div>
            <div className="text-sm text-slate-500">Total items: <strong>{totalItems}</strong></div>
            <div className="text-lg font-bold">${totalPrice.toFixed(2)}</div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => { clearCart(); onClose(); }}
              className="px-3 py-2 rounded border"
            >
              Clear Cart
            </button>

            <button
              onClick={() => { onClose(); navigate("/checkout"); }}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              disabled={itemsArray.length === 0}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>,
    container
  );
};

export default CartModal;
