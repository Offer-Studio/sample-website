# Page Configuration Guide for JSON Website Builder

## 1. Basic Overview of JSON Website Builder

The JSON Website Builder is a tool for creating websites by defining their structure and content in JSON format. The system uses two types of configuration files:

1. **site.json** - Contains global settings like site title, navigation, and theme (handled by a separate agent)
2. **Page JSON files** - Define the content and structure of individual pages (your main focus)

## 2. Page Structure and Components

Each page in the JSON Website Builder is defined by a JSON file with this basic structure:

```json
{
  "components": [
    { /* component 1 */ },
    { /* component 2 */ },
    // ... more components
  ]
}
```

Pages are simply collections of components arranged in a specific order. The system renders these components sequentially from top to bottom.

## 3. Component System Overview

Every component follows this common structure:

```json
{
  "type": "componentType",
  "id": "unique-identifier",
  "style": {
    // Optional CSS styling properties
  },
  // Additional properties specific to the component type
}
```

- **type**: Determines what kind of component this is (e.g., 'text', 'button', 'container')
- **id**: A unique identifier for the component (used for linking and references)
- **style**: Optional object containing CSS styling properties (in camelCase format)

The system supports these component types:
- text
- button
- image
- video
- pdf
- container (for grouping other components)
- grid (for layout)
- spacer
- divider
- carousel

## 4. Component Rendering

The system uses a component renderer that processes each component in the array and renders the appropriate UI element based on the component's type and properties. Components appear on the page in the order they're listed in the "components" array.

Container and grid components can have child components, allowing you to create nested structures and complex layouts.

```json
{
  "type": "container",
  "id": "section-container",
  "children": [
    { /* child component 1 */ },
    { /* child component 2 */ }
  ]
}
```

## 5. Page References and Navigation

Components like text and buttons can include href properties to create links between pages or to sections within pages:

- For links to other pages: `"href": "/about"`
- For links to page sections: `"href": "#section-id"` or `"href": "/about#section-id"`

The "id" property of components is crucial for creating anchor points that can be linked to within your site.

## Component Styling in JSON Website Builder

### The Style Object: Overview and Usage

The style object is a fundamental part of the JSON Website Builder that allows you to customize the appearance of any component. It works similarly to inline CSS in HTML, but uses JavaScript's camelCase property naming convention instead of CSS's kebab-case.

```json
"style": {
  "color": "blue",
  "fontSize": "18px",
  "marginBottom": "1rem",
  "backgroundColor": "hsl(var(--primary-light))"
}
```

### Key Characteristics of the Style Object

1. **Universal Application**: Every component type accepts a style object for customization
2. **CSS Properties in camelCase**: Uses JavaScript-style property names (`fontSize` instead of `font-size`)
3. **Design System Integration**: Can reference the built-in design system tokens
4. **Direct CSS Values**: Accepts standard CSS values as strings
5. **Optional Property**: You can omit the style object entirely for default styling

### Available Style Properties

The style object supports a comprehensive set of CSS properties including:

#### Layout & Positioning
- **display**: Controls how an element is displayed (`"flex"`, `"grid"`, `"block"`, etc.)
- **position**: Element positioning method (`"static"`, `"relative"`, `"absolute"`, `"fixed"`, `"sticky"`)
- **top**, **right**, **bottom**, **left**: Positioning coordinates when using `position`
- **zIndex**: Controls stacking order of elements
- **width**, **height**: Element dimensions (px, %, rem, vh/vw, etc.)
- **maxWidth**, **maxHeight**, **minWidth**, **minHeight**: Size constraints
- **overflow**: How to handle content that exceeds the element's box

#### Spacing & Margins
- **padding**: Space inside the element (all sides)
- **margin**: Space outside the element (all sides)
- **marginTop**, **marginRight**, **marginBottom**, **marginLeft**: Individual margin sides

#### Typography
- **color**: Text color
- **fontSize**: Text size
- **fontWeight**: Text thickness (e.g., `"400"`, `"bold"`)
- **fontFamily**: Font used (e.g., `"var(--font-sans)"`)
- **textAlign**: Text alignment (`"left"`, `"center"`, `"right"`, `"justify"`)

#### Visual Styling
- **backgroundColor**: Background color
- **backgroundImage**: Image or gradient background
- **boxShadow**: Shadow effects
- **border**: Border styling (shorthand)
- **borderRadius**: Rounded corners

#### Flexbox & Grid
- **flexDirection**: Direction of flex items (`"row"`, `"column"`, etc.)
- **justifyContent**: Alignment along main axis
- **alignItems**: Alignment along cross axis
- **gap**: Spacing between flex/grid items
- **gridTemplateColumns**: Column layout for grid containers
- **gridTemplateRows**: Row layout for grid containers
- **gridColumn**, **gridRow**: Placement of items in a grid

#### Transitions & Effects
- **opacity**: Element transparency (0 to 1)
- **transform**: Visual transformations (rotate, scale, etc.)
- **transition**: Animation timing for property changes

#### Special Properties
- **className**: For adding Tailwind CSS classes directly (unique to this system)
- **objectFit**, **objectPosition**: For controlling image/video placement

### Using the Design System

The JSON Website Builder includes a design system with predefined tokens for consistent styling. These tokens are accessed using CSS custom properties (variables):

```json
"style": {
  "backgroundColor": "hsl(var(--primary))",
  "color": "hsl(var(--primary-foreground))",
  "boxShadow": "0px 4px 10px hsl(var(--muted) / 0.5)"
}
```

#### Available Design System Tokens

- **--background** / **--foreground**: Base background/text colors
- **--primary** / **--primary-foreground**: Primary brand colors
- **--secondary** / **--secondary-foreground**: Secondary brand colors
- **--muted** / **--muted-foreground**: Subtle background/text variants
- **--accent** / **--accent-foreground**: Accent colors for highlights
- **--destructive** / **--destructive-foreground**: For error/danger states
- **--border**: Border color
- **--input**: Form input colors
- **--ring**: Focus ring color

### Style Examples for Different Purposes

#### Card-like Container
```json
"style": {
  "padding": "1.5rem",
  "backgroundColor": "hsl(var(--background))",
  "borderRadius": "0.5rem",
  "boxShadow": "0px 4px 12px rgba(0, 0, 0, 0.1)",
  "border": "1px solid hsl(var(--border))"
}
```

