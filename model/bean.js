const mongoose = require('mongoose')
const Schema = mongoose.Schema


const beanSchema = new Schema({
    name: {
        type: String
    },
    image: {
        type: String,
        default: 'uploads/beanBag.png'
    },
    description: {
        type: String
    },
    priceInCents: {
        type: Number
    },
    Collection:
    {
        type: String,
    },
    region: {
        type: String
    },
    roast: {
        type: String,
    },
    type:
    {
        type: String,
        default: 'Whole'
    },
    stock: {
        type: Number,
        default: 0
    },
    dropdowns: {
        ingredients: {
            type: String
        },
        reviews: {
            type: [String],
            default: ['No reviews on this product yet.']
        },
    }
})

module.exports = mongoose.model('Bean', beanSchema);