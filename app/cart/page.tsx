"use client";

import { FaTrash } from "react-icons/fa";

const cartItems = [
  {
    id: 1,
    name: "Premium Headphones",
    category: "Electronics",
    image: "https://picsum.photos/300/300?random=1",
    price: 19999,
    quantity: 1,
  },
  {
    id: 2,
    name: "Smart Watch",
    category: "Wearables",
    image: "https://picsum.photos/300/300?random=2",
    price: 14999,
    quantity: 2,
  },
  {
    id: 3,
    name: "Gaming Mouse",
    category: "Accessories",
    image: "https://picsum.photos/300/300?random=3",
    price: 4999,
    quantity: 1,
  },
];

export default function CartPage() {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shipping = 500;
  const total = subtotal + shipping;

  return (
    <section className="bg-black min-h-screen py-6 sm:py-10 px-3 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Shopping Cart
          </h1>

          <p className="text-gray-400 mt-2">
            Review your selected products
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="
                  bg-[#111111]
                  border
                  border-[#222]
                  rounded-xl
                  overflow-hidden
                  hover:border-gray-700
                  transition
                "
              >
                <div className="flex p-3 sm:p-4 gap-4">
                  {/* Image */}
                  <div className="w-[110px] sm:w-[140px] shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="
                        w-full
                        h-[110px]
                        sm:h-[140px]
                        object-cover
                        rounded-lg
                      "
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-500">
                          {item.category}
                        </p>

                        <h2 className="text-white text-sm sm:text-lg font-semibold truncate">
                          {item.name}
                        </h2>
                      </div>

                      <button className="text-red-500 hover:text-red-400 shrink-0">
                        <FaTrash size={16} />
                      </button>
                    </div>

                    <div className="mt-2">
                      <span className="text-lg sm:text-2xl font-bold text-white">
                        Rs {item.price.toLocaleString()}
                      </span>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      {/* Quantity */}
                      <div className="flex items-center gap-2">
                        <button
                          className="
                            w-8 h-8
                            rounded-lg
                            bg-[#1a1a1a]
                            border
                            border-[#333]
                            text-white
                            hover:border-gray-500
                          "
                        >
                          -
                        </button>

                        <span className="text-white w-6 text-center">
                          {item.quantity}
                        </span>

                        <button
                          className="
                            w-8 h-8
                            rounded-lg
                            bg-[#1a1a1a]
                            border
                            border-[#333]
                            text-white
                            hover:border-gray-500
                          "
                        >
                          +
                        </button>
                      </div>

                      {/* Item Total */}
                      <span className="text-white font-semibold text-sm sm:text-base">
                        Rs {(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div>
            <div
              className="
                bg-[#111111]
                border
                border-[#222]
                rounded-xl
                p-5
                lg:sticky
                lg:top-5
              "
            >
              <h2 className="text-white text-xl sm:text-2xl font-bold mb-6">
                Order Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal</span>

                  <span className="text-white">
                    Rs {subtotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Shipping</span>

                  <span className="text-white">
                    Rs {shipping.toLocaleString()}
                  </span>
                </div>

                <div className="border-t border-[#222] pt-4 flex justify-between">
                  <span className="text-white font-semibold">
                    Total
                  </span>

                  <span className="text-xl sm:text-2xl font-bold text-white">
                    Rs {total.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                className="
                  w-full
                  mt-6
                  py-3
                  rounded-xl
                  bg-white
                  text-black
                  font-semibold
                  hover:bg-gray-200
                  transition
                "
              >
                Proceed to Checkout
              </button>

              <button
                className="
                  w-full
                  mt-3
                  py-3
                  rounded-xl
                  border
                  border-[#333]
                  text-white
                  hover:bg-[#1a1a1a]
                  transition
                "
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}