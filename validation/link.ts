import { boolean, object, string, TypeOf } from 'zod';

export const createShortlinkSchema = object({
  original_url: string().url({
    message: 'Please enter a valid URL, e.g. https://example.com',
  }),
  title: string()
    .max(12, 'title can only contain maximum 12 characters')
    .optional(),
  page_type: string()
    .refine((val: string) => ['tinder', 'vsco'].includes(val), {
      message: 'Page type must be either "tinder" or "vsco"',
    })
    .optional(),
});

// Schema untuk update shortlink
export const updateShortlinkSchema = object({
  original_url: string()
    .url({
      message: 'Please enter a valid URL, e.g. https://example.com',
    })
    .optional(),
  title: string()
    .max(12, 'title can only contain maximum 12 characters')
    .optional(),
  is_active: boolean().optional(),
  page_type: string()
    .refine((val: string) => ['tinder', 'vsco'].includes(val), {
      message: 'Page type must be either "tinder" or "vsco"',
    })
    .optional(),
});

// Schema untuk bulk shortlinks
export const bulkShortlinkSchema = object({
  original_urls: string()
    .min(1, 'Please enter at least one URL')
    .refine(
      (val: string) => {
        const urlLines = val
          .split('\n')
          .filter((line: string) => line.trim() !== '');
        return urlLines.every((url: string) =>
          /^https?:\/\/[^\s]+$/.test(url.trim()),
        );
      },
      { message: 'Please enter valid URLs, one per line' },
    ),
  page_type: string()
    .refine((val: string) => ['tinder', 'vsco'].includes(val), {
      message: 'Page type must be either "tinder" or "vsco"',
    })
    .optional(),
});

export type BulkShortlinkInput = TypeOf<typeof bulkShortlinkSchema>;

export type CreateShortlinkInput = TypeOf<typeof createShortlinkSchema>;

export type UpdateShortlinkInput = TypeOf<typeof updateShortlinkSchema>;
