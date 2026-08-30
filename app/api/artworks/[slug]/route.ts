import { NextResponse } from 'next/server';
import { Artwork } from '@/lib/models/Artwork';
import { connectMongo, hasMongoConfig } from '@/lib/db';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  if (!hasMongoConfig()) {
    return NextResponse.json({ error: 'MongoDB not configured' }, { status: 503 });
  }

  await connectMongo();
  const artwork = await Artwork.findOne({ slug, status: 'published' }).lean();

  if (!artwork) {
    return NextResponse.json({ error: 'Artwork not found' }, { status: 404 });
  }

  return NextResponse.json(artwork);
}
