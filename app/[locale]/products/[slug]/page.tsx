import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { connectMongo, hasMongoConfig } from '@/lib/db';
import { Artwork } from '@/lib/models/Artwork';
import { toProductView, toPlain, type ArtworkLean } from '@/lib/artwork-adapter';
import ProductDetail from '@/components/ProductDetail';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import type { AppLocale } from '@/i18n/routing';

interface Props {
  params: Promise<{ locale: AppLocale; slug: string }>;
}

export const revalidate = 60;

async function loadProduct(slug: string, locale: AppLocale) {
  if (!hasMongoConfig()) {
    return null;
  }

  await connectMongo();
  const artworkDoc = await Artwork.findOne({ slug, status: 'published' }).lean();
  if (!artworkDoc) {
    return null;
  }

  const product = toProductView(toPlain(artworkDoc) as ArtworkLean, locale);

  const relatedDocs = await Artwork.find({
    _id: { $ne: artworkDoc._id },
    status: 'published',
    $or: [{ category: artworkDoc.category }, { tags: { $in: artworkDoc.tags || [] } }],
  })
    .limit(4)
    .lean();

  const relatedProducts = relatedDocs.map((doc) => toProductView(toPlain(doc) as ArtworkLean, locale));

  return { product, relatedProducts };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const result = await loadProduct(slug, locale);

  if (!result) {
    return {
      title: 'Product not found',
    };
  }

  const { product } = result;
  const baseUrl = 'https://isabel-creando-arte-magia.vercel.app';
  const productUrl = `${baseUrl}/products/${product.slug}`;
  const imageUrl = product.image.startsWith('http') ? product.image : `${baseUrl}${product.image}`;

  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      type: 'website',
      locale: locale === 'es' ? 'es_US' : 'en_US',
      url: productUrl,
      siteName: 'Isabel Creando Arte y Magia',
      title: `${product.name} | Isabel Creando Arte y Magia`,
      description: product.shortDescription,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 1500,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.shortDescription,
      images: [imageUrl],
    },
    other: {
      'product:price:amount': product.price?.replace(/[^\d]/g, '') || '0',
      'product:price:currency': 'ARS',
      'product:availability': product.availability === 'available' ? 'in_stock' :
                               product.availability === 'made-to-order' ? 'available_for_order' :
                               product.availability === 'limited' ? 'limited_availability' : 'out_of_stock',
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const result = await loadProduct(slug, locale);

  if (!result) {
    notFound();
  }

  const { product, relatedProducts } = result;

  return (
    <>
      <Navbar />
      <ProductDetail product={product} relatedProducts={relatedProducts} />
      <Footer />
    </>
  );
}
