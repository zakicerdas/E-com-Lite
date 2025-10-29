// src/pages/Dashboard.tsx
import React, { useCallback, useMemo, useState } from "react";
import { useProducts } from "../hooks/useProducts";
import ProductForm from "../components/productForm";
import { type Product } from "../types/product";
import { useAuth } from "../hooks/useAuth";


const Dashboard: React.FC = () => {
  const { products, addProduct, updateProduct, removeProduct } = useProducts();
  const { profile } = useAuth();

  const [mode, setMode] = useState<"list" | "add">("list");
  const [editingId, setEditingId] = useState<number | null>(null);

  const productsCount = useMemo(() => products.length, [products]);

  const handleAdd = useCallback((vals: Omit<Product, "id"> | any) => {
   
    const newProd: Product = {
      id: Date.now(),
      title: vals.title,
      price: Number(vals.price),
      description: vals.description ?? "",
      category: vals.category ?? "",
      image: vals.image ?? "https://via.placeholder.com/150",
      rating: { rate: 0, count: 0 },
    };
    addProduct(newProd);
    setMode("list");
    alert("Produk baru ditambahkan (simulasi).");
  }, [addProduct]);

  const handleEdit = useCallback((id: number, vals: any) => {
    const existing = products.find((p) => p.id === id);
    if (!existing) return;
    const updated: Product = {
      ...existing,
      title: vals.title,
      price: Number(vals.price),
      description: vals.description ?? existing.description,
      category: vals.category ?? existing.category,
      image: vals.image ?? existing.image,
    };
    updateProduct(updated);
    setEditingId(null);
    alert("Produk diperbarui (simulasi).");
  }, [products, updateProduct]);

  const handleDelete = useCallback((id: number) => {
    if (!confirm("Yakin ingin menghapus produk ini?")) return;
    removeProduct(id);
  }, [removeProduct]);

  return (
    <div className="text-black">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Halo, <strong>{profile?.username ?? "Admin"}</strong></p>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-sm">Total produk: <strong>{productsCount}</strong></div>
          <button onClick={() => setMode((m) => (m === "add" ? "list" : "add"))} className="px-3 py-1 bg-blue-600 rounded">
            {mode === "add" ? "Tutup" : "Tambah Produk"}
          </button>
        </div>
      </header>

      {mode === "add" && (
        <div className="mb-6 p-4 bg-white/5 rounded text-black">
          <h3 className="font-semibold mb-3">Tambah Produk Baru</h3>
          <ProductForm
            onSubmit={(vals) => handleAdd(vals)}
            onCancel={() => setMode("list")}
            submitLabel="Tambah"
          />
        </div>
      )}

      <section className="grid grid-cols-1 gap-4">
        {products.map((p) => (
          <article key={p.id} className="p-4 bg-white/5 rounded">
            <div className="flex items-start gap-4 shadow-md p-3 bg-white/10 rounded">
              <img src={p.image} alt={p.title} className="w-20 h-20 object-contain rounded bg-slate-800" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{p.title}</h4>
                  <div className="text-sm font-bold">${p.price.toFixed(2)}</div>
                </div>
                <p className="text-sm text-muted-foreground">{p.category}</p>
                <p className="text-sm mt-2 line-clamp-2">{p.description}</p>

                <div className="mt-3 flex items-center gap-2">
                  {editingId === p.id ? (
                    <div className="w-full">
                      <ProductForm
                        initial={p}
                        onSubmit={(vals) => handleEdit(p.id, vals)}
                        onCancel={() => setEditingId(null)}
                        submitLabel="Simpan"
                      />
                    </div>
                  ) : (
                    <>
                      <button onClick={() => setEditingId(p.id)} className="px-3 py-1 border rounded">Edit</button>
                      <button onClick={() => handleDelete(p.id)} className="px-3 py-1 border rounded text-red-400">Hapus</button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};

export default Dashboard;
