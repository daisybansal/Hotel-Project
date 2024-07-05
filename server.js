const express = require('express')
const app = express();

const db = require('./db');

const Person = require('./models/Person');
const MenuItem = require('./models/Menu');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const personRoutes = require('./routes/personRoutes');
app.use('/person',personRoutes);

const menuRoutes = require('./routes/menuRoutes');
app.use('/menuItem',menuRoutes);




app.get('/',function(req,res){
    res.send('Welcome to my hotel')
})



app.listen(3000,()=>{
    console.log('listening on port 3000');
})