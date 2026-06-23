import { supabase } from "@/lib/supabase";
import {
  CartItem,
  CheckoutDetails,
  CustomerOrder,
  CustomerOrderItem,
  Products,
} from "@/lib/types";

const SHIPPING_FEE = 500;
const GUEST_CART_KEY = "maq_mart_guest_cart";

type GuestCartLine = {
  product_id: number;
  quantity: number;
};

function normalizeProduct(product: Products): Products {
  return {
    ...product,
    images: product.images ?? [],
    isfavourite: Boolean(product.isfavourite),
    rating: Number(product.rating ?? 0),
    stock: Number(product.stock ?? 0),
    original_price: Number(product.original_price ?? 0),
    discounted_price: Number(product.discounted_price ?? 0),
  };
}

function canUseStorage() {
  return typeof window !== "undefined" && Boolean(window.localStorage);
}

function readGuestCart(): GuestCartLine[] {
  if (!canUseStorage()) return [];

  try {
    const rawCart = window.localStorage.getItem(GUEST_CART_KEY);
    if (!rawCart) return [];

    const parsed = JSON.parse(rawCart) as GuestCartLine[];
    if (!Array.isArray(parsed)) return [];

    return parsed
      .map((item) => ({
        product_id: Number(item.product_id),
        quantity: Number(item.quantity),
      }))
      .filter(
        (item) =>
          Number.isFinite(item.product_id) &&
          Number.isFinite(item.quantity) &&
          item.quantity > 0
      );
  } catch {
    return [];
  }
}

function writeGuestCart(items: GuestCartLine[]) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));
}

function clearGuestCart() {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(GUEST_CART_KEY);
}

export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();

  if (error) return null;
  return data.user;
}

export async function signUpCustomer(
  fullName: string,
  email: string,
  password: string
) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) return { success: false, message: error.message };

  if (data.user) {
    await supabase.from("profiles").upsert({
      id: data.user.id,
      full_name: fullName,
      email,
    });
  }

  return {
    success: true,
    message: data.session
      ? "Account created."
      : "Account created. Check your email to confirm your account.",
  };
}

export async function signInCustomer(email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return { success: false, message: error.message };
  return { success: true, message: "Signed in." };
}

export async function signOutCustomer() {
  await supabase.auth.signOut();
}

export async function getProductsWithFavourites() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  const products = ((data ?? []) as Products[]).map(normalizeProduct);
  const user = await getCurrentUser();

  if (!user || products.length === 0) {
    return products.map((product) => ({ ...product, isfavourite: false }));
  }

  const { data: favourites } = await supabase
    .from("product_favourites")
    .select("product_id")
    .eq("user_id", user.id);

  const favouriteIds = new Set((favourites ?? []).map((item) => item.product_id));

  return products.map((product) => ({
    ...product,
    isfavourite: product.id ? favouriteIds.has(product.id) : false,
  }));
}

export async function getProductWithFavourite(productId: number) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", productId)
    .single();

  if (error || !data) return null;

  const product = normalizeProduct(data as Products);
  const user = await getCurrentUser();

  if (!user || !product.id) {
    return { ...product, isfavourite: false };
  }

  const { data: favourite } = await supabase
    .from("product_favourites")
    .select("id")
    .eq("user_id", user.id)
    .eq("product_id", product.id)
    .maybeSingle();

  return {
    ...product,
    isfavourite: Boolean(favourite),
  };
}

export async function searchProductIds(query: string): Promise<number[]> {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) return [];

  const { data, error } = await supabase.rpc("keyword_search_products", {
    query_text: trimmedQuery,
    match_count: 24,
  });

  if (error) {
    console.error("Error searching products:", error);
    return [];
  }

  return ((data ?? []) as { product_id: number }[]).map((item) =>
    Number(item.product_id)
  );
}

export async function toggleProductFavourite(productId: number) {
  const user = await getCurrentUser();

  if (!user) {
    return { success: false, message: "Please login to save favourites." };
  }

  const { data: existing } = await supabase
    .from("product_favourites")
    .select("id")
    .eq("user_id", user.id)
    .eq("product_id", productId)
    .maybeSingle();

  if (existing) {
    const { error } = await supabase
      .from("product_favourites")
      .delete()
      .eq("id", existing.id);

    if (error) return { success: false, message: error.message };
    return { success: true, isFavourite: false, message: "Removed from favourites." };
  }

  const { error } = await supabase.from("product_favourites").insert({
    user_id: user.id,
    product_id: productId,
  });

  if (error) return { success: false, message: error.message };
  return { success: true, isFavourite: true, message: "Added to favourites." };
}

export async function addProductToCart(productId: number, quantity = 1) {
  const user = await getCurrentUser();

  if (!user) {
    const cart = readGuestCart();
    const existing = cart.find((item) => item.product_id === productId);

    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ product_id: productId, quantity });
    }

    writeGuestCart(cart);
    return { success: true, message: "Added to cart." };
  }

  const { data: existing } = await supabase
    .from("cart_items")
    .select("id, quantity")
    .eq("user_id", user.id)
    .eq("product_id", productId)
    .maybeSingle();

  if (existing) {
    const { error } = await supabase
      .from("cart_items")
      .update({
        quantity: Number(existing.quantity) + quantity,
        updated_at: new Date().toISOString(),
      })
      .eq("id", existing.id);

    if (error) return { success: false, message: error.message };
    return { success: true, message: "Cart updated." };
  }

  const { error } = await supabase.from("cart_items").insert({
    user_id: user.id,
    product_id: productId,
    quantity,
  });

  if (error) return { success: false, message: error.message };
  return { success: true, message: "Added to cart." };
}

