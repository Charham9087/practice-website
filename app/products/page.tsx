"use client";

import { useState } from "react";
import { getProducts } from "@/lib/api";
import { Products } from "@/lib/types";
import { FaHeart } from "react-icons/fa6";

const initialProducts: Products[] = [
  {
    id: 1,
    name: "Product 1",
    description: "Description for Product 1",
    original_price: 100,
    discounted_price: 80,
    category: "Category 1",
    images: ["/images/product1.jpg"],
    stock: 10,
    isfavourite: false,
  },
  {
    id: 2,
    name: "Product 2",
    description: "Description for Product 2",
    original_price: 200,
    discounted_price: 150,
    category: "Category 2",
    images: ["/images/product2.jpg"],
    stock: 5,
    isfavourite: false,
  },
  {
    id: 3,
    name: "Product 3",
    description: "Description for Product 3",
    original_price: 300,
    discounted_price: 250,
    category: "Category 3",
    images: ["/images/product3.jpg"],
    stock: 0,
    isfavourite: true,
  },
  {
    id: 4,
    name: "Product 4",
    description: "Description for Product 4",
    original_price: 400,
    discounted_price: 350,
    category: "Category 4",
    images: ["/images/product4.jpg"],
    stock: 2,
    isfavourite: false,
  },
  {
    id: 5,
    name: "Product 5",
    description: "Description for Product 5",
    original_price: 500,
    discounted_price: 450,
    category: "Category 5",
    images: ["/images/product5.jpg"],
    stock: 1,
    isfavourite: false,
  },
];

export default function ProductsPage() {
  const [products, setProducts] = useState(initialProducts);

  // toggle favourite
  const toggleFavourite = (id: number) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, isfavourite: !p.isfavourite } : p
      )
    );
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

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 xl:gap-7 items-stretch">

          {products.map((p) => (
            <div
              key={p.id}
              className="group bg-[#111111] rounded-md overflow-hidden border border-[#222] hover:border-gray-700 transition flex flex-col"
            >

              {/* IMAGE */}
              <div className="relative overflow-hidden">

                <img
                  src={p.images[0]}
                  alt={p.name}
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
                    onClick={() => toggleFavourite(p.id!)}
                    className={`
              w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10
              rounded-full
              backdrop-blur-md
              border border-white/10
              flex items-center justify-center
              transition-all duration-300
              ${p.isfavourite
                        ? "bg-red-500 text-white"
                        : "bg-black/50 text-white"
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
                    Rs {p.original_price}
                  </span>

                  <span className="text-white text-lg sm:text-2xl font-bold">
                    Rs {p.discounted_price}
                  </span>
                </div>

                {/* BUTTON */}
                <button
                  disabled={p.stock === 0}
                  className={`w-full mt-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-medium transition text-sm sm:text-base ${p.stock > 0
                      ? "bg-white text-black hover:bg-gray-200"
                      : "bg-[#1f1f1f] text-gray-600 cursor-not-allowed"
                    }`}
                >
                  {p.stock > 0 ? "Add to Cart" : "Unavailable"}
                </button>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}