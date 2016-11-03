const express = require('express');
const hbl = require('express-handlebars');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/timesheet')
const Shift = require('./models/shifts');

var app = express()

//add template engine
app.engine('handlebars', hbl({defaultLayout:'main'}))
//set the view engine to handlebars
app.set('view engine','handlebars')
//add middlewear
app.use(express.static('public'))
app.use(bodyparser.urlencoded({extended: true}))

app.get('/', function(req, res){
  res.render('index')
})

app.listen(3000, function() {
  console.log('listening on port 3000');
})
