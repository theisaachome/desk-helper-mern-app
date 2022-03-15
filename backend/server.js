const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
connectDB();
const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

//  Routes Mount
const users = require('./routes/userRoutes');
const tickets = require('./routes/ticketRoutes');

const errorHandler = require('./middlewares/errorHandler');
app.use("/api/users",users);
app.use("/api/tickets",tickets);


// global error handling
app.use(errorHandler);

app.listen(PORT,()=>{
    console.log(`Server started on ${PORT}`.green.underline.bold);
})