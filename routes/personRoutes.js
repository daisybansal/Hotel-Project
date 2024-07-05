const express = require('express');
const router = express.Router();
const Person = require('../models/Person');

//post route to add a person 

router.post ('/',async(req,res)=>{
    try{
        const data = req.body
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);
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