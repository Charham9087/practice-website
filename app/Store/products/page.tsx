"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaHeart } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { getProductImage } from "@/lib/catalog";
import { Products } from "@/lib/types";
import {
  addProductToCart,
  getProductsWithFavourites,
  searchProductIds,
  toggleProductFavourite,
} from "@/lib/shop";

export default function ProductsPage() {
  const [products, setProducts] = useState<Products[]>([]);
  const [visibleProducts, setVisibleProducts] = useState<Products[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionProductId, setActionProductId] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    getProductsWithFavourites().then((data) => {
      setProducts(data);
      setVisibleProducts(data);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    let isMounted = true;
    const timer = window.setTimeout(async () => {
      const trimmedQuery = query.trim();

      if (!trimmedQuery) {
        setVisibleProducts(products);
        return;
      }

      const ids = await searchProductIds(trimmedQuery);
      if (!isMounted) return;

      if (ids.length === 0) {
        setVisibleProducts([]);
        return;
      }

      const orderedProducts = ids
        .map((id) => products.find((product) => product.id === id))
        .filter((product): product is Products => Boolean(product));
      setVisibleProducts(orderedProducts);
    }, 250);

    return () => {
      isMounted = false;
      window.clearTimeout(timer);
    };
  }, [products, query]);

  const toggleFavourite = async (id: number) => {
    setMessage("");
    setActionProductId(id);
    const result = await toggleProductFavourite(id);

    if (!result.success) {
      setMessage(result.message);
      setActionProductId(null);
      return;
    }

    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, isfavourite: Boolean(result.isFavourite) } : p
      )
    );
    setMessage(result.message);
    setActionProductId(null);
  };

  const addToCart = async (productId: number) => {
    setMessage("");
    setActionProductId(productId);
    const result = await addProductToCart(productId, 1);
    setMessage(result.message);
    setActionProductId(null);
  };

  return (
    <section className="bg-black min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Our Products
          </h1>
          <p className="text-gray-400 mt-2">
            Explore premium products with best prices
          </p>
        </div>

        <div className="mb-6">
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by product, category, or description"
            className="w-full rounded-md border border-[#333] bg-[#111] px-4 py-3 text-white outline-none transition focus:border-white"
          />
        </div>

        {message && (
          <p className="mb-5 rounded-md border border-[#333] bg-[#111] px-4 py-3 text-sm text-gray-300">
            {message}
          </p>
        )}

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 xl:gap-7 items-stretch">
          {isLoading && (
            <div className="col-span-full rounded-md border border-[#222] bg-[#111] p-6 text-center text-gray-400">
              Loading products...
            </div>
          )}

          {!isLoading && visibleProducts.length === 0 && (
            <div className="col-span-full rounded-md border border-[#222] bg-[#111] p-6 text-center text-gray-400">
              No products found.
            </div>
          )}

          {!isLoading && visibleProducts.map((p) => (
            <div
              onClick={() => router.push(`/Store/viewproduct?id=${p.id}`)}
              key={p.id}  
              className="group bg-[#111111] rounded-md overflow-hidden border border-[#222] hover:border-gray-700 transition flex flex-col cursor-pointer"
            >

              {/* IMAGE */}
              <div className="relative overflow-hidden">

                <Image
                  src={getProductImage(p)}
                  alt={p.name}
                  width={600}
                  height={600}
                  unoptimized
                  className="w-full h-[180px] sm:h-[210px] lg:h-[230px] object-cover group-hover:scale-105 transition duration-500"
                />

                {/* overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                {/* TOP BAR */}
                <div className="absolute top-3 left-3 right-3 flex justify-between items-center">

                  {/* stock */}
                  <span
                    className={`text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-full font-medium backdrop-blur-md ${p.stock > 0
                      ? "bg-green-500/20 text-green-300 border border-green-500/30"
                      : "bg-red-500/20 text-red-300 border border-red-500/30"
                      }`}
                  >
                    {p.stock > 0 ? "Available" : "Out of Stock"}
                  </span>

                  {/* favourite */}
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      if (p.id) toggleFavourite(p.id);
                    }}
                    disabled={actionProductId === p.id}
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full backdrop-blur-md border border-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95

                    ${p.isfavourite
                        ? "bg-red-500 text-white"
                        : "bg-black/50 text-white hover:bg-white/10"
                      }
              `}
                  >
                    <FaHeart className="text-[12px] sm:text-sm" />
                  </button>

                </div>
              </div>

              {/* CONTENT */}
              <div className="p-4 sm:p-5 flex flex-col flex-1">

                {/* CATEGORY */}
                <p className="text-gray-500 text-[10px] sm:text-xs uppercase tracking-[2px] mb-2">
                  {p.category}
                </p>

                {/* NAME */}
                <h2 className="text-white text-sm sm:text-lg font-semibold mb-2 line-clamp-1">
                  {p.name}
                </h2>

                {/* PRICES */}
                <div className="flex items-end gap-2 sm:gap-3 mt-auto">
                  <span className="text-gray-500 line-through text-xs sm:text-sm">
                    Rs {p.original_price.toLocaleString()}
                  </span>

                  <span className="text-white text-lg sm:text-2xl font-bold">
                    Rs {p.discounted_price.toLocaleString()}
                  </span>
                </div>

                {/* BUTTON */}
                <button
                  disabled={p.stock === 0 || actionProductId === p.id}
                  onClick={(event) => {
                    event.stopPropagation();
                    if (p.id) addToCart(p.id);
                  }}
                  className={`w-full mt-4 py-2.5 rounded-xl font-medium transition-all duration-300 text-sm sm:text-base
                  ${p.stock > 0
                      ? "bg-white text-black hover:bg-gray-200 hover:scale-[1.02]"
                      : "bg-[#1f1f1f] text-gray-600 cursor-not-allowed"
                    }
              `}
                >
                  {actionProductId === p.id
                    ? "Working..."
                    : p.stock > 0
                      ? "Add to Cart"
                      : "Unavailable"}
                </button>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
