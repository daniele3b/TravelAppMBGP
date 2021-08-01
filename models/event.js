const Joi = require('joi')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');

require('dotenv').config()

const eventSchema = new mongoose.Schema({
    eventCode: {
        type: String,
        required: true,
        unique:true
    },
    venue: {
        type: String,
        required: true,
    },
    date: {  
        type: String,
        required: true
    },
   
    duration: {    
        type: String,
        minlength: 1,
        maxlength: 255, 
    },
    type: { 
        type: String,
        minlength: 1,
        maxlength: 1024,
        required: true
    }
})


const Event = mongoose.model('Event', eventSchema)


exports.Event = Event
