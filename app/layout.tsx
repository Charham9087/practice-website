import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import LayoutWrapper from "@/components/layoutWrapper";
import Providers from "@/components/providers";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "MAQ MART",
  description: "Modern online shopping for quality products at fair prices.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // server-read theme cookie to render correct class on the server
  const cookieStore = await cookies();
  const cookieTheme = cookieStore.get("theme")?.value;
  const serverDark = cookieTheme === "dark";

  return (
    <html
      lang="en"
      className={serverDark ? "dark" : undefined}
      suppressHydrationWarning
    >
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {`
            (function () {
              try {
                var cookieTheme = document.cookie.split("; ").find(function (item) {
                  return item.indexOf("theme=") === 0;
                });
                var storedTheme = localStorage.getItem("theme");
                var theme = cookieTheme ? cookieTheme.split("=")[1] : storedTheme;
                var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

                if (theme === "dark" || (!theme && prefersDark)) {
                  document.documentElement.classList.add("dark");
                } else {
                  document.documentElement.classList.remove("dark");
                }
              } catch (error) {}
            })();
          `}
        </Script>
      </head>
      <body className="min-h-screen overflow-x-hidden antialiased">
        <Providers>
          <LayoutWrapper serverDark={serverDark}>{children}</LayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}
