const mongoose = require('mongoose');
var Schema = mongoose.Schema

var shiftSchema = new Schema({
  startTime: { type: Date },
  endTime: { type: Date },
  productivity: {type:Number, default: 0}
})


var Shift = mongoose.model( 'Shift', shiftSchema )

module.exports = Shift
