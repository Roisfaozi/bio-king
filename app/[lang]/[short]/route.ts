import { bypassRLS } from '@/lib/db';
import { trackPageView } from '@/lib/tracking';
import { getCurrentEpoch } from '@/lib/utils';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { short: string; lang: string } },
) {
  const shortCode = params.short;
  const lang = params.lang || 'en';
  const pathname = req.headers.get('x-next-pathname') || '';

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
      additional_data: true,
    },
  });

  if (
    !link ||
    !link.is_active ||
    (link.expires_at && link.expires_at < getCurrentEpoch())
  ) {
    redirect('/404');
  }

  revalidatePath('/dashboard');

  // Cek apakah ada page_type dalam additional_data
  const additionalData = (link.additional_data as Record<string, any>) || {};
  const pageType = additionalData.page_type;

  // Jika ada page_type, redirect ke halaman yang sesuai
  if (pageType === 'tinder') {
    return NextResponse.redirect(
      new URL(`/${lang}/tinder?shortcode=${shortCode}`, req.url),
    );
  } else if (pageType === 'vsco') {
    return NextResponse.redirect(
      new URL(`/${lang}/vsco?shortcode=${shortCode}`, req.url),
    );
  }

  // Jika tidak ada page_type, redirect ke URL original
  return NextResponse.redirect(link.original_url || '/');
}
