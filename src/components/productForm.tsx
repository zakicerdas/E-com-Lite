import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Product } from "../types/product";

const productSchema = z.object({
  title: z.string().min(1, "Title wajib diisi"),
  price: z.number().min(0.01, "Price harus lebih besar dari 0"),
  description: z.string().optional(),
  category: z.string().optional(),
  image: z.string().url("Image harus berupa URL yang valid").optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

type Props = {
  initial?: Partial<Product>;
  onSubmit: (payload: ProductFormValues) => void;
  onCancel?: () => void;
  submitLabel?: string;
};

const ProductForm: React.FC<Props> = ({ initial, onSubmit, onCancel, submitLabel = "Simpan" }) => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      price: 0,
      description: "",
      category: "",
      image: "",
      ...initial,
    },
  });

  useEffect(() => {
    reset({
      title: initial?.title ?? "",
      price: initial?.price ?? 0,
      description: initial?.description ?? "",
      category: initial?.category ?? "",
      image: initial?.image ?? "",
    });
  }, [initial, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 text-black box shadow-md p-4 rounded bg-white/10 shadow-black/20">
      <div>
        <label className="block text-sm mb-1 font-semibold">Title</label>
        <input {...register("title")} className="w-full px-3 py-2 rounded bg-gray-100" />
        {errors.title && <p className="text-xs text-red-400 mt-1">{errors.title.message}</p>}
      </div>

      <div>
        <label className="block text-sm mb-1 font-semibold">Price</label>
        <input type="number" step="0.01" {...register("price", { valueAsNumber: true })} className="w-full px-3 py-2 rounded bg-gray-100" />
        {errors.price && <p className="text-xs text-red-400 mt-1">{errors.price.message}</p>}
      </div>

      <div>
        <label className="block text-sm mb-1 font-semibold">Category</label>
        <input {...register("category")} className="w-full px-3 py-2 rounded bg-gray-100" />
        {errors.category && <p className="text-xs text-red-400 mt-1">{errors.category.message}</p>}
      </div>

      <div>
        <label className="block text-sm mb-1 font-semibold">Image URL</label>
        <input {...register("image")} placeholder="https://..." className="w-full px-3 py-2 rounded bg-gray-100" />
        {errors.image && <p className="text-xs text-red-400 mt-1">{errors.image.message}</p>}
      </div>

      <div>
        <label className="block text-sm mb-1">Description</label>
        <textarea {...register("description")} rows={4} className="w-full px-3 py-2 rounded bg-gray-100" />
        {errors.description && <p className="text-xs text-red-400 mt-1">{errors.description.message}</p>}
      </div>

      <div className="flex gap-2 justify-end">
        {onCancel && <button type="button" onClick={onCancel} className="px-3 py-1  bg-red-600 rounded-md hover:bg-red-500 hover:translate-y-0.5 transition">Batal</button>}
        <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-green-600 rounded hover:bg-green-500 hover:translate-y-0.5 transition">
          {isSubmitting ? "Menyimpan..." : submitLabel}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
