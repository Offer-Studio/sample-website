# JSON Website Builder Guide: Core Concepts and Site Configuration

## 1. Introduction to JSON Website Builder

The JSON Website Builder is a powerful tool that allows you to create professional websites without writing code. Instead, you define the entire structure, content, and styling of your website using JSON configuration files. This approach provides remarkable flexibility while maintaining simplicity.

## 2. File Structure and Configuration Overview

The system is built around two primary types of configuration files:

1. **site.json** - Contains global site configuration, including:
   - Site metadata (title, description)
   - Navigation structure
   - Theme settings
   - Global styling
   - Footer configuration
   - Page registrations

2. **Page JSON files** (e.g., home.json, about.json) - Define the content and structure of individual pages through components.

## 3. Site.json Configuration in Detail

The `site.json` file is your website's central configuration. You will be provided many examples below of possible site.json configs. These examples are only to make it easier for you to understand how it works. You do not have to follow the examples closely. You can be creative with how you configure your site. Let's examine each section in detail:

### Basic Site Metadata

```json
{
  "title": "My Website",
  "description": "A professional website built with JSON Website Builder",
  "defaultTheme": "system"
}
```

- **title**: The name of your website (appears in browser tabs and SEO)
- **description**: A brief description of your site (used for SEO)
- **defaultTheme**: The color theme mode to use by default - options are:
  - `"light"` - Always use light mode
  - `"dark"` - Always use dark mode  
  - `"system"` - Match the user's system preferences (default)

### Navigation Configuration

The navigation property defines your site's navigation bar:

```json
"navigation": {
  "type": "horizontal",
  "position": "sticky",
  "linksPosition": "right",
  "themeToggle": {
    "show": true,
    "position": "right"
  },
  "style": {
    "backgroundColor": "hsl(var(--background))",
    "borderBottom": "1px solid hsl(var(--border))",
    "padding": "1rem",
    "display": "flex",
    "justifyContent": "space-between",
    "alignItems": "center"
  },
  "logo": {
    "src": "/logo.svg",
    "alt": "Website Name",
    "width": 40,
    "height": 40
  },
  "links": [
    {
      "label": "Home",
      "path": "/"
    },
    {
      "label": "Features",
      "path": "/features"
    },
    {
      "label": "Documentation",
      "path": "/docs"
    },
    {
      "label": "Contact",
      "path": "/contact",
      "external": true
    }
  ]
}
```

Navigation parameters explained:

- **type**: The layout type of navigation
  - `"horizontal"` - Links displayed in a horizontal row (default)
  - `"vertical"` - Links stacked vertically
  - `"dropdown"` - Links in a dropdown menu

- **position**: How the navigation bar is positioned
  - `"static"` - Normal flow of the document
  - `"fixed"` - Fixed to the viewport (stays visible when scrolling)
  - `"sticky"` - Sticks to the top of the viewport when scrolled to

- **linksPosition**: Alignment of navigation links
  - `"left"` - Links aligned to the left side (default)
  - `"right"` - Links aligned to the right side

- **themeToggle**: Controls the theme toggle button
  - `show` - Whether to display a theme toggle button (true/false)
  - `position` - Where to place the theme toggle (`"left"` or `"right"`)

- **style**: CSS styling properties for the navigation bar
  - Accepts any valid CSS properties as a JavaScript object
  - Can use the design system's tokens (e.g., `hsl(var(--background))`)
  - Can include a `className` property for Tailwind classes

- **logo**: Configuration for the site logo
  - `src` - Path to the logo image file
  - `alt` - Alt text for the logo
  - `width` - Width of the logo in pixels
  - `height` - Height of the logo in pixels

- **links**: Array of navigation links, each with:
  - `label` - Text displayed for the link
  - `path` - URL path for the link
  - `external` - Optional boolean, set to `true` if linking to an external site (opens in new tab)

### Global Styling

The style property lets you define global styles applied to the entire site:

```json
"style": {
  "fontFamily": "var(--font-sans)",
  "color": "hsl(var(--foreground))",
  "backgroundColor": "hsl(var(--background))"
}
```

You can use:
- Standard CSS properties (in camelCase format)
- CSS variables via the `var()` function
- Design system tokens (e.g., `hsl(var(--primary))`)
- Any valid CSS values

### Footer Configuration

The footer appears on all pages of your website:

```json
"footer": {
  "components": [
    {
      "type": "container",
      "id": "footer-section",
      "variant": "footer",
      "style": {
        "padding": "3rem 2rem",
        "backgroundImage": "linear-gradient(135deg, #4158D0 0%, #C850C0 100%)",
        "color": "white",
        "textAlign": "center"
      },
      "children": [
        {
          "type": "text",
          "id": "contact-heading",
          "content": "Get In Touch",
          "variant": "h2",
          "style": {
            "fontSize": "2rem",
            "fontWeight": "700",
            "marginBottom": "1rem"
          }
        },
        {
          "type": "button",
          "id": "contact-button",
          "content": "Contact Me",
          "variant": "default",
          "size": "lg",
          "href": "mailto:contact@example.com"
        },
        {
          "type": "text",
          "id": "copyright-text",
          "content": "© 2025 Your Name. All rights reserved.",
          "variant": "p",
          "style": {
            "marginTop": "2rem",
            "fontSize": "0.875rem",
            "opacity": "0.8"
          }
        }
      ]
    }
  ]
}
```

- **components**: An array of components to render in the footer
  - Uses the same component system as page content (which we'll cover in the next section)
  - Can include any valid component (text, buttons, images, containers, etc.)
  - Rendered on all pages of your site

### Metadata for SEO

Additional metadata for search engine optimization and social sharing:

```json
"meta": {
  "author": "Your Name",
  "keywords": ["website", "JSON", "builder"],
  "themeColor": "#000000",
  "ogImage": "/social-preview.jpg"
}
```

- **author**: Name of the website author/creator
- **keywords**: Array of keywords for SEO
- **themeColor**: Color for browser UI elements on mobile devices
- **ogImage**: Path to image used for social media previews

### Page Registration

Register all pages of your website:

```json
"pages": [
  {
    "slug": "/",
    "title": "Home",
    "description": "Welcome to my website"
  },
  {
    "slug": "/about",
    "title": "About",
    "description": "Learn about us"
  },
  {
    "slug": "/contact",
    "title": "Contact",
    "description": "Get in touch with us"
  }
]
```

Each page entry includes:
- **slug**: URL path for the page (e.g., "/" for homepage, "/about" for About page)
- **title**: Page title (displayed in browser tab and for SEO)
- **description**: Page description (used for SEO)

## 4. Practical Implementation

The site.json file is used throughout the application. The `layout.tsx` file loads this configuration and applies it to the entire site:

- It sets up metadata for the site based on your configuration
- It applies your global styles to the `<body>` element
- It renders the NavigationBar component with your navigation configuration
- It renders the footer components at the bottom of every page

The NavigationBar component uses the configuration to:
- Determine the layout type and positioning
- Place navigation links in the specified position
- Show or hide the theme toggle button
- Display your logo
- Apply your custom styles to the navigation bar

## 5. Key Points to Remember

- The site.json file controls global aspects of your website
- All styling properties use camelCase (like in JavaScript), not kebab-case like in CSS
- You can use design system tokens for colors and other values
- The navigation and footer are configured in site.json and appear on all pages
- Individual page content is defined in separate page JSON files