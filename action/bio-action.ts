'use server';

import { getCookie } from '@/action/action-utils';
import { api } from '@/config/axios.config';
import { CreateBioInput, EditBioInput } from '@/validation/bio';
import { BioPages } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { cloudinaryUpload } from '@/lib/cloudinary';
import { logError } from '@/lib/helper';

/**
 * Gets a bio page by ID
 * @param id - The ID of the bio page to get
 * @returns The bio page
 * @throws {Error} If there is a problem getting the bio page
 */
export const getBio = async (id: string) => {
  try {
    const cookie = await getCookie('next-auth.session-token');
    const response = await api.get<BioPages>(`/bio/${id}`, {
      headers: {
        Cookie: `next-auth.session-token=${cookie}`,
      },
    });
    return response.data;
  } catch (error: any) {
    logError('Error fetching bio page:', error.response.data);
    return error.response.data;
  }
};

/**
 * Gets all bio pages
 * @returns An array of bio pages
 * @throws {Error} If there is a problem getting the bio pages
 */
export const getBios = async () => {
  try {
    const cookie = await getCookie('next-auth.session-token');
    const response = await api.get<BioPages[]>(`/bio`, {
      headers: {
        Cookie: `next-auth.session-token=${cookie}`,
      },
    });
    return response.data;
  } catch (error: any) {
    logError('Error fetching all bio pages:', error.response.data);
    return error.response.data;
  }
};

// export const createBio = async (data: Omit<BioPages, 'id' | 'createdAt' | 'updatedAt'>) => {
//   const response = await api.post<BioPage>('/bio', data);
//   return response.data;
// };

/**
 * Creates a bio page with the given data
 * @param data - The data to create the bio page with
 * @returns The created bio page
 * @throws {Error} If there is a problem creating the bio page
 */
export const createBio = async (data: CreateBioInput) => {
  try {
    const cookie = await getCookie('next-auth.session-token');

    const response = await api.post<CreateBioInput>('/bio', data, {
      headers: {
        Cookie: `next-auth.session-token=${cookie}`,
      },
    });
    revalidatePath('/[lang]/bio-pages');
    return response.data;
  } catch (error: any) {
    logError('failed create bio', error.response.data);
    return error.response.data;
  }
};

/**
 * Updates a bio page with the given id
 * @param id - The id of the bio page to update
 * @param data - The data to update the bio page with
 * @returns The updated bio page
 */
export const updateBio = async (id: string, data: FormData) => {
  try {
    const bioData: any = {
      id: data.get('id'),
      title: data.get('title'),
      username: data.get('username'),
      description: data.get('description'),
      visibility: data.get('visibility'),
      theme_config: JSON.parse(data.get('theme_config') as string),
      social_links: JSON.parse(data.get('social_links') as string),
      bio_links: JSON.parse(data.get('bio_links') as string),
      seo_title: data.get('seo_title'),
      seo_description: data.get('seo_description'),
    };

    // Handle file uploads
    const profileImageFile = data.get('profile_image_url') as File;
    if (profileImageFile && profileImageFile.size > 0) {
      // convert to array buffer
      const arrayBuffer = await profileImageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // parameter for cloudinary assets
      const public_id = `profile-${bioData.username}`;
      const display_name = `${public_id}_bio_profile`;
      const profileImageUrl: any = await cloudinaryUpload(
        buffer,
        public_id,
        display_name,
        'profile',
      );

      bioData.profile_image_url = profileImageUrl.result.secure_url as string;
    } else {
      bioData.profile_image_url = data.get('profile_image_url') as string;
    }

    const socialImageFile = data.get('social_image_url') as File;
    if (socialImageFile && socialImageFile.size > 0) {
      const arrayBuffer = await socialImageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // parameter for cloudinary assets
      const public_id = `${bioData.username}-bio-pages`;
      const display_name = `${public_id}`;

      const socialImageUrl: any = await cloudinaryUpload(
        buffer,
        public_id,
        display_name,
        'social',
      );
      bioData.social_image_url = socialImageUrl.result.secure_url as string;
    } else if (data.get('social_image_url_string')) {
      bioData.social_image_url = data.get('social_image_url_string');
    }

    const cookie = await getCookie('next-auth.session-token');
    const response = await api.patch<EditBioInput>(`/bio/${id}`, bioData, {
      headers: {
        Cookie: `next-auth.session-token=${cookie}`,
      },
    });
    return response.data;
  } catch (error: any) {
    logError('Error updating bio page:', error.response.data);
    return error.response.data;
  }
};

/**
 * Deletes a bio page with the given id
 * @param id - The id of the bio page to delete
 * @returns The deleted bio page
 */
export const deleteBio = async (id: string) => {
  try {
    const cookie = await getCookie('next-auth.session-token');

    const response = await api.delete(`/bio/${id}`, {
      headers: {
        Cookie: `next-auth.session-token=${cookie}`,
      },
    });
    return response.data;
  } catch (error: any) {
    logError('Error deleting bio page:', error.response.data);
    return error.response.data;
  }
};
