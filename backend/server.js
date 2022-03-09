const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
connectDB();
const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

//  Routes

app.listen(PORT,()=>{
    console.log(`Server started on ${PORT}`.green.underline.bold);
})