#### Centered Hero Section
```json
"style": {
  "display": "flex",
  "flexDirection": "column",
  "alignItems": "center",
  "justifyContent": "center",
  "textAlign": "center",
  "padding": "4rem 2rem",
  "minHeight": "80vh",
  "backgroundColor": "hsl(var(--background))"
}
```

#### Responsive Grid
```json
"style": {
  "display": "grid",
  "gridTemplateColumns": "repeat(auto-fit, minmax(300px, 1fr))",
  "gap": "2rem",
  "padding": "2rem 0"
}
```

#### Gradient Background
```json
"style": {
  "backgroundImage": "linear-gradient(135deg, #4158D0 0%, #C850C0 50%, #FFCC70 100%)",
  "color": "white",
  "padding": "3rem 2rem"
}
```

### Best Practices for Using Style Objects

1. **Consistency**: Use the design system tokens for colors, spacing, and typography to maintain a consistent look
2. **Readability**: Group related properties together for better readability
3. **Responsive Values**: Remember that standard CSS values like percentages and viewport units work for responsiveness
4. **Reuse Patterns**: Find patterns in your styling that can be reused across components
5. **Clarity Over Brevity**: Be explicit in your styling to make it clear how components should appear

## Text and Button Components in JSON Website Builder

### Text Component

The Text component is one of the most versatile and commonly used components in the JSON Website Builder. It's used for displaying any type of text content, from headings to paragraphs, and can also function as a link to other pages or sections.

#### Basic Structure

```json
{
  "type": "text",
  "id": "unique-text-id",
  "content": "Your text content here",
  "variant": "p",
  "style": {
    "fontSize": "1rem",
    "color": "hsl(var(--foreground))"
  }
}
```

#### Properties in Detail

- **type**: Must be `"text"` (required)
- **id**: A unique identifier for this text component (required)
- **content**: The text content to display (required)
  - Can be a simple string: `"Hello world"`
  - Or a rich text array (explained below)
- **variant**: The HTML element to use (optional, defaults to `"p"`)
  - Options: `"h1"`, `"h2"`, `"h3"`, `"h4"`, `"h5"`, `"h6"`, `"p"`, `"span"`, `"blockquote"`
  - Use heading variants (`h1`-`h6`) for titles and section headings
  - Use `p` for paragraphs
  - Use `span` for inline text
  - Use `blockquote` for quoted content
- **style**: Object containing CSS styles (optional)
- **href**: URL or hash link to navigate to when clicked (optional)
  - For external links: `"https://example.com"`
  - For internal page links: `"/about"`
  - For section links: `"#section-id"` or `"/about#section-id"`
- **target**: Link target behavior (optional, defaults to `"_self"`)
  - `"_self"`: Open in same window/tab
  - `"_blank"`: Open in new window/tab
  - `"_parent"`: Open in parent frame
  - `"_top"`: Open in full body of window
- **scroll**: Whether to smoothly scroll to the target section (optional, defaults to `false`)
  - Only applies when using hash links (`#section-id`)

#### Rich Text Format

For advanced text formatting, the `content` property can accept an array of rich text segments:

```json
{
  "type": "text",
  "id": "rich-text-example",
  "variant": "p",
  "content": [
    { "type": "text", "text": "This is " },
    { "type": "bold", "text": "bold text" },
    { "type": "text", "text": " and this is " },
    { "type": "italic", "text": "italic text" },
    { "type": "text", "text": " and this is a " },
    { "type": "link", "text": "link", "href": "https://example.com", "target": "_blank" }
  ]
}
```

##### Available Segment Types

1. **text**: Regular text
   ```json
   { "type": "text", "text": "Regular text" }
   ```

2. **bold**: Bold text
   ```json
   { "type": "bold", "text": "Bold text" }
   ```

3. **italic**: Italic text
   ```json
   { "type": "italic", "text": "Italic text" }
   ```

4. **highlight**: Highlighted text
   ```json
   { "type": "highlight", "text": "Highlighted text" }
   ```
   - With custom color:
   ```json
   { "type": "highlight", "text": "Custom highlight", "color": "hsl(var(--destructive) / 0.2)" }
   ```

5. **code**: Monospace code text
   ```json
   { "type": "code", "text": "Code text" }
   ```

6. **link**: Clickable link
   ```json
   { "type": "link", "text": "Link text", "href": "/destination", "target": "_self" }
   ```

Each segment can also include a `style` property for custom styling of just that segment.

#### Common Use Cases

##### Page Heading
```json
{
  "type": "text",
  "id": "page-heading",
  "content": "Welcome to Our Website",
  "variant": "h1",
  "style": {
    "fontSize": "3rem",
    "fontWeight": "bold",
    "marginBottom": "2rem",
    "textAlign": "center"
  }
}
```

##### Section Heading with Anchor
```json
{
  "type": "text",
  "id": "features-heading",
  "content": "Our Features",
  "variant": "h2",
  "style": {
    "fontSize": "2rem",
    "fontWeight": "semibold",
    "marginTop": "3rem",
    "marginBottom": "1.5rem"
  }
}
```

##### Paragraph Text
```json
{
  "type": "text",
  "id": "intro-paragraph",
  "content": "We provide cutting-edge solutions for all your business needs.",
  "variant": "p",
  "style": {
    "fontSize": "1.125rem",
    "lineHeight": "1.7",
    "marginBottom": "1.5rem"
  }
}
```

##### Link to Another Page
```json
{
  "type": "text",
  "id": "about-link",
  "content": "Learn more about us",
  "variant": "p",
  "href": "/about",
  "style": {
    "color": "hsl(var(--primary))",
    "textDecoration": "underline",
    "fontWeight": "500"
  }
}
```

##### Link to Page Section
```json
{
  "type": "text",
  "id": "pricing-link",
  "content": "View pricing options",
  "variant": "p",
  "href": "#pricing-section",
  "scroll": true,
  "style": {
    "color": "hsl(var(--primary))",
    "cursor": "pointer"
  }
}
```

##### Mixed Rich Text with Links
```json
{
  "type": "text",
  "id": "mixed-content",
  "variant": "p",
  "content": [
    { "type": "text", "text": "Check out our " },
    { "type": "link", "text": "features", "href": "/features", "target": "_self" },
    { "type": "text", "text": " or read our " },
    { "type": "link", "text": "documentation", "href": "/docs", "target": "_self" },
    { "type": "text", "text": " for more information." }
  ],
  "style": {
    "fontSize": "1rem",
    "lineHeight": "1.5",
    "marginBottom": "1rem"
  }
}
```

