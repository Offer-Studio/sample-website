'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { Navigation } from '@/lib/schemas/site-schema';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import siteConfig from '@/config/site.json';

interface NavigationBarProps {
  navigation: Navigation;
  className?: string;
}

export function NavigationBar({ navigation, className }: NavigationBarProps) {
  const pathname = usePathname();
  const { links, position, style, linksPosition = 'left', themeToggle = { show: true, position: 'right' } } = navigation;

  // Extract className from style, and convert remaining style object to React inline style
  const { className: styleClassName, ...restStyle } = style || {};

  // Convert style object to React CSSProperties
  const navigationStyle = restStyle ? { ...restStyle } as React.CSSProperties : {};

  // Add position styling
  if (position === 'fixed') {
    navigationStyle.position = 'fixed';
    navigationStyle.top = '0';
    navigationStyle.left = '0';
    navigationStyle.right = '0';
    navigationStyle.zIndex = '50';
  } else if (position === 'sticky') {
    navigationStyle.position = 'sticky';
    navigationStyle.top = '0';
    navigationStyle.zIndex = '40';
  }

  // Determine if theme toggle should be shown and its position
  const showThemeToggle = themeToggle?.show !== false;
  const themeTogglePosition = themeToggle?.position || 'right';

  // Determine the order of elements based on configuration
  const renderNavigationLinks = () => (
    <div className="hidden md:flex items-center space-x-4">
      {links.map((link, index) => {
        const isActive = pathname === link.path;

        if (link.external) {
          return (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              asChild
            >
              <a
                href={link.path}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            </Button>
          );
        }

        return (
          <Button
            key={index}
            variant={isActive ? "secondary" : "ghost"}
            size="sm"
            asChild
          >
            <Link href={link.path}>
              {link.label}
            </Link>
          </Button>
        );
      })}
    </div>
  );

  // Render theme toggle button
  const renderThemeToggle = () => (
    showThemeToggle && <ThemeToggle className="ml-2" />
  );

  return (
    <nav
      className={cn("w-full", className, styleClassName)}
      style={navigationStyle}
    >
      <div className="container flex h-14 items-center">
        {/* Logo Section - Always on the left */}
        <div className="mr-4 flex">
          {navigation.logo?.src && (
            <Link href="/" className="mr-2 flex items-center space-x-2">
              <Image
                src={navigation.logo.src}
                alt={navigation.logo.alt || 'Logo'}
                width={navigation.logo.width || 32}
                height={navigation.logo.height || 32}
              />
              <span className="font-bold hidden sm:inline-block">
                {siteConfig.title}
              </span>
            </Link>
          )}
        </div>

        {/* Desktop Navigation - Positioned based on configuration */}
        <div className={cn(
          "flex-1 flex items-center",
          linksPosition === 'right' ? "justify-end" : "justify-start"
        )}>
          {/* If links are on the left and theme toggle is on the left */}
          {linksPosition === 'left' && themeTogglePosition === 'left' && (
            <>
              {renderNavigationLinks()}
              {renderThemeToggle()}
            </>
          )}

          {/* If links are on the left and theme toggle is on the right */}
          {linksPosition === 'left' && themeTogglePosition === 'right' && renderNavigationLinks()}

          {/* If links are on the right and theme toggle is on the left */}
          {linksPosition === 'right' && themeTogglePosition === 'left' && renderThemeToggle()}

          {/* If links are on the right and theme toggle is on the right */}
          {linksPosition === 'right' && themeTogglePosition === 'right' && (
            <>
              {renderNavigationLinks()}
              {renderThemeToggle()}
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden ml-auto">
          {showThemeToggle && <ThemeToggle className="mr-2" />}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="grid gap-2 py-6">
                {links.map((link, index) => {
                  const isActive = pathname === link.path;

                  if (link.external) {
                    return (
                      <Button
                        key={index}
                        variant="ghost"
                        className="justify-start"
                        asChild
                      >
                        <a
                          href={link.path}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.label}
                        </a>
                      </Button>
                    );
                  }

                  return (
                    <Button
                      key={index}
                      variant={isActive ? "secondary" : "ghost"}
                      className="justify-start"
                      asChild
                    >
                      <Link href={link.path}>
                        {link.label}
                      </Link>
                    </Button>
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
