// app/[lang]/bio/[username]/page.tsx
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { BioPagesDisplay } from '@/app/[lang]/bio/[username]/bio-pages-display';
import db from '@/lib/db';

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

  // Parse theme config if it's stored as a string
  const themeConfig =
    typeof bioPage.theme_config === 'string'
      ? JSON.parse(bioPage.theme_config)
      : bioPage.theme_config;
  return <BioPagesDisplay bioPage={bioPage} themeConfig={themeConfig} />;
}
