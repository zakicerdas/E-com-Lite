import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

export const useProducts = () => {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("useProducts harus dipakai di dalam <ProductProvider>");
  return ctx;
};

