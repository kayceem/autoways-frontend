// Script to drop the old productId index from the products collection
try {
  require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
} catch (error) {
  // dotenv not required if environment variables are already set
  console.log('Skipping dotenv (not required)');
}
const { connectDB } = require('../database/client');
const { Product } = require('../database/schema');

const dropProductIdIndex = async () => {
  try {
    // Connect to database
    await connectDB();
    console.log('Connected to database');

    // Get all indexes on the Product collection
    const indexes = await Product.collection.getIndexes();
    console.log('\nCurrent indexes on products collection:');
    console.log(JSON.stringify(indexes, null, 2));

    // Check if productId index exists
    const hasProductIdIndex = Object.keys(indexes).some(
      key => key.includes('productId')
    );

    if (hasProductIdIndex) {
      console.log('\nFound productId index. Dropping it...');

      // Drop all indexes that contain productId
      for (const indexName of Object.keys(indexes)) {
        if (indexName.includes('productId')) {
          await Product.collection.dropIndex(indexName);
          console.log(`✓ Dropped index: ${indexName}`);
        }
      }

      console.log('\n✓ Successfully removed productId index');
    } else {
      console.log('\n✓ No productId index found. Nothing to drop.');
    }

    // Show remaining indexes
    const remainingIndexes = await Product.collection.getIndexes();
    console.log('\nRemaining indexes on products collection:');
    console.log(JSON.stringify(remainingIndexes, null, 2));

    process.exit(0);
  } catch (error) {
    console.error('Error dropping index:', error);
    process.exit(1);
  }
};

dropProductIdIndex();
