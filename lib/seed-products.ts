import * as dotenv from 'dotenv';
import { seedProductCatalog } from './product-data';

dotenv.config({ path: '.env.local' });
dotenv.config();

seedProductCatalog()
  .then((result) => {
    console.log(`Seeded ${result.categories} categories and ${result.artworks} artworks.`);
    process.exit(0);
  })
  .catch((error) => {
    console.error('Seed products failed:', error);
    process.exit(1);
  });
