import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext";

const Checkout: React.FC = () => {
  const { state, totalItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const itemsArray = useMemo(() => Object.values(state.items), [state]);

  const handleOrder = () => {
    alert("Terima kasih telah berbelanja — pesanan diproses (simulasi).");
    clearCart();
    navigate("/products", { replace: true });
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-2xl font-semibold mb-4">Checkout</h1>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <div className="space-y-4">
            {itemsArray.length === 0 ? (
              <div className="text-center py-12 text-slate-500">Keranjang kosong — belum ada produk di checkout.</div>
            ) : (
              itemsArray.map((entry) => (
                <div key={entry.product.id} className="flex items-center gap-4 border-b last:border-b-0 pb-4">
                  <img src={entry.product.image} alt={entry.product.title} className="w-20 h-20 object-contain rounded" />
                  <div className="flex-1">
                    <div className="font-medium">{entry.product.title}</div>
                    <div className="text-sm text-slate-500">{entry.product.category ?? ""}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">${Number(entry.product.price).toFixed(2)}</div>
                    <div className="text-sm text-slate-500">Qty: {entry.quantity}</div>
                    <div className="text-sm text-slate-700 mt-1">Subtotal: ${(Number(entry.product.price) * entry.quantity).toFixed(2)}</div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-6 flex flex-col md:flex-row items-center md:items-end justify-between gap-4">
            <div className="text-left">
              <div className="text-sm text-slate-500">Total items: <strong>{totalItems}</strong></div>
              <div className="text-2xl font-bold">${totalPrice.toFixed(2)}</div>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={() => { clearCart(); }} className="px-4 py-2 border rounded-md">Kosongkan</button>
              <button onClick={handleOrder} className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700" disabled={itemsArray.length === 0}>
                Pesan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
