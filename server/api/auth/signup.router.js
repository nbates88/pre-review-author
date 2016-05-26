'use strict'

var router = require('express').Router();
var HttpError = require('../../utils/HttpError');
var User = require('../users/user.model');


router.post("/", function(req, res, next) {
	console.log("we are here", req.body)
	User.create(req.body)
	.then(function(user){
		// if (!user) {
		// 	res.sendStatus(401);
		// }
		// else {

			var hour = 3600000;
			req.session.userId = user.id;
			req.session.cookie.maxAge = 14 * 24 * hour;
			res.send(user);
		// }
	})
	.catch(next);
});

module.exports = router;

//curl http://localhost:8080/login -X POST -d '{"email": "zeke@zeke.zeke", "password": "123"}' --cookie-jar cookies.txt

