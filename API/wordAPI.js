//import mini express
const express = require("express")
const wordApp = express.Router() 

//import word model
const Word = require("../Model/Word")

//body parser middleware
wordApp.use(express.json())

//import express async handler
const expressAsyncHandler = require("express-async-handler")

// routes
// add word to database
wordApp.post("/addword", expressAsyncHandler(async(request,response)=>{
    let dataFromClient = request.body
    let wordFromClient = dataFromClient.word
    let wordsInDB = await Word.findOne({word:wordFromClient}).exec()
    // if word is not present in databasse
    if(wordsInDB === null){
        // create a document in db
        let wordDoc = new Word({...dataFromClient})
        // save the document
        wordDoc.save()
        // send response
        response.status(200).send({message:"Word added to database",payload:dataFromClient})
    }
    // if word already exists
    else{
        response.status(200).send({message:"Word already exists"})
    }
}))

// get words from databasse
wordApp.get("/getwords",expressAsyncHandler(async(request,response)=>{
    // get movies from database
    const wordList = await Word.find().exec()
    // if no words in database
    if(wordList.length == 0){
        response.status(200).send({message:"No Words in database"})
    }
    else{
        response.status(200).send({message:"Words in database",payload:wordList})
    }
}))

// edit word in database
wordApp.put("/editword",expressAsyncHandler(async(request,response)=>{
    let dataFromClient = request.body
    let wordsInDB = await Word.findOne({_id:dataFromClient._id}).exec()
    if (wordsInDB == null) {
        response.status(200).send({ message: "No word" })
    } else {
        let wordObj = await Word.updateOne({ _id:dataFromClient._id }, {$set:{word:dataFromClient.word,meaning:dataFromClient.meaning}})
        let wordData = await Word.findOne({ _id:dataFromClient._id})
        response.status(200).send({ message: "Word updated successfully", payload: wordData })
    }
}))

// delete word from database
wordApp.delete("/deleteword/:id",expressAsyncHandler(async(request,response)=>{
    let dataFromURL = request.params.id
    let wordsInDB = await Word.findOne({_id:dataFromURL}).exec()
    if (wordsInDB == null) {
        response.status(200).send({ message: "No word" })
    } else {
        await Word.deleteOne({_id:dataFromURL})
        response.status(200).send({ message: "Word deleted successfully"})
    }
}))

//path not match error
wordApp.use((request,response,next)=>{
    response.send({message:"Path not available",payload:`${request.url} not Found!`})
})
//error handling middleware
wordApp.use((error,request,response,next)=>{
    // console.log(error)
    response.send({message:"Error",payload:error.message})
})
//export
module.exports = wordApp