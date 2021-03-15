var router = require("express").Router();
let app = require('../app');
let connection = app.connection;
const cors = require('cors');
const mysql2 = require('mysql2/promise');
const bodyParser = require('body-parser');


router.use(cors({ origin: true, credentials: true }));
router.use(bodyParser.urlencoded({
	extended: true
}));

router.get('/', function(req, res){

	connection.query(
		'SELECT * FROM users',
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

router.get('/:userID', function(req, res){

  let userID = parseInt(req.params.userID, 10);

  connection.query(
		'SELECT * FROM users WHERE id = ?', userID,
		(error, results) => {
			if(error){
				console.log('Error!!' + error.stack);
				res.status(400).send({ msg: 'Error!!' });
				return;
			}
			res.status(200).json(results);
		}
	)

});

router.use(bodyParser.json());
router.post('/login', function(req, res){

  let values = [
    req.body.email,
    req.body.password
  ]

  connection.query(
		'SELECT * FROM users WHERE email = ? AND password = ?', values,
		(error, results) => {
			if(error){
				console.log('Error!!' + error.stack);
				res.status(400).send({ msg: 'Error!!' });
				return;
			}
      if(results == ''){
        res.status(200).json({ id: 0 });
      }
      else {
			  res.status(200).json({ id: results[0].id});
      }
		}
	)

});



module.exports = router;
