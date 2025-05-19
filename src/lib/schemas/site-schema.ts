import { z } from 'zod';

// Basic style properties
export const styleSchema = z.object({
  backgroundColor: z.string().optional(),
  color: z.string().optional(),
  fontSize: z.string().optional(),
  fontWeight: z.string().optional(),
  fontFamily: z.string().optional(),
  padding: z.string().optional(),
  margin: z.string().optional(),
  marginTop: z.string().optional(),
  marginRight: z.string().optional(),
  marginBottom: z.string().optional(),
  marginLeft: z.string().optional(),
  width: z.string().optional(),
  height: z.string().optional(),
  borderRadius: z.string().optional(),
  border: z.string().optional(),
  boxShadow: z.string().optional(),
  textAlign: z.string().optional(),
  display: z.string().optional(),
  flexDirection: z.string().optional(),
  alignItems: z.string().optional(),
  justifyContent: z.string().optional(),
  gap: z.string().optional(),
  position: z.string().optional(),
  top: z.string().optional(),
  right: z.string().optional(),
  bottom: z.string().optional(),
  left: z.string().optional(),
  zIndex: z.string().optional(),
  opacity: z.string().optional(),
  transform: z.string().optional(),
  transition: z.string().optional(),
  objectFit: z.string().optional(),
  objectPosition: z.string().optional(),
  gridTemplateColumns: z.string().optional(),
  gridTemplateRows: z.string().optional(),
  gridColumn: z.string().optional(),
  gridRow: z.string().optional(),
  overflow: z.string().optional(),
  maxWidth: z.string().optional(),
  maxHeight: z.string().optional(),
  minWidth: z.string().optional(),
  minHeight: z.string().optional(),
  className: z.string().optional(), // Added className for tailwind classes
});

// Text component
export const textComponentSchema = z.object({
  type: z.literal('text'),
  id: z.string(),
  content: z.union([
    z.string(),
    z.array(z.object({
      type: z.enum(['text', 'link', 'bold', 'italic', 'highlight', 'code']),
      text: z.string(),
      href: z.string().optional(),
      target: z.enum(['_self', '_blank', '_parent', '_top']).optional().default('_self'),
      color: z.string().optional(),
      style: styleSchema.optional(),
    }))
  ]),
  variant: z.enum(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'blockquote']).optional().default('p'),
  style: styleSchema.optional(),
  href: z.string().optional(),
  target: z.enum(['_self', '_blank', '_parent', '_top']).optional().default('_self'),
  scroll: z.boolean().optional().default(false),
  allowHtml: z.boolean().optional().default(false),
});

// Button component
export const buttonComponentSchema = z.object({
  type: z.literal('button'),
  id: z.string(),
  content: z.string(),
  variant: z.enum(['default', 'destructive', 'outline', 'secondary', 'ghost', 'link']).optional().default('default'),
  size: z.enum(['default', 'sm', 'lg', 'icon']).optional().default('default'),
  href: z.string().optional(),
  style: styleSchema.optional(),
  onClick: z.enum(['navigate', 'scroll', 'modal']).optional(),
  target: z.string().optional(), // For navigation or modal targets
});

// Image component
export const imageComponentSchema = z.object({
  type: z.literal('image'),
  id: z.string(),
  src: z.string(),
  alt: z.string(),
  width: z.union([z.string(), z.number()]).optional(),
  height: z.union([z.string(), z.number()]).optional(),
  style: styleSchema.optional(),
  caption: z.string().optional(),
});

// Video component
export const videoComponentSchema = z.object({
  type: z.literal('video'),
  id: z.string(),
  src: z.string(),
  width: z.union([z.string(), z.number()]).optional(),
  height: z.union([z.string(), z.number()]).optional(),
  autoPlay: z.boolean().optional().default(false),
  controls: z.boolean().optional().default(true),
  loop: z.boolean().optional().default(false),
  muted: z.boolean().optional().default(false),
  style: styleSchema.optional(),
  caption: z.string().optional(),
});

// PDF viewer component
export const pdfComponentSchema = z.object({
  type: z.literal('pdf'),
  id: z.string(),
  src: z.string(),
  width: z.number().optional(),
  height: z.number().optional(),
  style: styleSchema.optional(),
  showControls: z.boolean().optional().default(true),
});

// Audio component
export const audioComponentSchema = z.object({
  type: z.literal('audio'),
  id: z.string(),
  src: z.string(),
  autoPlay: z.boolean().optional().default(false),
  controls: z.boolean().optional().default(true),
  loop: z.boolean().optional().default(false),
  muted: z.boolean().optional().default(false),
  style: styleSchema.optional(),
  caption: z.string().optional(),
});

// Container component (for grouping other components)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const containerComponentSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    type: z.literal('container'),
    id: z.string(),
    variant: z.enum(['div', 'section', 'article', 'aside', 'main', 'header', 'footer']).optional().default('div'),
    style: styleSchema.optional(),
    children: z.array(componentSchema),
  })
);

