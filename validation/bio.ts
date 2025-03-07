import { visibility_type } from '@prisma/client';
import { TypeOf, literal, nativeEnum, object, string } from 'zod';

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
  description: string().optional(),
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
  profile_image_url: string().url().optional().or(literal('')),
  theme_config: object({
    name: string(),
    colors: object({
      primary: string(),
      text: string(),
      background: string(),
    }),
  }),
  seo_title: string().optional(),
  seo_description: string().optional(),
  social_image_url: string().url().optional().or(literal('')),
});

export type CreateBioInput = TypeOf<typeof createBioSchema>;
export type EditBioInput = TypeOf<typeof editBioPageSchema>;
