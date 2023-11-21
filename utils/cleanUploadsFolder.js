const fs = require('fs');
const path = require('path');
const Merch = require('../model/merch.js');

// Function to clean up unused images
const cleanupUnusedImages = async () => {
  // try {
  //   // Get all images from the 'uploads' folder
  //   const imageFolder = path.join(__dirname, '../uploads');
  //   const allImages = fs.readdirSync(imageFolder);

  //   // Find unused images
  //   const unusedImages = allImages.filter(image => !allImageFilenames.includes(image));

  //   // Remove unused images from the 'uploads' folder
  //   unusedImages.forEach(image => {
  //     const imagePath = path.join(imageFolder, image);
  //     fs.unlinkSync(imagePath);
  //   });

  //   console.log('Unused images cleaned up:', unusedImages);
  // } catch (err) {
  //   console.error('Error cleaning up unused images:', err);
  // }
  console.log('tried to clean image folder')
};

module.exports = cleanupUnusedImages;
