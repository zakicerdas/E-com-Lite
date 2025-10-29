import React, { createContext, type ReactNode, useCallback } from "react";
import { type  Product } from "../types/product";
import { useFetch } from "../hooks/useFetch";

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  addProduct: (p: Product) => void;
  updateProduct: (p: Product) => void;
  removeProduct: (id: number) => void;
  refreshProducts: () => void;
}

export const ProductContext = createContext<ProductContextType>({
  products: [],
  loading: false,
  error: null,
  addProduct: () => {},
  updateProduct: () => {},
  removeProduct: () => {},
  refreshProducts: () => {},
});

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const {
    data,
    loading,
    error,
    refetch: refreshProducts,
    setData,
  } = useFetch<Product[]>("https://fakestoreapi.com/products");


  const addProduct = useCallback(
    (p: Product) => {
      setData((prev) => (prev ? [{ ...p, id: Date.now() }, ...prev] : [p]));
    },
    [setData]
  );

  const updateProduct = useCallback(
    (p: Product) => {
      setData((prev) =>
        prev ? prev.map((x) => (x.id === p.id ? p : x)) : [p]
      );
    },
    [setData]
  );

  const removeProduct = useCallback(
    (id: number) => {
      setData((prev) => (prev ? prev.filter((p) => p.id !== id) : []));
    },
    [setData]
  );

  return (
    <ProductContext.Provider
      value={{
        products: data || [],
        loading,
        error,
        addProduct,
        updateProduct,
        removeProduct,
        refreshProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
