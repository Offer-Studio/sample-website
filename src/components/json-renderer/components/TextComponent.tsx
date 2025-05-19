'use client';

import React from 'react';
import Link from 'next/link';
import { TextComponent as TextComponentType } from '@/lib/schemas/site-schema';
import { cn } from '@/lib/utils';
import parse from 'html-react-parser';

// Helper type for the new content structure
type RichTextSegment = {
  type: 'text' | 'link' | 'bold' | 'italic' | 'highlight' | 'code';
  text: string;
  href?: string;
  target?: '_self' | '_blank' | '_parent' | '_top';
  color?: string;
  style?: Record<string, any>;
};

const TextComponent: React.FC<TextComponentType> = ({
  content,
  variant = 'p',
  style,
  id,
  href,
  target = '_self',
  scroll = false,
  allowHtml = false
}) => {
  // Extract className from style, and convert remaining style object to React inline style
  const { className: styleClassName, ...restStyle } = style || {};

  // Convert style object to React CSSProperties
  const inlineStyle = restStyle ? { ...restStyle } as React.CSSProperties : {};

  // Base styles that can be overridden by the style object
  const baseClass = cn(
    "text-foreground",
    {
      'text-4xl font-bold tracking-tight': variant === 'h1',
      'text-3xl font-bold tracking-tight': variant === 'h2',
      'text-2xl font-semibold': variant === 'h3',
      'text-xl font-semibold': variant === 'h4',
      'text-lg font-medium': variant === 'h5',
      'text-base font-medium': variant === 'h6',
      'text-base leading-7': variant === 'p',
      'text-sm': variant === 'span',
      'text-lg border-l-4 border-muted pl-4 italic': variant === 'blockquote',
    },
    href && 'cursor-pointer hover:underline text-primary transition-colors',
    styleClassName
  );

  // Function to render rich text segments
  const renderRichText = (segments: RichTextSegment[]) => {
    return segments.map((segment, index) => {
      const key = `${id}-segment-${index}`;
      const segmentStyle = segment.style ? { ...segment.style } as React.CSSProperties : {};
      
      switch (segment.type) {
        case 'text':
          return <span key={key} style={segmentStyle}>{segment.text}</span>;
        
        case 'bold':
          return <strong key={key} style={segmentStyle}>{segment.text}</strong>;
        
        case 'italic':
          return <em key={key} style={segmentStyle}>{segment.text}</em>;
        
        case 'highlight':
          // Apply the color property to the highlight's background color if provided
          const highlightStyle = {
            ...segmentStyle,
            backgroundColor: segment.color || segmentStyle.backgroundColor || 'rgba(255, 255, 0, 0.3)',
            color: 'inherit' // Ensure text color matches parent text
          };
          return <mark key={key} style={highlightStyle}>{segment.text}</mark>;
        
        case 'code':
          return <code key={key} className="px-1 py-0.5 bg-muted rounded text-sm" style={segmentStyle}>{segment.text}</code>;
        
        case 'link':
          if (!segment.href) return <span key={key} style={segmentStyle}>{segment.text}</span>;
          
          // For internal links (no http:// or https://) use Next/Link
          if (!segment.href.startsWith('http://') && !segment.href.startsWith('https://')) {
            return (
              <Link key={key} href={segment.href} scroll={scroll}>
                <span className="text-primary hover:underline" style={segmentStyle}>{segment.text}</span>
              </Link>
            );
          }
          
          // For external links use a regular anchor tag
          return (
            <a 
              key={key} 
              href={segment.href} 
              target={segment.target || '_self'} 
              rel={segment.target === '_blank' ? 'noopener noreferrer' : undefined}
              className="text-primary hover:underline"
              style={segmentStyle}
            >
              {segment.text}
            </a>
          );
        
        default:
          return <span key={key} style={segmentStyle}>{segment.text}</span>;
      }
    });
  };

  // Function to render HTML content safely
  const renderHtmlContent = (htmlContent: string) => {
    return parse(htmlContent, {
      replace: (domNode) => {
        if (domNode.type === 'tag' && domNode.name === 'a' && domNode.attribs?.href) {
          const href = domNode.attribs.href;
          const target = domNode.attribs.target || '_self';
          
          // For internal links use Next.js Link
          if (!href.startsWith('http://') && !href.startsWith('https://')) {
            // Get the text content safely
            const textContent = domNode.children?.map(child => {
              // @ts-expect-error - domNode types are complex, we're safely handling them
              return child.data || child.children?.[0]?.data || '';
            }).join('') || '';
            
            return (
              <Link href={href} scroll={scroll}>
                <span className="text-primary hover:underline">{textContent}</span>
              </Link>
            );
          }
        }
        // Return undefined to use default parsing behavior for other tags
        return undefined;
      }
    });
  };

  // Function to render content (string, rich text, or HTML)
  const renderContent = () => {
    if (typeof content === 'string') {
      // If HTML is allowed and the content appears to have HTML tags
      if (allowHtml && /<[a-z][\s\S]*>/i.test(content)) {
        return renderHtmlContent(content);
      }
      return content;
    } else if (Array.isArray(content)) {
      return renderRichText(content as RichTextSegment[]);
    }
    return content;
  };

  // Function to wrap content with Link if href is provided
  const renderWithLink = (element: React.ReactNode) => {
    if (!href) return element;

    // For internal links (no http:// or https://) use Next/Link
    if (!href.startsWith('http://') && !href.startsWith('https://')) {
      return (
        <Link href={href} scroll={scroll}>
          {element}
        </Link>
      );
    }

    // For external links use a regular anchor tag
    return (
      <a href={href} target={target} rel={target === '_blank' ? 'noopener noreferrer' : undefined}>
        {element}
      </a>
    );
  };

  // Render the appropriate HTML element based on variant
  switch (variant) {
    case 'h1':
      return renderWithLink(<h1 id={id} className={baseClass} style={inlineStyle}>{renderContent()}</h1>);
    case 'h2':
      return renderWithLink(<h2 id={id} className={baseClass} style={inlineStyle}>{renderContent()}</h2>);
    case 'h3':
      return renderWithLink(<h3 id={id} className={baseClass} style={inlineStyle}>{renderContent()}</h3>);
    case 'h4':
      return renderWithLink(<h4 id={id} className={baseClass} style={inlineStyle}>{renderContent()}</h4>);
    case 'h5':
      return renderWithLink(<h5 id={id} className={baseClass} style={inlineStyle}>{renderContent()}</h5>);
    case 'h6':
      return renderWithLink(<h6 id={id} className={baseClass} style={inlineStyle}>{renderContent()}</h6>);
    case 'blockquote':
      return renderWithLink(<blockquote id={id} className={baseClass} style={inlineStyle}>{renderContent()}</blockquote>);
    case 'span':
      return renderWithLink(<span id={id} className={baseClass} style={inlineStyle}>{renderContent()}</span>);
    case 'p':
    default:
      return renderWithLink(<p id={id} className={baseClass} style={inlineStyle}>{renderContent()}</p>);
  }
};

export default TextComponent;
