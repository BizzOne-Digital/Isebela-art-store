import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import VideoShowcase from '@/components/VideoShowcase';
import Footer from '@/components/Footer';
import { getPublishedVideos } from '@/lib/storefront-data';
import type { AppLocale } from '@/i18n/routing';

export const revalidate = 60;

interface Props {
  params: Promise<{ locale: AppLocale }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.videos' });
  return { title: t('title'), description: t('description') };
}

export default async function VideosPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const videos = await getPublishedVideos(locale);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-surface pt-8">
        <VideoShowcase videos={videos} />
      </main>
      <Footer />
    </>
  );
}
