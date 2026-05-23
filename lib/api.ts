import {supabase } from "./supabase";
import { Products } from "./types";

export const getProducts = async () : Promise<Products[]> => {
    const {data , error} = await supabase.from('products').select('*');
    if(error){
        console.error('Error fetching products:', error);
        return [];
    }
    return data as Products[];
}


export const uploadImage = async (file: File): Promise<string> => {
    const imageURL:string =""

    const fileName = `${Date.now()}-${file.name}`;


    const{data,error} = await supabase.storage.from('maq_mart-ts/products').upload(fileName ,file)






    return (imageURL)
}