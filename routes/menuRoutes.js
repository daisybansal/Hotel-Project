const express = require('express');
const router = express.Router();

//post route to add a menu item 

router.post ('/',async(req,res)=>{
    try{
        const data = req.body
        const newMenu = new MenuItem(data);
        const response = await newMenu.save();
        console.log('data saved');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
})

module.exports = router;