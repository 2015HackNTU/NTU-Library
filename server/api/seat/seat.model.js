'use strict';

var crypto = require('crypto');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SeatSchema = new Schema({
  userID: String,
  seat: String,
  startTime: Date,
  endTime: Date
});

SeatSchema.methods = {

};

module.exports = mongoose.model('Seat', SeatSchema);
