import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug, getRelatedProducts, products } from '@/lib/products';
import ProductDetail from '@/components/ProductDetail';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const product = getProductBySlug(resolvedParams.slug);
  
  if (!product) {
    return {
      title: 'Producto no encontrado',
    };
  }

  const baseUrl = 'https://isabel-creando-arte-magia.vercel.app';
  const productUrl = `${baseUrl}/products/${product.slug}`;
  const imageUrl = `${baseUrl}${product.image}`;

  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      type: 'website',
      locale: 'es_AR',
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

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ params }: Props) {
  const resolvedParams = await params;
  const product = getProductBySlug(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product);

  return <ProductDetail product={product} relatedProducts={relatedProducts} />;
}