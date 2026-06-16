"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import sendEmails from "@/server/functions";

export default function BroadcastPage() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!subject || !message) {
      alert("Please fill subject and message");
      return;
    }

    try {
      setLoading(true);

      await sendEmails(subject, message);

      alert("Broadcast sent successfully 🚀");

      setSubject("");
      setMessage("");
    } catch (error) {
      console.error(error);
      alert("Failed to send broadcast");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Broadcast Messages</h1>
        <p className="text-gray-500">
          Send updates to all your customers instantly
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Compose */}
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
            placeholder="Write your message in HTML ..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 border rounded-lg h-40 bg-transparent"
          />

          <button
            onClick={handleSend}
            disabled={loading}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            <Send size={18} />
            {loading ? "Sending..." : "Send Broadcast"}
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

              <div
                className="border rounded-lg p-4 bg-white dark:bg-zinc-800 max-h-[400px] overflow-y-auto"
                dangerouslySetInnerHTML={{
                  __html: message || "<p class='text-gray-400'>Your message preview will appear here</p>",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}