// Grid component
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const gridComponentSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    type: z.literal('grid'),
    id: z.string(),
    style: styleSchema.optional(),
    children: z.array(componentSchema),
  })
);

// Spacer component
export const spacerComponentSchema = z.object({
  type: z.literal('spacer'),
  id: z.string(),
  height: z.string(),
  style: styleSchema.optional(),
});

// Divider component
export const dividerComponentSchema = z.object({
  type: z.literal('divider'),
  id: z.string(),
  orientation: z.enum(['horizontal', 'vertical']).optional().default('horizontal'),
  style: styleSchema.optional(),
});

// Carousel component
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const carouselComponentSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    type: z.literal('carousel'),
    id: z.string(),
    style: styleSchema.optional(),
    items: z.array(componentSchema),
    showControls: z.boolean().optional().default(true),
    autoPlay: z.boolean().optional().default(false),
    interval: z.number().optional().default(5000),
    orientation: z.enum(['horizontal', 'vertical']).optional().default('horizontal'),
    showDots: z.boolean().optional().default(false),
  })
);

// FlipCard component
export const flipCardComponentSchema = z.object({
  type: z.literal('flipCard'),
  id: z.string(),
  frontImage: z.object({
    src: z.string(),
    alt: z.string(),
  }),
  backContent: z.string(),
  width: z.union([z.string(), z.number()]).optional(),
  height: z.union([z.string(), z.number()]).optional(),
  style: styleSchema.optional(),
  frontStyle: styleSchema.optional(),
  backStyle: styleSchema.optional(),
  flipTrigger: z.enum(['hover', 'click']).optional().default('hover'),
});

// Define all possible component types
export const componentSchema = z.union([
  textComponentSchema,
  buttonComponentSchema,
  imageComponentSchema,
  videoComponentSchema,
  pdfComponentSchema,
  containerComponentSchema,
  gridComponentSchema,
  spacerComponentSchema,
  dividerComponentSchema,
  carouselComponentSchema,
  flipCardComponentSchema,
  audioComponentSchema,
]);

// Navigation link schema
export const navLinkSchema = z.object({
  label: z.string(),
  path: z.string(),
  external: z.boolean().optional().default(false),
});

// Navigation schema
export const navigationSchema = z.object({
  links: z.array(navLinkSchema),
  type: z.enum(['horizontal', 'vertical', 'dropdown']).optional().default('horizontal'),
  logo: z.object({
    src: z.string().optional(),
    alt: z.string().optional(),
    width: z.number().optional(),
    height: z.number().optional(),
  }).optional(),
  position: z.enum(['fixed', 'sticky', 'static']).optional().default('static'),
  style: styleSchema.optional(),
  linksPosition: z.enum(['left', 'right']).optional().default('left'),
  themeToggle: z.object({
    show: z.boolean().optional().default(true),
    position: z.enum(['left', 'right']).optional().default('right'),
  }).optional().default({ show: true, position: 'right' }),
});

// Page schema
export const pageSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string().optional(),
  components: z.array(componentSchema).optional(),
  style: styleSchema.optional(),
  meta: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    keywords: z.array(z.string()).optional(),
    ogImage: z.string().optional(),
  }).optional(),
});

// Site schema
export const siteSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  navigation: navigationSchema,
  defaultTheme: z.enum(['light', 'dark', 'system']).optional().default('system'),
  pages: z.array(pageSchema),
  style: styleSchema.optional(),
  favicon: z.string().optional(),
  footer: z.object({
    components: z.array(componentSchema).optional(),
    style: styleSchema.optional(),
  }).optional(),
  meta: z.object({
    author: z.string().optional(),
    keywords: z.array(z.string()).optional(),
    ogImage: z.string().optional(),
    themeColor: z.string().optional(),
  }).optional(),
});

// Export types derived from schemas
export type Style = z.infer<typeof styleSchema>;
export type TextComponent = z.infer<typeof textComponentSchema>;
export type ButtonComponent = z.infer<typeof buttonComponentSchema>;
export type ImageComponent = z.infer<typeof imageComponentSchema>;
export type VideoComponent = z.infer<typeof videoComponentSchema>;
export type PdfComponent = z.infer<typeof pdfComponentSchema>;
export type ContainerComponent = z.infer<typeof containerComponentSchema>;
export type GridComponent = z.infer<typeof gridComponentSchema>;
export type SpacerComponent = z.infer<typeof spacerComponentSchema>;
export type DividerComponent = z.infer<typeof dividerComponentSchema>;
export type CarouselComponent = z.infer<typeof carouselComponentSchema>;
export type FlipCardComponent = z.infer<typeof flipCardComponentSchema>;
export type AudioComponent = z.infer<typeof audioComponentSchema>;
export type Component = z.infer<typeof componentSchema>;
export type NavLink = z.infer<typeof navLinkSchema>;
export type Navigation = z.infer<typeof navigationSchema>;
export type Page = z.infer<typeof pageSchema>;
export type Site = z.infer<typeof siteSchema>;
