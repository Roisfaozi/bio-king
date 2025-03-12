// app/[lang]/bio/[username]/page.tsx
import { BioPagesDisplay } from '@/app/[lang]/bio/[username]/bio-pages-display';
import { getAuthSession } from '@/lib/auth';
import db from '@/lib/db';
import { getCurrentEpoch, isValidUrl, parseUserAgent } from '@/lib/utils';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';

interface BioPageProps {
  params: {
    username: string;
    lang: string;
  };
}

export async function generateMetadata({
  params,
}: BioPageProps): Promise<Metadata> {
  const { username } = params;

  const bioPage = await db.bioPages.findFirst({
    where: {
      username: username,
      visibility: 'public',
      archived_at: null,
    },
  });

  if (!bioPage) {
    return {
      title: 'Bio Page Not Found',
    };
  }

  return {
    title: bioPage.seo_title || bioPage.title || `${username}'s Bio Page`,
    description:
      bioPage.seo_description ||
      bioPage.description ||
      `Bio page for ${username}`,
    openGraph: {
      images: bioPage.social_image_url ? [bioPage.social_image_url] : [],
    },
  };
}

export default async function BioPage({ params }: BioPageProps) {
  const { username } = params;

  const headersList = headers();
  const userAgent = headersList.get('user-agent') || '';
  const referer = headersList.get('referer') || '';
  const ip = headersList.get('x-forwarded-for') || '';
  const language = headersList.get('accept-language') || '';

  const bioPage = await db.bioPages.findFirst({
    where: {
      username: username,
      visibility: 'public',
      archived_at: null,
    },
    include: {
      bioLinks: true,
      socialLinks: true,
    },
  });

  if (!bioPage) {
    notFound();
  }

  // Track the page view with enhanced analytics
  const { browser, os, device } = parseUserAgent(userAgent);
  const currentEpoch = getCurrentEpoch();

  // Get UTM parameters
  const refererUrl = headers().get('referer') || '';
  let searchParams = new URLSearchParams();

  if (isValidUrl(refererUrl)) {
    const url = new URL(refererUrl);
    searchParams = new URLSearchParams(url.search);
  }

  const themeConfig =
    typeof bioPage.theme_config === 'string'
      ? JSON.parse(bioPage.theme_config)
      : bioPage.theme_config;
  // await db.clicks.create({
  //   data: {
  //     bio_page_id: bioPage.id,
  //     ip,
  //     referer,
  //     browser,
  //     os,
  //     device,
  //     userAgent,
  //     language: language.split(',')[0],
  //     type: 'bio_view',
  //     utmSource: searchParams.get('utm_source'),
  //     utmMedium: searchParams.get('utm_medium'),
  //     utmCampaign: searchParams.get('utm_campaign'),
  //     createdAt: currentEpoch,
  //     isUnique: true,
  //   },
  // })

  if (bioPage.visibility === 'private') {
    const session = await getAuthSession();
    if (!session || session.user.id !== bioPage.user_id) {
      return (
        <BioPagesDisplay
          bioPage={{ ...bioPage, bio_links: [], social_links: [] }}
          themeConfig={themeConfig}
        />
      );
    }
  }

  // Parse theme config if it's stored as a string

  return <BioPagesDisplay bioPage={bioPage} themeConfig={themeConfig} />;
}
