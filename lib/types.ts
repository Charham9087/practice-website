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
}