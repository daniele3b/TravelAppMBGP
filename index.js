const express = require('express')
const config=require('config')
const app = express()
var cors = require('cors')
const {getUsersForDB,getEventsForDB}= require('./startup/populateDb')


app.use(cors());
app.options('*', cors()) 
const port = process.env.PORT || 8081

require('./startup/db')()
require('./startup/routes')(app)

getUsersForDB()
getEventsForDB()


const server = app.listen(port, () =>  { console.log("Server listening on port : " , port)})



module.exports = server

