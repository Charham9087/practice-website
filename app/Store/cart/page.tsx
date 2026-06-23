"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { getProductImage } from "@/lib/catalog";
import {
  calculateCartTotals,
  checkoutCart,
  getCartItems,
  removeCartItem,
  updateCartItemQuantity,
} from "@/lib/shop";
import { CartItem, CheckoutDetails } from "@/lib/types";

const inputClass =
  "w-full rounded-md border border-[#333] bg-black px-3 py-3 text-white outline-none transition focus:border-white";

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [updatingItemId, setUpdatingItemId] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [checkout, setCheckout] = useState<CheckoutDetails>({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    shipping_address: "",
  });

  const totals = calculateCartTotals(items);

  const loadCart = async () => {
    setIsLoading(true);
    const result = await getCartItems();
    setItems(result.items);
    setMessage(result.message);
    setIsLoading(false);
  };

  useEffect(() => {
    let isMounted = true;

    async function loadInitialCart() {
      const result = await getCartItems();
      if (!isMounted) return;
      setItems(result.items);
      setMessage(result.message);
      setIsLoading(false);
    }

    loadInitialCart();

    return () => {
      isMounted = false;
    };
  }, []);

  const changeQuantity = async (item: CartItem, quantity: number) => {
    setUpdatingItemId(item.id);
    const result = await updateCartItemQuantity(item.id, quantity);
    setMessage(result.message);
    await loadCart();
    setUpdatingItemId(null);
  };

  const removeItem = async (item: CartItem) => {
    setUpdatingItemId(item.id);
    const result = await removeCartItem(item.id);
    setMessage(result.message);
    await loadCart();
    setUpdatingItemId(null);
  };

  const handleCheckoutChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCheckout((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleCheckout = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsCheckingOut(true);
    setMessage("");

    const result = await checkoutCart(checkout);
    setMessage(result.message);

    if (result.success) {
      setItems([]);
      setCheckout({
        customer_name: "",
        customer_email: "",
        customer_phone: "",
        shipping_address: "",
      });
    }

    setIsCheckingOut(false);
  };

  return (
    <section className="min-h-screen bg-black px-3 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Shopping Cart
          </h1>
          <p className="mt-2 text-gray-400">
            Review your products and complete checkout.
          </p>
        </div>

        {message && (
          <p className="mb-5 rounded-md border border-[#333] bg-[#111] px-4 py-3 text-sm text-gray-300">
            {message}
          </p>
        )}

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {isLoading && (
              <div className="rounded-md border border-[#222] bg-[#111] p-6 text-center text-gray-400">
                Loading cart...
              </div>
            )}

            {!isLoading && items.length === 0 && (
              <div className="rounded-md border border-[#222] bg-[#111] p-6 text-center">
                <p className="text-gray-300">Your cart is empty.</p>
                <Link
                  href="/Store/products"
                  className="mt-4 inline-flex rounded-md bg-white px-5 py-3 font-semibold text-black transition hover:bg-gray-200"
                >
                  Shop Products
                </Link>
              </div>
            )}

            {!isLoading &&
              items.map((item) => (
                <div
                  key={item.id}
                  className="overflow-hidden rounded-md border border-[#222] bg-[#111111] transition hover:border-gray-700"
                >
                  <div className="flex gap-4 p-3 sm:p-4">
                    <div className="w-[110px] shrink-0 sm:w-[140px]">
                      <Image
                        src={getProductImage(item.product)}
                        alt={item.product.name}
                        width={300}
                        height={300}
                        unoptimized
                        className="h-[110px] w-full rounded-md object-cover sm:h-[140px]"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-[10px] uppercase tracking-widest text-gray-500 sm:text-xs">
                            {item.product.category}
                          </p>
                          <h2 className="truncate text-sm font-semibold text-white sm:text-lg">
                            {item.product.name}
                          </h2>
                        </div>

                        <button
                          onClick={() => removeItem(item)}
                          disabled={updatingItemId === item.id}
                          className="shrink-0 text-red-500 hover:text-red-400"
                          aria-label={`Remove ${item.product.name}`}
                        >
                          <FaTrash size={16} />
                        </button>
                      </div>

                      <div className="mt-2">
                        <span className="text-lg font-bold text-white sm:text-2xl">
                          Rs {item.product.discounted_price.toLocaleString()}
                        </span>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              changeQuantity(item, Math.max(1, item.quantity - 1))
                            }
                            disabled={updatingItemId === item.id}
                            className="h-8 w-8 rounded-md border border-[#333] bg-[#1a1a1a] text-white hover:border-gray-500"
                          >
                            -
                          </button>

                          <span className="w-8 text-center text-white">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              changeQuantity(
                                item,
                                Math.min(item.product.stock || item.quantity + 1, item.quantity + 1)
                              )
                            }
                            disabled={updatingItemId === item.id}
                            className="h-8 w-8 rounded-md border border-[#333] bg-[#1a1a1a] text-white hover:border-gray-500"
                          >
                            +
                          </button>
                        </div>

                      <span className="text-sm font-semibold text-white sm:text-base">
                          {updatingItemId === item.id
                            ? "Updating..."
                            : `Rs ${(
                                item.product.discounted_price * item.quantity
                              ).toLocaleString()}`}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div>
            <div className="rounded-md border border-[#222] bg-[#111111] p-5 lg:sticky lg:top-5">
              <h2 className="mb-6 text-xl font-bold text-white sm:text-2xl">
                Order Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-white">
                    Rs {totals.subtotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Shipping</span>
                  <span className="text-white">
                    Rs {totals.shipping.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between border-t border-[#222] pt-4">
                  <span className="font-semibold text-white">Total</span>
                  <span className="text-xl font-bold text-white sm:text-2xl">
                    Rs {totals.total.toLocaleString()}
                  </span>
                </div>
              </div>

              <form onSubmit={handleCheckout} className="mt-6 space-y-3">
                <input
                  name="customer_name"
                  value={checkout.customer_name}
                  onChange={handleCheckoutChange}
                  placeholder="Full name"
                  className={inputClass}
                  required
                />
                <input
                  type="email"
                  name="customer_email"
                  value={checkout.customer_email}
                  onChange={handleCheckoutChange}
                  placeholder="Email"
                  className={inputClass}
                  required
                />
                <input
                  name="customer_phone"
                  value={checkout.customer_phone}
                  onChange={handleCheckoutChange}
                  placeholder="Phone"
                  className={inputClass}
                  required
                />
                <textarea
                  name="shipping_address"
                  value={checkout.shipping_address}
                  onChange={handleCheckoutChange}
                  placeholder="Shipping address"
                  rows={4}
                  className={`${inputClass} resize-none`}
                  required
                />

                <button
                  type="submit"
                  disabled={items.length === 0 || isCheckingOut}
                  className="w-full rounded-md bg-white py-3 font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isCheckingOut ? "Placing Order..." : "Proceed to Checkout"}
                </button>
              </form>

              <Link
                href="/Store/products"
                className="mt-3 block w-full rounded-md border border-[#333] py-3 text-center text-white transition hover:bg-[#1a1a1a]"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
