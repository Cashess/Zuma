import { z } from 'zod'

export const productSchema = z.object({
  name: z.string(),
  description: z.string(),
  status: z.enum(['draft', 'published', 'archived']),
  priceStat: z.number().min(1),
  images: z.array(z.string()).min(1, 'At least one image is required'),
  category: z.enum(['kitchen', 'electronics', 'homeMadeCraft']),
  isFeatured: z.boolean().optional(),
})

export const bannerSchema = z.object({
  title: z.string(),
  imageString: z.string(),
})


export const shippingAddressSchema = z.object({
  id: z.string().uuid('Invalid ID format'), // Ensure the ID is a valid UUID
  line1: z.string().min(3, 'Address line 1 must be at least 3 characters'),
  line2: z.string().optional(), // Optional second line
  city: z.string().min(3, 'City must be at least 3 characters'),
  state: z.string().min(2, 'State must be at least 2 characters'), // Minimum length for state
  postal_code: z.string().min(3, 'Postal code must be at least 3 characters'),
  country: z.string().min(3, 'Country must be at least 3 characters'),
  userId: z.string().uuid('Invalid User ID format'), // Ensure the userId is a valid UUID
 
});