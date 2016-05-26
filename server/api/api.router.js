'use strict';

var router = require('express').Router();

router.use('/users', require('./users/user.router'));

router.use('/stories', require('./stories/story.router'));

router.use('/signup', require('./auth/signup.router'));

router.use('/login', require('./auth/login.router'));

router.use('/auth', require('./auth/me.router'));

router.use('/logout', require('./auth/logout.router'));

module.exports = router;
