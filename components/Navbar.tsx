"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { signOutCustomer } from "@/lib/shop";

import {
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaHome,
  FaInfoCircle,
  FaEnvelope,
  FaBook,
} from "react-icons/fa";

export default function Navbar({ initialDark }: { initialDark?: boolean }) {
  const [isDark, setIsDark] = useState<boolean>(initialDark ?? false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);

  useEffect(() => {
    if (typeof document !== "undefined") {
      if (isDark) document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setSessionEmail(data.user?.email ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSessionEmail(session?.user.email ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  function toggleTheme() {
    const next = !isDark;
    setIsDark(next);
    if (typeof document !== "undefined") {
      if (next) document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
      // persist to cookie so server can read next render
      document.cookie = `theme=${next ? "dark" : "light"}; path=/; max-age=${60 * 60 * 24 * 365}`;
    }
  }

  async function handleSignOut() {
    await signOutCustomer();
    setSessionEmail(null);
  }

  return (
    <>
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-black border-b border-gray-800 text-white">
        <div className="flex items-center justify-between px-4 md:px-6 py-4">
          {/* LEFT */}
          <div className="flex items-center gap-4">
            {/* Hamburger */}
            <button
              className="md:hidden text-2xl"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <FaBars />
            </button>

            {/* Logo */}
            <Link
              href="/"
              className="text-2xl font-bold tracking-wide"
            >
              MAQ MART
            </Link>
          </div>

    

          {/* RIGHT */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="hover:text-gray-400 transition">
              Home
            </Link>

            <Link href="/Store/about" className="hover:text-gray-400 transition">
              About
            </Link>

            <Link href="/Store/contact" className="hover:text-gray-400 transition">
              Contact
            </Link>
            <Link href="/admin/dashboard" className="hover:text-gray-400 transition">
              Admin
            </Link>

            <Link href="/Store/products" className="hover:text-gray-400 transition">
              Products
            </Link>

            <Link
              href="/Store/cart"
              className="text-xl hover:text-gray-400 transition"
            >
              <FaShoppingCart />
            </Link>

            <button
              onClick={toggleTheme}
              className="px-3 py-2 rounded-md bg-white text-black"
              aria-label="Toggle theme"
            >
              {isDark ? "Dark" : "Light"}
            </button>

            {sessionEmail ? (
              <button
                onClick={handleSignOut}
                className="rounded-md bg-white px-4 py-2 font-medium text-black transition hover:bg-gray-200"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/Store/login"
                className="rounded-md bg-white px-4 py-2 font-medium text-black transition hover:bg-gray-200"
              >
                Login
              </Link>
            )}
          </div>

          {/* MOBILE CART */}
          <Link
            href="/Store/cart"
            className="md:hidden text-xl"
            aria-label="Cart"
          >
            <FaShoppingCart />
          </Link>
        </div>

  
      </nav>

      {/* OVERLAY */}
      <div
        className={`
          fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300
          ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
        onClick={() => setMenuOpen(false)}
      />

      {/* SIDEBAR */}
      <div
        className={`
          fixed top-0 left-0 z-50 h-full w-[280px]
          bg-[#0d0d0d]
          border-r border-gray-800
          transform transition-transform duration-300
          ${menuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* TOP */}
        <div className="flex items-center justify-between p-5 border-b border-gray-800">
          <h2 className="text-xl font-bold text-white">
            Menu
          </h2>

          <button
            className="text-2xl text-white"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <FaTimes />
          </button>
        </div>

        {/* LINKS */}
        <div className="flex flex-col p-4 text-white">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-gray-900 transition"
          >
            <FaHome />
            Home
          </Link>

          <Link
            href="/Store/about"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-gray-900 transition"
          >
            <FaInfoCircle />
            About
          </Link>

          <Link
            href="/Store/contact"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-gray-900 transition"
          >
            <FaEnvelope />
            Contact
          </Link>

          <Link
            href="/Store/products"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-gray-900 transition"
          >
            <FaBook />
            Products
          </Link>

          <Link
            href="/Store/cart"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-gray-900 transition"
          >
            <FaShoppingCart />
            Cart
          </Link>

          {sessionEmail ? (
            <button
              onClick={handleSignOut}
              className="mt-5 rounded-md bg-white py-3 text-center font-medium text-black"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/Store/login"
              className="mt-5 rounded-md bg-white py-3 text-center font-medium text-black"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
