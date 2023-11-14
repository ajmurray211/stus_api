const mongoose = require('mongoose');
const { Schema } = mongoose;

const merchSchema = new Schema({
  productID: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  variants: [
    {
      type: Schema.Types.ObjectId, // Reference to the Variant model
      ref: 'Variant', // Name of the model to be referenced
      default: []
    },
  ],
  description: {
    type: String,
    required: true,
  },
});

// Pre-save hook to transform color to lowercase before saving
merchSchema.pre('save', function (next) {
  this.variants.forEach((variant) => {
    variant.color = variant.color.toLowerCase();
  });

  next();
});

module.exports = mongoose.model('Merch', merchSchema);
