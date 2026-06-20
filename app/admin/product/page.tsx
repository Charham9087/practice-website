"use client";

import Image from "next/image";
import { FaEdit, FaTrash, FaEye, FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getProducts } from "@/server/functions";
import { Products } from "@/lib/types";

const fallbackImage = "https://dummyimage.com/300x300/111827/ffffff&text=Product";

function getProductImage(product: Products) {
  const src = product.images?.[0];

  if (!src) return fallbackImage;
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  if (src.startsWith("/")) return src;

  return fallbackImage;
}

export default function ProductsAdminPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Products[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
      setIsLoading(false);
    });
  }, []);

  return (

    <section className="min-h-screen bg-black p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              Products
            </h1>

            <p className="text-gray-400 mt-2">
              Manage all products in your store
            </p>
          </div>

          <button
            className="
              flex items-center justify-center gap-2
              bg-white
              text-black
              px-5
              py-3
              rounded-md
              font-semibold
              hover:bg-gray-200
              transition
            "
            onClick={() => router.push("/admin/product/addIt")}
          >
            <FaPlus />
            Add Product
          </button>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block bg-[#111111] border border-[#222] rounded-md overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#222]">
                <th className="text-left px-6 py-4 text-gray-400">
                  Product
                </th>
                <th className="text-left px-6 py-4 text-gray-400">
                  Category
                </th>
                <th className="text-left px-6 py-4 text-gray-400">
                  Price
                </th>
                <th className="text-left px-6 py-4 text-gray-400">
                  Stock
                </th>
                <th className="text-center px-6 py-4 text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {isLoading && (
                <tr>
                  <td className="px-6 py-8 text-center text-gray-400" colSpan={5}>
                    Loading products...
                  </td>
                </tr>
              )}

              {!isLoading && products.length === 0 && (
                <tr>
                  <td className="px-6 py-8 text-center text-gray-400" colSpan={5}>
                    No products found.
                  </td>
                </tr>
              )}

              {!isLoading && products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-[#1a1a1a] hover:bg-[#181818]"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <Image
                        src={getProductImage(product)}
                        alt={product.name}
                        width={56}
                        height={56}
                        className="w-14 h-14 rounded-md object-cover"
                      />

                      <span className="text-white font-medium">
                        {product.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-gray-300">
                    {product.category}
                  </td>

                  <td className="px-6 py-4 text-white">
                   Rs {product.discounted_price?.toLocaleString()}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs
                        ${product.stock > 0
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                        }`}
                    >
                      {product.stock > 0
                        ? `${product.stock} In Stock`
                        : "Out of Stock"}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-3">

                      <button className="w-10 h-10 rounded-md bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition">
                        <FaEye />
                      </button>

                      <button className="w-10 h-10 rounded-md bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 transition">
                        <FaEdit />
                      </button>

                      <button className="w-10 h-10 rounded-md bg-red-500/20 text-red-400 hover:bg-red-500/30 transition">
                        <FaTrash />
                      </button>

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-4">
          {isLoading && (
            <div className="rounded-md border border-[#222] bg-[#111111] p-6 text-center text-gray-400">
              Loading products...
            </div>
          )}

          {!isLoading && products.length === 0 && (
            <div className="rounded-md border border-[#222] bg-[#111111] p-6 text-center text-gray-400">
              No products found.
            </div>
          )}

          {!isLoading && products.map((product) => (
            <div
              key={product.id}
              className="
                bg-[#111111]
                border
                border-[#222]
                rounded-md
                p-4
              "
            >
              <div className="flex gap-4">

                <Image
                  src={getProductImage(product)}
                  alt={product.name}
                  width={96}
                  height={96}
                  className="w-24 h-24 rounded-md object-cover"
                />

                <div className="flex-1">

                  <h2 className="text-white font-semibold">
                    {product.name}
                  </h2>

                  <p className="text-gray-500 text-sm mt-1">
                    {product.category}
                  </p>

                  <p className="text-white font-bold mt-2">
                    Rs {product.discounted_price?.toLocaleString()}
                  </p>

                  <span
                    className={`inline-block mt-2 px-3 py-1 rounded-full text-xs
                      ${product.stock > 0
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                      }`}
                  >
                    {product.stock > 0
                      ? `${product.stock} In Stock`
                      : "Out of Stock"}
                  </span>

                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-4">

                <button
                  className="
                    py-2
                    rounded-md
                    bg-blue-500/20
                    text-blue-400
                    flex
                    items-center
                    justify-center
                    gap-2
                  "
                >
                  <FaEye />
                  View
                </button>

                <button
                  className="
                    py-2
                    rounded-md
                    bg-yellow-500/20
                    text-yellow-400
                    flex
                    items-center
                    justify-center
                    gap-2
                  "
                  onClick={() => router.push("/admin/product/editIt")}
                >
                  <FaEdit />
                  Edit
                </button>

                <button
                  className="
                    py-2
                    rounded-md
                    bg-red-500/20
                    text-red-400
                    flex
                    items-center
                    justify-center
                    gap-2
                  "
                >
                  <FaTrash />
                  Delete
                </button>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
