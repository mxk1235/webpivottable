'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;

module.exports = function() {
  // Use local strategy
  passport.use(new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password'
    },
    function(username, password, done) {
      console.log(username, password);
      done(null, {id: username});
    }
  ));
};
