'use strict';

var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var Seat = require('./seat.model');

function handleError (res, err) {
  return res.status(500).send(err);
}

/**
 * Creates a new user in the DB.
 *
 * @param req
 * @param res
 */
exports.create = function (req, res) {
	var newSeat = new Seat();
	newSeat.userID = req.body.userid;
	newSeat.seat = req.body.seat;
	newSeat.startTime = req.body.start;
	newSeat.endTime = req.body.end;

	newSeat.save(function(err, meet, count){
		if(err)
			return handleError(res, err);
		else
			res.status(200).json({message : "Create Success"});
	})

};

/**
 * Return the current logged user.
 *
 * @param req
 * @param res
 */
exports.getSeat = function (req, res) {
  Seat.findOne({
    userid: req.body.userid
  }, function (err, row) {
    if (err){ 
    	return handleError(res, err); 
    }
    if (!row){
    	return res.json(401);
    }
    res.status(200).json(row);
  });
};





// var Connection = require('tedious').Connection;
// var Request = require('tedious').Request;
// var TYPES = require('tedious').TYPES;
// var config = {
// 	server: 'ntu-library.database.windows.net',
// 	userName: 'CApopsicle@ntu-library.database.windows.net',
// 	password: 'HackNTU2015',
// 	options: {encrypt: true, database: 'ntu-library'}
// };
// var connection = new Connection(config);






//  function executeStatement() {
// 	var request = new Request( "select * From ntu-library", function(err, rowCount) {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			console.log(rowCount + ' rows');
// 		}
// 		connection.close();
// 	});
// 	request.on('done',function(rowCount, more) {
// 		console.log(rowCount +' rows returned' );
// 	});
// 	connection.execSql(request);
// }

// connection.on('connect',function(err){
// 	if(err)
// 		console.log(err)
// 	else
// 		console.log("Connection connected")
// 	// executeStatement()
// 	// insertData()
// })
// function insertData(){
// 	var request = new Request("INSERT INTO MyTable (uniqueIdCol, intCol, nVarCharCol) VALUES (@uniqueIdVal, @intVal, @nVarCharVal)",function(err){
// 		if(err){
// 			console.log(err);
// 		};
// 	});
	
// 	request.addParameter('uniqueId', TYPES.UniqueIdentifierN,'ba46b824-487b-4e7d-8fb9-703acdf954e5');
// 	request.addParameter('ID', TYPES.VarChar, "A001");
// 	request.addParameter('com', TYPES.Binary, true);
// 	connection.execSql(request);
// }





