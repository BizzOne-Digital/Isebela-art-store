import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { Admin } from '@/lib/models/Admin';
import { connectMongo } from '@/lib/db';
import { loginSchema } from '@/lib/validation';
import { createAdminSessionToken, setAdminSessionCookie } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 });
    }

    const { email, password } = parsed.data;
    await connectMongo();

    const admin = await Admin.findOne({ email: email.toLowerCase() }).lean();
    if (!admin) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const passwordMatches = await bcrypt.compare(password, admin.passwordHash);
    if (!passwordMatches) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = await createAdminSessionToken({
      id: String(admin._id),
      email: admin.email,
      name: admin.name,
    });

    await setAdminSessionCookie(token);

    return NextResponse.json({
      success: true,
      admin: {
        id: String(admin._id),
        email: admin.email,
        name: admin.name,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Unable to login' }, { status: 500 });
  }
}
