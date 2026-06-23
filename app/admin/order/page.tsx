"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { getAllOrders, updateOrderStatus } from "@/lib/shop";
import { CustomerOrder, CustomerOrderItem } from "@/lib/types";

type OrderWithItems = CustomerOrder & { items: CustomerOrderItem[] };

const statuses: CustomerOrder["status"][] = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

const statusStyles = {
  Delivered: "bg-green-500/20 text-green-400",
  Pending: "bg-yellow-500/20 text-yellow-400",
  Processing: "bg-purple-500/20 text-purple-300",
  Shipped: "bg-blue-500/20 text-blue-400",
  Cancelled: "bg-red-500/20 text-red-400",
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [updatingOrderId, setUpdatingOrderId] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadInitialOrders() {
      const data = await getAllOrders();
      if (!isMounted) return;
      setOrders(data);
      setIsLoading(false);
    }

    loadInitialOrders();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredOrders = useMemo(() => {
    const search = query.trim().toLowerCase();
    if (!search) return orders;

    return orders.filter((order) =>
      [
        order.order_number,
        order.customer_name,
        order.customer_email,
        order.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(search)
    );
  }, [orders, query]);

  const handleStatusChange = async (
    order: OrderWithItems,
    status: CustomerOrder["status"]
  ) => {
    setMessage("");
    setUpdatingOrderId(order.id);
    const result = await updateOrderStatus(order.id, status);
    setMessage(result.message);

    if (result.success) {
      setOrders((current) =>
        current.map((item) => (item.id === order.id ? { ...item, status } : item))
      );
    }
    setUpdatingOrderId(null);
  };

  return (
    <section className="min-h-screen bg-black p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white sm:text-4xl">
              Orders
            </h1>
            <p className="mt-2 text-gray-400">
              Manage customer checkout orders and fulfillment status.
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search orders..."
              className="w-full rounded-md border border-[#333] bg-[#111] py-3 pl-10 pr-4 text-white outline-none focus:border-white"
            />
          </div>
        </div>

        {message && (
          <p className="mb-5 rounded-md border border-[#333] bg-[#111] px-4 py-3 text-sm text-gray-300">
            {message}
          </p>
        )}

        <div className="hidden overflow-hidden rounded-md border border-[#222] bg-[#111] lg:block">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#222]">
                <th className="p-4 text-left text-gray-400">Order</th>
                <th className="p-4 text-left text-gray-400">Customer</th>
                <th className="p-4 text-left text-gray-400">Items</th>
                <th className="p-4 text-left text-gray-400">Total</th>
                <th className="p-4 text-left text-gray-400">Status</th>
              </tr>
            </thead>

            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-400">
                    <div className="flex items-center justify-center gap-3">
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-gray-700 border-t-white" />
                      Loading orders...
                    </div>
                  </td>
                </tr>
              )}

              {!isLoading && filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-400">
                    No orders found.
                  </td>
                </tr>
              )}

              {!isLoading &&
                filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-[#1a1a1a] align-top transition hover:bg-[#181818]"
                  >
                    <td className="p-4">
                      <p className="font-medium text-white">{order.order_number}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(order.created_at).toLocaleString()}
                      </p>
                    </td>
                    <td className="p-4">
                      <p className="font-medium text-white">{order.customer_name}</p>
                      <p className="text-sm text-gray-500">{order.customer_email}</p>
                      <p className="text-sm text-gray-500">{order.customer_phone}</p>
                    </td>
                    <td className="p-4 text-gray-300">
                      <div className="space-y-1">
                        {order.items?.map((item) => (
                          <p key={item.id}>
                            {item.quantity} x {item.product_name}
                          </p>
                        ))}
                      </div>
                    </td>
                    <td className="p-4 font-semibold text-white">
                      Rs {order.total.toLocaleString()}
                    </td>
                    <td className="p-4">
                      <select
                        value={order.status}
                        disabled={updatingOrderId === order.id}
                        onChange={(event) =>
                          handleStatusChange(
                            order,
                            event.target.value as CustomerOrder["status"]
                          )
                        }
                        className={`rounded-md border border-[#333] bg-black px-3 py-2 text-sm font-medium outline-none ${
                          statusStyles[order.status]
                        }`}
                      >
                        {statuses.map((status) => (
                          <option key={status} value={status}>
                            {updatingOrderId === order.id ? "Updating..." : status}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="grid gap-4 lg:hidden">
          {isLoading && (
            <div className="rounded-md border border-[#222] bg-[#111] p-6 text-center text-gray-400">
              <div className="flex items-center justify-center gap-3">
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-gray-700 border-t-white" />
                Loading orders...
              </div>
            </div>
          )}

          {!isLoading &&
            filteredOrders.map((order) => (
              <div key={order.id} className="rounded-md border border-[#222] bg-[#111] p-4">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold text-white">{order.order_number}</h3>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      statusStyles[order.status]
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="mt-3 space-y-1">
                  <p className="font-medium text-white">{order.customer_name}</p>
                  <p className="text-sm text-gray-500">{order.customer_email}</p>
                  <p className="text-sm text-gray-400">
                    {new Date(order.created_at).toLocaleString()}
                  </p>
                  <p className="font-semibold text-white">
                    Rs {order.total.toLocaleString()}
                  </p>
                </div>

                <select
                  value={order.status}
                  disabled={updatingOrderId === order.id}
                  onChange={(event) =>
                    handleStatusChange(
                      order,
                      event.target.value as CustomerOrder["status"]
                    )
                  }
                  className="mt-4 w-full rounded-md border border-[#333] bg-black px-3 py-2 text-white outline-none"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
