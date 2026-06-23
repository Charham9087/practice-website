"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { getProductById, updateProduct, uploadImages } from "@/server/functions";

type ProductForm = {
  name: string;
  category: string;
  description: string;
  original_price: string;
  discounted_price: string;
  stock: string;
  rating: string;
  isfavourite: boolean;
};

const initialProduct: ProductForm = {
  name: "",
  category: "",
  description: "",
  original_price: "",
  discounted_price: "",
  stock: "",
  rating: "0",
  isfavourite: false,
};

const inputClass =
  "w-full rounded-md border border-[#333] bg-black px-3 py-3 text-white outline-none transition focus:border-white";

export default function EditProductPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const productId = useMemo(() => Number(params.id), [params.id]);
  const [product, setProduct] = useState<ProductForm>(initialProduct);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadProduct() {
      setIsLoading(true);
      const data = await getProductById(productId);

      if (!isMounted) return;

      if (!data) {
        setErrorMessage("Product not found.");
        setIsLoading(false);
        return;
      }

      setProduct({
        name: data.name ?? "",
        category: data.category ?? "",
        description: data.description ?? "",
        original_price: String(data.original_price ?? ""),
        discounted_price: String(data.discounted_price ?? ""),
        stock: String(data.stock ?? ""),
        rating: String(data.rating ?? 0),
        isfavourite: Boolean(data.isfavourite),
      });
      setExistingImages(data.images ?? []);
      setIsLoading(false);
    }

    loadProduct();

    return () => {
      isMounted = false;
    };
  }, [productId]);

  useEffect(() => {
    return () => {
      previews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [previews]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
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

  const removeExistingImage = (image: string) => {
    setExistingImages((current) => current.filter((item) => item !== image));
  };

  const removeNewImage = (index: number) => {
    URL.revokeObjectURL(previews[index]);
    setPreviews((current) => current.filter((_, itemIndex) => itemIndex !== index));
    setFiles((current) => current.filter((_, itemIndex) => itemIndex !== index));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const uploadedImages = files.length ? await uploadImages(files) : [];
      const result = await updateProduct(productId, {
        name: product.name.trim(),
        category: product.category.trim(),
        description: product.description.trim(),
        original_price: Number(product.original_price),
        discounted_price: Number(product.discounted_price),
        stock: Number(product.stock),
        images: [...existingImages, ...uploadedImages],
        isfavourite: product.isfavourite,
        rating: Number(product.rating),
      });

      if (!result.success) {
        setErrorMessage(result.message);
        return;
      }

      router.push("/admin/product");
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to update product."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-black p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white sm:text-4xl">
              Edit Product
            </h1>
            <p className="mt-2 text-gray-400">
              Update product details, pricing, stock, and images.
            </p>
          </div>

          <button
            type="button"
            onClick={() => router.push("/admin/product")}
            className="rounded-md border border-[#333] px-5 py-3 font-semibold text-white transition hover:bg-[#111]"
          >
            Back
          </button>
        </div>

        {isLoading ? (
          <div className="rounded-md border border-[#222] bg-[#111] p-6 text-center text-gray-400">
            Loading product...
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="rounded-md border border-[#222] bg-[#111] p-5 sm:p-8"
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

            <div className="mt-4 grid gap-4 md:grid-cols-2">
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

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <input
                type="number"
                min="0"
                name="stock"
                value={product.stock}
                onChange={handleChange}
                placeholder="Stock"
                className={inputClass}
                required
              />

              <input
                type="number"
                min="0"
                max="5"
                name="rating"
                value={product.rating}
                onChange={handleChange}
                placeholder="Rating"
                className={inputClass}
                required
              />
            </div>

            <label className="mt-5 flex items-center gap-3 text-sm text-gray-300">
              <input
                type="checkbox"
                checked={product.isfavourite}
                onChange={(event) =>
                  setProduct((prev) => ({
                    ...prev,
                    isfavourite: event.target.checked,
                  }))
                }
                className="h-4 w-4"
              />
              Mark as favourite
            </label>

            <div className="mt-6">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="w-full rounded-md border border-dashed border-[#333] bg-black p-4 text-gray-400"
              />
            </div>

            {(existingImages.length > 0 || previews.length > 0) && (
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {existingImages.map((src) => (
                  <div key={src} className="relative">
                    <Image
                      src={src}
                      alt="Existing product image"
                      width={240}
                      height={160}
                      unoptimized
                      className="h-24 w-full rounded-md border border-[#333] object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeExistingImage(src)}
                      className="absolute right-2 top-2 rounded-md bg-black/80 px-2 py-1 text-xs text-white"
                    >
                      Remove
                    </button>
                  </div>
                ))}

                {previews.map((src, index) => (
                  <div key={src} className="relative">
                    <Image
                      src={src}
                      alt={`New product preview ${index + 1}`}
                      width={240}
                      height={160}
                      unoptimized
                      className="h-24 w-full rounded-md border border-[#333] object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeNewImage(index)}
                      className="absolute right-2 top-2 rounded-md bg-black/80 px-2 py-1 text-xs text-white"
                    >
                      Remove
                    </button>
                  </div>
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
              className="mt-6 w-full rounded-md bg-white py-3 font-bold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Saving Product..." : "Save Changes"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
