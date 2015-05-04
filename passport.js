'use strict';

var passport = require('passport'),
  path = require('path');

module.exports = function() {
  // Serialize sessions
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // Deserialize sessions
  passport.deserializeUser(function(id, done) {
    done(null, {id: id});
  });

  // Initialize strategies
  require(path.resolve('./app/strategies/local'))();
};

