const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require('cors');

app.use(express.json());
app.use(cors())


// databsae Connection with MongoDB

mongoose.connect("mongodb+srv://Rockeyrai40:<9803520300>@cluster0.zrp2t.mongodb.net/e-commerce")

//API creaction

app.get('/',(req,res)=>{
  res.send("Express App is running")
})


//Image Storage Engin
const storage = multer.diskStorage({
  destination:"./upload/images",
  filename:(req,file,cd)=>{
 
  }

})

app.listen(port,(error)=>{
  if(!error){
    console.log('server Running on Port' + port)
  }else{
    console.log('Error:' + error)
  }
})