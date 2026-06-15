"use client";

import Link from "next/link";
import { Search } from "lucide-react";

const orders = [
  {
    id: "#ORD-1001",
    customer: "Ali Hassan",
    email: "ali@example.com",
    total: 8500,
    status: "Delivered",
    date: "12 Aug 2026",
  },
  {
    id: "#ORD-1002",
    customer: "Ahmed Khan",
    email: "ahmed@example.com",
    total: 4200,
    status: "Pending",
    date: "13 Aug 2026",
  },
  {
    id: "#ORD-1003",
    customer: "Sara Ahmed",
    email: "sara@example.com",
    total: 12999,
    status: "Shipped",
    date: "13 Aug 2026",
  },
];

const statusStyles = {
  Delivered:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Pending:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  Shipped:
    "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Cancelled:
    "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

export default function OrdersPage() {
  return (
 <div className="p-4 sm:p-6">
  {/* Header */}
  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold">Orders</h1>
      <p className="text-muted-foreground">
        Manage and track customer orders
      </p>
    </div>

    <div className="relative w-full md:w-80">
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
      />
      <input
        type="text"
        placeholder="Search orders..."
        className="w-full rounded-lg border bg-background pl-10 pr-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  </div>

  {/* Desktop Table */}
  <div className="hidden lg:block overflow-hidden rounded-xl border bg-background">
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="border-b bg-muted/50">
          <tr>
            <th className="p-4 text-left">Order ID</th>
            <th className="p-4 text-left">Customer</th>
            <th className="p-4 text-left">Date</th>
            <th className="p-4 text-left">Total</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              className="border-b transition hover:bg-muted/50"
            >
              <td className="p-4 font-medium">{order.id}</td>

              <td className="p-4">
                <p className="font-medium">{order.customer}</p>
                <p className="text-sm text-muted-foreground">
                  {order.email}
                </p>
              </td>

              <td className="p-4">{order.date}</td>

              <td className="p-4 font-semibold">
                Rs. {order.total.toLocaleString()}
              </td>

              <td className="p-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    statusStyles[
                      order.status as keyof typeof statusStyles
                    ]
                  }`}
                >
                  {order.status}
                </span>
              </td>

              <td className="p-4">
                <Link
                  href={`/admin/orders/${order.id}`}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>

  {/* Mobile Cards */}
  <div className="grid gap-4 lg:hidden">
    {orders.map((order) => (
      <div
        key={order.id}
        className="rounded-xl border bg-background p-4"
      >
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{order.id}</h3>

          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              statusStyles[
                order.status as keyof typeof statusStyles
              ]
            }`}
          >
            {order.status}
          </span>
        </div>

        <div className="mt-3 space-y-1">
          <p className="font-medium">{order.customer}</p>
          <p className="text-sm text-muted-foreground">
            {order.email}
          </p>
          <p className="text-sm">{order.date}</p>
          <p className="font-semibold">
            Rs. {order.total.toLocaleString()}
          </p>
        </div>

        <Link
          href={`/admin/orders/${order.id}`}
          className="mt-4 block w-full rounded-lg bg-blue-600 px-4 py-2 text-center text-white hover:bg-blue-700"
        >
          View Order
        </Link>
      </div>
    ))}
  </div>

  {/* Footer */}
  <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
    <p className="text-sm text-muted-foreground">
      Showing {orders.length} orders
    </p>

    <div className="flex gap-2">
      <button className="rounded-md border px-3 py-2 hover:bg-muted">
        Previous
      </button>

      <button className="rounded-md border px-3 py-2 hover:bg-muted">
        Next
      </button>
    </div>
  </div>
</div>
  );
}