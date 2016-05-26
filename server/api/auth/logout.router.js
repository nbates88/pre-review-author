'use strict'

var router = require('express').Router();
var HttpError = require('../../utils/HttpError');
var User = require('../users/user.model');


router.get("/", function(req, res, next) {
	req.session.userId = null;
	res.send("logged out");
});

module.exports = router;
