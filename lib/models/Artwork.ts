import mongoose, { Schema } from 'mongoose';

export interface ArtworkDocument extends mongoose.Document {
  name: string;
  nameEn?: string;
  slug: string;
  description: string;
  descriptionEn?: string;
  shortDescription?: string;
  shortDescriptionEn?: string;
  images: string[];
  category: string;
  price?: string;
  priceLabel?: string;
  materials?: string[];
  colors?: string[];
  tags?: string[];
  features?: string[];
  featured: boolean;
  isNewArrival?: boolean;
  isSeasonal?: boolean;
  availability: 'available' | 'made-to-order' | 'limited' | 'sold-out';
  status: 'draft' | 'published';
  displayOrder?: number;
  createdAt: Date;
  updatedAt: Date;
}

const ArtworkSchema = new Schema<ArtworkDocument>(
  {
    name: { type: String, required: true, trim: true },
    nameEn: { type: String, default: '', trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true },
    descriptionEn: { type: String, default: '' },
    shortDescription: { type: String, default: '' },
    shortDescriptionEn: { type: String, default: '' },
    images: { type: [String], default: [] },
    category: { type: String, required: true, trim: true },
    price: { type: String, default: '' },
    priceLabel: { type: String, default: '' },
    materials: { type: [String], default: [] },
    colors: { type: [String], default: [] },
    tags: { type: [String], default: [] },
    features: { type: [String], default: [] },
    featured: { type: Boolean, default: false },
    isNewArrival: { type: Boolean, default: false },
    isSeasonal: { type: Boolean, default: false },
    availability: {
      type: String,
      enum: ['available', 'made-to-order', 'limited', 'sold-out'],
      default: 'available',
    },
    status: { type: String, enum: ['draft', 'published'], default: 'published' },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const Artwork =
  mongoose.models.Artwork || mongoose.model<ArtworkDocument>('Artwork', ArtworkSchema);
