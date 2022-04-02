//import express
const express = require("express")
const app = express()

//import dotenv
require("dotenv").config() 

//import mongoose
const mongoose = require("mongoose")
const dbConnectionUrl = process.env.DB_CONNECTION_URL

// import api
const wordapi = require("./API/wordAPI")

//import path
const path = require("path")
app.use(express.static(path.join(__dirname,"dist/fullstack")))

//connect mongoose
mongoose.connect(dbConnectionUrl)
.then(()=>{console.log("DB connection established...")})
.catch(error=>{console.log("Error",error.message)})

//execute api based on match
app.use("/word",wordapi)

//default path loading
app.get("*",(request,response,)=>{
    response.sendFile(path.join(__dirname,"dist/fullstack/index.html"))
})


//assign port
const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{console.log(`Server is actively watching on ${PORT}...`)})