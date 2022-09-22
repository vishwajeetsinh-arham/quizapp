const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mcqtype = new Schema({
    question: String,
    optionone: String,
    optiontwo: String, 
    optionThree: String,
})

module.exports = mongoose.model('mcq', mcqtype)