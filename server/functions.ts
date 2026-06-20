"use server";
import { supabase } from "@/lib/supabase";
import { NotificationItem, Products } from "@/lib/types";
import nodemailer from "nodemailer";
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

export default async function sendEmails(Subject: string, Text: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.APP_EMAIL,
      pass: process.env.APP_PASSWORD,
    },
  });

  async function getEmails() {
    const { data, error } = await supabase.from("Customer").select("email");

    if (error) {
      console.error("Error fetching emails:", error);
      return [];
    }
    return data.map((customer) => customer.email);
  }
  const mailOptions = {
    from: process.env.APP_EMAIL,
    to: await getEmails(),
    subject: Subject,
    html: Text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
}   

export async function getNotifications(tab: string): Promise<NotificationItem[]> {
  let query = supabase.from("Notification").select("*");

  if (tab === "unread") {
    query = query.eq("isRead", false);
  }

  if (tab === "important") {
    query = query.eq("isImportant", true);
  }

  const { data, error } = await query.order("created_at", {
    ascending: false,
  });

  if (error) {
    console.error(error);
    return [];
  }
  return data as NotificationItem[];
}


export async function markAsRead(id: number) {
  const { error } = await supabase
    .from("Notification")
    .update({ isRead: true })
    .eq("id", id);

  if (error) {
    console.error(error);
  }

  return !error;
}
export async function importantMarking(notificationId: number) {
  // Step 1: Get current value
  const { data: notification, error: fetchError } = await supabase
    .from("Notification")
    .select("isImportant")
    .eq("id", notificationId)
    .single();

  if (fetchError) {
    console.error("Error fetching notification:", fetchError);
    return null;
  }

  // Step 2: Toggle value
  const { data, error: updateError } = await supabase
    .from("Notification")
    .update({
      isImportant: !notification.isImportant,
    })
    .eq("id", notificationId)
    .select("*")
    .single();

  if (updateError) {
    console.error("Error updating notification:", updateError);
    return null;
  }

  // Step 3: return updated row
  return data;
}

export async function countUnreadNotifications() {
  const { count , error } = await supabase
  .from("Notification")
  .select("*", {count : "exact", head: true})
  .eq("isRead", false);

  if (error) {
    console.error("Error counting unread notifications:", error);
    return 0;
  }

  return count ?? 0;
}
export async function getProducts(){
  try {
    const {data , error } = await supabase.from("products").select("*");
    if (error) {
      console.error("Error fetching products:", error);
      return [];
    }

    return (data || []) as Products[];

  }catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

// to create👎

export async function delproduct(){}
// -----------------



export const uploadImages = async (files: File[]) => {
  const urls: string[] = [];

  for (const file of files) {
    const fileName = `${Date.now()}-${file.name}`;

    const { data, error } = await supabase.storage
      .from("products")
      .upload(fileName, file);

    if (error) {
      console.error("Error uploading product image:", error);
      continue;
    }

    const { data: publicUrl } = supabase.storage
      .from("products")
      .getPublicUrl(data.path);

    urls.push(publicUrl.publicUrl);
  }

  return urls;
};
