const mongoose = require('mongoose');
const { Schema } = mongoose;

const variantSchema = new Schema({
    color: {
        type: String,
        required: true,
    },
    productImages: [String],
    sizeOptions: [
        {
            name: {
                type: String,
                required: true,
            },
            priceInCents: {
                type: Number,
                required: true,
                default: null,
            },
        },
    ],
    outOfStock: {
        type: Boolean,
        required: true,
        default: false,
    },
})

module.exports = mongoose.model('Variant', variantSchema);