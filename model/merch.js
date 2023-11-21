const mongoose = require('mongoose');
const { Schema } = mongoose;

const merchSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String
  },
  priceInCents: {
    type: Number
  },
  classification: {
    type: String,
    default: 'Merch'
  },
  stock: {
    type: Number,
    default: 0
  },
  dropdowns: {
    materials: {
      type: String
    },
    reviews: {
      type: [String],
      default: ['No reviews on this product yet.']
    },
  }
});

module.exports = mongoose.model('Merch', merchSchema);
