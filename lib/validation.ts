import { z } from 'zod';

// Accepts either an absolute URL (e.g. a Cloudinary upload) or a root-relative
// local path (e.g. the static "/images/img/is1.jpg" assets used by legacy
// migrated catalog data) — both are valid, renderable image sources in this app.
const imagePathSchema = z.string().refine(
  (value) => /^https?:\/\//.test(value) || value.startsWith('/'),
  { message: 'Must be an absolute URL or a path starting with /' },
);

export const artworkSchema = z.object({
  name: z.string().min(2).max(180),
  nameEn: z.string().max(180).optional().or(z.literal('')),
  slug: z.string().min(2).max(180).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().min(10).max(5000),
  descriptionEn: z.string().max(5000).optional().or(z.literal('')),
  shortDescription: z.string().max(250).optional().or(z.literal('')),
  shortDescriptionEn: z.string().max(250).optional().or(z.literal('')),
  images: z.array(imagePathSchema).min(1),
  category: z.string().min(1).max(80),
  price: z.string().max(50).optional().or(z.literal('')),
  priceLabel: z.string().max(80).optional().or(z.literal('')),
  materials: z.array(z.string().min(1).max(80)).optional().default([]),
  colors: z.array(z.string().min(1).max(40)).optional().default([]),
  tags: z.array(z.string().min(1).max(40)).optional().default([]),
  features: z.array(z.string().min(1).max(160)).optional().default([]),
  featured: z.boolean().optional().default(false),
  isNewArrival: z.boolean().optional().default(false),
  isSeasonal: z.boolean().optional().default(false),
  availability: z
    .enum(['available', 'made-to-order', 'limited', 'sold-out'])
    .optional()
    .default('available'),
  status: z.enum(['draft', 'published']).optional().default('published'),
  displayOrder: z.number().int().min(0).max(1000).optional().default(0),
});

export const categorySchema = z.object({
  name: z.string().min(2).max(80),
  nameEn: z.string().max(80).optional().or(z.literal('')),
  slug: z.string().min(2).max(80).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().max(500).optional().or(z.literal('')),
  descriptionEn: z.string().max(500).optional().or(z.literal('')),
  image: imagePathSchema.optional().or(z.literal('')),
  displayOrder: z.number().int().min(0).max(1000).optional().default(0),
  isActive: z.boolean().optional().default(true),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(200),
});
