const mongoose = require('mongoose');
require('dotenv').config();

const mongoUrl = process.env.MONGODB_URL_LOCAL;
//const mongoUrl = process.env.MONGODB_URL;


mongoose.connect(mongoUrl,{
    useNewUrlParser : true,
    useUnifiedTopology : true
})

const db = mongoose.connection;

db.on('connected',()=>{
    console.log('connected to MongoDB server');
});

db.on('error',(err)=>{
    console.log('MongoDB connection error',err);
});

db.on('disconnected',()=>{
    console.log(' MongoDB disconnected');
});

module.exports = db;