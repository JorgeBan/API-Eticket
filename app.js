const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connection = require('./src/config/database/database');

const app = express();
const API_URI = '/api/v1.0.0';


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));


connection.authenticate()
.then(() => {
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);  
})


app.use(API_URI,(req,res)=>{
    res.status(200).json({
        message: 'Welcome to the API',
        version: '1.0.0',      
    });
});



module.exports = app;