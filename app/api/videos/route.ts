import { NextResponse } from 'next/server';
import { connectMongo, hasMongoConfig } from '@/lib/db';
import { Video } from '@/lib/models/Video';
import { videoSchema } from '@/lib/validation';
import { getAdminSession } from '@/lib/auth';
import cloudinary, { hasCloudinaryConfig } from '@/lib/cloudinary';

const updateVideoSchema = videoSchema.partial();

/** Best-effort cleanup of a Cloudinary asset; never blocks the database operation. */
async function destroyAsset(publicId: string | undefined, resourceType: 'video' | 'image') {
  if (!publicId || !hasCloudinaryConfig()) return;
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: resourceType, invalidate: true });
  } catch (error) {
    console.error('Cloudinary destroy failed:', error);
  }
}

export async function GET() {
  if (!hasMongoConfig()) {
    return NextResponse.json({ error: 'MongoDB not configured' }, { status: 503 });
  }
  await connectMongo();
  const videos = await Video.find({ isActive: true }).sort({ displayOrder: 1, createdAt: -1 }).lean();
  return NextResponse.json(videos);
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = videoSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid video payload' }, { status: 400 });
    }

    await connectMongo();
    const video = await Video.create(parsed.data);
    return NextResponse.json(video, { status: 201 });
  } catch (error) {
    console.error('Create video failed:', error);
    return NextResponse.json({ error: 'Unable to create video' }, { status: 500 });
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
      return NextResponse.json({ error: 'Video id is required' }, { status: 400 });
    }

    const parsed = updateVideoSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid video payload' }, { status: 400 });
    }

    await connectMongo();
    const current = await Video.findById(id);
    if (!current) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }

    const video = await Video.findByIdAndUpdate(id, parsed.data, { new: true });

    // The file was replaced — drop the orphaned Cloudinary asset.
    if (parsed.data.videoPublicId !== undefined && current.videoPublicId && current.videoPublicId !== parsed.data.videoPublicId) {
      await destroyAsset(current.videoPublicId, 'video');
    }
    if (parsed.data.thumbnailPublicId !== undefined && current.thumbnailPublicId && current.thumbnailPublicId !== parsed.data.thumbnailPublicId) {
      await destroyAsset(current.thumbnailPublicId, 'image');
    }

    return NextResponse.json(video);
  } catch (error) {
    console.error('Update video failed:', error);
    return NextResponse.json({ error: 'Unable to update video' }, { status: 500 });
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
      return NextResponse.json({ error: 'Video id is required' }, { status: 400 });
    }

    await connectMongo();
    const video = await Video.findByIdAndDelete(id);
    if (!video) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }

    await destroyAsset(video.videoPublicId, 'video');
    await destroyAsset(video.thumbnailPublicId, 'image');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete video failed:', error);
    return NextResponse.json({ error: 'Unable to delete video' }, { status: 500 });
  }
}
