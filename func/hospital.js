var router = require("express").Router();
let app = require('../app');
let connection = app.connection;
const mysql2 = require('mysql2/promise');
const cors = require('cors');
const db_setting = require('../config');

router.use(cors({ origin: true, credentials: true }));

router.get('/',　async function(req, res){

	let connection
	try {
		connection = await mysql2.createConnection(db_setting)
		await connection.beginTransaction();
		const [result] = await connection.query('SELECT * FROM hospitals');
		await connection.commit();
		res.status(200).send(result);
	}catch(err){
		await connection.rollback();
    res.json({
      status: "error",
      error: "fail to download data"
    });
	}finally {
		connection.end();
		return
	}

});

router.get('/search/:value', function(req, res){

  let value = '%' + req.params.value + '%';

  connection.query(
		'SELECT * FROM hospitals WHERE address LIKE ?', value,
		(error, results) => {
			if(error){
				console.log('Error!!' + error.stack);
				res.status(400).send({ msg: 'Error!!' });
				return;
			}
			// console.log(results);

			res.status(200).send(results);
		}
	)

});

module.exports = router;
