import * as dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { connectMongo } from './db';
import { Admin } from './models/Admin';

dotenv.config({ path: '.env.local' });
dotenv.config();

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD must be set in the environment.');
  }

  await connectMongo();

  const existingAdmin = await Admin.findOne({ email: email.toLowerCase() });
  if (existingAdmin) {
    console.log(`Admin already exists for ${email}`);
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await Admin.create({
    email: email.toLowerCase(),
    passwordHash,
    name: 'Art Admin',
  });

  console.log(`Seeded admin user: ${email}`);
}

seedAdmin()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Seed admin failed:', error);
    process.exit(1);
  });
