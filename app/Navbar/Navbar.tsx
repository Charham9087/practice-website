"use client";

import { useState } from "react";
import Link from "next/link";

import {
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaHome,
  FaInfoCircle,
  FaEnvelope,
  FaBook,
  FaSearch,
} from "react-icons/fa";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

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
            >
              <FaBars />
            </button>

            {/* Logo */}
            <Link
              href="/"
              className="text-2xl font-bold tracking-wide"
            >
              Dummy website
            </Link>
          </div>

          {/* CENTER SEARCH BAR */}
          <div className="hidden md:flex items-center w-full max-w-xl mx-10">
            <div className="relative w-full">

              <input
                type="text"
                placeholder="Search products..."
                className="
                  w-full
                  rounded-2xl
                  bg-[#111]
                  border
                  border-gray-800
                  px-5
                  py-3
                  pr-12
                  text-sm
                  outline-none
                  focus:border-gray-600
                "
                onKeyDown={(e) => {
                     if (e.key === "Enter") {
                     // handleSearch();
                     }
}}
              />

              <FaSearch
                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-gray-500
                "
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">

            <Link href="/" className="hover:text-gray-400 transition">
              Home
            </Link>

            <Link href="/about" className="hover:text-gray-400 transition">
              About
            </Link>

            <Link href="/contact" className="hover:text-gray-400 transition">
              Contact
            </Link>

            <Link href="/catalogue" className="hover:text-gray-400 transition">
              Catalogues
            </Link>

            <Link
              href="/cart"
              className="text-xl hover:text-gray-400 transition"
            >
              <FaShoppingCart />
            </Link>

            <Link
              href="/login"
              className="
                rounded-xl
                bg-white
                text-black
                px-4
                py-2
                font-medium
                hover:bg-gray-200
                transition
              "
            >
              Login
            </Link>
          </div>

          {/* MOBILE CART */}
          <Link
            href="/cart"
            className="md:hidden text-xl"
          >
            <FaShoppingCart />
          </Link>
        </div>

        {/* MOBILE SEARCH */}
        <div className="md:hidden px-4 pb-4">
          <div className="relative">

            <input
              type="text"
              placeholder="Search..."
              className="
                w-full
                rounded-xl
                bg-[#111]
                border
                border-gray-800
                px-4
                py-3
                pr-10
                text-sm
                outline-none
              "
            />

            <FaSearch
              className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                text-gray-500
              "
            />
          </div>
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
            href="/about"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-gray-900 transition"
          >
            <FaInfoCircle />
            About
          </Link>

          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-gray-900 transition"
          >
            <FaEnvelope />
            Contact
          </Link>

          <Link
            href="/catalogue"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-gray-900 transition"
          >
            <FaBook />
            Catalogues
          </Link>

          <Link
            href="/cart"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-gray-900 transition"
          >
            <FaShoppingCart />
            Cart
          </Link>

          <Link
            href="/login"
            className="
              mt-5
              rounded-xl
              bg-white
              text-center
              text-black
              py-3
              font-medium
            "
          >
            Login
          </Link>
        </div>
      </div>
    </>
  );
}