"use server"
import { supabase } from "@/lib/supabase";
import { html } from "framer-motion/client";
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
