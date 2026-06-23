"use client";

import { Bell, Lock, Mail, Save, Shield } from "lucide-react";

const settings = [
  {
    icon: Mail,
    title: "Store Email",
    description: "support@maqmart.com",
  },
  {
    icon: Shield,
    title: "Admin Role",
    description: "Full access",
  },
  {
    icon: Bell,
    title: "Notifications",
    description: "Order and customer query alerts enabled",
  },
  {
    icon: Lock,
    title: "Security",
    description: "Password and session controls",
  },
];

export default function SettingsPage() {
  return (
    <section className="min-h-screen bg-black p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Settings
          </h1>
          <p className="mt-2 text-gray-400">
            Manage store profile, access, and notification preferences.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {settings.map((item) => (
            <div
              key={item.title}
              className="rounded-md border border-[#222] bg-[#111] p-5"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-md bg-white text-black">
                <item.icon size={20} />
              </div>
              <h2 className="text-lg font-semibold text-white">{item.title}</h2>
              <p className="mt-2 text-sm text-gray-400">{item.description}</p>
            </div>
          ))}
        </div>

        <form className="mt-6 rounded-md border border-[#222] bg-[#111] p-5 sm:p-6">
          <h2 className="text-xl font-semibold text-white">Store Profile</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <input
              defaultValue="MAQ MART"
              className="rounded-md border border-[#333] bg-black px-3 py-3 text-white outline-none focus:border-white"
              aria-label="Store name"
            />
            <input
              defaultValue="support@maqmart.com"
              className="rounded-md border border-[#333] bg-black px-3 py-3 text-white outline-none focus:border-white"
              aria-label="Support email"
            />
          </div>
          <button
            type="button"
            className="mt-5 inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 font-semibold text-black transition hover:bg-gray-200"
          >
            <Save size={18} />
            Save Settings
          </button>
        </form>
      </div>
    </section>
  );
}
