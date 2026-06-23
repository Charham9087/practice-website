"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { signInCustomer, signOutCustomer, signUpCustomer } from "@/lib/shop";

type AuthMode = "login" | "signup";

const inputClass =
  "mt-2 w-full rounded-md border border-[#333] bg-black px-3 py-3 text-white outline-none transition focus:border-white";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>("login");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setSessionEmail(data.user?.email ?? null);
    });
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    try {
      const result =
        mode === "signup"
          ? await signUpCustomer(fullName.trim(), email.trim(), password)
          : await signInCustomer(email.trim(), password);

      setMessage(result.message);

      if (result.success && mode === "login") {
        router.push("/Store/products");
      }

      const { data } = await supabase.auth.getUser();
      setSessionEmail(data.user?.email ?? null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignOut = async () => {
    await signOutCustomer();
    setSessionEmail(null);
    setMessage("Signed out.");
  };

  return (
    <section className="min-h-screen bg-black px-4 py-14 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md">
        <div className="mb-8 text-center">
          <p className="mb-4 text-sm uppercase tracking-[4px] text-gray-500">
            Customer Account
          </p>
          <h1 className="text-4xl font-bold">
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-gray-400">
            Sign in or create an account to save favourites, manage your cart,
            and checkout.
          </p>
        </div>

        {sessionEmail && (
          <div className="mb-5 rounded-md border border-[#222] bg-[#111] p-4 text-sm text-gray-300">
            <p>Signed in as {sessionEmail}</p>
            <button
              type="button"
              onClick={handleSignOut}
              className="mt-3 rounded-md border border-[#333] px-4 py-2 text-white transition hover:bg-black"
            >
              Sign Out
            </button>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="rounded-md border border-[#222] bg-[#111] p-6"
        >
          <div className="mb-6 grid grid-cols-2 rounded-md border border-[#333] bg-black p-1">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`rounded-md px-4 py-2 text-sm font-semibold ${
                mode === "login" ? "bg-white text-black" : "text-gray-400"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`rounded-md px-4 py-2 text-sm font-semibold ${
                mode === "signup" ? "bg-white text-black" : "text-gray-400"
              }`}
            >
              Sign Up
            </button>
          </div>

          {mode === "signup" && (
            <>
              <label className="block text-sm text-gray-400" htmlFor="name">
                Full Name
              </label>
              <input
                id="name"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                placeholder="Enter your full name"
                className={inputClass}
                required
              />
            </>
          )}

          <label
            className={`${mode === "signup" ? "mt-5 " : ""}block text-sm text-gray-400`}
            htmlFor="email"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email"
            className={inputClass}
            required
          />

          <label className="mt-5 block text-sm text-gray-400" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
            className={inputClass}
            minLength={6}
            required
          />

          {message && (
            <p className="mt-4 rounded-md border border-[#333] bg-black px-3 py-2 text-sm text-gray-300">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 w-full rounded-md bg-white py-3 font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting
              ? "Please wait..."
              : mode === "login"
                ? "Login"
                : "Create Account"}
          </button>

          <div className="mt-5 flex items-center justify-between text-sm">
            <Link href="/Store/products" className="text-gray-400 hover:text-white">
              Continue shopping
            </Link>
            <Link href="/Store/cart" className="text-gray-400 hover:text-white">
              View cart
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
