/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var passport = require('passport');


module.exports = {
	_config: {
        actions: false,
        shortcuts: false,
        rest: false
    },

    login: function(req, res) {
        passport.authenticate('local', function(err, user, info) {
            //if ((err) || (!user)) {
            //    return res.send(info);
            //}
            req.logIn(user, function(err) {
                if (err) res.send(err);
                return res.send({data:'ok'});
            });

        })(req, res);
    },

    login_association: function(req, res) {
        passport.authenticate('localassoc', function(err, user, info) {
            //if ((err) || (!user)) {
            //    return res.send(info);
            //}
            req.logIn(user, function(err) {
                if (err) res.send(err);
                return res.send({data:'ok'});
            });

        })(req, res);
    },

    login_facebook: function(req,res){
    	passport.authenticate('facebook', function(err, user, info) {
            if ((err) || (!user)) {
                return res.send({data:'not user'});
            }
            req.logIn(user, function(err) {
                if (err) res.send(err);
                return res.send({data:'ok'});
            });

        })(req, res);
    },

    facebook_callback: function(req,res){
    	passport.authenticate('facebook', { failureRedirect: '/' }),
		  function(req, res) {
		    // Successful authentication, redirect home.
		    res.redirect('/');
		  };
    },

    logout: function(req, res) {
        req.logout();
        res.redirect('/');
    }
};

