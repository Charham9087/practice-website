"use client";

import { useEffect, useState } from "react";
import { Mail, MailOpen, Star, User } from "lucide-react";
import { NotificationItem } from "@/lib/types";
import {
  getNotifications,
  importantMarking,
  markAsRead,
} from "@/server/functions";

type NotificationTab = "all" | "important" | "unread";

const tabs: NotificationTab[] = ["all", "important", "unread"];

export default function NotificationsPage() {
  const [messages, setMessages] = useState<NotificationItem[]>([]);
  const [selected, setSelected] = useState<NotificationItem | null>(null);
  const [tab, setTab] = useState<NotificationTab>("all");

  const refreshData = async (currentTab = tab) => {
    const data = await getNotifications(currentTab);
    setMessages(data || []);
  };

  const openMessage = async (message: NotificationItem) => {
    setSelected(message);

    if (message.id) {
      await markAsRead(message.id);
      await refreshData();
    }
  };

  useEffect(() => {
    let cancelled = false;

    getNotifications(tab).then((data) => {
      if (!cancelled) {
        setMessages(data || []);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [tab]);

  return (
    <div className="p-4 md:p-6 space-y-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Customer Queries</h1>
        <p className="text-gray-500">Messages from contact form</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {tabs.map((item) => (
          <button
            key={item}
            onClick={() => setTab(item)}
            className={`px-4 py-2 rounded-md border transition ${
              tab === item
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100 dark:hover:bg-zinc-800"
            }`}
          >
            {item.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-1 border rounded-md bg-white dark:bg-zinc-900 flex flex-col max-h-[80vh] overflow-hidden">
          <div className="p-3 border-b font-semibold dark:border-zinc-800 bg-white dark:bg-zinc-900 sticky top-0 z-10">
            Inbox
          </div>

          <div className="divide-y overflow-y-auto">
            {messages.length === 0 && (
              <div className="p-4 text-sm text-gray-500">No messages found.</div>
            )}

            {messages.map((message) => (
              <button
                type="button"
                key={message.id}
                onClick={() => openMessage(message)}
                className={`w-full p-3 text-left flex gap-3 hover:bg-gray-100 dark:hover:bg-zinc-800 transition ${
                  selected?.id === message.id
                    ? "bg-blue-50 dark:bg-zinc-800"
                    : ""
                }`}
              >
                <div className="mt-1 flex flex-col items-center gap-1">
                  {message.isRead ? <MailOpen size={18} /> : <Mail size={18} />}

                  {message.isImportant && (
                    <Star size={14} className="text-yellow-500" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-medium truncate">{message.name}</p>
                  <p className="text-sm text-gray-500 truncate">
                    {message.subject}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(message.created_at).toLocaleString("en-GB", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="md:col-span-2 border rounded-md p-4 bg-white dark:bg-zinc-900 min-h-[300px]">
          {selected ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <User />
                  <div className="min-w-0">
                    <p className="font-semibold truncate">{selected.name}</p>
                    <p className="text-sm text-gray-500 truncate">
                      {selected.email}
                    </p>
                  </div>
                </div>

                <button
                  onClick={async () => {
                    if (!selected.id) return;

                    await importantMarking(selected.id);
                    await refreshData();

                    setSelected((prev) =>
                      prev
                        ? { ...prev, isImportant: !prev.isImportant }
                        : prev
                    );
                  }}
                  className="flex shrink-0 items-center gap-1 px-3 py-1 border rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800"
                >
                  <Star
                    size={16}
                    className={
                      selected.isImportant
                        ? "text-yellow-500"
                        : "text-gray-400"
                    }
                  />
                  {selected.isImportant ? "Important" : "Mark Important"}
                </button>
              </div>

              <div>
                <p className="text-sm text-gray-500">Subject</p>
                <p className="font-semibold">{selected.subject}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Message</p>
                <p className="whitespace-pre-line">{selected.message}</p>
              </div>

              <div className="flex gap-3 pt-4">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Reply
                </button>

                <button className="px-4 py-2 border rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800">
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
