/** 
 * ## Passport
 *
 * Logic for authentificating user lies here.
 */
'use strict';

/** Loading Passport */
var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    bcrypt = require('bcrypt');

/** After passport serializes the object, return the id */
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

/** Passport deserializes the user by id and returns the full user object. */
passport.deserializeUser(function(id, done) {
  Personne.findOne({ id: id } , function (err, user) {
      done(err, user);
  });
});


/**
 * This is the holy grail of the strategy. When a request comes in
 * we try and find the user by email and see if their passport
 * is correct.
 */
var verifyHandler = function(req ,mail, password, done) {
  process.nextTick(function() {
      Personne.findOne({ email: mail }).exec(function(err, user) {
        if (err || !user) {
          return done(err);
        }

        bcrypt.compare(password, user.password, function(err, res) {
          if (!res) {
            return done(null, false, {message: 'Mot de passe incorrect'});
          }

          else {
            /** The user's password is correct, so log them in. */
            req.logIn(user, function(err) {
              if (err) {
                return done(null, false, {message: err});
              }
              return done(null, user, {message: 'Connecté avec succès'});
            });
          }
        });
      });
  });
};

var verifyHandlerAssoc = function(req ,mail, password, done) {
  process.nextTick(function() {
      Association.findOne({ name: mail }).exec(function(err, user) {
        if (err || !user) {
          return done(err);
        }

        bcrypt.compare(password, user.password, function(err, res) {
          if (!res) {
            return done(null, false, {message: 'Mot de passe incorrect'});
          }

          else {
            /** The user's password is correct, so log them in. */
            req.logIn(user, function(err) {
              if (err) {
                return done(null, false, {message: err});
              }
              return done(null, user, {message: 'Connecté avec succès'});
            });
          }
        });
      });
  });
};

/** Register the LocalStrategy with Passport. */
passport.use('local', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true

}, verifyHandler));

passport.use('localassoc', new LocalStrategy({
  usernameField: 'name',
  passwordField: 'password',
  passReqToCallback: true

}, verifyHandlerAssoc));

passport.use('facebook',new FacebookStrategy({
    clientID: "1025320690924678",
    clientSecret: "97bcdae35b1894a725133c61689d67e4",
    callbackURL: "http://localhost:1337/facebook-callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));
