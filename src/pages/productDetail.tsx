import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { type Product } from "../types/product";
import { useCart } from "../context/cartContext";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, loading, error } = useFetch<Product>(
    `https://fakestoreapi.com/products/${id}`
  );
  const { addToCart } = useCart();

  const handleAddToCart = useCallback(() => {
    if (product) addToCart(product, 1);
  }, [product, addToCart]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-slate-400">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-400">
        Gagal memuat produk.
      </div>
    );

  if (!product) return null;

  return (
    <div className="min-h-screen flex items-center justify-center py-10 px-4">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-800/60 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-center bg-slate-900/40 rounded-lg p-4">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-80 object-contain"
          />
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-semibold text-white">
            {product.title}
          </h1>
          <p className="text-slate-300">{product.description}</p>

          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-emerald-400">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-sm text-yellow-300">
              ⭐ {product.rating?.rate ?? "0"} ({product.rating?.count ?? 0})
            </span>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={handleAddToCart}
              className="px-5 py-2 rounded-md bg-blue-600 hover:bg-blue-700 active:scale-95 text-white transition-transform"
            >
              Add to Cart
            </button>

            <button
              onClick={() => window.history.back()}
              className="px-5 py-2 rounded-md border border-slate-600 hover:bg-slate-700 active:scale-95 transition-transform"
            >
              Kembali
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
