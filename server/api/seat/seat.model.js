'use strict';

var crypto = require('crypto');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SeatSchema = new Schema({
  id: String,
  com: Boolean,
  cla: Boolean,
  win: Boolean,
  wal: Boolean,
  ais: Boolean,
  t:   Boolean,
  r:   Boolean,
  seat: String    
});

SeatSchema.methods = {

};

module.exports = mongoose.model('Seat', SeatSchema);