##### Highlighted Call to Action
```json
{
  "type": "text",
  "id": "cta-text",
  "variant": "p",
  "content": [
    { "type": "text", "text": "Sign up today and get " },
    { "type": "highlight", "text": "20% off your first order", "color": "hsl(var(--primary) / 0.2)" },
    { "type": "text", "text": "!" }
  ],
  "style": {
    "fontSize": "1.25rem",
    "fontWeight": "500",
    "textAlign": "center",
    "marginY": "2rem"
  }
}
```

### Button Component

The Button component creates interactive, clickable buttons for actions like navigation, submitting forms, or drawing attention to important calls to action.

#### Basic Structure

```json
{
  "type": "button",
  "id": "unique-button-id",
  "content": "Click Me",
  "variant": "default",
  "size": "default",
  "href": "/destination",
  "style": {
    "marginTop": "1rem"
  }
}
```

#### Properties in Detail

- **type**: Must be `"button"` (required)
- **id**: A unique identifier for this button component (required)
- **content**: The text displayed on the button (required)
- **variant**: Visual style of the button (optional, defaults to `"default"`)
  - `"default"`: Primary action button with solid background
  - `"destructive"`: Red/danger button for delete/cancel actions
  - `"outline"`: Button with outline and transparent background
  - `"secondary"`: Alternative styled button (usually lighter than default)
  - `"ghost"`: Minimal button with no background until hovered
  - `"link"`: Looks like a text link but behaves like a button
- **size**: Size of the button (optional, defaults to `"default"`)
  - `"default"`: Standard button size
  - `"sm"`: Small button
  - `"lg"`: Large button
  - `"icon"`: Square button designed for icons
- **href**: URL or hash link to navigate to when clicked (optional)
  - Works the same as the href property for Text components
- **onClick**: Type of action to perform when clicked (optional)
  - `"navigate"`: Navigate to the href location
  - `"scroll"`: Scroll to a section on the page
  - `"modal"`: Open a modal (target must be specified)
- **target**: The destination for navigation or modal actions (optional)
  - For links/navigation: `"_self"`, `"_blank"`, etc.
  - For modals: The ID of the modal to open
- **style**: Object containing CSS styles (optional)

#### Common Use Cases

##### Primary Call to Action Button
```json
{
  "type": "button",
  "id": "signup-button",
  "content": "Sign Up Now",
  "variant": "default",
  "size": "lg",
  "href": "/signup",
  "style": {
    "marginTop": "2rem"
  }
}
```

##### Secondary Action Button
```json
{
  "type": "button",
  "id": "learn-more-button",
  "content": "Learn More",
  "variant": "outline",
  "size": "default",
  "href": "/features",
  "style": {
    "marginLeft": "1rem"
  }
}
```

##### Danger/Delete Button
```json
{
  "type": "button",
  "id": "delete-account-button",
  "content": "Delete Account",
  "variant": "destructive",
  "size": "default",
  "onClick": "modal",
  "target": "confirm-delete-modal",
  "style": {
    "marginTop": "1rem"
  }
}
```

##### Ghost Button for Subtle Actions
```json
{
  "type": "button",
  "id": "view-details-button",
  "content": "View Details",
  "variant": "ghost",
  "size": "sm",
  "href": "/product/details",
  "style": {
    "margin": "0.5rem 0"
  }
}
```

##### Link-Style Button
```json
{
  "type": "button",
  "id": "terms-button",
  "content": "Terms & Conditions",
  "variant": "link",
  "size": "default",
  "href": "/terms",
  "style": {
    "fontSize": "0.875rem"
  }
}
```

##### Button with Custom Styling
```json
{
  "type": "button",
  "id": "custom-button",
  "content": "Special Offer",
  "variant": "default",
  "size": "lg",
  "href": "/offers",
  "style": {
    "backgroundColor": "#FF5733",
    "color": "white",
    "fontWeight": "bold",
    "padding": "1rem 2rem",
    "borderRadius": "2rem",
    "boxShadow": "0 4px 6px rgba(0, 0, 0, 0.1)",
    "transform": "translateY(0)",
    "transition": "transform 0.2s ease, box-shadow 0.2s ease",
    "marginTop": "2rem"
  }
}
```

##### Email Contact Button
```json
{
  "type": "button",
  "id": "contact-email-button",
  "content": "Email Us",
  "variant": "outline",
  "size": "default",
  "href": "mailto:contact@example.com",
  "style": {
    "marginTop": "1rem"
  }
}
```

##### Button to Scroll to Section
```json
{
  "type": "button",
  "id": "scroll-to-pricing",
  "content": "View Pricing",
  "variant": "secondary",
  "size": "default",
  "href": "#pricing-section",
  "onClick": "scroll",
  "style": {
    "marginTop": "1rem"
  }
}
```

## Image and Video Components in JSON Website Builder

### Image Component

The Image component allows you to display images on your website with precise control over sizing, positioning, and styling. This component uses an intelligent bounding box system to make it easier to create consistent layouts.

#### Basic Structure

```json
{
  "type": "image",
  "id": "unique-image-id",
  "src": "/images/photo.jpg",
  "alt": "Description of the image",
  "width": 600,
  "height": 400,
  "style": {
    "borderRadius": "8px",
    "boxShadow": "0 4px 8px rgba(0,0,0,0.1)"
  },
  "caption": "Optional image caption text"
}
```

#### Properties in Detail

- **type**: Must be `"image"` (required)
- **id**: A unique identifier for this image component (required)
- **src**: Path or URL to the image file (required)
  - Can be a relative path: `"/images/photo.jpg"`
  - Or an absolute URL: `"https://example.com/images/photo.jpg"`
- **alt**: Alternative text for accessibility and SEO (required for accessibility)
- **width**: Width of the bounding box container (optional)
  - Can be a number (interpreted as pixels): `600`
  - Or a string with units: `"600px"`, `"50%"`, `"100vw"`
- **height**: Height of the bounding box container (optional)
  - Format same as width
- **style**: Object containing CSS styles (optional)
- **caption**: Optional text to display below the image

#### The Bounding Box Concept

The Image component uses a "bounding box" approach, which means:

1. The `width` and `height` parameters define a container box
2. The actual image is intelligently sized to fit within this box while maintaining its aspect ratio
3. This creates consistent, predictable layouts regardless of the actual image dimensions

#### Styling the Image Component

The Image component separates styling into two categories:

