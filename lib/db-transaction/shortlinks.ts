import { withRLS } from '@/lib/db';
import { logError } from '@/lib/helper';
import { generateShortCode, getCurrentEpoch } from '@/lib/utils';

async function createShortlinks(id: string, data: any) {
  try {
    // Generate a short code for the URL
    const shortCode = generateShortCode();

    // Get current timestamp
    const now = getCurrentEpoch();
    const dbRls = withRLS(id);
    const isLinkExists = await dbRls.links.findFirst({
      where: { short_code: data.short_code, user_id: id },
    });

    if (isLinkExists) {
      logError('Bio page already exists');
      throw new Error('Bio page already exists');
    }
    // Insert into database using RLS with Prisma
    const result = await dbRls.links.create({
      data: {
        user_id: id,
        short_code: shortCode,
        original_url: data.originalUrl,
        title: data.title || null,
        created_at: now,
        updated_at: now,
      },
    });

    return result;
  } catch (error) {}
}
