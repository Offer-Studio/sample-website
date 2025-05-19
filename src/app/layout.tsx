import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ClientBody } from "./ClientBody";
import { NavigationBar } from "@/components/navigation/NavigationBar";
import siteConfig from "@/config/site.json";
import { Navigation } from "@/lib/schemas/site-schema";
import ComponentRenderer from "@/components/json-renderer/ComponentRenderer";

const inter = Inter({ subsets: ["latin"] });

// Get the logo path from the navigation object
const logoPath = siteConfig.navigation.logo?.src || '/logo.svg';

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.meta?.keywords,
  authors: siteConfig.meta?.author
    ? [{ name: siteConfig.meta.author }]
    : undefined,
  icons: {
    icon: logoPath,
    apple: logoPath,
  },
};

export const viewport: Viewport = {
  themeColor: siteConfig.meta?.themeColor || "#000000",
};

const getTypedNavigation = (nav: Record<string, unknown>): Navigation => {
  return {
    type: nav.type as "horizontal" | "vertical" | "dropdown",
    position: nav.position as "fixed" | "sticky" | "static",
    links: nav.links as Navigation['links'],
    logo: nav.logo as Navigation['logo'],
    style: nav.style as Navigation['style'],
    linksPosition: nav.linksPosition as "left" | "right",
    themeToggle: nav.themeToggle as Navigation['themeToggle'],
  };
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalStyles = siteConfig.style || {};

  const typedNavigation = getTypedNavigation(siteConfig.navigation);
  const footerComponents = siteConfig.footer?.components || [];

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className} style={globalStyles}>
        <ClientBody>
          <NavigationBar navigation={typedNavigation} />
          <main className="min-h-screen">
            {children}
          </main>
          {footerComponents.length > 0 && (
            <footer>
              {footerComponents.map((component, index) => (
                <ComponentRenderer key={`footer-component-${index}`} component={component} />
              ))}
            </footer>
          )}
          <Toaster />
        </ClientBody>
      </body>
    </html>
  );
}
