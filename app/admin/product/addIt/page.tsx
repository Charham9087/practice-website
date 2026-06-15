"use client";

import { useState } from "react";

export default function AddProductPage() {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    description: "",
    original_price: "",
    discounted_price: "",
    stock: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(product);

    // API Call Here
  };

  return (
    <section className="min-h-screen bg-black p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Add Product
          </h1>

          <p className="text-gray-400 mt-2">
            Create a new product for your store
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#111111] border border-[#222] rounded-xl p-5 sm:p-8"
        >

          {/* Product Name */}
          <div className="mb-5">
            <label className="block text-white mb-2">
              Product Name
            </label>

            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              placeholder="Premium Headphones"
              className="
                w-full
                bg-black
                border border-[#333]
                rounded-xl
                px-4
                py-3
                text-white
                outline-none
                focus:border-white
              "
            />
          </div>

          {/* Category */}
          <div className="mb-5">
            <label className="block text-white mb-2">
              Category
            </label>

            <input
              type="text"
              name="category"
              value={product.category}
              onChange={handleChange}
              placeholder="Electronics"
              className="
                w-full
                bg-black
                border border-[#333]
                rounded-xl
                px-4
                py-3
                text-white
                outline-none
                focus:border-white
              "
            />
          </div>

          {/* Description */}
          <div className="mb-5">
            <label className="block text-white mb-2">
              Description
            </label>

            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              rows={5}
              placeholder="Product description..."
              className="
                w-full
                bg-black
                border border-[#333]
                rounded-xl
                px-4
                py-3
                text-white
                outline-none
                focus:border-white
                resize-none
              "
            />
          </div>

          {/* Prices */}
          <div className="grid md:grid-cols-2 gap-5 mb-5">

            <div>
              <label className="block text-white mb-2">
                Original Price
              </label>

              <input
                type="number"
                name="original_price"
                value={product.original_price}
                onChange={handleChange}
                placeholder="25000"
                className="
                  w-full
                  bg-black
                  border border-[#333]
                  rounded-xl
                  px-4
                  py-3
                  text-white
                  outline-none
                  focus:border-white
                "
              />
            </div>

            <div>
              <label className="block text-white mb-2">
                Discounted Price
              </label>

              <input
                type="number"
                name="discounted_price"
                value={product.discounted_price}
                onChange={handleChange}
                placeholder="19999"
                className="
                  w-full
                  bg-black
                  border border-[#333]
                  rounded-xl
                  px-4
                  py-3
                  text-white
                  outline-none
                  focus:border-white
                "
              />
            </div>

          </div>

          {/* Stock */}
          <div className="mb-5">
            <label className="block text-white mb-2">
              Stock Quantity
            </label>

            <input
              type="number"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              placeholder="10"
              className="
                w-full
                bg-black
                border border-[#333]
                rounded-xl
                px-4
                py-3
                text-white
                outline-none
                focus:border-white
              "
            />
          </div>

          {/* Image Upload */}
          <div className="mb-8">
            <label className="block text-white mb-2">
              Product Images
            </label>

            <input
              type="file"
              multiple
              className="
                w-full
                text-gray-400
                border border-dashed border-[#333]
                rounded-xl
                p-4
                bg-black
              "
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="
              w-full
              py-3
              rounded-xl
              bg-white
              text-black
              font-semibold
              hover:bg-gray-200
              transition
            "
          >
            Add Product
          </button>

        </form>
      </div>
    </section>
  );
}