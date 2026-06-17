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

export type cart = {
    id? : number;
    quantity: number;
}

export type notification = {
    id? : number;
    name: string;
    subject: string; 
    email: string;
    message: string;
    isRead: boolean;
    isImportant: boolean;
    created_at: string;
}