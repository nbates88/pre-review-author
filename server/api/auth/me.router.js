'use strict'

var router = require('express').Router();
var HttpError = require('../../utils/HttpError');
var User = require('../users/user.model');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// Google authentication and login 
router.get('/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

// handle the callback after Google has authenticated the user
router.get('/google/callback',
  passport.authenticate('google', {
    successRedirect : '/', // or wherever
    failureRedirect : '/' // or wherever
  })
);


router.get('/me', function(req, res, next) {
	var id = req.session.userId;
	// console.log("we are here", req.body)
	User.findOne({
		where: {id: id }
	})
	.then(function(user){
		console.log("ME!!!", user);
		res.send(user);
	})
	.catch(next);
});

module.exports = router;