1. **Box-related styles**: Applied to the bounding box container
   - Positioning properties: `margin`, `padding`, `position`, etc.
   - Grid placement: `gridColumn`, `gridRow`
   - Size constraints: `maxWidth`, `maxHeight`, etc.

2. **Image-specific styles**: Applied to the image itself
   - Visual styles: `filter`, `opacity`, etc.
   - Border styles: `border`, `borderRadius`

This separation makes it easier to create complex layouts with precise image positioning.

#### Special Features

##### Border and Border Radius

Images can have borders and rounded corners:

```json
{
  "type": "image",
  "id": "profile-picture",
  "src": "/images/profile.jpg",
  "alt": "Profile picture",
  "width": 200,
  "height": 200,
  "style": {
    "border": "2px solid hsl(var(--primary))",
    "borderRadius": "50%"
  }
}
```

The system intelligently handles circular images by ensuring they maintain a perfect circle.

##### Captions

Add descriptive text below the image:

```json
{
  "type": "image",
  "id": "landscape-photo",
  "src": "/images/landscape.jpg",
  "alt": "Mountain landscape",
  "width": 800,
  "height": 500,
  "caption": "Scenic view of the mountains at sunrise"
}
```

##### Grid Placement

Images can be placed precisely in grid layouts:

```json
{
  "type": "image",
  "id": "gallery-image-1",
  "src": "/images/gallery1.jpg",
  "alt": "Gallery image",
  "style": {
    "gridColumn": "1 / 3",
    "gridRow": "1 / 2"
  }
}
```

#### Common Use Cases

##### Hero Image
```json
{
  "type": "image",
  "id": "hero-image",
  "src": "/images/hero.jpg",
  "alt": "Hero image showing our product",
  "width": "100%",
  "height": "500px",
  "style": {
    "objectFit": "cover",
    "objectPosition": "center 30%"
  }
}
```

##### Profile Picture
```json
{
  "type": "image",
  "id": "team-member-photo",
  "src": "/images/team/john.jpg",
  "alt": "John Smith, CEO",
  "width": 200,
  "height": 200,
  "style": {
    "borderRadius": "50%",
    "border": "4px solid white",
    "boxShadow": "0 2px 10px rgba(0,0,0,0.1)"
  },
  "caption": "John Smith, CEO"
}
```

##### Responsive Image
```json
{
  "type": "image",
  "id": "responsive-image",
  "src": "/images/product.jpg",
  "alt": "Our flagship product",
  "width": "100%", 
  "height": "auto",
  "style": {
    "maxWidth": "800px",
    "borderRadius": "8px"
  }
}
```

### Video Component

The Video component allows you to embed video content with the same intelligent bounding box system as the Image component, plus video-specific controls.

#### Basic Structure

```json
{
  "type": "video",
  "id": "unique-video-id",
  "src": "/videos/demo.mp4",
  "width": 800,
  "height": 450,
  "autoPlay": false,
  "controls": true,
  "loop": false,
  "muted": false,
  "style": {
    "borderRadius": "8px"
  },
  "caption": "Optional video caption"
}
```

#### Properties in Detail

- **type**: Must be `"video"` (required)
- **id**: A unique identifier for this video component (required)
- **src**: Path or URL to the video file (required)
  - Can be a relative path: `"/videos/demo.mp4"`
  - Or an absolute URL: `"https://example.com/videos/demo.mp4"`
- **width**: Width of the bounding box container (optional)
  - Same format as Image component
- **height**: Height of the bounding box container (optional)
  - Same format as Image component
- **autoPlay**: Whether the video should start playing automatically (optional, default: `false`)
- **controls**: Whether to show video controls (optional, default: `true`)
- **loop**: Whether the video should loop when finished (optional, default: `false`)
- **muted**: Whether the video should be muted (optional, default: `false`)
- **style**: Object containing CSS styles (optional)
- **caption**: Optional text to display below the video

#### The Bounding Box Concept for Videos

Like the Image component, the Video component uses a bounding box approach:

1. The `width` and `height` parameters define a container box
2. The actual video is sized to fit within this box while maintaining its aspect ratio
3. This prevents distortion and creates consistent layouts

#### Video-Specific Features

##### Playback Controls

Control how the video behaves:

- **autoPlay**: Set to `true` to have the video play automatically when the page loads
  - Note: Most browsers require videos to be muted for autoplay to work
- **controls**: Set to `false` to hide the video controls (play/pause button, timeline, etc.)
- **loop**: Set to `true` to have the video repeat when it reaches the end
- **muted**: Set to `true` to have the video play without sound

```json
{
  "type": "video",
  "id": "background-video",
  "src": "/videos/background-loop.mp4",
  "width": "100%",
  "height": "100vh",
  "autoPlay": true,
  "controls": false,
  "loop": true,
  "muted": true,
  "style": {
    "objectFit": "cover",
    "position": "absolute",
    "top": 0,
    "left": 0,
    "zIndex": "-1"
  }
}
```

##### Loading State

The Video component automatically shows a loading spinner while the video is being loaded, which is then replaced by the video once it's ready to play.

#### Common Use Cases

##### Product Demo Video
```json
{
  "type": "video",
  "id": "product-demo",
  "src": "/videos/product-demo.mp4",
  "width": 800,
  "height": 450,
  "controls": true,
  "style": {
    "borderRadius": "8px",
    "boxShadow": "0 4px 12px rgba(0,0,0,0.15)"
  },
  "caption": "Watch our product in action"
}
```

##### Background Video
```json
{
  "type": "video",
  "id": "hero-background",
  "src": "/videos/background.mp4",
  "width": "100%",
  "height": "60vh",
  "autoPlay": true,
  "controls": false,
  "loop": true,
  "muted": true,
  "style": {
    "objectFit": "cover",
    "width": "100%",
    "height": "100%"
  }
}
```

##### Instructional Video
```json
{
  "type": "video",
  "id": "tutorial-video",
  "src": "/videos/tutorial.mp4",
  "width": "100%",
  "height": "auto",
  "style": {
    "maxWidth": "700px",
    "borderRadius": "12px"
  },
  "caption": "How to get started with our platform (5 min)"
}
```

#### Integration with Grid Layouts

Both Image and Video components can be integrated seamlessly into grid layouts:

