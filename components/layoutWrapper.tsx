"use client";

import { usePathname } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/sidebar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isAdminRoute = pathname.startsWith("/admin");

  // ADMIN LAYOUT
  if (isAdminRoute) {
    return (
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />

          <main className="flex-1 p-4">
            <SidebarTrigger />
            {children}
          </main>
        </div>
      </SidebarProvider>
    );
  }

  // PUBLIC (NON-ADMIN) LAYOUT
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}