import { supabase } from "@/lib/supabase";
//to use 👇
export async function setFavourite(
  productId: number,
  currentStatus: boolean
): Promise<boolean | null> {
  const { data, error } = await supabase
    .from("products")
    .update({ isfavourite: !currentStatus })
    .eq("id", productId)
    .select("*")
    .single();

  if (error) {
    console.error("Error updating favourite:", error);
    return null;
  }

  return data.isfavourite;
}

export async function getCategories() {
  const { data, error } = await supabase
    .from("categories")
    .select("*");

  if (error) {
    console.log(error);
    return [];
  }

  return data?.map((c) => c.name) || [];
}