import { withRLS } from '@/lib/db';
import { logError } from '@/lib/helper';
import { getCurrentEpoch } from '@/lib/utils';

export async function updateBioPageWithLinks(
  userId: string,
  bioPageId: string,
  data: any,
) {
  const currentEpoch = getCurrentEpoch();

  const {
    title,
    username,
    description,
    visibility,
    profile_image_url,
    theme_config,
    seo_title,
    seo_description,
    social_image_url,
    social_links,
    bio_links,
  } = data;

  const bioUpdate = {
    title,
    username,
    description,
    visibility,
    profile_image_url:
      typeof profile_image_url === 'string' ? profile_image_url : null,
    theme_config,
    seo_title,
    seo_description,
    social_image_url:
      typeof social_image_url === 'string' ? social_image_url : null,
  };
  try {
    const db = withRLS(userId);
    return await db.$transaction(async (tx) => {
      // 🔍 Cek apakah bio_page milik user
      const bioPage = await tx.bioPages.findUnique({
        where: { id: bioPageId },
      });

      if (!bioPage || bioPage.user_id !== userId) {
        throw new Error('Unauthorized or bio page not found');
      }

      // 🔄 Update Bio Page
      const updatedBioPage = await tx.bioPages.update({
        where: { id: bioPageId },
        data: { ...bioUpdate, updated_at: currentEpoch },
      });

      // 🔍 Ambil semua link terkait bio_page ini
      const existingLinks = await tx.bioLinks.findMany({
        where: { bio_page_id: bioPageId },
        select: { id: true },
      });

      const existingLinkIds = existingLinks.map((link) => link.id);
      const incomingLinkIds = bio_links
        .map((link: any) => (link.id && link.id.trim() !== '' ? link.id : null))
        .filter((id: string) => id); // Hanya ID yang valid

      // 🗑 Hapus link yang tidak ada di request body
      const linksToDelete = existingLinkIds.filter(
        (id) => !incomingLinkIds.includes(id),
      );
      await tx.bioLinks.deleteMany({
        where: { id: { in: linksToDelete } },
      });

      // 🔄 Update atau Tambah Bio Links
      for (const link of bio_links) {
        if (link.id && link.id.trim() !== '') {
          // Jika ada ID dan bukan string kosong, update
          await tx.bioLinks.update({
            where: { id: link.id },
            data: {
              title: link.title,
              url: link.url,
              updated_at: currentEpoch,
            },
          });
        } else {
          // Jika tidak ada ID atau ID kosong, buat baru
          await tx.bioLinks.create({
            data: {
              bio_page_id: bioPageId,
              title: link.title,
              url: link.url,
              updated_at: currentEpoch,
              created_at: currentEpoch,
            },
          });
        }
      }

      // 🔍 Ambil semua social link terkait bio_page ini
      const existingLinksSocial = await tx.socialLinks.findMany({
        where: { bio_page_id: bioPageId },
        select: { id: true },
      });

      const existingLinkSocialIds = existingLinksSocial.map((link) => link.id);
      const incomingLinkSocialIds = social_links
        .map((link: any) => (link.id && link.id.trim() !== '' ? link.id : null))
        .filter((id: string) => id); // Hanya ID yang ada

      // 🗑 Hapus social link yang tidak ada di request body
      const linksSocialToDelete = existingLinkSocialIds.filter(
        (id) => !incomingLinkSocialIds.includes(id),
      );

      await tx.socialLinks.deleteMany({
        where: { id: { in: linksSocialToDelete } },
      });

      // 🔄 Update atau Tambah social Links
      for (const link of social_links) {
        if (link.id && link.id.trim() !== '') {
          // Jika ada ID, update
          await tx.socialLinks.update({
            where: { id: link.id },
            data: { platform: link.platform, url: link.url },
          });
        } else {
          // Jika tidak ada ID, buat baru
          await tx.socialLinks.create({
            data: {
              bio_page_id: bioPageId,
              platform: link.platform,
              url: link.url,
            },
          });
        }
      }

      return updatedBioPage;
    });
  } catch (error: any) {
    logError('Unknown Error:', error.message);
    throw new Error(error.message || 'An unexpected error occurred.');
  }
}
