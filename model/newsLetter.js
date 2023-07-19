const mongoose = require('mongoose')
const { Schema } = mongoose;

const newsLetterSchema = new Schema({
    email: {
        type: String
    }
})

module.exports = mongoose.model('newsLetter', newsLetterSchema)