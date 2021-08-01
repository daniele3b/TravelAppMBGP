const config=require('config')
const request= require('request')
const bcrypt=require('bcrypt')
const mongoose= require('mongoose')
const {Event}=require('../models/event')
const {User}=require('../models/user')
const { parse } = require('dotenv')

function  getUsersForDB(){

    //if empty populate
    url=config.get('USERS_URL')
    request(url, function(error, response, body) {
    if(error) 
    {
        console.log('Impossible to get data from mercedes endpoint!')
        return 
    }else { //get each user and save it in the DB
        const parsed_body = JSON.parse(body)
        users=[]
        parsed_body.forEach(user => 
        {
            user2Save=new User
            ({
                role:user.role ,
                name: user.name,
                surname: user.surname,
                email:user.email,
                password: user.name
            })



            let hash = bcrypt.hashSync(user2Save.password, config.get('pw_salt')); 
            user2Save.password=hash;
            users.push(user2Save)
            

            
        });
   
        User.insertMany(users, function(error, docs) {
            if(error)
                console.log("Users DB already populated!")
            else
                console.log("User inserted correctly!")
        });
    }
    })
}


function  getEventsForDB(){

    //if empty populate
    url=config.get('EVENTS_URL')
    request(url, function(error, response, body) {
    if(error) 
    {
        console.log('Impossible to get data from mercedes endpoint!')
        return 
    }else { //get each user and save it in the DB
        const parsed_body = JSON.parse(body)
        events=[]


        parsed_body.forEach(event => 
        {
            event2Save=new Event
            ({
                eventCode:event.eventCode,
                venue:event.venue,
                date: event.date,
                duration: event.duration,
                type: event.type
            })
            events.push(event2Save)
            
        });
   
        Event.insertMany(events, function(error, docs) {
            if(error)
                console.log("Event collection already populated!")
            else
                console.log("Events insert correctly!")
        });
    }
    })
}




 

exports.getUsersForDB=getUsersForDB;
exports.getEventsForDB=getEventsForDB;