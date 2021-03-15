
const serverPort = 9000;
const express = require("express");
var app = express();
const mysql2 = require('mysql2');
const mysql = require('mysql');
const db_setting = require('./config');



/*
*		server create
*/
var server = app.listen(serverPort, function(){
  console.log("Node.js is listening to PORT:" + server.address().port);
});

/*
*   database connection
*/
exports.connection = mysql.createConnection(db_setting);
exports.connection.connect((error) => {
	if(error){
		console.log('Error!! mysql connection:' + error.stack);
		return;
	}
  console.log('mysql connection success');
});

/*
*	  request '/user'
*/
app.use('/user', require('./func/user.js'));

/*
*   request '/hospital'
*/
app.use('/hospital', require('./func/hospital.js'));

/*
*   request '/reservation'
*/
// app.use('/reservation', require('./func/reservation.js'));

