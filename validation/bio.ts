import { visibility_type } from '@prisma/client';
import { TypeOf, array, nativeEnum, object, string, z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export const createBioSchema = object({
  username: string()
    .min(1, 'username is required')
    .refine((value) => /^[a-z0-9-]+$/.test(value), {
      message:
        'Username can only contain lowercase letters, numbers, and hyphens',
    }),
  title: string().max(12, 'title can only contain maximum 12 characters'),
});

export const editBioPageSchema = object({
  title: string().min(1, 'Title is required'),
  username: string()
    .min(1, 'Username is required')
    .regex(
      /^[a-z0-9-]+$/,
      'Username can only contain lowercase letters, numbers, and hyphens',
    ),
  description: string(),
  visibility: nativeEnum(visibility_type)
    .refine(
      (value) =>
        [
          visibility_type.public,
          visibility_type.private,
          visibility_type.team,
        ].includes(value),
      {
        message: 'Visibility must be either "public" or "private"',
      },
    )
    .default(visibility_type.public),
  profile_image_url: z
    .union([
      z
        .string()
        .url('Please enter a valid image URL, e.g. https://image.example.com')
        .optional(),
      z
        .instanceof(File)
        .refine((file) => file.size <= MAX_FILE_SIZE, 'Max file size is 5MB')
        .refine(
          (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
          'Only .jpg, .jpeg, .png and .webp formats are supported',
        )
        .optional(),
    ])
    .optional(),

  theme_config: object({
    name: string(),
    colors: object({
      primary: string(),
      text: string(),
      background: string(),
      darkPrimary: string(),
      darkText: string(),
      darkBackground: string(),
    }),
  }).optional(),
  seo_title: string().optional(),
  seo_description: string().optional(),
  social_image_url: z
    .union([
      z
        .string()
        .url({ message: 'Please enter a valid URL, e.g. https://example.com' })
        .optional(),
      z
        .instanceof(File)
        .refine((file) => file.size <= MAX_FILE_SIZE, 'Max file size is 5MB')
        .refine(
          (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
          'Only .jpg, .jpeg, .png and .webp formats are supported',
        )
        .optional(),
    ])
    .optional(),
  social_links: array(
    object({
      id: string().optional(),
      platform: string().optional(),
      url: string()
        .url({ message: 'Please enter a valid URL, e.g. https://example.com' })
        .optional(),
    }),
  ).optional(),
  bio_links: array(
    object({
      id: string().optional(),
      title: string().optional(),
      url: string()
        .url({ message: 'Please enter a valid URL, e.g. https://example.com' })
        .optional(),
    }),
  ).optional(),
});

export type CreateBioInput = TypeOf<typeof createBioSchema>;
export type EditBioInput = TypeOf<typeof editBioPageSchema>;
