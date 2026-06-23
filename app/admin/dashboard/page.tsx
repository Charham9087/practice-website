"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getAllOrders, getProductsWithFavourites } from "@/lib/shop";
import { CustomerOrder, CustomerOrderItem, Products } from "@/lib/types";

type OrderWithItems = CustomerOrder & { items: CustomerOrderItem[] };

const revenueData = [
  { month: "Jan", value: 42 },
  { month: "Feb", value: 58 },
  { month: "Mar", value: 51 },
  { month: "Apr", value: 74 },
  { month: "May", value: 68 },
  { month: "Jun", value: 86 },
  { month: "Jul", value: 79 },
];

export default function AnalyticsPage() {
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [products, setProducts] = useState<Products[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      const [orderData, productData] = await Promise.all([
        getAllOrders(),
        getProductsWithFavourites(),
      ]);
      setOrders(orderData);
      setProducts(productData);
      setIsLoading(false);
    }

    loadDashboard();
  }, []);

  const stats = useMemo(() => {
    const revenue = orders.reduce((sum, order) => sum + order.total, 0);
    const pending = orders.filter((order) => order.status === "Pending").length;
    const delivered = orders.filter((order) => order.status === "Delivered").length;
    const lowStock = products.filter((product) => product.stock <= 5).length;

    return { revenue, pending, delivered, lowStock };
  }, [orders, products]);

  const topProducts = useMemo(() => {
    const sales = new Map<string, number>();

    orders.forEach((order) => {
      order.items?.forEach((item) => {
        sales.set(
          item.product_name,
          (sales.get(item.product_name) ?? 0) + item.quantity
        );
      });
    });

    return Array.from(sales.entries())
      .map(([name, sold]) => ({ name, sold }))
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 5);
  }, [orders]);

  return (
    <section className="min-h-screen bg-black p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Analytics Dashboard
          </h1>
          <p className="mt-2 text-gray-400">
            Monitor products, revenue, and fulfillment.
          </p>
        </div>

        {isLoading && (
          <div className="mb-6 rounded-md border border-[#222] bg-[#111] p-5 text-gray-400">
            Loading dashboard...
          </div>
        )}

        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="rounded-md border border-[#222] bg-[#111] p-5">
            <p className="text-sm text-gray-400">Revenue</p>
            <h2 className="mt-2 text-2xl font-bold text-white">
              Rs {stats.revenue.toLocaleString()}
            </h2>
            <p className="mt-2 text-sm text-green-400">Live orders</p>
          </div>

          <div className="rounded-md border border-[#222] bg-[#111] p-5">
            <p className="text-sm text-gray-400">Orders</p>
            <h2 className="mt-2 text-2xl font-bold text-white">
              {orders.length}
            </h2>
            <p className="mt-2 text-sm text-yellow-400">
              {stats.pending} pending
            </p>
          </div>

          <div className="rounded-md border border-[#222] bg-[#111] p-5">
            <p className="text-sm text-gray-400">Delivered</p>
            <h2 className="mt-2 text-2xl font-bold text-white">
              {stats.delivered}
            </h2>
            <p className="mt-2 text-sm text-green-400">Completed orders</p>
          </div>

          <div className="rounded-md border border-[#222] bg-[#111] p-5">
            <p className="text-sm text-gray-400">Products</p>
            <h2 className="mt-2 text-2xl font-bold text-white">
              {products.length}
            </h2>
            <p className="mt-2 text-sm text-red-400">
              {stats.lowStock} low stock
            </p>
          </div>
        </div>

        <div className="mb-8 grid gap-6 lg:grid-cols-3">
          <div className="rounded-md border border-[#222] bg-[#111] p-6 lg:col-span-2">
            <h2 className="mb-4 text-xl font-semibold text-white">
              Revenue Overview
            </h2>

            <div className="h-[300px] rounded-md border border-[#222] bg-black p-4">
              <div className="flex h-full items-end gap-3">
                {revenueData.map((item) => (
                  <div
                    key={item.month}
                    className="flex min-w-0 flex-1 flex-col items-center gap-3"
                  >
                    <div className="flex h-56 w-full items-end rounded-md bg-[#181818]">
                      <div
                        className="w-full rounded-md bg-white transition"
                        style={{ height: `${item.value}%` }}
                        aria-label={`${item.month} revenue ${item.value}%`}
                      />
                    </div>
                    <span className="text-xs text-gray-500">{item.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-md border border-[#222] bg-[#111] p-6">
            <h2 className="mb-4 text-xl font-semibold text-white">
              Top Products
            </h2>

            <div className="space-y-4">
              {topProducts.length === 0 && (
                <p className="text-sm text-gray-400">No sales yet.</p>
              )}

              {topProducts.map((product) => (
                <div
                  key={product.name}
                  className="flex items-center justify-between gap-3"
                >
                  <span className="truncate text-gray-300">{product.name}</span>
                  <span className="font-semibold text-white">{product.sold}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto rounded-md border border-[#222] bg-[#111] p-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-white">Recent Orders</h2>
            <Link
              href="/admin/order"
              className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-gray-200"
            >
              View All
            </Link>
          </div>

          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-[#222]">
                <th className="py-3 text-left text-gray-400">Order ID</th>
                <th className="py-3 text-left text-gray-400">Customer</th>
                <th className="py-3 text-left text-gray-400">Amount</th>
                <th className="py-3 text-left text-gray-400">Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className="border-b border-[#1a1a1a]">
                  <td className="py-4 text-white">{order.order_number}</td>
                  <td className="py-4 text-gray-300">{order.customer_name}</td>
                  <td className="py-4 text-white">
                    Rs {order.total.toLocaleString()}
                  </td>
                  <td className="py-4">
                    <span className="rounded-full bg-yellow-500/20 px-3 py-1 text-xs text-yellow-400">
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}

              {orders.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-gray-400">
                    No orders yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
