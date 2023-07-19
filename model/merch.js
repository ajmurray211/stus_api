const mongoose = require('mongoose');
const { Schema } = mongoose;

const merchSchema = new Schema({
  productID: {
    type: String,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  variants: [
    {
      color: {
        type: String,
        required: true
      },
      sizeOptions: [
        {
          name: {
            type: String,
            required: true
          },
          priceInCents: {
            type: Number,
            required: true,
            default: null
          }

        }
      ]
    }
  ],
  productImages: [String],
  outOfStock: {
    type: Boolean,
    required: true,
    default: false
  },
  description: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Merch', merchSchema);
