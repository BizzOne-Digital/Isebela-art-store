import * as dotenv from 'dotenv';
import { connectMongo, hasMongoConfig } from './db';
import { Video } from './models/Video';

dotenv.config({ path: '.env.local' });
dotenv.config();

/**
 * One-off migration for the five clips that used to be hardcoded in
 * VideoShowcase. It backfills the Videos collection so the site keeps its
 * original content after the section became database-driven. Safe to re-run:
 * records are matched on videoUrl.
 */
const legacyVideos = [
  {
    videoUrl: '/images/img/isvid1.mp4',
    title: 'Creación y detalle en el taller',
    titleEn: 'Creating and Detailing in the Workshop',
    subtitle: 'El proceso íntimo del trabajo a mano',
    subtitleEn: 'The intimate process of handwork',
    description: 'Mirá cómo cada plancha de goma eva se transforma en una pieza con personalidad y cuidado.',
    descriptionEn: 'Watch how each sheet of EVA foam becomes a piece with personality and care.',
    tag: 'En el taller',
    tagEn: 'In the Workshop',
    displayOrder: 1,
  },
  {
    videoUrl: '/images/img/isvid2.mp4',
    title: 'Moldeado y armado artesanal',
    titleEn: 'Handcrafted Molding and Assembly',
    subtitle: 'Técnicas de precisión y termoformado',
    subtitleEn: 'Precision techniques and thermoforming',
    description: 'El armado milimétrico de las piezas, cuidando proporciones, pliegues y texturas.',
    descriptionEn: 'The millimeter-precise assembly of pieces, minding proportions, folds, and textures.',
    tag: 'Técnica',
    tagEn: 'Technique',
    displayOrder: 2,
  },
  {
    videoUrl: '/images/img/isvid3.mp4',
    title: 'Vista 360° de nuestras fofuchas',
    titleEn: '360° View of Our Fofuchas',
    subtitle: 'Apreciá cada ángulo y terminación',
    subtitleEn: 'Appreciate every angle and finish',
    description: 'Detalles minuciosos: calzado, ropa, accesorios y rostros pintados a mano.',
    descriptionEn: 'Meticulous details: footwear, clothing, accessories, and hand-painted faces.',
    tag: 'Showcase',
    tagEn: 'Showcase',
    displayOrder: 3,
  },
  {
    videoUrl: '/images/img/isvid4.mp4',
    title: 'Pintura y toques finales',
    titleEn: 'Painting and Finishing Touches',
    subtitle: 'Dando vida a miradas y sonrisas',
    subtitleEn: 'Bringing looks and smiles to life',
    description: 'La magia de los ojos, luces, sombras y rubor que le dan alma a cada creación.',
    descriptionEn: 'The magic of eyes, highlights, shadows, and blush that give every creation soul.',
    tag: 'Pintura',
    tagEn: 'Painting',
    displayOrder: 4,
  },
  {
    videoUrl: '/images/img/isvid5.mp4',
    title: 'Colección en movimiento y presentación',
    titleEn: 'Collection in Motion and Presentation',
    subtitle: 'Listas para regalar o coleccionar',
    subtitleEn: 'Ready to gift or collect',
    description: 'El resultado final, embalado con amor y listo para emocionar a quien lo reciba.',
    descriptionEn: 'The final result, packed with love and ready to delight whoever receives it.',
    tag: 'Creaciones',
    tagEn: 'Creations',
    displayOrder: 5,
  },
];

async function seedVideos() {
  if (!hasMongoConfig()) {
    throw new Error('MONGODB_URI is not configured.');
  }

  await connectMongo();

  let created = 0;
  for (const video of legacyVideos) {
    const existing = await Video.findOne({ videoUrl: video.videoUrl });
    if (existing) continue;
    await Video.create({ ...video, isActive: true });
    created += 1;
  }

  return { created, skipped: legacyVideos.length - created };
}

seedVideos()
  .then((result) => {
    console.log(`Seeded ${result.created} videos (${result.skipped} already existed).`);
    process.exit(0);
  })
  .catch((error) => {
    console.error('Seed videos failed:', error);
    process.exit(1);
  });
