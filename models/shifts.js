const mongoose = require('mongoose');
var Schema = mongoose.Schema

var shiftSchema = new Schema({
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date, default: Date.now },
  productivity: Number
})
