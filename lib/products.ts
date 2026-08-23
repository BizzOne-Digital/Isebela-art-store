export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  shortDescription: string;
  image: string;
  secondaryImages?: string[];
  price?: string;
  priceLabel?: string;
  features: string[];
  materials?: string[];
  isNew?: boolean;
  isFeatured?: boolean;
  isSeasonal?: boolean;
  availability: 'available' | 'made-to-order' | 'limited' | 'sold-out';
  tags: string[];
}

export const categories = [
  'Todos',
  'Muñecas',
  'Tarjetas',
  'Papelería',
  'Manualidades Recicladas',
  'Personalizados',
];

const productImages = [
  'https://4.bp.blogspot.com/_BAVVNvuf7o8/TUzgXk1vK0I/AAAAAAAACdA/xdZ-R-xZpSw/s1600/01.JPG',
  'https://i.pinimg.com/564x/49/5d/18/495d1862e773f21362a01b7efba6ef66.jpg',
  'https://i.pinimg.com/736x/17/fa/d9/17fad9e6ed0459fe4305476fd6973a96.jpg',
  'https://i.pinimg.com/736x/b0/19/80/b01980ea44ded92407fe814c1e9d072f.jpg',
  'https://i.pinimg.com/736x/17/fa/d9/17fad9e6ed0459fe4305476fd6973a96.jpg',
  'https://i.pinimg.com/736x/b0/19/80/b01980ea44ded92407fe814c1e9d072f.jpg',
  'https://i.pinimg.com/564x/49/5d/18/495d1862e773f21362a01b7efba6ef66.jpg',
  'https://4.bp.blogspot.com/_BAVVNvuf7o8/TUzgXk1vK0I/AAAAAAAACdA/xdZ-R-xZpSw/s1600/01.JPG',
  'https://i.pinimg.com/736x/17/fa/d9/17fad9e6ed0459fe4305476fd6973a96.jpg',
  'https://i.pinimg.com/736x/b0/19/80/b01980ea44ded92407fe814c1e9d072f.jpg',
];

