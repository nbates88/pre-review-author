'use strict';

var Sequelize = require('sequelize');

var db = require('../../_db');

var User = db.define('user', {
  name: Sequelize.STRING,
  photo: {
    type: Sequelize.STRING,
    defaultValue: '/images/default-photo.jpg'
  },
  phone: Sequelize.STRING,
  googleId: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: Sequelize.STRING,
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

module.exports = User;


//426059875370-uogjb3531o4gspmlqnib66mahsvpf57f.apps.googleusercontent.com
//fMJiF-oLDNqfZGCbNl1cmqi6