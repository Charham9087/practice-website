
import { FaShieldAlt, FaTruck, FaHeadset } from "react-icons/fa";

export default function AboutPage() {
  return (
    <section className="bg-black text-white min-h-screen px-4 sm:px-6 lg:px-8 py-14">
      <div className="max-w-7xl mx-auto">

        {/* HERO */}
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[4px] text-gray-500 mb-4">
            About MAQ MART
          </p>

          <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
            Premium Shopping
            <span className="block text-gray-400 mt-2">
              Modern Experience
            </span>
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto mt-6 text-sm sm:text-base leading-relaxed">
            MAQ MART is a modern e-commerce platform focused on delivering
            premium products, smooth shopping experience, and high-quality
            customer support.
          </p>
        </div>

        {/* FEATURES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">

          <div className="bg-[#111111] border border-[#222] rounded-xl p-7 hover:border-gray-700 transition-all duration-300">
            <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-5">
              <FaShieldAlt className="text-xl" />
            </div>

            <h3 className="text-xl font-semibold mb-3">
              Trusted Quality
            </h3>

            <p className="text-gray-400 text-sm leading-relaxed">
              We ensure every product meets high quality standards before
              reaching our customers.
            </p>
          </div>

          <div className="bg-[#111111] border border-[#222] rounded-xl p-7 hover:border-gray-700 transition-all duration-300">
            <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-5">
              <FaTruck className="text-xl" />
            </div>

            <h3 className="text-xl font-semibold mb-3">
              Fast Delivery
            </h3>

            <p className="text-gray-400 text-sm leading-relaxed">
              Quick and secure shipping with smooth order tracking experience.
            </p>
          </div>

          <div className="bg-[#111111] border border-[#222] rounded-xl p-7 hover:border-gray-700 transition-all duration-300">
            <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-5">
              <FaHeadset className="text-xl" />
            </div>

            <h3 className="text-xl font-semibold mb-3">
              24/7 Support
            </h3>

            <p className="text-gray-400 text-sm leading-relaxed">
              Dedicated support team ready to assist customers anytime.
            </p>
          </div>

        </div>

        {/* STORY */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          <div>
            <p className="text-sm uppercase tracking-[4px] text-gray-500 mb-4">
              Our Story
            </p>

            <h2 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight">
              Built for Modern
              <span className="block text-gray-400 mt-2">
                Online Shopping
              </span>
            </h2>

            <p className="text-gray-400 leading-relaxed mb-5">
              MAQ MART was created to provide a smooth and modern shopping
              experience with premium UI, reliable services, and carefully
              selected products.
            </p>

            <p className="text-gray-400 leading-relaxed">
              We focus on simplicity, speed, and customer satisfaction while
              maintaining a stylish dark modern design.
            </p>
          </div>

          <div className="bg-[#111111] border border-[#222] rounded-2xl p-8">
            <div className="grid grid-cols-2 gap-6 text-center">

              <div>
                <h3 className="text-4xl font-bold mb-2">10K+</h3>
                <p className="text-gray-400 text-sm">Products Sold</p>
              </div>

              <div>
                <h3 className="text-4xl font-bold mb-2">5K+</h3>
                <p className="text-gray-400 text-sm">Happy Customers</p>
              </div>

              <div>
                <h3 className="text-4xl font-bold mb-2">24/7</h3>
                <p className="text-gray-400 text-sm">Support</p>
              </div>

              <div>
                <h3 className="text-4xl font-bold mb-2">100%</h3>
                <p className="text-gray-400 text-sm">Secure Payments</p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

