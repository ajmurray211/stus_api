const mongoose = require('mongoose');
const { Schema } = mongoose;

const merSchema = new Schema({
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
          price: {
            type: String,
            required: true
          }
        }
      ]
    }
  ],
  outOfStock: {
    type: Boolean,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Merch', merSchema);
