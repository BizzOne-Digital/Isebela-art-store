import mongoose, { Schema } from 'mongoose';

export interface AdminDocument extends mongoose.Document {
  email: string;
  passwordHash: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const AdminSchema = new Schema<AdminDocument>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

export const Admin = mongoose.models.Admin || mongoose.model<AdminDocument>('Admin', AdminSchema);
