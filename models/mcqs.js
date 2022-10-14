const mongoose = require('mongoose')
const Schema = mongoose.Schema
ObjectId = Schema.ObjectId

const MCQ = new Schema({
    Id: ObjectId,
    question: {
        type: String,
        required: true,
    },
    optionone: String,
    optiontwo: String,
    optionthree: String
})

module.exports = mongoose.model('mcqs', MCQ)