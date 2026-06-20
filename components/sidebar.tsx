"use client";

import { useState, useEffect } from "react";
import type { ComponentType } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {countUnreadNotifications} from "@/server/functions";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";

import {
  Home,
  ShoppingCart,
  Package,
  Users,
  Settings,
  Bell,
  Menu,
  X,
} from "lucide-react";

type NavItemProps = {
  href: string;
  icon: ComponentType<{ size?: number }>;
  label: string;
  badge?: number;
  active: boolean;
  collapsed: boolean;
};

function NavItem({
  href,
  icon: Icon,
  label,
  badge,
  active,
  collapsed,
}: NavItemProps) {
  return (
    <Link
      href={href}
      className={`flex items-center justify-between gap-3 p-2 rounded-md transition ${
        active
          ? "bg-blue-600 text-white"
          : "hover:bg-gray-100 dark:hover:bg-zinc-800"
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon size={18} />
        {!collapsed && <span>{label}</span>}
      </div>

      {!collapsed && badge && (
        <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </Link>
  );
}

export default function AppSidebar() {
  const pathname = usePathname();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    countUnreadNotifications().then((count) => {
      setUnreadCount(count);
    });
  }, []);

  return (
    <>
      {/* MOBILE TOP BAR */}
      <div className="md:hidden flex items-center justify-between p-3 border-b dark:border-zinc-800">
        <button onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X /> : <Menu />}
        </button>

        <h1 className="font-bold">Admin</h1>
      </div>

      {/* SIDEBAR WRAPPER */}
      <div
        className={`
          fixed md:static z-50 h-full transition-all duration-300
          ${mobileOpen ? "left-0" : "-left-full md:left-0"}
        `}
      >
        <Sidebar
          className={`h-full border-r bg-white dark:bg-zinc-900 dark:border-zinc-800 flex flex-col
            ${collapsed ? "w-20" : "w-64"}`}
        >
          {/* HEADER */}
          <SidebarHeader className="p-4 border-b dark:border-zinc-800 flex items-center justify-between">
            {!collapsed && (
              <div>
                <h1 className="text-lg font-bold">Admin Panel</h1>
                <p className="text-xs text-gray-500">MAQ Mart</p>
              </div>
            )}

            <button onClick={() => setCollapsed(!collapsed)}>
              <Menu size={18} />
            </button>
          </SidebarHeader>

          {/* CONTENT */}
          <SidebarContent className="p-2 flex-1 space-y-1">
            <NavItem
              href="/admin/dashboard"
              icon={Home}
              label="Dashboard"
              active={isActive("/admin/dashboard")}
              collapsed={collapsed}
            />

            <NavItem
              href="/admin/product"
              icon={Package}
              label="Products"
              active={isActive("/admin/product")}
              collapsed={collapsed}
            />

            <NavItem
              href="/admin/order"
              icon={ShoppingCart}
              label="Orders"
              badge={5}
              active={isActive("/admin/order")}
              collapsed={collapsed}
            />

            <NavItem
              href="/admin/Broadcast"
              icon={Users}
              label="Broadcast"
              active={isActive("/admin/Broadcast")}
              collapsed={collapsed}
            />

            

            <NavItem
              href="/admin/notifications"
              icon={Bell}
              label="Notifications"
              badge={unreadCount>0 ? unreadCount : undefined}
              active={isActive("/admin/notifications")}
              collapsed={collapsed}
            />
          </SidebarContent>

          {/* FOOTER */}
          <SidebarFooter className="p-4 border-t dark:border-zinc-800 space-y-3">
            <NavItem
              href="/admin/settings"
              icon={Settings}
              label="Settings"
              active={isActive("/admin/settings")}
              collapsed={collapsed}
            />

            {/* ADMIN PROFILE */}
            {!collapsed && (
              <div className="flex items-center gap-3 mt-3 p-2 rounded-md bg-gray-50 dark:bg-zinc-800">
                <Image
                  src="https://i.pravatar.cc/40"
                  alt="Admin user"
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="text-sm font-semibold">Admin User</p>
                  <p className="text-xs text-gray-500">admin@maqmart.com</p>
                </div>
              </div>
            )}
          </SidebarFooter>
        </Sidebar>
      </div>
    </>
  );
}
