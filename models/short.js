const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SHORT = new Schema({
    question: String,
})

module.exports = mongoose.model('short',SHORT)