//import mongoose
const mongoose = require("mongoose")

//create a schema
const wordSchema = new mongoose.Schema({
    word: {type:String,required:[true,"word is required"]},
    meaning: {type:String,required:[true,"meaning is required"]},
},{collection : 'wordcollection'})

//create a model
const wordModel = mongoose.model("word",wordSchema)

//export model
module.exports = wordModel