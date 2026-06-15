
import { FaShieldAlt, FaTruck, FaHeadset } from "react-icons/fa";

export default function ContactPage() {
  return (
    <section className="bg-black text-white min-h-screen px-4 sm:px-6 lg:px-8 py-14">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[4px] text-gray-500 mb-4">
            Contact Us
          </p>

          <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
            Let’s Connect
            <span className="block text-gray-400 mt-2">
              We’re Here To Help
            </span>
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto mt-6 text-sm sm:text-base leading-relaxed">
            Have questions about products, orders, or support? Contact the
            MAQ MART team anytime.
          </p>
        </div>

        {/* CONTACT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* FORM */}
          <div className="bg-[#111111] border border-[#222] rounded-2xl p-8">

            <h2 className="text-2xl font-semibold mb-6">
              Send Message
            </h2>

            <form className="space-y-5">

              <div>
                <label className="text-sm text-gray-400 block mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full bg-black border border-[#222] rounded-xl px-4 py-3 outline-none focus:border-gray-600 transition"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 block mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-black border border-[#222] rounded-xl px-4 py-3 outline-none focus:border-gray-600 transition"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 block mb-2">
                  Message
                </label>

                <textarea
                  rows={6}
                  placeholder="Write your message"
                  className="w-full bg-black border border-[#222] rounded-xl px-4 py-3 outline-none focus:border-gray-600 transition resize-none"
                />
              </div>

              <button
                className="w-full bg-white text-black py-3 rounded-xl font-medium hover:bg-gray-200 transition"
              >
                Send Message
              </button>

            </form>
          </div>

          {/* INFO */}
          <div className="flex flex-col gap-6">

            <div className="bg-[#111111] border border-[#222] rounded-2xl p-7">
              <h3 className="text-xl font-semibold mb-3">
                Email
              </h3>

              <a href="mailto:support@maqmart.com" className="text-gray-400 text-sm">
                support@maqmart.com
              </a>
            </div>
            <div className="bg-[#111111] border border-[#222] rounded-2xl p-7">
              <h3 className="text-xl font-semibold mb-3">
                Phone
              </h3>

            <a href="https://wa.me/+923000000000" target="_blank" className="text-gray-400 text-sm">
               +92 300 0000000
              </a>
            </div>

            <div className="bg-[#111111] border border-[#222] rounded-2xl p-7">
              <h3 className="text-xl font-semibold mb-3">
                Address
              </h3>

              <p className="text-gray-400 text-sm leading-relaxed">
                MAQ MART Headquarters,<br />
                Lahore, Punjab, Pakistan
              </p>
            </div>

            <div className="bg-[#111111] border border-[#222] rounded-2xl p-7">
              <h3 className="text-xl font-semibold mb-3">
                Working Hours
              </h3>

              <p className="text-gray-400 text-sm">
                Monday - Saturday
              </p>

              <p className="text-gray-400 text-sm mt-1">
                9:00 AM - 10:00 PM
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
