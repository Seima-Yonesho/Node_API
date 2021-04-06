var router = require("express").Router();
let app = require('../app');
let myconnection = app.connection;
const cors = require('cors');
const mysql2 = require('mysql2/promise');
const bodyParser = require('body-parser');
const config = require('../config');

router.use(cors({ origin: true, credentials: true }));
router.use(bodyParser.urlencoded({
	extended: true
}));

router.use(bodyParser.json());
router.post('/', async function(req, res){

  let values = [
    req.body.userID,
    req.body.hospitalID,
    req.body.date,
    req.body.time
  ]

  console.log(values);

  let connection
	try {
		connection = await mysql2.createConnection(config.db_setting)
		await connection.beginTransaction();

    const values = {
			user_id : parseInt(req.body.userID, 10),
			hospital_id : parseInt(req.body.hospitalID, 10),
			date : req.body.date,
			time : req.body.time,
		}

		const [row] = await connection.query('INSERT INTO reservations set ?', values);
		await connection.commit();
		res.json({
			status : "success",
			msg: '登録完了'
		});
	}catch(err){
		await connection.rollback();
    res.json({
      status: "error",
      error: "fail to uplord data"
    })
	}finally {
		connection.end();
		return
	}

});

router.get('/data/:userID', function(req, res){
  
  let userID = req.params.userID;

  myconnection.query(
		'SELECT * FROM reservations WHERE user_id = ? AND del_flg = 0', userID,
		(error, results) => {
			if(error){
				console.log('Error!!' + error.stack);
				res.status(400).send({ msg: 'Error!!' });
				return;
			}
      res.status(200).send(results);
		}
	)

});

router.get('/search/:userID', function(req, res){

  let userID = req.params.userID;

  myconnection.query(
		'SELECT * FROM reservations WHERE user_id = ? AND del_flg = 0', userID,
		(error, results) => {
			if(error){
				console.log('Error!!' + error.stack);
				res.status(400).send({ msg: 'Error!!' });
				return;
			}

      if(results != ''){
        res.status(200).send({ status: false });
      }
      else{
        res.status(200).send({ status: true });
      }

		}
	)

});

router.delete('/:id', function(req, res){
  
  let reservationID = req.params.id;

  myconnection.query(
		'update reservations set del_flg = 1 WHERE id = ?', reservationID,
		(error, results) => {
			if(error){
				console.log('Error!!' + error.stack);
				res.status(400).send({ msg: 'Error!!' });
				return;
			}

      res.status(200).send({ msg: '削除完了' });

		}
	)

});

module.exports = router;