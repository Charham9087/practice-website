"use server"
import { supabase } from "@/lib/supabase";
import { html, mark } from "framer-motion/client";
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

export async function getNotifications(tab: string) {

  async function getAllNotifications() {
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .order("createdAt", { ascending: false });

    if (error) {
      console.error("Error fetching notifications:", error);
      return [];
    }

    return data;
  }

  async function getUnreadNotifications() {
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("isRead", false)
      .order("createdAt", { ascending: false });

    if (error) {
      console.error("Error fetching unread notifications:", error);
      return [];
    }

    return data;
  }

  async function getImportantNotifications() {
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("isImportant", true)
      .order("createdAt", { ascending: false });

    if (error) {
      console.error("Error fetching important notifications:", error);
      return [];
    }

    return data;
  }

  switch (tab) {
    case "important":
      return await getImportantNotifications();

    case "unread":
      return await getUnreadNotifications();

    default:
      return await getAllNotifications();
  }
}

export async function markAsRead(notificationId: number) {
  const { data, error } = await supabase
    .from("notifications")
    .update({ isRead: true })
    .eq("id", notificationId)
    .select("*")
    .single();

  if (error) {
    console.error("Error marking notification as read:", error);
    return null;
  }

  return data;
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
  .from("Notifications")
  .select("*", {count : "exact", head: true})
  .eq("isRead", false);

  if (error) {
    console.error("Error counting unread notifications:", error);
    return 0;
  }

  return count ?? 0;
}