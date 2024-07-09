const express = require('express')
const app = express();


const db = require('./db');

require('dotenv').config();

const passport = require('./auth');

const PORT = process.env.PORT || 3000;

const Person = require('./models/Person');
const MenuItem = require('./models/Menu');

const bodyParser = require('body-parser');
app.use(bodyParser.json());



//middleware function

const logRequest = (req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}] Request Mode to : ${req.originalUrl}`);
    next();
}

app.use(logRequest);

app.get('/',function(req,res){
    res.send('Welcome to my hotel')
})



app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local',{session : false});



const personRoutes = require('./routes/personRoutes');
app.use('/person',localAuthMiddleware,personRoutes);

const menuRoutes = require('./routes/menuRoutes');
app.use('/menuItem',menuRoutes);


app.listen(3000,()=>{
    console.log('listening on port 3000');
})