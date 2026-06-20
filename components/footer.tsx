import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-[#222] text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          <div>
            <h2 className="text-white text-2xl font-bold mb-3">MAQ MART</h2>
            <p className="text-sm leading-relaxed">
              Premium shopping experience with best prices and quality products.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/Store/products">Products</Link>
              </li>
              <li>
                <Link href="/Store/about">About</Link>
              </li>
              <li>
                <Link href="/Store/contact">Contact</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-500">Coming soon...</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <p className="text-sm">support@maqmart.com</p>
            <p className="text-sm mt-1">+92 300 0000000</p>

            <div className="flex gap-4 mt-4 text-xl">
              <FaFacebook aria-label="Facebook" />
              <FaInstagram aria-label="Instagram" />
              <FaTwitter aria-label="Twitter" />
            </div>
          </div>
        </div>

        <div className="border-t border-[#222] mt-10 pt-6 text-center text-sm">
          &copy; {new Date().getFullYear()} MAQ MART. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
