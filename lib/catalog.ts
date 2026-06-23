import { Products } from "@/lib/types";

export const fallbackProductImage =
  "https://dummyimage.com/800x800/111827/ffffff&text=Product";

export const catalogProducts: Products[] = [
  {
    id: 1,
    name: "Premium Headphones",
    description:
      "Wireless over-ear headphones with deep bass, clear calls, and all-day comfort.",
    original_price: 25000,
    discounted_price: 19999,
    category: "Electronics",
    images: [
      "https://dummyimage.com/800x800/111827/ffffff&text=Headphones",
      "https://dummyimage.com/800x800/1f2937/ffffff&text=Audio",
      "https://dummyimage.com/800x800/374151/ffffff&text=Wireless",
    ],
    stock: 12,
    isfavourite: false,
    rating: 4,
  },
  {
    id: 2,
    name: "Smart Watch",
    description:
      "A sleek smartwatch with health tracking, notifications, and a bright display.",
    original_price: 20000,
    discounted_price: 14999,
    category: "Wearables",
    images: [
      "https://dummyimage.com/800x800/1f2937/ffffff&text=Smart+Watch",
      "https://dummyimage.com/800x800/111827/ffffff&text=Fitness",
      "https://dummyimage.com/800x800/374151/ffffff&text=Wearable",
    ],
    stock: 5,
    isfavourite: false,
    rating: 5,
  },
  {
    id: 3,
    name: "Gaming Mouse",
    description:
      "Fast, accurate gaming mouse with ergonomic grip and responsive controls.",
    original_price: 7000,
    discounted_price: 4999,
    category: "Accessories",
    images: [
      "https://dummyimage.com/800x800/374151/ffffff&text=Gaming+Mouse",
      "https://dummyimage.com/800x800/111827/ffffff&text=RGB",
      "https://dummyimage.com/800x800/1f2937/ffffff&text=Precision",
    ],
    stock: 0,
    isfavourite: true,
    rating: 4,
  },
  {
    id: 4,
    name: "Mechanical Keyboard",
    description:
      "Compact mechanical keyboard with tactile switches and durable keycaps.",
    original_price: 14000,
    discounted_price: 10999,
    category: "Accessories",
    images: [
      "https://dummyimage.com/800x800/4b5563/ffffff&text=Keyboard",
      "https://dummyimage.com/800x800/111827/ffffff&text=Keys",
      "https://dummyimage.com/800x800/1f2937/ffffff&text=Desk",
    ],
    stock: 2,
    isfavourite: false,
    rating: 4,
  },
  {
    id: 5,
    name: "Travel Tech Kit",
    description:
      "Everyday cable, adapter, and storage bundle for organized travel.",
    original_price: 6500,
    discounted_price: 4499,
    category: "Accessories",
    images: [
      "https://dummyimage.com/800x800/0f172a/ffffff&text=Accessories",
      "https://dummyimage.com/800x800/1f2937/ffffff&text=Cables",
      "https://dummyimage.com/800x800/374151/ffffff&text=Travel",
    ],
    stock: 8,
    isfavourite: false,
    rating: 3,
  },
];

export function getProductById(id: number) {
  return catalogProducts.find((product) => product.id === id);
}

export function getProductImage(product: Pick<Products, "images">) {
  const src = product.images?.[0];

  if (!src) return fallbackProductImage;
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  if (src.startsWith("/")) return src;

  return fallbackProductImage;
}

export function getImageSource(src?: string) {
  if (!src) return fallbackProductImage;
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  if (src.startsWith("/")) return src;

  return fallbackProductImage;
}

export const catalogCategories = Array.from(
  new Set(catalogProducts.map((product) => product.category))
);