export async function getCartItems() {
  const user = await getCurrentUser();

  if (!user) {
    const guestCart = readGuestCart();
    const productIds = guestCart.map((item) => item.product_id);

    if (productIds.length === 0) {
      return { items: [] as CartItem[], message: "" };
    }

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .in("id", productIds);

    if (error) {
      console.error("Error fetching guest cart:", error);
      return { items: [] as CartItem[], message: error.message };
    }

    const products = new Map(
      ((data ?? []) as Products[]).map((product) => [
        product.id,
        normalizeProduct(product),
      ])
    );

    const items = guestCart
      .map((item) => {
        const product = products.get(item.product_id);
        if (!product) return null;

        return {
          id: -item.product_id,
          product_id: item.product_id,
          quantity: item.quantity,
          product,
        };
      })
      .filter((item): item is CartItem => Boolean(item));

    return { items, message: "" };
  }

  const { data, error } = await supabase
    .from("cart_items")
    .select("id, product_id, quantity, product:products(*)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching cart:", error);
    return { items: [] as CartItem[], message: error.message };
  }

  const items = (data ?? []).map((item) => ({
    id: item.id,
    product_id: item.product_id,
    quantity: Number(item.quantity),
    product: normalizeProduct(item.product as unknown as Products),
  }));

  return { items, message: "" };
}

export async function updateCartItemQuantity(cartItemId: number, quantity: number) {
  const user = await getCurrentUser();
  if (!user) {
    const productId = Math.abs(cartItemId);
    const cart = readGuestCart();

    if (quantity <= 0) {
      writeGuestCart(cart.filter((item) => item.product_id !== productId));
      return { success: true, message: "Item removed." };
    }

    writeGuestCart(
      cart.map((item) =>
        item.product_id === productId ? { ...item, quantity } : item
      )
    );
    return { success: true, message: "Cart updated." };
  }

  if (quantity <= 0) {
    return removeCartItem(cartItemId);
  }

  const { error } = await supabase
    .from("cart_items")
    .update({ quantity, updated_at: new Date().toISOString() })
    .eq("id", cartItemId)
    .eq("user_id", user.id);

  if (error) return { success: false, message: error.message };
  return { success: true, message: "Cart updated." };
}

export async function removeCartItem(cartItemId: number) {
  const user = await getCurrentUser();
  if (!user) {
    const productId = Math.abs(cartItemId);
    writeGuestCart(
      readGuestCart().filter((item) => item.product_id !== productId)
    );
    return { success: true, message: "Item removed." };
  }

  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("id", cartItemId)
    .eq("user_id", user.id);

  if (error) return { success: false, message: error.message };
  return { success: true, message: "Item removed." };
}

export function calculateCartTotals(items: CartItem[]) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.discounted_price * item.quantity,
    0
  );
  const shipping = items.length > 0 ? SHIPPING_FEE : 0;

  return {
    subtotal,
    shipping,
    total: subtotal + shipping,
  };
}

export async function checkoutCart(details: CheckoutDetails) {
  const user = await getCurrentUser();

  const { items, message } = await getCartItems();
  if (message) return { success: false, message };
  if (items.length === 0) return { success: false, message: "Your cart is empty." };

  if (!user) {
    const { data, error } = await supabase.rpc("create_guest_order", {
      customer_name: details.customer_name,
      customer_email: details.customer_email,
      customer_phone: details.customer_phone,
      shipping_address: details.shipping_address,
      cart_items: items.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
      })),
    });

    if (error) {
      return { success: false, message: error.message };
    }

    clearGuestCart();
    const order = Array.isArray(data) ? data[0] : data;

    return {
      success: true,
      message: `Order ${order?.order_number ?? ""} placed.`,
    };
  }

  const totals = calculateCartTotals(items);
  const orderNumber = `ORD-${Date.now()}`;

  const { data: order, error: orderError } = await supabase
    .from("customer_orders")
    .insert({
      order_number: orderNumber,
      user_id: user.id,
      customer_name: details.customer_name,
      customer_email: details.customer_email,
      customer_phone: details.customer_phone,
      shipping_address: details.shipping_address,
      subtotal: totals.subtotal,
      shipping: totals.shipping,
      total: totals.total,
      status: "Pending",
    })
    .select("*")
    .single();

  if (orderError || !order) {
    return { success: false, message: orderError?.message ?? "Checkout failed." };
  }

  const orderItems = items.map((item) => ({
    order_id: order.id,
    product_id: item.product.id ?? null,
    product_name: item.product.name,
    product_image: item.product.images?.[0] ?? null,
    unit_price: item.product.discounted_price,
    quantity: item.quantity,
    line_total: item.product.discounted_price * item.quantity,
  }));

  const { error: itemsError } = await supabase
    .from("customer_order_items")
    .insert(orderItems);

  if (itemsError) return { success: false, message: itemsError.message };

  await supabase.from("cart_items").delete().eq("user_id", user.id);

  return {
    success: true,
    message: `Order ${orderNumber} placed.`,
    order: order as CustomerOrder,
  };
}

export async function getAllOrders() {
  const { data, error } = await supabase.rpc("get_admin_orders");

  if (error) {
    console.error("Error fetching orders:", error);
    return [];
  }

  return (Array.isArray(data) ? data : []) as (CustomerOrder & {
    items: CustomerOrderItem[];
  })[];
}

export async function updateOrderStatus(
  orderId: number,
  status: CustomerOrder["status"]
) {
  const { error } = await supabase.rpc("update_admin_order_status", {
    order_id: orderId,
    new_status: status,
  });

  if (error) return { success: false, message: error.message };
  return { success: true, message: "Order status updated." };
}
