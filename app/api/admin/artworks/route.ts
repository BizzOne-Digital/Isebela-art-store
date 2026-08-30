import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { connectMongo, hasMongoConfig } from '@/lib/db';
import { Artwork } from '@/lib/models/Artwork';

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!hasMongoConfig()) {
    return NextResponse.json({ error: 'MongoDB not configured' }, { status: 503 });
  }

  await connectMongo();
  const artworks = await Artwork.find({}).sort({ updatedAt: -1 }).lean();

  return NextResponse.json({
    artworks: artworks.map((artwork) => ({
      ...artwork,
      _id: String(artwork._id),
      images: Array.isArray(artwork.images) ? artwork.images : [],
      updatedAt: artwork.updatedAt ? new Date(artwork.updatedAt).toISOString() : new Date().toISOString(),
    })),
  });
}
