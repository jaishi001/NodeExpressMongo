const express = require('express');
const router = express.Router();
const User = require('../model/User');

router.post('/user',function(req,res){

    console.log('user');
   try {
    const userData = req.body;
    console.log(userData);

    const user =  User.create(userData);
    if(user){
       return res.json({msg:'User Created Successfully !', user:userData})
    }
   return res.json({message:'Error'})

   } catch (error) {
    console.log(error.message,error.code);
   }
    
});

module.exports = router;