"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import sendEmails from "@/server/functions";

export default function BroadcastPage() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");

  const handleSend = async () => {
    if (!subject.trim() || !message.trim()) {
      setNotice("Please fill subject and message.");
      return;
    }

    try {
      setLoading(true);
      setNotice("");
      await sendEmails(subject, message);
      setNotice("Broadcast sent successfully.");
      setSubject("");
      setMessage("");
    } catch (error) {
      console.error(error);
      setNotice("Failed to send broadcast.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-black p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Broadcast Messages
          </h1>
          <p className="mt-2 text-gray-400">
            Send store updates to your customer list.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4 rounded-md border border-[#222] bg-[#111] p-5">
            <h2 className="font-semibold text-white">Compose Message</h2>

            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full rounded-md border border-[#333] bg-black p-3 text-white outline-none focus:border-white"
            />

            <textarea
              placeholder="Write your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="h-44 w-full resize-none rounded-md border border-[#333] bg-black p-3 text-white outline-none focus:border-white"
            />

            {notice && (
              <p className="rounded-md border border-[#333] bg-black px-3 py-2 text-sm text-gray-300">
                {notice}
              </p>
            )}

            <button
              onClick={handleSend}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send size={18} />
              {loading ? "Sending..." : "Send Broadcast"}
            </button>
          </div>

          <div className="rounded-md border border-[#222] bg-[#111] p-5">
            <h2 className="mb-4 font-semibold text-white">Live Preview</h2>

            <div className="space-y-4 rounded-md border border-[#222] bg-black p-4">
              <div>
                <p className="text-sm text-gray-500">Subject</p>
                <p className="font-medium text-white">
                  {subject || "Your subject will appear here"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Message</p>
                <p className="max-h-[320px] overflow-y-auto whitespace-pre-line text-gray-300">
                  {message || "Your message preview will appear here."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
