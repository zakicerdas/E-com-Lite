import React, { memo } from "react";
import { Link } from "react-router-dom";
import { type Product } from "../types/product";
import { useCart } from "../context/cartContext";

type Props = {
  product: Product;
  className?: string;
};

const ProductCard: React.FC<Props> = ({ product, className = "" }) => {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(product, 1);
  };

  return (
    <article
      className={
        "panel flex flex-col overflow-hidden shadow-sm hover:shadow-md transition-all duration-150" +
        "border border-slate-700/40 rounded-lg " +
        className
      }
      aria-labelledby={`product-title-${product.id}`}
    >
      <div className="w-full h-44 md:h-40 lg:h-44 flex items-center justify-center bg-slate-800/40">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full max-w-full object-contain p-3"
          loading="lazy"
        />
      </div>

      <div className="px-4 py-3 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-3 text-black">
          <h3
            id={`product-title-${product.id}`}
            className="text-sm font-semibold leading-tight line-clamp-2"
            title={product.title}
          >
            {product.title}
          </h3>

          <div className="text-sm font-bold text-emerald-400">
            ${product.price.toFixed(2)}
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between gap-2">
          <div className="text-xs text-slate-300/80 bg-slate-800/40 px-2 py-1 rounded-full">
            {product.category}
          </div>

          {product.rating ? (
            <div className="text-xs text-yellow-300 flex items-center gap-1">
              <span aria-hidden>⭐</span>
              <span>{product.rating.rate.toFixed(1)}</span>
              <span className="text-slate-400">
                ({product.rating.count})
              </span>
            </div>
          ) : (
            <div className="text-xs text-slate-400">No rating</div>
          )}
        </div>

        <p className="mt-3 text-xs text-black line-clamp-3">
          {product.description}
        </p>

        <div className="mt-4 flex items-center justify-between gap-2">
          <Link
            to={`/products/${product.id}`}
            className="inline-flex items-center gap-2 text-sm px-3 py-1 rounded bg-blue-600 hover:bg-blue-700"
            aria-label={`Lihat detail ${product.title}`}
          >
            Detail
          </Link>

          <button
            type="button"
            onClick={handleAdd}
            className="text-sm px-3 py-1 rounded border border-slate-700 hover:bg-white/5 active:scale-95 transition-transform"
          >
            Add
          </button>
        </div>
      </div>
    </article>
  );
};

export default memo(ProductCard);
