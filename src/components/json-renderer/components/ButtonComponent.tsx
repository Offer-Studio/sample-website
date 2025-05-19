'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ButtonComponent as ButtonComponentType } from '@/lib/schemas/site-schema';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const ButtonComponent: React.FC<ButtonComponentType> = ({
  content,
  variant = 'default',
  size = 'default',
  href,
  onClick,
  target,
  style,
  id
}) => {
  // Extract className from style, and convert remaining style object to React inline style
  const { className: styleClassName, ...restStyle } = style || {};

  // Convert style object to React CSSProperties
  const inlineStyle = restStyle ? { ...restStyle } as React.CSSProperties : {};

  // Create customClassName by merging any additional classes
  const customClassName = cn(styleClassName || '');

  // If href is provided, render as a link
  if (href) {
    // External link or internal navigation
    const isExternal = href.startsWith('http') || href.startsWith('//');

    if (isExternal) {
      return (
        <Button
          id={id}
          variant={variant}
          size={size}
          asChild
          className={customClassName}
          style={inlineStyle}
        >
          <a href={href} target="_blank" rel="noopener noreferrer">
            {content}
          </a>
        </Button>
      );
    }

    return (
      <Button
        id={id}
        variant={variant}
        size={size}
        asChild
        className={customClassName}
        style={inlineStyle}
      >
        <Link href={href}>
          {content}
        </Link>
      </Button>
    );
  }

  // Handle click actions
  const handleClick = () => {
    if (!onClick) return;

    switch (onClick) {
      case 'navigate':
        if (target) {
          window.location.href = target;
        }
        break;
      case 'scroll':
        if (target) {
          const element = document.getElementById(target);
          element?.scrollIntoView({ behavior: 'smooth' });
        }
        break;
      case 'modal':
        // Modal handling would be implemented separately
        console.log('Modal action:', target);
        break;
      default:
        break;
    }
  };

  // Regular button
  return (
    <Button
      id={id}
      variant={variant}
      size={size}
      onClick={handleClick}
      className={customClassName}
      style={inlineStyle}
    >
      {content}
    </Button>
  );
};

export default ButtonComponent;
