const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MCQ = new Schema({
    question: String,
    optionone: String,
    optiontwo: String,
    optionthree: String
})

module.exports = mongoose.model('mcqmodels', MCQ)