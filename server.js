const express = require('express');
const morgan = require('morgan');
const monggose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const colors = require('colors');
const connectDB = require('./config/connectDB');
//config dotenv
dotenv.config();

connectDB();

const app = express();




//middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());



//default route
app.get('/', (req, res)=>{
    res.send('hello world');
})


//port 

const PORT  = process.env.PORT || 5000;

//listen server

app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`)
})




