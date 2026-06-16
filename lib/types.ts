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
    Name: string;
    Email: string;
    message: string;
    isRead: boolean;
    createdAt: Date;
    isImportant: boolean;
}