const express = require('express');
const bodyParser = require('body-parser');
const app =express();

const router = express.Router();
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;


app.use(express.urlencoded({
    extended:true
}));
app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header("Access-Control-Allow-Headers",
        "Origin,X-Request-With,Content-Type",
        "Accept,Authorization");
    if(req.method === 'OPTIONS' ){

        res.header('Access-Control-Allow-Methods','PUT,PATCH,POST,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});

require('dotenv').config({
    path:'./configs/index.env',
});

const connectDB = require('./configs/db.config');
connectDB();

const productRoutes = require('./api/routes/product.route');





app.get('/',(req,res)=>{
    res.send('welcome home');
});

app.use('/products',productRoutes);
app.use('/orders',ordersRoutes);

app.use(function (req, res, next) {
    // 404 error handler
    next({
        msg: 'Not Found',
        status: 404
    })
})





app.listen(8080, function (err, done) {
    if (err) {
        console.log('error listening at port 8080');
    } else {
        console.log('server listening at port 8080');
    }
})
