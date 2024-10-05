const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express()
const port = process.env.PORT || 3001

app.use(bodyParser.json())// tai sao no phai de truoc route

routes(app);


mongoose.connect('mongodb+srv://lmh:hoanghoang@cluster0.t56sx.mongodb.net/')
.then(() =>{
    console.log('connect database OK!')
})
.catch((err) =>{
    console.log(err)
})



app.listen(port, () => {
    console.log('listening on port:' + port)
})