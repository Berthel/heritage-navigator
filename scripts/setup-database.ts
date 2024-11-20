import { setupDatabase } from '../src/lib/database-setup';

console.log('Starting database setup...');

setupDatabase()
  .then(() => {
    console.log('Database setup completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error setting up database:', error);
    process.exit(1);
  });
