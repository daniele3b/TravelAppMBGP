const Joi = require('joi')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');

require('dotenv').config()

const userSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    surname: {  
        type: String,
        required: true
    },
   
    email: {    
        type: String,
        minlength: 5,
        maxlength: 255,
        unique: true,
        required: true
    },
    password: { 
        type: String,
        minlength: 1,
        maxlength: 1024,
        required: true
    }
})


const User = mongoose.model('User', userSchema)


exports.User = User
