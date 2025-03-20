// app/[lang]/bio/[username]/page.tsx
import { BioPagesDisplay } from '@/app/[lang]/bio/[username]/bio-pages-display';
import { getAuthSession } from '@/lib/auth';
import db from '@/lib/db';
import { trackPageView } from '@/lib/tracking';
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

interface BioPageProps {
  params: {
    username: string;
    lang: string;
  };
}

export async function generateMetadata(
  { params }: BioPageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
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

  // Get parent metadata (from layout or root metadata)
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: bioPage.seo_title || bioPage.title || `${username}'s Bio Page`,
    description:
      bioPage.seo_description ||
      bioPage.description ||
      `Bio page for ${username}`,
    openGraph: {
      title: bioPage.seo_title || bioPage.title || `${username}'s Bio Page`,
      description:
        bioPage.seo_description ||
        bioPage.description ||
        `Bio page for ${username}`,
      type: 'profile',
      url: `https://bioking.com/${username}`,
      images: bioPage.social_image_url
        ? [bioPage.social_image_url, ...previousImages]
        : previousImages,
    },
    twitter: {
      card: 'summary_large_image',
      title: bioPage.seo_title || bioPage.title || `${username}'s Bio Page`,
      description:
        bioPage.seo_description ||
        bioPage.description ||
        `Bio page for ${username}`,
      images: bioPage.social_image_url ? [bioPage.social_image_url] : [],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function BioPage({ params }: BioPageProps) {
  const { username } = params;

  // Menggunakan utility stealth tracking
  await trackPageView({
    pageType: 'bio',
    username: username,
  });

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

  const themeConfig =
    typeof bioPage.theme_config === 'string'
      ? JSON.parse(bioPage.theme_config)
      : bioPage.theme_config;
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

  return <BioPagesDisplay bioPage={bioPage} themeConfig={themeConfig} />;
}
