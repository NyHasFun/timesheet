const express = require('express');
const hbl = require('express-handlebars');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
var uristring = "mongodb://heroku_1tkgpjk6:17grflt5lp538r3df83oboh1f2@ds031618.mlab.com:31618/heroku_1tkgpjk6"
mongoose.connect(uristring, function (err, res) {
   if (err) {
   console.log ('ERROR connecting to: ' + uristring + '. ' + err);
   } else {
   console.log ('Succeeded connected to: ' + uristring);
   }
 });
const Shift = require('./models/shifts')

var app = express()

//add template engine
app.engine('handlebars', hbl({defaultLayout:'main'}))
//set the view engine to handlebars
app.set('view engine','handlebars')
//add middlewear
app.use(express.static('public'))
app.use(bodyparser.urlencoded({extended: true}))

app.get('/', function(req, res){
  Shift.find({}, null, {sort: {startTime: -1}}, function(err, data) {
    res.render('index', {shifts: data})
  })
})

app.post('/shifts/edit/', function(req, res){
  Shift.findById(req.body.id, function( err, shift ) {

    shift.startTime = req.body.startTime
    shift.endTime = req.body.endTime
    shift.productivity = req.body.productivity
    shift.save()

    res.redirect('/' )

  })
})

app.get('/shifts/edit/:id', function(req, res){
  Shift.findById(req.params.id, function( err, shift ) {
    res.render('shifts/edit',  shift)
  })
})

app.get('/shifts/delete/:id', function(req, res){
  Shift.findById(req.params.id, function( err, shift ) {
    shift.remove()
    res.redirect('/')
  })
})

app.post('/shifts', function(req, res){
  var newShift = new Shift({
    startTime: Date.parse(req.body.startTime)
  })
  newShift.save()
  console.log("New Shift Started at",newShift.startTime)
  res.send({redirect: '/'})
})

app.listen(process.env.PORT || 3000, function() {
  console.log('listening on port 3000');
})
