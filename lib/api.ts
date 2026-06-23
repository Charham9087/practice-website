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
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
    const fileName = `products/${Date.now()}-${crypto.randomUUID()}-${safeName}`;
    const { data, error } = await supabase.storage
        .from('maq_mart-ts')
        .upload(fileName, file);

    if (error) {
        console.error('Error uploading image:', error);
        return "";
    }

    const { data: publicUrl } = supabase.storage
        .from('maq_mart-ts')
        .getPublicUrl(data.path);

    return publicUrl.publicUrl;
}

