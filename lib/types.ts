 export type Products = {
    id? : number;
    name: string;
    description: string;
    original_price: number;
    discounted_price: number;
    category: string;
    images: string[];
    stock:  number;
    isfavourite : boolean;
    rating: number;
}

export type CartItem = {
    id: number;
    product_id: number;
    quantity: number;
    product: Products;
}

export type cart = {
    id? : number;
    quantity: number;
}

export type CheckoutDetails = {
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    shipping_address: string;
}

export type CustomerOrder = {
    id: number;
    order_number: string;
    user_id: string;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    shipping_address: string;
    subtotal: number;
    shipping: number;
    total: number;
    status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
    created_at: string;
}

export type CustomerOrderItem = {
    id: number;
    order_id: number;
    product_id: number | null;
    product_name: string;
    product_image: string | null;
    unit_price: number;
    quantity: number;
    line_total: number;
}

export type NotificationItem = {
    id? : number;
    name: string;
    subject: string; 
    email: string;
    message: string;
    isRead: boolean;
    isImportant: boolean;
    created_at: string;
}
