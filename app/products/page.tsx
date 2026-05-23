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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">

          {products.map((p) => (
            <div
              key={p.id}
              className="group bg-[#111111] rounded-3xl overflow-hidden border border-[#222] hover:border-gray-700 transition"
            >

              {/* IMAGE */}
              <div className="relative overflow-hidden">

                <img
                  src={p.images[0]}
                  alt={p.name}
                  className="w-full h-[260px] object-cover group-hover:scale-105 transition duration-500"
                />

                {/* overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                {/* TOP BAR */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center">

                  {/* stock */}
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium backdrop-blur-md ${
                      p.stock > 0
                        ? "bg-green-500/20 text-green-300 border border-green-500/30"
                        : "bg-red-500/20 text-red-300 border border-red-500/30"
                    }`}
                  >
                    {p.stock > 0 ? "Available" : "Out of Stock"}
                  </span>

                  {/* favourite button */}
                  <button
                    onClick={() => toggleFavourite(p.id!)}
                    className={`
                      w-10 h-10
                      rounded-full
                      backdrop-blur-md
                      border border-white/10
                      flex items-center justify-center
                      transition-all duration-300
                      ${p.isfavourite
                        ? "bg-red-500 text-white"
                        : "bg-black/50 text-white hover:bg-red-500"
                      }
                    `}
                  >
                    <FaHeart className="text-sm" />
                  </button>

                </div>
              </div>

              {/* CONTENT */}
              <div className="p-5">

                <p className="text-gray-500 text-xs uppercase tracking-[2px] mb-2">
                  {p.category}
                </p>

                <h2 className="text-white text-xl font-semibold mb-2 line-clamp-1">
                  {p.name}
                </h2>

                <p className="text-gray-400 text-sm line-clamp-2">
                  {p.description}
                </p>

                <div className="flex items-end gap-3 mt-5">
                  <span className="text-gray-500 line-through text-sm">
                    Rs {p.original_price}
                  </span>

                  <span className="text-white text-2xl font-bold">
                    Rs {p.discounted_price}
                  </span>
                </div>

                <button
                  disabled={p.stock === 0}
                  className={`w-full mt-5 py-3 rounded-2xl font-medium transition ${
                    p.stock > 0
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