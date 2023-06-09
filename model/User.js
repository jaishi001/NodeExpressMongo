const { text } = require('express');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    firstName:{
        type:String,
        required:[true,'Firstname is required'],
        min:3
    },
    middleName:{
        type:String,
        require:false
    },
    lastName:{
        type:String,
        require:[true,'Lastname is required']
    },
    email:{
        type:String,
        required:[true,'Email is required'],
        unique:true
    },
    phone:{
        type:String,
        required:false,
        unique:true
    },
    password:{
        type:String,
        required:[true,'Password is required']
    }
},
{
    timestamps:true,
});

module.exports = mongoose.model('Users',UserSchema);