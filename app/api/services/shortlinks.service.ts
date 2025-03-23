import { API_BASE_URL } from '@/lib/constants';
import { CreateShortlinkInput } from '@/validation/link';

export async function createShortlink(
  params: CreateShortlinkInput,
): Promise<{ detail: string; code?: string }> {
  const { original_url, title, page_type, type } = params;

  try {
    const res = await fetch(`${API_BASE_URL}/links`, {
      method: 'POST',
      body: JSON.stringify({
        original_url,
        title,
        page_type,
        type: type || 'shortlink',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.detail || 'Failed to create shortlink. Please try again.',
      );
    }

    const data = await res.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Failed to create shortlink. Please try again.');
  }
}
