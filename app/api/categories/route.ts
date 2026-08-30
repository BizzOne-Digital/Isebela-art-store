import { NextResponse } from 'next/server';
import { connectMongo, hasMongoConfig } from '@/lib/db';
import { Category } from '@/lib/models/Category';
import { categorySchema } from '@/lib/validation';
import { getAdminSession } from '@/lib/auth';

const updateCategorySchema = categorySchema.partial();

export async function GET() {
  if (!hasMongoConfig()) {
    return NextResponse.json({ error: 'MongoDB not configured' }, { status: 503 });
  }
  await connectMongo();
  const categories = await Category.find({ isActive: true }).sort({ displayOrder: 1, name: 1 }).lean();
  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = categorySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid category payload' }, { status: 400 });
    }

    await connectMongo();

    const existing = await Category.findOne({ slug: parsed.data.slug });
    if (existing) {
      return NextResponse.json({ error: 'Category slug already exists' }, { status: 409 });
    }

    const category = await Category.create(parsed.data);
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error('Create category failed:', error);
    return NextResponse.json({ error: 'Unable to create category' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, ...body } = await request.json();
    if (!id) {
      return NextResponse.json({ error: 'Category id is required' }, { status: 400 });
    }

    const parsed = updateCategorySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid category payload' }, { status: 400 });
    }

    await connectMongo();
    const category = await Category.findByIdAndUpdate(id, parsed.data, { new: true });
    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error('Update category failed:', error);
    return NextResponse.json({ error: 'Unable to update category' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: 'Category id is required' }, { status: 400 });
    }

    await connectMongo();
    const category = await Category.findById(id);
    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    const artworkCount = await (await import('@/lib/models/Artwork')).Artwork.countDocuments({ category: category.name });
    if (artworkCount > 0) {
      return NextResponse.json({ error: 'Cannot delete a category that has artwork assigned.' }, { status: 409 });
    }

    await Category.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete category failed:', error);
    return NextResponse.json({ error: 'Unable to delete category' }, { status: 500 });
  }
}
