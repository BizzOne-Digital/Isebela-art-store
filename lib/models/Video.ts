import mongoose, { Schema } from 'mongoose';

export interface VideoDocument extends mongoose.Document {
  title: string;
  titleEn?: string;
  subtitle?: string;
  subtitleEn?: string;
  description?: string;
  descriptionEn?: string;
  tag?: string;
  tagEn?: string;
  videoUrl: string;
  videoPublicId?: string;
  thumbnail?: string;
  thumbnailPublicId?: string;
  displayOrder?: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const VideoSchema = new Schema<VideoDocument>(
  {
    title: { type: String, required: true, trim: true },
    titleEn: { type: String, default: '', trim: true },
    subtitle: { type: String, default: '', trim: true },
    subtitleEn: { type: String, default: '', trim: true },
    description: { type: String, default: '' },
    descriptionEn: { type: String, default: '' },
    tag: { type: String, default: '', trim: true },
    tagEn: { type: String, default: '', trim: true },
    videoUrl: { type: String, required: true, trim: true },
    videoPublicId: { type: String, default: '', trim: true },
    thumbnail: { type: String, default: '', trim: true },
    thumbnailPublicId: { type: String, default: '', trim: true },
    displayOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const Video =
  mongoose.models.Video || mongoose.model<VideoDocument>('Video', VideoSchema);
