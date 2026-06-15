"use client";
import Link from "next/link";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import { useState } from "react";

const product = {
    id: 1,
    name: "Premium Headphones",
    description:
        "Experience immersive sound quality with premium wireless headphones designed for comfort and performance.",
    original_price: 25000,
    discounted_price: 19999,
    stock: 12,
    rating: 4,
    category: "Electronics",
    isfavourite: false,
    images: [
        "/images/product1.jpg",
        "/images/product2.jpg",
        "/images/product3.jpg",
    ],
};

export default function ProductViewPage() {
    const [quantity, setquantity] = useState(1);
    const [isfavourite, setisfavourite] = useState(product.isfavourite);

    return (
        <section className="bg-black text-white min-h-screen px-4 sm:px-6 lg:px-8 py-10">
            <div className="max-w-7xl mx-auto">

                {/* BREADCRUMB */}
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                    <Link href="/" className="hover:text-white transition">
                        Home
                    </Link>

                    <span>/</span>

                    <Link href="/products" className="hover:text-white transition">
                        Products
                    </Link>

                    <span>/</span>

                    <span className="text-white">{product.name}</span>
                </div>

                {/* MAIN GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">

                    {/* LEFT SIDE */}
                    <div>

                        {/* MAIN IMAGE */}
                        <div className="bg-[#111111] border border-[#222] rounded-2xl roup-hover:scale-105 transition duration-500 overflow-hidden">
                            <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-full h-[320px] sm:h-[450px] object-cover"
                            />
                        </div>

                        {/* IMAGE GALLERY */}
                        <div className="grid grid-cols-3 gap-4 mt-4 roup-hover:scale-105 transition duration-500">
                            {product.images.map((img, index) => (
                                <div
                                    key={index}
                                    className="bg-[#111111] border border-[#222] rounded-xl overflow-hidden cursor-pointer hover:border-gray-700 transition"
                                >
                                    <img
                                        src={img}
                                        alt="Product"
                                        className="w-full h-28 object-cover"
                                    />
                                </div>
                            ))}
                        </div>

                    </div>

                    {/* RIGHT SIDE */}
                    <div className="flex flex-col">

                        {/* CATEGORY */}
                        <p className="text-gray-500 text-xs uppercase tracking-[3px] mb-3">
                            {product.category}
                        </p>

                        {/* TITLE */}
                        <h1 className="text-3xl sm:text-5xl font-bold leading-tight mb-5">
                            {product.name}
                        </h1>

                        {/* RATING */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="flex items-center gap-1 text-yellow-400">
                                {Array.from({ length: product.rating }, (_, i) => (
                                    <FaStar key={i} />
                                ))}
                            </div>

                        </div>

                        {/* DESCRIPTION */}
                        <p className="text-gray-400 leading-relaxed text-sm sm:text-base mb-8">
                            {product.description}
                        </p>

                        {/* PRICE */}
                        <div className="flex items-end gap-4 mb-8">
                            <span className="text-gray-500 line-through text-lg">
                                Rs {product.original_price}
                            </span>

                            <span className="text-4xl font-bold text-white">
                                Rs {product.discounted_price}
                            </span>
                        </div>

                        {/* STOCK */}
                        <div className="mb-8">
                            <span
                                className={`px-4 py-2 rounded-full text-sm font-medium ${product.stock > 0
                                        ? "bg-green-500/20 text-green-300 border border-green-500/30"
                                        : "bg-red-500/20 text-red-300 border border-red-500/30"
                                    }`}
                            >
                                {product.stock > 0
                                    ? `${product.stock} Items Available`
                                    : "Out of Stock"}
                            </span>
                        </div>


                        {/* ACTION BUTTONS */}
                        <div className="flex flex-col sm:flex-row gap-2 mb-10">

                            {/* Quantity Selector */}
                            <div className="flex items-center gap-3 bg-[#111111] border border-[#222] rounded-md px-3 py-2 w-fit">

                                <button
                                    onClick={() => setquantity((prev) => Math.max(1, prev - 1))}
                                    className="text-xl px-2 hover:text-gray-400"
                                >
                                    -
                                </button>

                                <span className="min-w-[20px] text-center">{quantity}</span>

                                <button
                                    onClick={() => setquantity((prev) => prev + 1)}
                                    className="text-xl px-2 hover:text-gray-400"
                                >
                                    +
                                </button>
                            </div>

                            {/* Add to Cart */}
                            <button
                                className={`
      flex-1
      py-4
      rounded-md
      font-semibold
      flex items-center justify-center gap-3
      transition-all duration-300

      ${product.stock > 0
                                        ? "bg-white text-black hover:bg-gray-200"
                                        : "bg-[#1f1f1f] text-gray-600 cursor-not-allowed"
                                    }
    `}
                                disabled={product.stock === 0}
                            >
                                <FaShoppingCart />
                                Add To Cart
                            </button>

                            {/* Favourite */}
                            <button
                                onClick={() => setisfavourite(!isfavourite)}
                                className={`
      w-14 h-14
      rounded-md
      border border-[#222]
      flex items-center justify-center
      transition-all duration-300

      ${isfavourite
                                        ? "bg-red-500 text-white"
                                        : "bg-[#111111] hover:bg-[#1a1a1a]"
                                    }
    `}
                            >
                                <FaHeart className="text-lg" />
                            </button>

                        </div>

                        {/* EXTRA INFO */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">



                            <div className="bg-[#111111] border border-[#222] rounded-md p-5">
                                <h3 className="font-semibold mb-2">
                                    Secure Payment
                                </h3>

                                <p className="text-gray-400 text-sm">
                                    100% safe payment methods.
                                </p>
                            </div>

                            <div className="bg-[#111111] border border-[#222] rounded-md   p-5">
                                <h3 className="font-semibold mb-2">
                                    Support 24/7
                                </h3>

                                <p className="text-gray-400 text-sm">
                                    Dedicated customer support.
                                </p>
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}
