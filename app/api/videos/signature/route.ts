import { NextResponse } from 'next/server';
import cloudinary, { hasCloudinaryConfig } from '@/lib/cloudinary';
import { getAdminSession } from '@/lib/auth';

export const VIDEO_FOLDER = 'isabel-art/videos';

/**
 * Authorizes a browser-to-Cloudinary video upload.
 *
 * The file itself never passes through this server: serverless request bodies
 * are capped (4.5MB on Vercel) and a large upload would also blow the function
 * timeout. We hand the client a short-lived signature instead, so the API
 * secret stays server-side while the bytes go straight to Cloudinary.
 */
export async function POST() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!hasCloudinaryConfig()) {
    return NextResponse.json({ error: 'Cloudinary is not configured' }, { status: 503 });
  }

  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  if (!apiSecret || !apiKey || !cloudName) {
    return NextResponse.json({ error: 'Cloudinary is not configured' }, { status: 503 });
  }

  const timestamp = Math.round(Date.now() / 1000);

  // Every signed param must be sent back verbatim by the client, and only
  // these. `resource_type` lives in the upload URL, so it is not signed.
  const signature = cloudinary.utils.api_sign_request(
    { folder: VIDEO_FOLDER, timestamp },
    apiSecret,
  );

  return NextResponse.json({
    cloudName,
    apiKey,
    timestamp,
    signature,
    folder: VIDEO_FOLDER,
  });
}
