import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'dev-admin-secret-change-me',
);

export const ADMIN_SESSION_COOKIE = 'art_admin_session';

export type AdminSession = {
  sub: string;
  email: string;
  name: string;
};

export async function createAdminSessionToken(admin: {
  id: string;
  email: string;
  name: string;
}) {
  return new SignJWT({
    sub: admin.id,
    email: admin.email,
    name: admin.name,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);
}

export async function setAdminSessionCookie(token: string) {
  try {
    const cookieStore = await cookies();
    cookieStore.set({
      name: ADMIN_SESSION_COOKIE,
      value: token,
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
    });
  } catch {
    return;
  }
}

export async function clearAdminSessionCookie() {
  try {
    const cookieStore = await cookies();
    cookieStore.set({
      name: ADMIN_SESSION_COOKIE,
      value: '',
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 0,
    });
  } catch {
    return;
  }
}

export async function getAdminSession(): Promise<AdminSession | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (!token) {
    return null;
  }

    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);

      if (!payload.sub || !payload.email || !payload.name) {
        return null;
      }

      return {
        sub: String(payload.sub),
        email: String(payload.email),
        name: String(payload.name),
      };
    } catch {
      return null;
    }
  } catch {
    return null;
  }
}
