/**
 * Seed metadata for every media asset in `public/images/img`.
 *
 * The Spanish copy for the 46 product photos already lives in `./products.ts`
 * and stays the single source of truth — this file supplies the three things
 * that source is missing and that the database models support:
 *
 *   1. `categorySeeds`      — bilingual Category documents (the `categories`
 *                             array in products.ts is a UI filter list, not a
 *                             seedable definition, and it disagrees with the
 *                             categories the products actually use).
 *   2. `productTranslations` — the `*En` fields. `routing.defaultLocale` is
 *                             `'en'`, so without these every English visitor
 *                             is served Spanish copy.
 *   3. `videoSeeds`         — bilingual copy for the five clips.
 *
 * Only `name`, `description` and `shortDescription` have English counterparts
 * on the Artwork model, so `features` / `materials` / `tags` are seeded from
 * the Spanish source as-is.
 */

export interface CategorySeed {
  name: string;
  nameEn: string;
  slug: string;
  description: string;
  descriptionEn: string;
  /** Cover image, used by category cards on the storefront. */
  image: string;
  displayOrder: number;
  isActive: boolean;
}

export interface ProductTranslation {
  nameEn: string;
  shortDescriptionEn: string;
  descriptionEn: string;
}

export interface VideoSeed {
  videoUrl: string;
  title: string;
  titleEn: string;
  subtitle: string;
  subtitleEn: string;
  description: string;
  descriptionEn: string;
  tag: string;
  tagEn: string;
  displayOrder: number;
}

/**
 * Files in `public/images/img` that are deliberately not products.
 * Both are the same "Isabel Creando arte y magia con Goma Eva" brand
 * illustration at different resolutions. Listed here so the seed's folder
 * audit can tell "intentionally skipped" apart from "forgotten".
 */
export const brandAssets = ['/images/img/is2.jpg', '/images/img/is4.jpg'];

/**
 * Category documents. `name` (Spanish) is the join key stored on
 * `Artwork.category`, so it must match `Product.category` in products.ts
 * character for character.
 */
export const categorySeeds: CategorySeed[] = [
  {
    name: 'Muñecas',
    nameEn: 'Dolls & Figures',
    slug: 'munecas',
    description:
      'Fofuchas y muñecos modelados a mano en goma eva: personajes, profesiones, personalizados y ediciones de temporada.',
    descriptionEn:
      'Hand-modelled EVA foam fofuchas and dolls: characters, professions, custom commissions and seasonal editions.',
    image: '/images/img/is8.jpg',
    displayOrder: 1,
    isActive: true,
  },
  {
    name: 'Tarjetas',
    nameEn: 'Handmade Cards',
    slug: 'tarjetas',
    description:
      'Tarjetas artesanales con relieves, dorados, gemas y plegados especiales para cada ocasión.',
    descriptionEn:
      'Handmade cards with embossing, gold foil, applied gems and special folds for every occasion.',
    image: '/images/img/is7.jpg',
    displayOrder: 2,
    isActive: true,
  },
  {
    name: 'Papelería',
    nameEn: 'Stationery & Accessories',
    slug: 'papeleria',
    description:
      'Libretas decoradas, toppers para lápices y llaveros artesanales para el día a día.',
    descriptionEn:
      'Decorated notebooks, pencil toppers and handmade keychains for everyday use.',
    image: '/images/img/is9.jpg',
    displayOrder: 3,
    isActive: true,
  },
  {
    name: 'Cajas Decoradas',
    nameEn: 'Decorated Gift Boxes',
    slug: 'cajas-decoradas',
    description:
      'Cajas vitrina, bolsas y sobres decorados a mano, listos para regalar y personalizables con nombre.',
    descriptionEn:
      'Hand-decorated display boxes, gift bags and envelopes, ready to give and personalisable with a name.',
    image: '/images/img/is33.jpg',
    displayOrder: 4,
    isActive: true,
  },
  {
    name: 'Manualidades Recicladas',
    nameEn: 'Upcycled Crafts',
    slug: 'manualidades-recicladas',
    description:
      'Cestas, organizadores y adornos creados a partir de materiales reutilizados con acabados premium.',
    descriptionEn:
      'Baskets, organizers and ornaments built from reused materials with premium finishes.',
    image: '/images/img/is16.jpg',
    displayOrder: 5,
    isActive: true,
  },
  {
    /**
     * Kept as a real document but inactive: no product uses this category yet,
     * and `getPublishedCatalog` only returns `isActive: true`, so seeding it
     * active would put an always-empty filter on the storefront. Custom work is
     * handled by the /custom-orders page. Flip `isActive` when the first
     * commission is catalogued.
     */
    name: 'Personalizados',
    nameEn: 'Custom Orders',
    slug: 'personalizados',
    description:
      'Piezas creadas desde cero según tu idea: personajes, profesiones, mascotas y fechas especiales.',
    descriptionEn:
      'Pieces created from scratch around your idea: characters, professions, pets and special dates.',
    image: '/images/img/is18.jpg',
    displayOrder: 6,
    isActive: false,
  },
];

