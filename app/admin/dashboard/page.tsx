"use client";

const recentOrders = [
  {
    id: "#ORD-1001",
    customer: "Ali Khan",
    amount: "Rs 12,500",
    status: "Completed",
  },
  {
    id: "#ORD-1002",
    customer: "Ahmed Raza",
    amount: "Rs 8,900",
    status: "Pending",
  },
  {
    id: "#ORD-1003",
    customer: "Usman",
    amount: "Rs 21,000",
    status: "Completed",
  },
];

const topProducts = [
  {
    name: "Premium Headphones",
    sold: 124,
  },
  {
    name: "Smart Watch",
    sold: 98,
  },
  {
    name: "Gaming Mouse",
    sold: 73,
  },
];

export default function AnalyticsPage() {
  return (
    <section className="min-h-screen bg-black p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-white text-3xl sm:text-4xl font-bold">
            Analytics Dashboard
          </h1>
          <p className="text-gray-400 mt-2">
            Monitor your store performance
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

          <div className="bg-[#111] border border-[#222] rounded-md p-5">
            <p className="text-gray-400 text-sm">Revenue</p>
            <h2 className="text-white text-2xl font-bold mt-2">
              Rs 450,000
            </h2>
            <p className="text-green-400 text-sm mt-2">
              +12.5%
            </p>
          </div>

          <div className="bg-[#111] border border-[#222] rounded-md p-5">
            <p className="text-gray-400 text-sm">Orders</p>
            <h2 className="text-white text-2xl font-bold mt-2">
              1,245
            </h2>
            <p className="text-green-400 text-sm mt-2">
              +8.3%
            </p>
          </div>

          <div className="bg-[#111] border border-[#222] rounded-md p-5">
            <p className="text-gray-400 text-sm">Customers</p>
            <h2 className="text-white text-2xl font-bold mt-2">
              845
            </h2>
            <p className="text-green-400 text-sm mt-2">
              +15.2%
            </p>
          </div>

          <div className="bg-[#111] border border-[#222] rounded-md p-5">
            <p className="text-gray-400 text-sm">Products</p>
            <h2 className="text-white text-2xl font-bold mt-2">
              128
            </h2>
            <p className="text-green-400 text-sm mt-2">
              +4.1%
            </p>
          </div>

        </div>

        {/* Charts Placeholder */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">

          <div className="lg:col-span-2 bg-[#111] border border-[#222] rounded-md p-6">
            <h2 className="text-white text-xl font-semibold mb-4">
              Revenue Overview
            </h2>

            <div className="h-[300px] flex items-center justify-center border border-dashed border-[#333] rounded-lg">
              <span className="text-gray-500">
                Revenue Chart Here
              </span>
            </div>
          </div>

          <div className="bg-[#111] border border-[#222] rounded-md p-6">
            <h2 className="text-white text-xl font-semibold mb-4">
              Top Products
            </h2>

            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center"
                >
                  <span className="text-gray-300">
                    {product.name}
                  </span>

                  <span className="text-white font-semibold">
                    {product.sold}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Recent Orders */}
        <div className="bg-[#111] border border-[#222] rounded-md p-6 overflow-x-auto">
          <h2 className="text-white text-xl font-semibold mb-5">
            Recent Orders
          </h2>

          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-[#222]">
                <th className="text-left py-3 text-gray-400">Order ID</th>
                <th className="text-left py-3 text-gray-400">Customer</th>
                <th className="text-left py-3 text-gray-400">Amount</th>
                <th className="text-left py-3 text-gray-400">Status</th>
              </tr>
            </thead>

            <tbody>
              {recentOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-[#1a1a1a]"
                >
                  <td className="py-4 text-white">{order.id}</td>

                  <td className="py-4 text-gray-300">
                    {order.customer}
                  </td>

                  <td className="py-4 text-white">
                    {order.amount}
                  </td>

                  <td className="py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs
                      ${
                        order.status === "Completed"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>

      </div>
    </section>
  );
}