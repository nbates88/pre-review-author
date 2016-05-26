'use strict'; 

var app = require('express')();
var path = require('path');
var session = require('express-session');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../api/users/user.model');

app.use (
	session({
		secret: 'placeholder',
	})
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done){
	console.log("SERIALIZE", user); 
	done(null, user.id);
});

passport.deserializeUser(function(id, done){
	User.findById(id)
	.then(function(user){
		console.log("DESER", user);
		done(null, user);
	})
	.catch(function(err) {
		done(err);
	});
});


passport.use(
  new GoogleStrategy({
    clientID: '426059875370-uogjb3531o4gspmlqnib66mahsvpf57f.apps.googleusercontent.com',
    clientSecret: 'fMJiF-oLDNqfZGCbNl1cmqi6',
    callbackURL: 'http://localhost:8080/api/auth/google/callback'
  },
  // Google will send back the token and profile
  function (token, refreshToken, profile, done) {
  	console.log("PROFILE: ", profile)
  
    User.findOrCreate({
    	where:{
    	googleId : profile.id,
    	email: profile.emails[0].value,
    	name: profile.displayName,
    	photo: profile.photos[0].value
    	}
    })
    .then(function(user){
    	//console.log('!!!!!!!!!!! User', user[0].dataValue);
    	done(null, user[0].dataValues);
    })
    .catch(function(error){
    	done(error);
    })
  })
);


app.use(function(req, res, next){
	// console.log("SESSION", req.session);
	console.log("USER", req.user);
	next();
});

app.use(require('./logging.middleware'));

app.use(require('./request-state.middleware'));

app.use(require('./statics.middleware'));

app.use('/api', require('../api/api.router'));


var validFrontendRoutes = ['/', '/stories', '/users', '/stories/:id', '/users/:id', '/signup', '/login'];
var indexPath = path.join(__dirname, '..', '..', 'public', 'index.html');
validFrontendRoutes.forEach(function (stateRoute) {
  app.get(stateRoute, function (req, res) {
    res.sendFile(indexPath);
  });
});

app.use(require('./error.middleware'));

module.exports = app;
