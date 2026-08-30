import { connectMongo } from './db';
import { Artwork } from './models/Artwork';
import { Category } from './models/Category';
import { toSlug } from './slug';
import { products as staticProducts, categories as staticCategories } from './products';

export async function seedProductCatalog() {
  await connectMongo();

  for (const categoryName of staticCategories.filter((category) => category !== 'Todos')) {
    const slug = toSlug(categoryName);
    const exists = await Category.findOne({ slug });

    if (!exists) {
      await Category.create({
        name: categoryName,
        slug,
        description: `${categoryName} handmade pieces from the storefront.`,
        displayOrder: 0,
        isActive: true,
      });
    }
  }

  for (const product of staticProducts) {
    const slug = product.slug || toSlug(product.name);
    const record = await Artwork.findOne({ slug });

    const payload = {
      name: product.name,
      slug,
      description: product.description,
      shortDescription: product.shortDescription,
      images: [product.image, ...(product.secondaryImages || [])],
      category: product.category,
      price: product.price || '',
      priceLabel: product.priceLabel || '',
      features: product.features || [],
      materials: product.materials || [],
      tags: product.tags || [],
      featured: Boolean(product.isFeatured),
      isNewArrival: Boolean(product.isNew),
      isSeasonal: Boolean(product.isSeasonal),
      availability: product.availability || 'available',
      status: 'published',
      displayOrder: 0,
    };

    if (record) {
      await Artwork.updateOne({ _id: record._id }, payload);
    } else {
      await Artwork.create(payload);
    }
  }

  return { categories: staticCategories.length - 1, artworks: staticProducts.length };
}
