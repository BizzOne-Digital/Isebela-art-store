import { NextResponse } from 'next/server';
import cloudinary, { hasCloudinaryConfig } from '@/lib/cloudinary';
import { getAdminSession } from '@/lib/auth';

const MAX_FILE_BYTES = 8 * 1024 * 1024;

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

    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Only image files are allowed' }, { status: 400 });
    }

    if (file.size > MAX_FILE_BYTES) {
      return NextResponse.json({ error: 'File exceeds the 8MB limit' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = `data:${file.type || 'application/octet-stream'};base64,${buffer.toString('base64')}`;

    const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
      cloudinary.uploader.upload(base64, { folder: 'isabel-art' }, (error, uploadResult) => {
        if (error || !uploadResult) {
          reject(error || new Error('Upload failed'));
          return;
        }

        resolve({ secure_url: uploadResult.secure_url || uploadResult.url || '' });
      });
    });

    return NextResponse.json({ url: result.secure_url });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return NextResponse.json(
      { error: 'Cloudinary upload failed' },
      { status: 500 },
    );
  }
}
