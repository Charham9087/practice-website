"use client";

import { useState, useEffect } from "react";
import { Mail, MailOpen, User, Star } from "lucide-react";
import {
  getNotifications,
  markAsRead,
  importantMarking,
} from "@/server/functions";

export default function NotificationsPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);
  const [tab, setTab] = useState("all");

  // 🔄 fetch data helper
  const refreshData = async () => {
    const data = await getNotifications(tab);
    setMessages(data || []);
  };

  // 📩 open message + mark as read
  const openMessage = async (msg: any) => {
    setSelected(msg);

    await markAsRead(msg.id);

    // update UI
    refreshData();
  };

  // 🔁 load data on tab change
  useEffect(() => {
    refreshData();
  }, [tab]);

  return (
    <div className="p-4 md:p-6 space-y-4">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">
          Customer Queries
        </h1>
        <p className="text-gray-500">
          Messages from contact form
        </p>
      </div>

      {/* TABS */}
      <div className="flex gap-2 flex-wrap">
        {["all", "important", "unread"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg border transition ${
              tab === t
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100 dark:hover:bg-zinc-800"
            }`}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      {/* LAYOUT */}
      <div className="grid md:grid-cols-3 gap-4">

        {/* LEFT LIST */}
        <div className="md:col-span-1 border rounded-xl overflow-hidden bg-white dark:bg-zinc-900">
          
          <div className="p-3 border-b font-semibold dark:border-zinc-800">
            Inbox
          </div>

          <div className="divide-y">
            {messages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => openMessage(msg)}
                className={`p-3 cursor-pointer flex gap-3 hover:bg-gray-100 dark:hover:bg-zinc-800 transition ${
                  selected?.id === msg.id
                    ? "bg-blue-50 dark:bg-zinc-800"
                    : ""
                }`}
              >
                {/* ICONS */}
                <div className="mt-1 flex flex-col items-center gap-1">
                  {msg.isRead ? (
                    <MailOpen size={18} />
                  ) : (
                    <Mail size={18} />
                  )}

                  {msg.isImportant && (
                    <Star size={14} className="text-yellow-500" />
                  )}
                </div>

                {/* CONTENT */}
                <div className="flex-1">
                  <p className="font-medium">{msg.name}</p>
                  <p className="text-sm text-gray-500">{msg.subject}</p>
                  <p className="text-xs text-gray-400">
                    {msg.createdAt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="md:col-span-2 border rounded-xl p-4 bg-white dark:bg-zinc-900 min-h-[300px]">
          {selected ? (
            <div className="space-y-4">

              {/* USER */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <User />
                  <div>
                    <p className="font-semibold">
                      {selected.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {selected.email}
                    </p>
                  </div>
                </div>

                {/* IMPORTANT BUTTON */}
                <button
                  onClick={async () => {
                    await importantMarking(selected.id);

                    refreshData();

                    setSelected((prev: any) => ({
                      ...prev,
                      isImportant: !prev.isImportant,
                    }));
                  }}
                  className="flex items-center gap-1 px-3 py-1 border rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800"
                >
                  <Star
                    size={16}
                    className={
                      selected.isImportant
                        ? "text-yellow-500"
                        : "text-gray-400"
                    }
                  />
                  {selected.isImportant
                    ? "Important"
                    : "Mark Important"}
                </button>
              </div>

              {/* SUBJECT */}
              <div>
                <p className="text-sm text-gray-500">Subject</p>
                <p className="font-semibold">{selected.subject}</p>
              </div>

              {/* MESSAGE */}
              <div>
                <p className="text-sm text-gray-500">Message</p>
                <p className="whitespace-pre-line">
                  {selected.message}
                </p>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-3 pt-4">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Reply
                </button>

                <button className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800">
                  Archive
                </button>
              </div>

            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Select a message to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}