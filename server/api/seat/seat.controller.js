'use strict';

// var config = require('../../config/environment');
// var jwt = require('jsonwebtoken');
// var Seat = require('./seat.model');

// function handleError (res, err) {
//   return res.status(500).send(err);
// }

// /**
//  * Creates a new user in the DB.
//  *
//  * @param req
//  * @param res
//  */
// // exports.create = function (req, res) {
// //   Seat.create(req.body, function (err, user) {
// //     if (err) { return handleError(res, err); }
// //     var token = jwt.sign(
// //       { _id: user._id },
// //       config.secrets.session,
// //       { expiresInMinutes: 60 * 5 }
// //     );
// //     res.status(201).json({ token: token, user: user });
// //   });
// // };

// /**
//  * Return the current logged user.
//  *
//  * @param req
//  * @param res
//  */
// exports.getSeat = function (req, res) {
//   console.log(res)
//   Seat.findOne({
//     _id: userId
//   }, '-salt -passwordHash', function (err, user) {
//     if (err) { return handleError(res, err); }
//     if (!user) { return res.json(401); }
//     res.status(200).json(user);
//   });
// };
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var config = {
	server: 'ntu-library.database.windows.net',
	userName: 'CApopsicle@ntu-library.database.windows.net',
	password: 'HackNTU2015',
	options: {encrypt: true, database: 'ntu-library'}
};
var connection = new Connection(config);






 function executeStatement() {
	var request = new Request( "select * From ntu-library", function(err, rowCount) {
		if (err) {
			console.log(err);
		} else {
			console.log(rowCount + ' rows');
		}
		connection.close();
	});
	request.on('done',function(rowCount, more) {
		console.log(rowCount +' rows returned' );
	});
	connection.execSql(request);
}

connection.on('connect',function(err){
	if(err)
		console.log(err)
	else
		console.log("Connection connected")
	// executeStatement()
	// insertData()
})
function insertData(){
	var request = new Request("INSERT INTO MyTable (uniqueIdCol, intCol, nVarCharCol) VALUES (@uniqueIdVal, @intVal, @nVarCharVal)",function(err){
		if(err){
			console.log(err);
		};
	});
	
	request.addParameter('uniqueId', TYPES.UniqueIdentifierN,'ba46b824-487b-4e7d-8fb9-703acdf954e5');
	request.addParameter('ID', TYPES.VarChar, "A001");
	request.addParameter('com', TYPES.Binary, true);
	connection.execSql(request);
}