```json
{
  "type": "grid",
  "id": "media-grid",
  "style": {
    "display": "grid",
    "gridTemplateColumns": "repeat(2, 1fr)",
    "gap": "20px",
    "padding": "2rem 0"
  },
  "children": [
    {
      "type": "image",
      "id": "grid-image-1",
      "src": "/images/photo1.jpg",
      "alt": "Description 1",
      "style": {
        "width": "100%",
        "height": "100%",
        "objectFit": "cover"
      }
    },
    {
      "type": "video",
      "id": "grid-video-1",
      "src": "/videos/clip1.mp4",
      "controls": true,
      "style": {
        "width": "100%",
        "height": "100%"
      }
    }
  ]
}
```

In grid contexts, the Image and Video components automatically adapt to fill their grid cells while still maintaining proper aspect ratios.

## PDF Component in JSON Website Builder

The PDF Component allows you to embed and display PDF documents directly within your web pages, providing an interactive viewer with navigation controls, zoom functionality, and download options.

### Basic Structure

```json
{
  "type": "pdf",
  "id": "unique-pdf-id",
  "src": "/documents/sample.pdf",
  "width": 800,
  "height": 600,
  "showControls": true,
  "style": {
    "borderRadius": "8px",
    "boxShadow": "0 4px 12px rgba(0,0,0,0.1)"
  }
}
```

### Properties in Detail

- **type**: Must be `"pdf"` (required)
- **id**: A unique identifier for this PDF component (required)
- **src**: Path or URL to the PDF file (required)
  - Can be a relative path: `"/documents/sample.pdf"`
  - Or an absolute URL: `"https://example.com/documents/sample.pdf"`
- **width**: Width of the PDF viewer in pixels (optional)
  - If not specified, it will use the full width of its container
- **height**: Height of the PDF viewer in pixels (optional, defaults to 600px)
- **showControls**: Whether to display navigation controls (optional, defaults to `true`)
  - When `true`, shows page navigation, zoom buttons, and download option
  - When `false`, displays just the PDF without controls
- **style**: Object containing CSS styles (optional)

### PDF Viewer Features

The PDF component is built with several intelligent features that enhance the user experience:

#### 1. Intelligent Rendering

The system uses a two-tier approach to PDF rendering:
- Initially attempts to use an advanced PDF.js-based viewer with full features
- Automatically falls back to the browser's native PDF viewer if any issues occur with the PDF.js renderer

#### 2. Navigation Controls

When `showControls` is enabled (default), the PDF viewer includes:
- Previous/Next page buttons
- Page number indicator (e.g., "Page 3 of 15")
- Zoom in/out buttons with percentage indicator
- Download button to save the PDF file

```json
{
  "type": "pdf",
  "id": "user-manual",
  "src": "/documents/user-manual.pdf",
  "showControls": true,
  "height": 800
}
```

#### 3. Responsive Loading States

The component shows appropriate loading indicators and error states:
- Spinning loader while the PDF is being loaded
- Error messages if the PDF fails to load
- Options to try alternative viewers or download the file directly

#### 4. Accessibility Features

The PDF viewer includes:
- Text layer for selectable text (when available in the PDF)
- Annotation layer for interactive PDF elements
- Proper ARIA labels for navigation controls

### Common Use Cases

#### Documentation Viewer

```json
{
  "type": "pdf",
  "id": "product-documentation",
  "src": "/docs/product-manual.pdf",
  "height": 700,
  "style": {
    "border": "1px solid hsl(var(--border))",
    "borderRadius": "8px"
  }
}
```

#### Embedded Resume or CV

```json
{
  "type": "pdf",
  "id": "resume-viewer",
  "src": "/documents/resume.pdf",
  "height": 900,
  "showControls": true,
  "style": {
    "maxWidth": "800px",
    "margin": "0 auto",
    "boxShadow": "0 4px 12px rgba(0,0,0,0.15)"
  }
}
```

#### Technical Whitepaper

```json
{
  "type": "pdf",
  "id": "whitepaper",
  "src": "/whitepapers/blockchain-analysis.pdf",
  "height": 800,
  "style": {
    "width": "100%",
    "maxWidth": "1000px"
  }
}
```

#### Embedded Brochure with Custom Styling

```json
{
  "type": "pdf",
  "id": "product-brochure",
  "src": "/marketing/brochure-2023.pdf",
  "width": 800,
  "height": 600,
  "style": {
    "borderRadius": "12px",
    "boxShadow": "0 8px 30px rgba(0,0,0,0.12)",
    "border": "1px solid hsl(var(--border))"
  }
}
```

### Technical Implementation Notes

The PDF component handles several technical challenges automatically:

1. **Client-side Rendering**: PDFs are rendered only on the client side to avoid server-side rendering issues
2. **Worker Management**: PDF.js worker is dynamically loaded for optimal performance
3. **Fallback Mechanisms**: Multiple fallback options ensure PDFs display properly across browsers
4. **Error Handling**: Comprehensive error handling with user-friendly messages and alternative options

This makes the PDF component both powerful and easy to use, requiring minimal configuration while providing a professional document viewing experience.

## Container, Grid, and Carousel Components in JSON Website Builder

### Container Component

The Container component serves as a flexible wrapper for grouping and organizing other components. It provides structure to your pages and enables creating cohesive sections or content blocks.

#### Basic Structure

```json
{
  "type": "container",
  "id": "unique-container-id",
  "variant": "section",
  "style": {
    "padding": "2rem",
    "backgroundColor": "hsl(var(--background))"
  },
  "children": [
    { /* child component 1 */ },
    { /* child component 2 */ },
    { /* child component 3 */ }
  ]
}
```

#### Properties in Detail

- **type**: Must be `"container"` (required)
- **id**: A unique identifier for this container component (required)
- **variant**: The HTML element to render the container as (optional, defaults to `"div"`)
  - Options: `"div"`, `"section"`, `"article"`, `"aside"`, `"main"`, `"header"`, `"footer"`
  - Each option has semantic meaning for SEO and accessibility
- **style**: Object containing CSS styles (optional)
- **children**: Array of child components to render inside the container (required)
  - Can include any component type: text, button, image, other containers, etc.

#### Semantic Variants Explained

The `variant` property controls the HTML element used to render the container, which has implications for both SEO and accessibility:

- **div**: Generic container with no semantic meaning (default)
- **section**: Represents a standalone section of content (use for major page sections)
- **article**: Represents independent, self-contained content (blog posts, comments, etc.)
- **aside**: Represents content tangentially related to surrounding content (sidebars, callouts)
- **main**: Represents the main content of the page (should be used only once per page)
- **header**: Represents introductory content or navigational aids (page headers)
- **footer**: Represents footer content (author information, copyright, related links)

