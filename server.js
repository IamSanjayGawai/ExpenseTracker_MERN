const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const colors = require('colors');
const connectDB = require('./config/connectDB');
const userRoute = require('./routes/userRoute');
const transactionRoute = require('./routes/transactionRoute');
//config dotenv
dotenv.config();

connectDB();

const app = express();


//middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

                                             
app.use('/api/v1/users', userRoute);
app.use('/api/v1/transactions', transactionRoute);


//port 
const PORT  = process.env.PORT || 5000;

//listen server
app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`)
})