export const products: Product[] = [
  {
    id: 'muneca-flor',
    slug: 'muneca-flor-de-primavera',
    name: 'Muñeca Flor de Primavera',
    category: 'Muñecas',
    description: 'Muñeca artesanal hecha con goma eva de colores vibrantes. Cada detalle está cortado y ensamblado a mano con mucho cariño. Perfecta para decorar habitaciones infantiles o como regalo único.',
    shortDescription: 'Muñeca artesanal con colores vibrantes, hecha 100% a mano.',
    image: productImages[0],
    secondaryImages: [],
    price: 'Desde $45.000',
    priceLabel: 'Consultar disponibilidad',
    features: ['Hecha 100% a mano', 'Goma eva premium', 'Tamaño: 25cm alto', 'Colores personalizables'],
    materials: ['Goma eva premium', 'Pintura acrílica', 'Pegamento especializado'],
    isFeatured: true,
    availability: 'available',
    tags: ['muñeca', 'flores', 'primavera', 'regalo', 'infantil'],
  },
  {
    id: 'muneca-hada',
    slug: 'hada-bosque-encantado',
    name: 'Hada del Bosque Encantado',
    category: 'Muñecas',
    description: 'Una hada mágica con alas translúcidas y vestido de pétalos. Incluye varita mágica y base decorativa. Ideal para coleccionistas y amantes de la fantasía.',
    shortDescription: 'Hada mágica con alas translúcidas y varita incluida.',
    image: productImages[1],
    secondaryImages: [],
    price: 'Desde $55.000',
    priceLabel: 'Consultar disponibilidad',
    features: ['Alas con efecto translúcido', 'Varita mágica incluida', 'Base decorativa', 'Detalles pintados a mano'],
    materials: ['Goma eva premium', 'Alas de acetato', 'Pintura metálica', 'Base de madera'],
    isNew: true,
    availability: 'available',
    tags: ['hada', 'fantasía', 'coleccionable', 'magia', 'novedad'],
  },
  {
    id: 'muneca-bailarina',
    slug: 'bailarina-ensueno',
    name: 'Bailarina de Ensueño',
    category: 'Muñecas',
    description: 'Elegante bailarina con tutú de capas de goma eva y zapatillas de punta. Pose articulada para crear diferentes posiciones de baile.',
    shortDescription: 'Bailarina articulada con tutú de 3 capas.',
    image: productImages[2],
    secondaryImages: [],
    price: 'Desde $50.000',
    priceLabel: 'Consultar disponibilidad',
    features: ['Tutú de 3 capas', 'Posable (articulada)', 'Zapatillas de punta', 'Peineta decorativa'],
    materials: ['Goma eva premium', 'Alambre para articulación', 'Tul', 'Accesorios metálicos'],
    availability: 'made-to-order',
    tags: ['bailarina', 'danza', 'articulada', 'elegante', 'personalizable'],
  },
  {
    id: 'tarjeta-cumpleanos',
    slug: 'tarjeta-popup-cumpleanos-magico',
    name: 'Tarjeta Pop-Up Cumpleaños Mágico',
    category: 'Tarjetas',
    description: 'Tarjeta 3D con mecanismo pop-up que revela una escena completa al abrirse. Incluye sobre decorado a juego.',
    shortDescription: 'Tarjeta 3D pop-up con mecanismo sorpresa y sobre decorado.',
    image: productImages[3],
    secondaryImages: [],
    price: '$12.000',
    priceLabel: 'Unidad',
    features: ['Mecanismo pop-up 3D', 'Sobre decorado incluido', 'Personalizable con nombre', 'Tamaño: 15x20cm'],
    materials: ['Cartulina premium', 'Goma eva', 'Pegamento artesanal', 'Sobre forrado'],
    isFeatured: true,
    availability: 'available',
    tags: ['cumpleaños', 'pop-up', '3d', 'sorpresa', 'personalizable'],
  },
  {
    id: 'tarjeta-boda',
    slug: 'tarjeta-boda-eterna',
    name: 'Tarjeta Boda Eterna',
    category: 'Tarjetas',
    description: 'Elegante tarjeta de boda con detalles en relieve y acabados metálicos. Diseño atemporal para una ocasión única.',
    shortDescription: 'Tarjeta de boda elegante con detalles en relieve y acabados metálicos.',
    image: productImages[4],
    secondaryImages: [],
    price: '$15.000',
    priceLabel: 'Unidad',
    features: ['Detalles en relieve', 'Acabados dorados/plateados', 'Sobre forrado incluido', 'Texto personalizable'],
    materials: ['Cartulina texturada', 'Foil dorado/plateado', 'Goma eva', 'Sobre premium'],
    availability: 'made-to-order',
    tags: ['boda', 'elegante', 'metálico', 'personalizable', 'ocasión-especial'],
  },
  {
    id: 'tarjeta-nacimiento',
    slug: 'tarjeta-bienvenida-bebe',
    name: 'Tarjeta Bienvenida Bebé',
    category: 'Tarjetas',
    description: 'Dulce tarjeta para celebrar la llegada de un bebé. Con elementos 3D suaves y colores pastel.',
    shortDescription: 'Tarjeta dulce para recién nacido con elementos 3D suaves.',
    image: productImages[5],
    secondaryImages: [],
    price: '$10.000',
    priceLabel: 'Unidad',
    features: ['Elementos 3D suaves', 'Colores pastel', 'Espacio para foto', 'Sobre a juego'],
    materials: ['Cartulina suave', 'Goma eva pastel', 'Algodón', 'Sobre a juego'],
    isNew: true,
    availability: 'available',
    tags: ['bebé', 'recién-nacido', 'pastel', 'dulce', 'novedad'],
  },
  {
    id: 'libreta-flores',
    slug: 'libreta-artesanal-flores-silvestres',
    name: 'Libreta Artesanal Flores Silvestres',
    category: 'Papelería',
    description: 'Libreta encuadernada a mano con portada de goma eva decorada. 80 hojas de papel reciclado de alta calidad.',
    shortDescription: 'Libreta encuadernada a mano con portada decorada y papel reciclado.',
    image: productImages[6],
    secondaryImages: [],
    price: '$18.000',
    priceLabel: 'Unidad',
    features: ['Encuadernación artesanal', '80 hojas papel reciclado', 'Portada resistente', 'Tamaño A5'],
    materials: ['Goma eva decorada', 'Papel reciclado 100g', 'Hilo de encuadernar', 'Cartón forrado'],
    isFeatured: true,
    availability: 'available',
    tags: ['libreta', 'papeleria', 'reciclado', 'flores', 'encuadernacion'],
  },
  {
    id: 'marcador-set',
    slug: 'set-marcadores-pagina-magia',
    name: 'Set Marcadores Página Magia',
    category: 'Papelería',
    description: 'Set de 5 marcadores de página con diseños únicos: flor, mariposa, estrella, corazón y hoja. Cada uno con detalle 3D.',
    shortDescription: 'Set de 5 marcadores únicos con detalles 3D e imán.',
    image: productImages[7],
    secondaryImages: [],
    price: '$8.000',
    priceLabel: 'Set x5',
    features: ['5 diseños únicos', 'Detalles 3D en cada uno', 'Imán incorporado', 'Presentación en caja'],
    materials: ['Goma eva', 'Imanes', 'Cartulina', 'Caja de presentación'],
    availability: 'available',
    tags: ['marcadores', 'lectura', 'set', 'imanes', 'regalo'],
  },
  {
    id: 'agenda-2025',
    slug: 'agenda-anual-2025-arte-magia',
    name: 'Agenda Anual 2025 Arte y Magia',
    category: 'Papelería',
    description: 'Agenda completa con ilustraciones exclusivas mes a mes. Incluye páginas para notas, metas y planificación semanal.',
    shortDescription: 'Agenda 2025 con ilustraciones exclusivas y planificación completa.',
    image: productImages[8],
    secondaryImages: [],
    price: '$35.000',
    priceLabel: 'Unidad',
    features: ['Ilustraciones exclusivas', 'Vista semanal y mensual', 'Páginas de metas', 'Tapa dura decorada'],
    materials: ['Tapa dura forrada', 'Papel 90g', 'Encuadernación cosida', 'Cinta marcapáginas'],
    isNew: true,
    availability: 'limited',
    tags: ['agenda', '2025', 'planificacion', 'ilustraciones', 'edicion-limitada'],
  },
  {
    id: 'reciclado-maceta',
    slug: 'maceta-decorativa-reciclada',
    name: 'Maceta Decorativa Reciclada',
    category: 'Manualidades Recicladas',
    description: 'Maceta creada a partir de botellas plásticas recicladas, decorada con goma eva y pintura ecológica. Incluye plato base.',
    shortDescription: 'Maceta de botella reciclada decorada con goma eva y pintura ecológica.',
    image: productImages[9],
    secondaryImages: [],
    price: '$22.000',
    priceLabel: 'Unidad',
    features: ['100% material reciclado', 'Pintura ecológica', 'Plato base incluido', 'Resistente al agua'],
    materials: ['Botella PET reciclada', 'Goma eva', 'Pintura ecológica', 'Plato base'],
    isFeatured: true,
    availability: 'available',
    tags: ['reciclado', 'ecologico', 'maceta', 'sostenible', 'decoracion'],
  },
  {
    id: 'reciclado-lapicero',
    slug: 'lapicero-botella-magica',
    name: 'Lapicero Botella Mágica',
    category: 'Manualidades Recicladas',
    description: 'Práctico lapicero hecho de botella de vidrio reciclado, decorado con goma eva y corcho natural.',
    shortDescription: 'Lapicero de vidrio reciclado con corcho natural y decoración artesanal.',
    image: productImages[0],
    secondaryImages: [],
    price: '$15.000',
    priceLabel: 'Unidad',
    features: ['Vidrio reciclado', 'Corcho natural', 'Decoración goma eva', 'Tapa protectora'],
    materials: ['Botella de vidrio reciclada', 'Corcho natural', 'Goma eva', 'Pintura acrílica'],
    availability: 'available',
    tags: ['reciclado', 'vidrio', 'lapicero', 'corcho', 'escritorio'],
  },
  {
    id: 'reciclado-caja',
    slug: 'caja-tesoros-reciclada',
    name: 'Caja de Tesoros Reciclada',
    category: 'Manualidades Recicladas',
    description: 'Caja organizadora hecha de cartón reforzado reciclado, forrada y decorada completamente a mano.',
    shortDescription: 'Caja organizadora de cartón reciclado forrada y decorada a mano.',
    image: productImages[1],
    secondaryImages: [],
    price: '$25.000',
    priceLabel: 'Unidad',
    features: ['Cartón reforzado reciclado', 'Forrada por dentro y fuera', 'Tapa con cierre imantado', 'Múltiples compartimentos'],
    materials: ['Cartón reforzado reciclado', 'Tela/Goma eva forro', 'Imanes', 'Pegamento ecológico'],
    availability: 'made-to-order',
    tags: ['reciclado', 'caja', 'organizador', 'imanes', 'almacenamiento'],
  },
];

export function getProductsByCategory(category: string): Product[] {
  if (category === 'Todos') return products;
  return products.filter(p => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.isFeatured);
}

export function getNewProducts(): Product[] {
  return products.filter(p => p.isNew);
}

export function getSeasonalProducts(): Product[] {
  return products.filter(p => p.isSeasonal);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter(p => p.id !== product.id && (p.category === product.category || p.tags.some(tag => product.tags.includes(tag))))
    .slice(0, limit);
}