#### Common Use Cases

##### Page Section
```json
{
  "type": "container",
  "id": "features-section",
  "variant": "section",
  "style": {
    "padding": "4rem 2rem",
    "backgroundColor": "hsl(var(--muted))",
    "borderRadius": "12px",
    "marginBottom": "3rem"
  },
  "children": [
    {
      "type": "text",
      "id": "features-heading",
      "content": "Our Features",
      "variant": "h2",
      "style": {
        "textAlign": "center",
        "marginBottom": "2rem"
      }
    },
    {
      "type": "grid",
      "id": "features-grid",
      "children": [
        /* Feature cards as children */
      ]
    }
  ]
}
```

##### Card Component
```json
{
  "type": "container",
  "id": "pricing-card",
  "variant": "div",
  "style": {
    "padding": "2rem",
    "backgroundColor": "white",
    "borderRadius": "8px",
    "boxShadow": "0 4px 12px rgba(0,0,0,0.1)",
    "display": "flex",
    "flexDirection": "column",
    "gap": "1rem"
  },
  "children": [
    {
      "type": "text",
      "id": "card-title",
      "content": "Basic Plan",
      "variant": "h3"
    },
    {
      "type": "text",
      "id": "card-price",
      "content": "$19/month",
      "variant": "p",
      "style": {
        "fontSize": "1.5rem",
        "fontWeight": "bold"
      }
    },
    {
      "type": "button",
      "id": "card-button",
      "content": "Get Started",
      "variant": "default"
    }
  ]
}
```

##### Hero Section
```json
{
  "type": "container",
  "id": "hero-section",
  "variant": "section",
  "style": {
    "display": "flex",
    "flexDirection": "column",
    "alignItems": "center",
    "justifyContent": "center",
    "minHeight": "80vh",
    "padding": "2rem",
    "textAlign": "center",
    "backgroundImage": "linear-gradient(135deg, hsl(var(--primary) / 0.2) 0%, hsl(var(--secondary) / 0.2) 100%)"
  },
  "children": [
    {
      "type": "text",
      "id": "hero-title",
      "content": "Welcome to Our Platform",
      "variant": "h1",
      "style": {
        "fontSize": "3.5rem",
        "fontWeight": "bold",
        "marginBottom": "1.5rem"
      }
    },
    {
      "type": "text",
      "id": "hero-subtitle",
      "content": "The easiest way to build your online presence",
      "variant": "p",
      "style": {
        "fontSize": "1.25rem",
        "marginBottom": "2rem",
        "maxWidth": "600px"
      }
    },
    {
      "type": "button",
      "id": "hero-cta",
      "content": "Get Started",
      "variant": "default",
      "size": "lg",
      "href": "#signup-section"
    }
  ]
}
```

### Grid Component

The Grid component creates sophisticated grid-based layouts with intelligent defaults for responsive design. It's perfect for creating multi-column structures like image galleries, feature lists, or card layouts.

#### Basic Structure

```json
{
  "type": "grid",
  "id": "unique-grid-id",
  "style": {
    "gridTemplateColumns": "repeat(3, 1fr)",
    "gap": "2rem"
  },
  "children": [
    { /* grid item 1 */ },
    { /* grid item 2 */ },
    { /* grid item 3 */ },
    { /* grid item 4 */ },
    { /* grid item 5 */ },
    { /* grid item 6 */ }
  ]
}
```

#### Properties in Detail

- **type**: Must be `"grid"` (required)
- **id**: A unique identifier for this grid component (required)
- **style**: Object containing CSS styles (optional)
  - Special grid-specific properties:
    - `gridTemplateColumns`: Defines the grid columns
    - `gridTemplateRows`: Defines the grid rows
    - `gap`: Spacing between grid items
- **children**: Array of child components to render as grid items (required)

#### Intelligent Defaults

The Grid component has smart defaults that make it immediately useful without extensive configuration:

- **Default display**: Automatically sets `display: grid` if not specified
- **Default columns**: Uses `repeat(auto-fit, minmax(250px, 1fr))` if not specified
  - This creates a responsive grid that automatically adjusts the number of columns based on available space
  - Each column will be at least 250px wide, then distribute remaining space evenly
- **Default gap**: Sets `1rem` spacing between items if not specified

These defaults make the Grid component particularly good for responsive layouts with minimal configuration.

#### Common Use Cases

##### Image Gallery
```json
{
  "type": "grid",
  "id": "photo-gallery",
  "style": {
    "gridTemplateColumns": "repeat(auto-fill, minmax(250px, 1fr))",
    "gap": "1rem",
    "marginTop": "2rem"
  },
  "children": [
    {
      "type": "image",
      "id": "gallery-image-1",
      "src": "/images/photo1.jpg",
      "alt": "Description 1",
      "style": {
        "borderRadius": "8px"
      }
    },
    {
      "type": "image",
      "id": "gallery-image-2",
      "src": "/images/photo2.jpg",
      "alt": "Description 2",
      "style": {
        "borderRadius": "8px"
      }
    },
    /* Additional images... */
  ]
}
```

##### Feature Cards Grid
```json
{
  "type": "grid",
  "id": "features-grid",
  "style": {
    "gridTemplateColumns": "repeat(auto-fit, minmax(300px, 1fr))",
    "gap": "2rem",
    "margin": "3rem 0"
  },
  "children": [
    {
      "type": "container",
      "id": "feature-1",
      "style": {
        "padding": "1.5rem",
        "backgroundColor": "white",
        "borderRadius": "8px",
        "boxShadow": "0 2px 8px rgba(0,0,0,0.1)"
      },
      "children": [
        {
          "type": "text",
          "id": "feature-1-title",
          "content": "Easy to Use",
          "variant": "h3"
        },
        {
          "type": "text",
          "id": "feature-1-desc",
          "content": "Intuitive interface that anyone can understand",
          "variant": "p"
        }
      ]
    },
    /* Additional feature cards... */
  ]
}
```

