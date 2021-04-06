const express = require("express");
let app = express();
const mysql2 = require('mysql2');
const mysql = require('mysql');
const config = require('./config');



/*
*		server create
*/
const server = app.listen(config.serverPort, function(){
  console.log("Node.js is listening to PORT:" + server.address().port);
});

/*
*   database connection
*/
exports.connection = mysql.createConnection(config.db_setting);
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
app.use('/reservation', require('./func/reservation.js'));

