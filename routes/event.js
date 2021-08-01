const bcrypt = require('bcrypt');
const {Event} = require('../models/event');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const moment=require("moment")
moment().format()


router.post('/insertEvent', async (req, res) => {

    event2Add =req.body;
    varDate = moment(event2Add.date,"DD/MM/YYYY");
    today = moment();
  
    if(today.diff(varDate)>0) 
        return res.status(400).send("You can't add an event in this date!")

    let event = await Event.findOne({eventCode: event2Add.eventCode})
    if(event) return res.status(400).send('Event already exist!');

    
    event2Save=new Event({
        eventCode:event2Add.eventCode,
        venue:event2Add.venue,
        date: event2Add.date,
        duration: event2Add.duration,
        type: event2Add.type
    })

    await event2Save.save()
    .then(()=>{return res.status(200).send("Event inserted!")})
    .catch(()=>{return res.status(400).send("Problem during the insertion of the event")})
    
});


router.delete('/deleteEvent/:id', async (req, res) => {

    event_id =req.params.id;
    let event = await Event.findOne({eventCode: event_id})
    if(!event) return res.status(400).send('Event does not exist!');
    
    varDate = moment(event.date,"DD/MM/YYYY");
    today = moment();
  
    if(today.diff(varDate)>0) 
        return res.status(400).send("You can't delete this event!")
    

    await Event.deleteOne({ eventCode: event_id })
    .then(()=>{return res.status(200).send("Event deleted !")})
    .catch(()=>{return res.status(400).send("Problem during the elimination of the event")})
    
});


router.put('/modifyEvent/:id', async (req, res) => {

    event_id =req.params.id
    event2Add=req.body
    let event = await Event.findOne({eventCode: event_id})
    if(!event) return res.status(400).send('Event does not exist!');
     
    
    varDate = moment(event.date,"DD/MM/YYYY");
    today = moment();
  
    if(today.diff(varDate)>0) 
        return res.status(400).send("You can't modify this event!")


    //brute force update ;) delete => save instead of modify 

    event2Save=new Event({
        eventCode:event2Add.eventCode,
        venue:event2Add.venue,
        date: event2Add.date,
        duration: event2Add.duration,
        type: event2Add.type
    })
  
    await Event.deleteOne({ eventCode: event_id })
        
    await event2Save.save()
    .then(()=>{return res.status(200).send("Event modified with success!")})
    .catch(()=>{return res.status(400).send("Problem during the update of the event")})
    
});


router.get('/AllEvents', async (req, res) => {

    let event = await Event.find({})
   
    return res.status(200).send(event)
    
});

router.get('/AllEventsFromToday', async (req, res) => {

    let events = await Event.find({})
   
    events2Return=[]
    
    events.forEach(event => 
    {

        varDate = moment(event.date,"DD/MM/YYYY");
        today = moment(); 

        //check if is an old event
        if(today.diff(varDate)<0) 
            events2Return.push(event)
            
    })
    return res.status(200).send(events2Return)
    
});





module.exports = router;