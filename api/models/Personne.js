/**
 * Personne.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var bcrypt = require('bcrypt');

module.exports = {

  attributes: {
  	last_name:{
  		type: "String",
  		required: true
  	},
  	first_name:{
  		type: "String",
  		required: true
  	},
  	email:{
  		type: "String",
  		required: true,
  		unique: true
  	},
  	facebookId:{
  		type: "String",
  		unique: true
  	},
  	password:{
  		type: "String",
  		required: true
  	},
  	gender:{
  		type: "String",
  		enum: ['m', 'f'],
  		required: true
  	},
  	adress:{
  		type: "String",
  	},
  	situation:{
  		type: "String",
  		enum: ['refugee', 'donor'],
  		required: true
  	},
  	toJSON: function() {
        var obj = this.toObject();
        delete obj.password;
        return obj;
    }
  },
    beforeCreate: function(user, cb) {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) {
                    console.log(err);
                    cb(err);
                } else {
                    user.password = hash;
                    cb();
                }
            });
        });
    }
};

