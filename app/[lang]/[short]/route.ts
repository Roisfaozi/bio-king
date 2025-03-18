import { bypassRLS } from '@/lib/db';
import { trackPageView } from '@/lib/tracking';
import { getCurrentEpoch } from '@/lib/utils';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { short: string } },
) {
  const shortCode = params.short;
  const headersList = await headers();
  const pathname = headersList.get('x-next-pathname') || '';
  console.log('shottcode', shortCode);

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
  return NextResponse.redirect(link.original_url || '/');
}
