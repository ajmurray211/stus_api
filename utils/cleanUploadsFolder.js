const fs = require('fs');
const path = require('path');
const Merch = require('../model/merch.js');
const Variant = require('../model/variant.js')

// Function to clean up unused images
const cleanupUnusedImages = async () => {
  try {
    // Get all images from the 'uploads' folder
    const imageFolder = path.join(__dirname, '../uploads');
    const allImages = fs.readdirSync(imageFolder);

    // Get all image filenames used in the database
    const allImageFilenames = [];
    const products = await Merch.find({}).populate('variants');
    console.log(products)
    products.forEach(product => {
      if (product.variants) {
        product.variants.forEach(variant => {
          console.log(variant)
          allImageFilenames.push(...variant.productImages);
        });
      }
    });

    const variants = await Variant.find({})
    console.log(variants)

    // Find unused images
    const unusedImages = allImages.filter(image => !allImageFilenames.includes(image));

    // Remove unused images from the 'uploads' folder
    unusedImages.forEach(image => {
      const imagePath = path.join(imageFolder, image);
      fs.unlinkSync(imagePath);
    });

    console.log('Unused images cleaned up:', unusedImages);
  } catch (err) {
    console.error('Error cleaning up unused images:', err);
  }
};

module.exports = cleanupUnusedImages;