/**
 * English copy keyed by the product `slug` in products.ts.
 * Kept in the same order as the products array for easy diffing.
 */
export const productTranslations: Record<string, ProductTranslation> = {
  'fofucha-ciclista-aventura-1': {
    nameEn: 'Adventure Cyclist Fofucha Doll',
    shortDescriptionEn: 'Cyclist fofucha with a scale bicycle, helmet and medal.',
    descriptionEn:
      'Handcrafted fofucha modelled in EVA foam portraying a cyclist ready for adventure. Includes a custom scale bicycle, an aerodynamic helmet with an iridescent visor, a medal around the neck and finely detailed sportswear.',
  },
  'fofucha-ciclista-taller-3': {
    nameEn: 'Cyclist Fofucha in the Workshop',
    shortDescriptionEn: 'Cyclist fofucha with full kit and bicycle.',
    descriptionEn:
      'Cyclist fofucha doll photographed finished on the workshop table, with high-definition finishing and raised relief detail.',
  },
  'fofucha-ciclista-detalle-5': {
    nameEn: 'Cyclist Fofucha — Detail View',
    shortDescriptionEn: 'Close-up of the modelling on the cyclist fofucha.',
    descriptionEn:
      'A detailed perspective of the cyclist fofucha showing the texture work on the helmet, hair and clothing.',
  },
  'muneco-pijama-conejito-mascota-6': {
    nameEn: 'Bunny Pajama Doll with Puppy',
    shortDescriptionEn: 'Bunny pajama doll with a puppy companion.',
    descriptionEn:
      'A tender handcrafted doll in a light-blue bunny onesie with a wavy hood, an embroidered carrot motif and its faithful little puppy held in its arms.',
  },
  'tarjeta-aliento-life-is-a-precious-gift-7': {
    nameEn: 'Encouragement Card "Life is a Precious Gift"',
    shortDescriptionEn: 'Elegant black card with gold detailing and a motivational message.',
    descriptionEn:
      'A beautiful handmade black card carrying motivational messages in raised gold lettering ("Life is a precious gift", "Make Progress", "Get Well Soon").',
  },
  'fofucha-boho-chic-trenzas-8': {
    nameEn: 'Boho Chic Fofucha Doll with Braids',
    shortDescriptionEn: 'Boho chic fofucha with braids, headscarf and flared trousers.',
    descriptionEn:
      'Bohemian-style fofucha doll with an orange headscarf, handmade blonde braids, a top with an embroidered flower and flared trousers finished with fringing and floral appliqués.',
  },
  'libreta-diario-muneca-relieve-9': {
    nameEn: 'Journal Notebook with Relief Doll',
    shortDescriptionEn: 'Ring-bound notebook with a relief doll on the cover.',
    descriptionEn:
      'Ring-bound notebook with a textured hardcover in silver tones, decorated with a handmade EVA foam doll in a white dress with a red bow and a sundial.',
  },
  'fofucha-detalles-trenzado-10': {
    nameEn: 'Boho Fofucha — Braid Detail',
    shortDescriptionEn: 'Close-up of the hairstyle and outfit on the boho fofucha.',
    descriptionEn:
      'A detailed perspective of the double-braided hairstyle, handmade ribbon and springtime outfit of the boho fofucha.',
  },
  'tarjeta-motivacional-life-full-of-colors-11': {
    nameEn: 'Motivational Card "Life Full of Colors"',
    shortDescriptionEn: 'Card with sparkling crystals and a motivational message.',
    descriptionEn:
      'A modern, vibrant card on an apple-green background with a diagonal check motif, raised sparkling gems and inspiring messages printed on transparent film.',
  },
  'fofucha-pantalon-acampanado-12': {
    nameEn: 'Boho Fofucha — Embroidered Trousers Detail',
    shortDescriptionEn: 'Close-up of the flared trousers and raised flowers.',
    descriptionEn:
      'A detailed view of the handcrafted doll wearing denim-blue flared trousers with 3D floral embroidery, fringing along the hem and a cord belt.',
  },
  'osita-bebe-tierna-goma-eva-13': {
    nameEn: 'Sweet Baby Bear in EVA Foam',
    shortDescriptionEn: 'Sweet baby bear with pacifier and blanket for a nursery or baby shower.',
    descriptionEn:
      'A tender baby bear figure lying on its pink blanket, with a pacifier, a decorative bow and a heart on its back. Ideal for baby showers or newborn keepsakes.',
  },
  'osita-bebe-lateral-14': {
    nameEn: 'Baby Bear with Bow and Pacifier (Side View)',
    shortDescriptionEn: 'Close-up of the modelling on the baby bear figure.',
    descriptionEn:
      'Side view of the baby bear showing the curve of the modelled body, the little ears and the textured blanket.',
  },
  'osita-bebe-corazon-15': {
    nameEn: 'Baby Bear with Heart Detail',
    shortDescriptionEn: 'Handcrafted baby bear with a raised pink heart.',
    descriptionEn:
      'Baby bear figure with a raised pink heart, ideal as a christening or newborn keepsake.',
  },
  'cesta-organizadora-textil-flores-azules-16': {
    nameEn: 'Textile Storage Basket with Blue Flowers',
    shortDescriptionEn: 'Eco-friendly storage basket in linen with blue flowers and jute cord.',
    descriptionEn:
      'Handcrafted storage basket built on a reinforced recycled base, lined in rustic linen and canvas with blue botanical flowers, finished with a jute cord around the rim and raised EVA foam flowers.',
  },
  'pareja-fofuchos-con-perrito-17': {
    nameEn: 'Fofucho Couple with Puppy',
    shortDescriptionEn: 'A handcrafted fofucho couple with their puppy.',
    descriptionEn:
      'Set of personalised fofucho dolls: a girl in a red onesie and a boy in a t-shirt holding their pet on a leash.',
  },
  'fofucho-motociclista-harley-custom-18': {
    nameEn: 'Custom Harley Biker Fofucho with Pet',
    shortDescriptionEn: 'Personalised biker with a scale chopper and pet.',
    descriptionEn:
      'A striking personalised biker figure with a custom scale chopper motorcycle and a puppy companion on the pillion seat. Includes an EVA foam faux-leather jacket, helmet and mechanical detailing.',
  },
  'moto-chopper-escala-19': {
    nameEn: 'Handcrafted Chopper Bike with Fofucho (Front View)',
    shortDescriptionEn: 'Front view of the biker fofucho and his chopper.',
    descriptionEn:
      'Front angle of the biker showing the headlights, the handmade motorcycle handlebars and the mirrored sunglasses.',
  },
  'tarjeta-cuadros-cristales-20': {
    nameEn: 'Elegant Card "We\'re All In This Together"',
    shortDescriptionEn: 'Black card with gold engraving and a heartfelt message.',
    descriptionEn:
      'An exclusive minimalist card design on black card stock with gold butterfly detailing and a message of solidarity.',
  },
  'tarjeta-happy-fathers-day-21': {
    nameEn: 'Card "Happy Father\'s Day!!"',
    shortDescriptionEn: 'Pop-open surprise card with a gold ribbon for dad.',
    descriptionEn:
      'Handmade fold-out card in black and yellow with a gold ribbon tie, made for Father\'s Day.',
  },
  'tarjeta-acordeon-the-world-is-yours-22': {
    nameEn: 'Accordion Fold Card "The World is Yours"',
    shortDescriptionEn: 'Handmade accordion-fold card with a vintage texture.',
    descriptionEn:
      'Handmade card with a multi-panel accordion fold, printed vintage calligraphy, decorative stamps and inspiring messages.',
  },
  'fofucha-doctora-maestra-verde-23': {
    nameEn: 'Doctor / Teacher Fofucha in Green Scrubs',
    shortDescriptionEn: 'Professional fofucha in green scrubs with a striking hairstyle.',
    descriptionEn:
      'Fofucha doll with abundant bright yellow hair wearing green professional scrubs with a handmade stethoscope or necklace.',
  },
  'llavero-artesanal-flor-rosa-mariposa-24': {
    nameEn: 'Handmade Pink Flower and Butterfly Keychain',
    shortDescriptionEn: 'Glass-bead keychain with a pink flower and butterfly charm.',
    descriptionEn:
      'Elegant handmade keychain with worked glass beads, a pink butterfly charm and a hand-sewn fabric flower.',
  },
  'llavero-colgante-flor-mariposa-25': {
    nameEn: 'Pink Flower Bag Charm Keychain',
    shortDescriptionEn: 'Handmade keychain clipped on as a bag accessory.',
    descriptionEn:
      'An elegant accessory for bags or backpacks, made up of a handcrafted pink fabric flower, faceted coloured beads and a butterfly charm.',
  },
  'llavero-cuentas-cristal-azul-26': {
    nameEn: 'Blue Crystal Bead and Flower Keychain',
    shortDescriptionEn: 'Handmade turquoise keychain with a magenta flower.',
    descriptionEn:
      'Handmade keychain with a turquoise blue ring, a small magenta flower and cylindrical beads with arabesque motifs.',
  },
  'organizador-infantil-selva-reciclado-27': {
    nameEn: 'Upcycled Magic Jungle Kids Organizer',
    shortDescriptionEn: 'Upcycled kids organizer with a jungle print and green lace trim.',
    descriptionEn:
      'Storage box and organizer for a playroom or baby changing table, built on an upcycled structure with an emerald green lining and an outer ruffle printed with jungle animals, finished with woven green lace trim.',
  },
  'muneca-minnie-mouse-abrigo-blanco-28': {
    nameEn: 'Minnie Mouse Doll with White Coat and Bag',
    shortDescriptionEn: 'Minnie Mouse style fofucha with a red bow and white coat.',
    descriptionEn:
      'Personalised fofucha inspired by Minnie Mouse with black ears, a red polka-dot bow, a white sweater and a matching handbag.',
  },
  'topper-lapiz-princesa-violeta-29': {
    nameEn: 'Princess Pencil Topper in Violet Dress',
    shortDescriptionEn: 'Handmade violet princess topper for pencils.',
    descriptionEn:
      'Pencil or pen topper featuring a little blonde princess with a gold crown and a purple dress on a floral base.',
  },
  'muneca-enfermera-embarazada-cna-30': {
    nameEn: 'Pregnant Nurse / CNA Doll with Face Mask',
    shortDescriptionEn: 'Pregnant nurse fofucha with a face mask and CNA badge.',
    descriptionEn:
      'Personalised doll of a pregnant medical nurse wearing colourful scrubs, a protective face mask and pink croc clogs.',
  },
  'muneca-enfermera-cna-trasera-31': {
    nameEn: 'CNA Nurse Doll — Back View',
    shortDescriptionEn: 'Back detail of the CNA nurse fofucha.',
    descriptionEn:
      'Rear view of the nurse doll highlighting the "CNA" patch modelled in yellow and orange.',
  },
  'topper-lapiz-cenicienta-32': {
    nameEn: 'Cinderella Pencil Topper with Blonde Bun',
    shortDescriptionEn: 'Handmade Cinderella princess topper for pens.',
    descriptionEn:
      'Handmade pen topper inspired by Cinderella, with her classic light-blue gown and white gloves.',
  },
  'muneca-mama-bebe-caja-regalo-33': {
    nameEn: 'Mother Cradling Baby Doll in Display Box',
    shortDescriptionEn: 'Mother and baby doll presented in a display box with an oversized bow.',
    descriptionEn:
      'A moving gift presented in a decorated box with a clear window: a mother doll lovingly cradling her newborn.',
  },
  'sobre-regalo-bienvenida-bebe-cora-34': {
    nameEn: 'Personalized "Cora" Gift Envelopes and Boxes',
    shortDescriptionEn: 'Personalised packaging set for baby showers and newborns.',
    descriptionEn:
      'Set of pastel pink gift wrappings decorated with elegant bows, fabric flowers and a baby appliqué with the name in relief.',
  },
  'muneca-mama-bebe-detalle-35': {
    nameEn: 'Mother Cradling Baby Doll (Face Detail)',
    shortDescriptionEn: 'Close-up of the tender scene between mother and baby.',
    descriptionEn:
      'A close-up of the expressive faces of the mother and the baby in her arms, wrapped in a yellow blanket.',
  },
  'muneca-repostera-cupcakes-36': {
    nameEn: 'Baker Doll with Cupcakes and Glasses',
    shortDescriptionEn: 'Baker fofucha with detailed cupcakes and pink glasses.',
    descriptionEn:
      'A charming baker fofucha with pink glasses frames, wearing a printed dress and holding delicious handmade cupcakes.',
  },
  'muneca-repostera-peinado-37': {
    nameEn: 'Baker Doll — Hairstyle Detail',
    shortDescriptionEn: 'Close-up of the flower-dressed hairstyle on the baker fofucha.',
    descriptionEn:
      'Overhead shot of the chestnut hairstyle dressed with small handmade flowers in assorted colours.',
  },
  'set-bolsa-tarjeta-dragon-fuego-38': {
    nameEn: '3D Red Dragon Gift Bag and Card Set',
    shortDescriptionEn: 'Kraft bag and card with a 3D glittered red dragon.',
    descriptionEn:
      'Themed packaging set: a kraft gift bag decorated with a 3D glittered red dragon silhouette, paired with a hand-written birthday card.',
  },
  'topper-boligrafo-dama-unstoppable-39': {
    nameEn: 'Elegant Lady "Unstoppable" Pen Topper',
    shortDescriptionEn: 'Chic pen topper with a wide-brimmed hat and a motivational sign.',
    descriptionEn:
      'Exclusive pencil topper of a lady\'s bust with a black wide-brimmed hat decorated with pearls, lace and an "Unstoppable" sign.',
  },
  'mueble-organizador-bano-reciclado-40': {
    nameEn: 'Upcycled Bathroom Organizer with Flowers',
    shortDescriptionEn: 'Rustic eco-friendly bathroom organizer with a decorative vase.',
    descriptionEn:
      'Rustic auxiliary organizer unit built from recycled materials, sized for toilet paper, towels and a small decorative vase.',
  },
  'trio-fofuchas-chicas-superpoderosas-41': {
    nameEn: 'Powerpuff Girls Fofucha Trio',
    shortDescriptionEn: 'Complete set of 3 fofuchas inspired by the Powerpuff Girls.',
    descriptionEn:
      'Complete set of 3 little fofucha dolls representing Blossom, Bubbles and Buttercup with their iconic dresses and great big eyes.',
  },
  'puntera-lapiz-pollito-corazon-42': {
    nameEn: 'Kawaii Yellow Chick Pencil Topper',
    shortDescriptionEn: 'Kawaii yellow chick topper with heart-shaped wings.',
    descriptionEn:
      'A sweet pencil topper shaped like a little yellow chick\'s head with huge kawaii eyes and heart-shaped wings.',
  },
  'organizador-reciclado-cascanueces-43': {
    nameEn: 'Upcycled Nutcracker Christmas Organizer',
    shortDescriptionEn: 'Christmas nutcracker container built from an upcycled tube.',
    descriptionEn:
      'Nutcracker soldier figure built from an upcycled tube and decorated with glittered foam and gold braiding.',
  },
  'set-decorativo-navideno-santa-nieve-44': {
    nameEn: 'Santa and Snowman Christmas Decor Set',
    shortDescriptionEn: 'Handmade Christmas ornaments of Santa Claus and a snowman.',
    descriptionEn:
      'Christmas ornament set made with upcycled fabrics, including a seated Santa Claus with a woollen beard and a snowman tube figure.',
  },
  'calcetin-navideno-arpillera-reciclado-45': {
    nameEn: 'Upcycled Burlap Christmas Stocking and Cushion',
    shortDescriptionEn: 'Rustic jute Christmas stocking with pine cones.',
    descriptionEn:
      'Christmas stocking for the fireplace in burlap and jute fabric, trimmed with dried pine cones and natural pine foliage.',
  },
  'muneco-papa-noel-sentado-46': {
    nameEn: 'Sitting Santa Claus Doll',
    shortDescriptionEn: 'Handmade sitting Santa Claus doll with bendable legs.',
    descriptionEn:
      'Poseable Santa Claus figure made to sit on shelves or mantelpieces, with a slouched red hat and striped stockings.',
  },
  'muneco-papa-noel-poinsettia-47': {
    nameEn: 'Santa Claus Doll — Poinsettia Detail',
    shortDescriptionEn: 'Detail of the handmade Santa Claus with a poinsettia flower.',
    descriptionEn:
      'A close-up of the Santa Claus doll\'s body showing his checked waistcoat and the poinsettia flower held between his hands.',
  },
  'adorno-colgante-campanas-yute-48': {
    nameEn: 'Hanging Burlap Christmas Bells Ornament',
    shortDescriptionEn: 'Triple jute bell ornament for doors.',
    descriptionEn:
      'Triple hanging door ornament shaped as bells, made in burlap with cords and red Christmas flowers.',
  },
};

/**
 * The five clips in `public/images/img`. Matched on `videoUrl`, which is the
 * natural key for a video (there is no slug on the Video model).
 */
export const videoSeeds: VideoSeed[] = [
  {
    videoUrl: '/images/img/isvid1.mp4',
    title: 'Creación y detalle en el taller',
    titleEn: 'Creating and Detailing in the Workshop',
    subtitle: 'El proceso íntimo del trabajo a mano',
    subtitleEn: 'The intimate process of handwork',
    description:
      'Mirá cómo cada plancha de goma eva se transforma en una pieza con personalidad y cuidado.',
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
    description:
      'El armado milimétrico de las piezas, cuidando proporciones, pliegues y texturas.',
    descriptionEn:
      'The millimeter-precise assembly of pieces, minding proportions, folds, and textures.',
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
    description:
      'La magia de los ojos, luces, sombras y rubor que le dan alma a cada creación.',
    descriptionEn:
      'The magic of eyes, highlights, shadows, and blush that give every creation soul.',
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
    descriptionEn:
      'The final result, packed with love and ready to delight whoever receives it.',
    tag: 'Creaciones',
    tagEn: 'Creations',
    displayOrder: 5,
  },
];
