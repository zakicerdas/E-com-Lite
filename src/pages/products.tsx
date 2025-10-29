import React, { useMemo, useState } from "react";
import ProductCard from "../components/productsCard";
import { useFetch } from "../hooks/useFetch";
import { type Product } from "../types/product";
import CartBadge from "@/components/cartBadge";

const Products: React.FC = () => {
  const { data, loading, error, refetch } = useFetch<Product[]>(
    "https://fakestoreapi.com/products"
  );
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    if (!data) return [];
    if (!q.trim()) return data;
    const lower = q.toLowerCase();
    return data.filter(
      (p) =>
        p.title.toLowerCase().includes(lower) ||
        p.category.toLowerCase().includes(lower)
    );
  }, [data, q]);

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="text-lg font-medium">Memuat produk...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-24 text-center text-red-400">
        <div>{error}</div>
        <button
          onClick={refetch}
          className="mt-3 px-3 py-1 border rounded hover:bg-white/10"
        >
          Coba lagi
        </button>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        Tidak ada produk ditemukan.
      </div>
    );
  }

  return (
    <div className="text-black">
      <header className="flex items-center justify-between mb-6 gap-4 border-b pb-4">
        <h1 className="text-2xl font-semibold">Produk</h1>
        <input
          type="search"
          placeholder="Cari produk atau kategori..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="px-3 py-2 rounded bg-white/10 w-full max-w-md border-rounde focus:outline-none focus:ring-2 focus:black transition border"
        />
        <CartBadge />
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </section>
    </div>
  );
};

export default Products;
