import { bypassRLS } from '@/lib/db';
import { trackPageView } from '@/lib/tracking';
import { getCurrentEpoch } from '@/lib/utils';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { short: string; lang: string } },
) {
  const shortCode = params.short;
  const lang = params.lang || 'en';
  const pathname = req.headers.get('x-next-pathname') || '';

  // Ambil base URL untuk digunakan pada URL absolut
  const baseUrl = new URL(req.url).origin;

  // Menggunakan stealth tracking utility
  await trackPageView({
    pageType: 'link',
    shortCode: shortCode,
  });

  const noRLS = await bypassRLS();
  // Get the link
  const link = await noRLS.links.findUnique({
    where: {
      short_code: shortCode,
    },
    select: {
      id: true,
      short_code: true,
      original_url: true,
      title: true,
      is_active: true,
      expires_at: true,
      created_at: true,
      updated_at: true,
      type: true,
      page_type: true,
    },
  });

  if (
    !link ||
    !link.is_active ||
    (link.expires_at && link.expires_at < getCurrentEpoch())
  ) {
    // Gunakan URL absolut untuk redirect ke 404
    return NextResponse.redirect(new URL('/404', baseUrl));
  }

  revalidatePath('/dashboard');

  // Cek apakah tipe link adalah traplink dan ada page_type
  if (link.type === 'traplink' && link.page_type) {
    // Jika ada page_type, redirect ke halaman yang sesuai
    if (link.page_type === 'tinder') {
      return NextResponse.redirect(
        new URL(`/${lang}/tinder?shortcode=${shortCode}`, baseUrl),
      );
    } else if (link.page_type === 'vsco') {
      return NextResponse.redirect(
        new URL(`/${lang}/vsco?shortcode=${shortCode}`, baseUrl),
      );
    }
  }

  // Jika URL asli sudah absolut, gunakan langsung
  if (link.original_url.startsWith('http')) {
    return NextResponse.redirect(link.original_url);
  }

  // Jika tidak, gabungkan dengan base URL
  return NextResponse.redirect(new URL(link.original_url, baseUrl));
}
