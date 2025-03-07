import { api } from '@/config/axios.config';
import { CreateBioInput, EditBioInput } from '@/validation/bio';
import { BioPages } from '@prisma/client';

/**
 * Gets a bio page by ID
 * @param id - The ID of the bio page to get
 * @returns The bio page
 * @throws {Error} If there is a problem getting the bio page
 */
export const getBio = async (id: string) => {
  const response = await api.get<BioPages>(`/bio/${id}`);
  return response.data;
};

/**
 * Gets all bio pages
 * @returns An array of bio pages
 * @throws {Error} If there is a problem getting the bio pages
 */
export const getBios = async () => {
  const response = await api.get<BioPages[]>(`/bio`);
  return response.data;
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
    const response = await api.post<CreateBioInput>('/bio', data);
    return response.data;
  } catch (error: any) {
    console.error(error.response);
    return error.response.data;
  }
};

/**
 * Updates a bio page with the given id
 * @param id - The id of the bio page to update
 * @param data - The data to update the bio page with
 * @returns The updated bio page
 */
export const updateBio = async (
  id: string,
  data: Partial<Omit<EditBioInput, 'id' | 'createdAt' | 'updatedAt'>>,
) => {
  const response = await api.patch<EditBioInput>(`/bio/${id}`, data);
  return response.data;
};

/**
 * Deletes a bio page with the given id
 * @param id - The id of the bio page to delete
 * @returns The deleted bio page
 */
export const deleteBio = async (id: string) => {
  const response = await api.delete(`/bio/${id}`);
  return response.data;
};
