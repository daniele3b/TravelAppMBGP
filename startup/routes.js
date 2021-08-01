const express = require('express')
const auth = require('../routes/auth')
const event = require('../routes/event')
const views = require('../routes/views')


module.exports = function(app) {
    app.use(express.json())
    app.use('/auth', auth)
    app.use('/event',event)
    app.use('/',views)
}