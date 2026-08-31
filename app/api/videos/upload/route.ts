import { NextResponse } from 'next/server';
import type { UploadApiResponse } from 'cloudinary';
import cloudinary, { hasCloudinaryConfig } from '@/lib/cloudinary';
import { getAdminSession } from '@/lib/auth';

/** Videos are much larger than product images, so this route has its own limit. */
const MAX_FILE_BYTES = 100 * 1024 * 1024;

export const maxDuration = 60;

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!hasCloudinaryConfig()) {
    return NextResponse.json({ error: 'Cloudinary is not configured' }, { status: 503 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof Blob)) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    if (!file.type.startsWith('video/')) {
      return NextResponse.json({ error: 'Only video files are allowed' }, { status: 400 });
    }

    if (file.size > MAX_FILE_BYTES) {
      return NextResponse.json({ error: 'File exceeds the 100MB limit' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'isabel-art/videos', resource_type: 'video' },
        (error, uploadResult) => {
          if (error || !uploadResult) {
            reject(error || new Error('Upload failed'));
            return;
          }
          resolve(uploadResult);
        },
      );
      stream.end(buffer);
    });

    // Cloudinary can render a poster frame from any uploaded video.
    const thumbnail = cloudinary.url(result.public_id, {
      resource_type: 'video',
      format: 'jpg',
      transformation: [{ width: 640, height: 360, crop: 'fill', quality: 'auto' }],
    });

    return NextResponse.json({
      url: result.secure_url || result.url || '',
      publicId: result.public_id,
      thumbnail,
      duration: result.duration ?? null,
    });
  } catch (error) {
    console.error('Cloudinary video upload error:', error);
    return NextResponse.json({ error: 'Cloudinary video upload failed' }, { status: 500 });
  }
}
