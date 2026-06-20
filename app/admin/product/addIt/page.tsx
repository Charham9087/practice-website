"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { uploadImages } from "@/server/functions";

type ProductForm = {
  name: string;
  category: string;
  description: string;
  original_price: string;
  discounted_price: string;
  stock: string;
};

const initialProduct: ProductForm = {
  name: "",
  category: "",
  description: "",
  original_price: "",
  discounted_price: "",
  stock: "",
};

const inputClass =
  "w-full rounded-md border border-[#333] bg-black px-3 py-3 text-white outline-none transition focus:border-white";

export default function AddProductPage() {
  const router = useRouter();
  const [product, setProduct] = useState<ProductForm>(initialProduct);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    return () => {
      previews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [previews]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProduct((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const selectedFiles = Array.from(event.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
    setPreviews((prev) => [
      ...prev,
      ...selectedFiles.map((file) => URL.createObjectURL(file)),
    ]);
    event.target.value = "";
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const imageUrls = files.length ? await uploadImages(files) : [];
      const { error } = await supabase.from("products").insert({
        name: product.name.trim(),
        category: product.category.trim(),
        description: product.description.trim(),
        original_price: Number(product.original_price),
        discounted_price: Number(product.discounted_price),
        stock: Number(product.stock),
        images: imageUrls,
        isfavourite: false,
        rating: 0,
      });

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      router.push("/admin/product");
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to add product."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-black p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Add Product
          </h1>
          <p className="text-gray-400 mt-2">
            Create a new product for your store
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#111] border border-[#222] rounded-md p-5 sm:p-8"
        >
          <input
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Product Name"
            className={inputClass}
            required
          />

          <input
            name="category"
            value={product.category}
            onChange={handleChange}
            placeholder="Category"
            className={`${inputClass} mt-4`}
            required
          />

          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Description"
            rows={5}
            className={`${inputClass} mt-4 resize-none`}
            required
          />

          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <input
              type="number"
              min="0"
              name="original_price"
              value={product.original_price}
              onChange={handleChange}
              placeholder="Original Price"
              className={inputClass}
              required
            />

            <input
              type="number"
              min="0"
              name="discounted_price"
              value={product.discounted_price}
              onChange={handleChange}
              placeholder="Discounted Price"
              className={inputClass}
              required
            />
          </div>

          <input
            type="number"
            min="0"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            placeholder="Stock"
            className={`${inputClass} mt-4`}
            required
          />

          <div className="mt-6">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-gray-400 border border-dashed border-[#333] rounded-md p-4 bg-black"
            />
          </div>

          {previews.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
              {previews.map((src, index) => (
                <Image
                  key={src}
                  src={src}
                  alt={`Product preview ${index + 1}`}
                  width={240}
                  height={160}
                  unoptimized
                  className="w-full h-24 object-cover rounded-md border border-[#333]"
                />
              ))}
            </div>
          )}

          {errorMessage && (
            <p className="mt-4 rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-6 py-3 bg-white text-black font-bold rounded-md transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Adding Product..." : "Add Product"}
          </button>
        </form>
      </div>
    </section>
  );
}
