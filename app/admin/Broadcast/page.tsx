"use client";

import { useState } from "react";
import { Send, Users } from "lucide-react";

const customers = [
  { id: 1, name: "Ali Hassan", email: "ali@example.com" },
  { id: 2, name: "Ahmed Khan", email: "ahmed@example.com" },
  { id: 3, name: "Sara Ali", email: "sara@example.com" },
];

export default function BroadcastPage() {
  const [target, setTarget] = useState("all");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [selectedCustomers, setSelectedCustomers] = useState<number[]>([]);

  const toggleCustomer = (id: number) => {
    setSelectedCustomers((prev) =>
      prev.includes(id)
        ? prev.filter((c) => c !== id)
        : [...prev, id]
    );
  };

  const handleSend = () => {
    const payload = {
      target,
      subject,
      message,
      selectedCustomers,
    };

    console.log("Broadcast Payload:", payload);
    alert("Message Sent (Demo)");
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Broadcast Messages</h1>
        <p className="text-gray-500">
          Send updates to your customers
        </p>
      </div>

      {/* Target Selection */}
      <div className="border rounded-xl p-5 bg-white dark:bg-zinc-900">
        <h2 className="font-semibold mb-3 flex items-center gap-2">
          <Users size={18} /> Select Audience
        </h2>

        <div className="flex gap-4 flex-wrap">
          <button
            onClick={() => setTarget("all")}
            className={`px-4 py-2 rounded-lg border ${
              target === "all"
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100 dark:hover:bg-zinc-800"
            }`}
          >
            All Customers
          </button>

          <button
            onClick={() => setTarget("purchased")}
            className={`px-4 py-2 rounded-lg border ${
              target === "purchased"
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100 dark:hover:bg-zinc-800"
            }`}
          >
            Only Purchased Customers
          </button>

          <button
            onClick={() => setTarget("custom")}
            className={`px-4 py-2 rounded-lg border ${
              target === "custom"
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100 dark:hover:bg-zinc-800"
            }`}
          >
            Select Manually
          </button>
        </div>

        {/* Customer List (only for custom) */}
        {target === "custom" && (
          <div className="mt-4 grid md:grid-cols-2 gap-3">
            {customers.map((c) => (
              <div
                key={c.id}
                onClick={() => toggleCustomer(c.id)}
                className={`p-3 border rounded-lg cursor-pointer transition ${
                  selectedCustomers.includes(c.id)
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-100 dark:hover:bg-zinc-800"
                }`}
              >
                <p className="font-medium">{c.name}</p>
                <p className="text-sm opacity-80">{c.email}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Message Form */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Input */}
        <div className="border rounded-xl p-5 bg-white dark:bg-zinc-900 space-y-4">
          <h2 className="font-semibold">Compose Message</h2>

          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-3 border rounded-lg bg-transparent"
          />

          <textarea
            placeholder="Write your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 border rounded-lg h-40 bg-transparent"
          />

          <button
            onClick={handleSend}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            <Send size={18} />
            Send Broadcast
          </button>
        </div>

        {/* Preview */}
        <div className="border rounded-xl p-5 bg-white dark:bg-zinc-900">
          <h2 className="font-semibold mb-3">Live Preview</h2>

          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Subject:</p>
              <p className="font-medium">
                {subject || "Your subject will appear here"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Message:</p>
              <p className="whitespace-pre-line">
                {message || "Your message preview will appear here"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}