const express = require('express');
const router = express.Router();
const Person = require('../models/Person');
const {jwtAuthMiddleware,generateToken} = require ('./../jwt');



//post route to add a person 

router.post ('/signup',async(req,res)=>{
    try{
        const data = req.body
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log('data saved');

        const payload = {
            id : response.id,
            username : response.username
        }

        console.log(JSON.stringify(payload));
        const token = generateToken(payload);
        console.log("Token is : ",token);
        
        res.status(200).json({response : response , token : token });
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
})

//login route

router.post('/login',async(req,res)=>{
    try{
        const {username,password} = req.body;
        const user = await Person.findOne({username : username});

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({error : ' invalid username or password'});
        }
        const payload = {
            id : user.id,
            username : user.username
        }
        const token = generateToken(payload);
        res.json({token})
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
});


// profile route

router.get('/profile',jwtAuthMiddleware,async(req,res)=>{
    try{
        const userData = req.user;
        console.log("User Data : ",userData);

        const userId = userData.id;
        const user = await Person.findOne(userId);

        res.status(200).json({user});
    } 
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
})

// get method to get a person from database

router.get('/',async(req,res)=>{
    try{
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
})


// parameterised api calls

router.get('/:worktype',async(req,res)=>{
    try{
        const worktype = req.params.worktype;
        if(worktype == 'chef' || worktype == 'waiter' || worktype == 'manager')
        {
            const response = await Person.find({work : worktype});
            console.log('response fetched');
            res.status(200).json(response);
        }
        else{
            res.status(404).json({error : 'Invalid work type'});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
})


//update operation

router.put('/:id', async(req,res)=>{
    try{
        const personId = req.params.id;
        const updatedPersonData = req.body;

        const response = await Person.findByIdAndUpdate(personId,updatedPersonData,{
            new : true,
            runValidators : true
        })

        if (!response) {
            return res.status(404).json({error:'person not found'});
        } 
        console.log('data updated');
        res.status(200).json(response);
        }

    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
 })

 //delete operation

router.delete('/:id', async(req,res)=>{
    try{
        const personId = req.params.id;

        const response = await Person.findByIdAndDelete(personId);

        if (!response) {
            return res.status(404).json({error:'person not found'});
        } 
        console.log('data deleted');
        res.status(200).json({message : 'person deleted successfully'});
        }

    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
 })

module.exports = router;