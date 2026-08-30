import mongoose, { Schema } from 'mongoose';

export interface CategoryDocument extends mongoose.Document {
  name: string;
  nameEn?: string;
  slug: string;
  description?: string;
  descriptionEn?: string;
  image?: string;
  displayOrder?: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<CategoryDocument>(
  {
    name: { type: String, required: true, trim: true },
    nameEn: { type: String, default: '', trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    description: { type: String, default: '' },
    descriptionEn: { type: String, default: '' },
    image: { type: String, default: '' },
    displayOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const Category =
  mongoose.models.Category || mongoose.model<CategoryDocument>('Category', CategorySchema);
