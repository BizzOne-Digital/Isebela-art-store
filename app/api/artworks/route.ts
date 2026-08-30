import { NextResponse } from 'next/server';
import { connectMongo, hasMongoConfig } from '@/lib/db';
import { Artwork } from '@/lib/models/Artwork';
import { artworkSchema } from '@/lib/validation';
import { getAdminSession } from '@/lib/auth';

const updateArtworkSchema = artworkSchema.partial();

export async function GET() {
  if (!hasMongoConfig()) {
    return NextResponse.json({ error: 'MongoDB not configured' }, { status: 503 });
  }
  await connectMongo();
  const artworks = await Artwork.find({ status: 'published' }).sort({ displayOrder: 1, createdAt: -1 }).lean();
  return NextResponse.json(artworks);
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = artworkSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid artwork payload' }, { status: 400 });
    }

    await connectMongo();

    const existing = await Artwork.findOne({ slug: parsed.data.slug });
    if (existing) {
      return NextResponse.json({ error: 'Artwork slug already exists' }, { status: 409 });
    }

    const artwork = await Artwork.create(parsed.data);
    return NextResponse.json(artwork, { status: 201 });
  } catch (error) {
    console.error('Create artwork failed:', error);
    return NextResponse.json({ error: 'Unable to create artwork' }, { status: 500 });
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
      return NextResponse.json({ error: 'Artwork id is required' }, { status: 400 });
    }

    const parsed = updateArtworkSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid artwork payload' }, { status: 400 });
    }

    await connectMongo();
    const artwork = await Artwork.findByIdAndUpdate(id, parsed.data, { new: true });
    if (!artwork) {
      return NextResponse.json({ error: 'Artwork not found' }, { status: 404 });
    }

    return NextResponse.json(artwork);
  } catch (error) {
    console.error('Update artwork failed:', error);
    return NextResponse.json({ error: 'Unable to update artwork' }, { status: 500 });
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
      return NextResponse.json({ error: 'Artwork id is required' }, { status: 400 });
    }

    await connectMongo();
    const artwork = await Artwork.findByIdAndDelete(id);
    if (!artwork) {
      return NextResponse.json({ error: 'Artwork not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete artwork failed:', error);
    return NextResponse.json({ error: 'Unable to delete artwork' }, { status: 500 });
  }
}
