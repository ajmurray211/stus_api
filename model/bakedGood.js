const mongoose = require('mongoose');
const { Schema } = mongoose;

const bakedGoodSchema = new Schema({
    classification: {
        type: String,
    },
    name: {
        type: String
    },
    description: {
        type: String
    },
    priceInCents: {
        type: Number
    },
    image: {
        type: String
    },
    stock: {
        type: Number,
        default: 0
    },
    dropdowns:
    {
        ingredients: {
            type: String
        },
        reviews: {
            type: [String],
            default: ['No reviews on this product yet.']
        },
    }
});

module.exports = mongoose.model('BakedGood', bakedGoodSchema);  