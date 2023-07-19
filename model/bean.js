const mongoose = require('mongoose')
const Schema = mongoose.Schema


const beanSchema = new Schema({
    name: {
        type: String
    },
    productId:
    {
        type: String,
        unique: true
    },
    region: {
        type: String
    },
    type:
    {
        type: String
    },
    sizeOptions: [{
        name: {
            type: String
        },
        priceInCents: {
            type: Number
        }
    }],
    images: [String],
    description: {
        type: String
    },
    ingredients: {
        type: String
    },
    outOfStock: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Bean', beanSchema);