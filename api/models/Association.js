/**
 * Association.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var bcrypt = require('bcrypt');

module.exports = {

  attributes: {
  	name:{
  		type: "String",
  		required: true,
  		unique: true
  	},
  	email:{
  		type: "String",
  	},
  	phone_number:{
  		type: "String"
  	},
  	password:{
  		type: "String",
  		required: true
  	},
  	adress:{
  		type: "String",
  		required: true
  	},
  	lat:{
  		type: "float",
  		required: true
  	},
  	lon:{
  		type: "float",
  		required: true
  	},
  	ressources:{
  		type: "array"  		
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

