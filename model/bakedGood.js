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
    ingredients: {
        type: String
    }
});

module.exports = mongoose.model('BakedGood', bakedGoodSchema);  // Capitalized the model name