##### Asymmetric Layout with Grid Areas
```json
{
  "type": "grid",
  "id": "dashboard-layout",
  "style": {
    "display": "grid",
    "gridTemplateColumns": "1fr 2fr 1fr",
    "gridTemplateRows": "auto auto",
    "gridTemplateAreas": "'sidebar main aside' 'footer footer footer'",
    "gap": "1rem",
    "minHeight": "80vh"
  },
  "children": [
    {
      "type": "container",
      "id": "sidebar-section",
      "style": {
        "gridArea": "sidebar",
        "padding": "1rem",
        "backgroundColor": "hsl(var(--muted))"
      },
      "children": [/* Sidebar components */]
    },
    {
      "type": "container",
      "id": "main-content",
      "style": {
        "gridArea": "main",
        "padding": "2rem",
        "backgroundColor": "white"
      },
      "children": [/* Main content components */]
    },
    /* Additional grid areas... */
  ]
}
```

### Carousel Component

The Carousel component creates interactive slideshows of content, allowing you to display multiple components in a space-efficient way. Users can navigate through carousel items using navigation controls.

#### Basic Structure

```json
{
  "type": "carousel",
  "id": "unique-carousel-id",
  "style": {
    "maxWidth": "800px",
    "margin": "0 auto"
  },
  "items": [
    { /* carousel item 1 */ },
    { /* carousel item 2 */ },
    { /* carousel item 3 */ }
  ],
  "showControls": true,
  "autoPlay": false,
  "interval": 5000,
  "orientation": "horizontal",
  "showDots": true
}
```

#### Properties in Detail

- **type**: Must be `"carousel"` (required)
- **id**: A unique identifier for this carousel component (required)
- **style**: Object containing CSS styles (optional)
- **items**: Array of components to display as carousel slides (required)
- **showControls**: Whether to show next/previous buttons (optional, defaults to `true`)
- **autoPlay**: Whether the carousel should automatically cycle through slides (optional, defaults to `false`)
- **interval**: Time in milliseconds between slides when autoPlay is enabled (optional, defaults to `5000` - 5 seconds)
- **orientation**: Direction of the carousel (optional, defaults to `"horizontal"`)
  - Options: `"horizontal"` or `"vertical"`
- **showDots**: Whether to show dot indicators for slides (optional, defaults to `false`)

#### Common Use Cases

##### Testimonial Carousel
```json
{
  "type": "carousel",
  "id": "testimonials-carousel",
  "style": {
    "maxWidth": "800px",
    "margin": "3rem auto"
  },
  "items": [
    {
      "type": "container",
      "id": "testimonial-1",
      "style": {
        "padding": "2rem",
        "backgroundColor": "white",
        "borderRadius": "8px",
        "boxShadow": "0 4px 12px rgba(0,0,0,0.1)",
        "textAlign": "center"
      },
      "children": [
        {
          "type": "text",
          "id": "testimonial-1-quote",
          "content": "This product has completely transformed our workflow. We're now 50% more efficient!",
          "variant": "blockquote",
          "style": {
            "fontSize": "1.25rem",
            "fontStyle": "italic",
            "marginBottom": "1rem"
          }
        },
        {
          "type": "text",
          "id": "testimonial-1-author",
          "content": "Jane Smith, CEO at TechCorp",
          "variant": "p",
          "style": {
            "fontWeight": "bold"
          }
        }
      ]
    },
    /* Additional testimonials... */
  ],
  "showControls": true,
  "autoPlay": true,
  "interval": 8000,
  "showDots": true
}
```

##### Image Slideshow
```json
{
  "type": "carousel",
  "id": "project-showcase",
  "style": {
    "width": "100%",
    "maxWidth": "1200px",
    "height": "500px",
    "margin": "2rem auto",
    "borderRadius": "12px",
    "overflow": "hidden"
  },
  "items": [
    {
      "type": "image",
      "id": "project-image-1",
      "src": "/images/project1.jpg",
      "alt": "Project 1 showcase",
      "style": {
        "width": "100%",
        "height": "500px",
        "objectFit": "cover"
      }
    },
    {
      "type": "image",
      "id": "project-image-2",
      "src": "/images/project2.jpg",
      "alt": "Project 2 showcase",
      "style": {
        "width": "100%",
        "height": "500px",
        "objectFit": "cover"
      }
    },
    /* Additional images... */
  ],
  "autoPlay": true,
  "interval": 5000,
  "showDots": true
}
```

##### Product Feature Carousel
```json
{
  "type": "carousel",
  "id": "product-features",
  "style": {
    "maxWidth": "1000px",
    "margin": "3rem auto",
    "padding": "2rem 0"
  },
  "items": [
    {
      "type": "container",
      "id": "feature-slide-1",
      "style": {
        "display": "flex",
        "flexDirection": "row",
        "alignItems": "center",
        "gap": "2rem",
        "padding": "1rem"
      },
      "children": [
        {
          "type": "image",
          "id": "feature-1-image",
          "src": "/images/feature1.jpg",
          "alt": "Feature 1",
          "width": 400,
          "height": 300
        },
        {
          "type": "container",
          "id": "feature-1-content",
          "children": [
            {
              "type": "text",
              "id": "feature-1-title",
              "content": "Intuitive Dashboard",
              "variant": "h3",
              "style": {
                "marginBottom": "1rem"
              }
            },
            {
              "type": "text",
              "id": "feature-1-desc",
              "content": "Our easy-to-use dashboard gives you instant insights into your metrics.",
              "variant": "p"
            }
          ]
        }
      ]
    },
    /* Additional feature slides... */
  ],
  "showControls": true,
  "showDots": true
}
```

#### Carousel Best Practices

1. **Limit the number of slides**: Keep your carousel to a reasonable number of items (3-7) to avoid overwhelming users
2. **Include clear navigation**: Enable controls and dots to help users browse through slides
3. **Use appropriate timing**: If using autoPlay, set the interval long enough for users to read content (5-8 seconds)
4. **Maintain consistent heights**: Try to keep slide content at similar heights to prevent layout shifts
5. **Add visual indicators**: Include dot indicators (showDots: true) to give users a sense of how many slides there are

## Spacer and Divider Components in JSON Website Builder

### Spacer Component

The Spacer component creates vertical space between other components. It's a simple yet essential tool for controlling layout spacing without adding visible content.

#### Basic Structure

```json
{
  "type": "spacer",
  "id": "unique-spacer-id",
  "height": "2rem",
  "style": {
    "backgroundColor": "transparent"
  }
}
```

#### Properties in Detail

- **type**: Must be `"spacer"` (required)
- **id**: A unique identifier for this spacer component (required)
- **height**: The vertical space to create (optional, defaults to `"1rem"`)
  - Can be any valid CSS unit: `"rem"`, `"px"`, `"vh"`, `"%"`, etc.
  - Examples: `"2rem"`, `"50px"`, `"5vh"`
