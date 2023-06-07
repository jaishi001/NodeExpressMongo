const express = require('express');
const { connectMongoDB } = require('./config/db');
require("colors");




require('dotenv').config({});
connectMongoDB();








const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));



const PORT = process.env.PORT || 5000;
const server = app.listen(PORT,function(){
    const host = server.address().address;
    const port = server.address().port;
    console.log('Server Listening On http://%s:%s',host,port);
});