- **style**: Object containing CSS styles (optional)
  - Note: Most style properties don't affect a spacer's appearance since it's an empty element

#### How Spacers Work

Spacers create invisible space that pushes other components apart. They're implemented as empty `<div>` elements with the specified height and are marked as `aria-hidden="true"` to be ignored by screen readers (since they're purely visual elements).

#### Common Use Cases

##### Standard Vertical Spacing
```json
{
  "type": "spacer",
  "id": "standard-space",
  "height": "2rem"
}
```

##### Large Section Separator
```json
{
  "type": "spacer",
  "id": "section-separator",
  "height": "5rem"
}
```

##### Subtle Spacing Adjustment
```json
{
  "type": "spacer",
  "id": "small-adjustment",
  "height": "0.5rem"
}
```

##### Responsive Spacing
```json
{
  "type": "spacer",
  "id": "responsive-space",
  "height": "10vh"
}
```

##### Colored Section Break
```json
{
  "type": "spacer",
  "id": "colored-break",
  "height": "1px",
  "style": {
    "backgroundColor": "hsl(var(--border))",
    "margin": "3rem 0"
  }
}
```

### Divider Component

The Divider component creates a horizontal or vertical line to visually separate content sections. It's useful for creating clear visual boundaries between different parts of your page.

#### Basic Structure

```json
{
  "type": "divider",
  "id": "unique-divider-id",
  "orientation": "horizontal",
  "style": {
    "backgroundColor": "hsl(var(--muted))",
    "height": "2px"
  }
}
```

#### Properties in Detail

- **type**: Must be `"divider"` (required)
- **id**: A unique identifier for this divider component (required)
- **orientation**: The direction of the divider (optional, defaults to `"horizontal"`)
  - `"horizontal"`: Creates a line that spans horizontally across the container
  - `"vertical"`: Creates a line that spans vertically within the container
- **style**: Object containing CSS styles (optional)
  - Commonly customized properties:
    - `backgroundColor`: Changes the divider color
    - `height` or `width`: Changes the thickness (depending on orientation)
    - `margin`: Adjusts spacing around the divider
    - `opacity`: Makes the divider more subtle

#### Divider Features

The Divider component has some built-in features:
- Automatically adds margin above and below (my-4 class, which is 1rem vertical margin)
- Uses the UI design system's Separator component, ensuring it matches your site's visual style
- Can be styled to match your design system

#### Common Use Cases

##### Standard Horizontal Divider
```json
{
  "type": "divider",
  "id": "standard-divider",
  "orientation": "horizontal"
}
```

##### Subtle Content Separator
```json
{
  "type": "divider",
  "id": "subtle-divider",
  "orientation": "horizontal",
  "style": {
    "opacity": "0.3",
    "margin": "2rem 0"
  }
}
```

##### Colored Divider
```json
{
  "type": "divider",
  "id": "primary-divider",
  "orientation": "horizontal",
  "style": {
    "backgroundColor": "hsl(var(--primary))",
    "height": "3px",
    "width": "50%",
    "margin": "2rem auto"
  }
}
```

##### Vertical Section Divider
```json
{
  "type": "divider",
  "id": "vertical-divider",
  "orientation": "vertical",
  "style": {
    "height": "100px"
  }
}
```

##### Decorative Divider
```json
{
  "type": "container",
  "id": "decorative-divider-container",
  "style": {
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "center",
    "margin": "3rem 0"
  },
  "children": [
    {
      "type": "divider",
      "id": "left-divider",
      "orientation": "horizontal",
      "style": {
        "width": "30%"
      }
    },
    {
      "type": "text",
      "id": "divider-text",
      "content": "✦",
      "variant": "span",
      "style": {
        "margin": "0 1rem",
        "color": "hsl(var(--primary))"
      }
    },
    {
      "type": "divider",
      "id": "right-divider",
      "orientation": "horizontal",
      "style": {
        "width": "30%"
      }
    }
  ]
}
```

## Using Spacers and Dividers Together

Spacers and dividers are often used together to create well-structured layouts with clear visual hierarchy:

```json
{
  "components": [
    {
      "type": "text",
      "id": "section-1-title",
      "content": "First Section",
      "variant": "h2"
    },
    {
      "type": "text",
      "id": "section-1-content",
      "content": "Content for the first section goes here.",
      "variant": "p"
    },
    
    {
      "type": "spacer",
      "id": "space-before-divider",
      "height": "2rem"
    },
    {
      "type": "divider",
      "id": "section-divider",
      "orientation": "horizontal"
    },
    {
      "type": "spacer",
      "id": "space-after-divider",
      "height": "2rem"
    },
    
    {
      "type": "text",
      "id": "section-2-title",
      "content": "Second Section",
      "variant": "h2"
    },
    {
      "type": "text",
      "id": "section-2-content",
      "content": "Content for the second section goes here.",
      "variant": "p"
    }
  ]
}
```

## Best Practices

1. **Use spacers for consistent spacing**: Rather than adding margins to many different components, use spacers to maintain consistent spacing throughout your design.

2. **Keep dividers subtle**: In most modern designs, dividers work best when they're subtle. Consider using lower opacity or lighter colors.

3. **Use semantic structure first**: While dividers provide visual separation, it's often better to use semantic structure (like container components with appropriate variants) for major section breaks.

4. **Consider responsive spacing**: Remember that fixed pixel heights for spacers might not work well on all screen sizes. Consider using relative units like `rem` or viewport-based units like `vh`.

5. **Combine with container padding**: Rather than adding many spacers, consider using padding within container components for internal spacing.

## Conclusion: Building Powerful Websites with JSON Website Builder

You now have a comprehensive understanding of the JSON Website Builder's component system. With these building blocks, you can create sophisticated, professional websites by composing and configuring JSON objects—no coding required.

The system's true power lies in its composability. By combining container components with grids, text, buttons, images, and other components, you can create virtually any layout imaginable. The intelligent styling system gives you precise control over appearance while maintaining consistency with the design system.

Remember that the best websites start with good planning. Consider the structure of your content first, then choose the appropriate components to bring your vision to life. Experiment with different configurations to discover new possibilities, and leverage the built-in responsiveness to ensure your site looks great on all devices.

Whether you're building a simple personal site, a professional portfolio, or a full business website, the JSON Website Builder provides all the tools you need to succeed. Now it's time to start creating!