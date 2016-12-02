/**
 * AssociationController
 *
 * @description :: Server-side logic for managing Associations
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var http = require('http');
var escape = require('escape-html');
var async = require('async');
var _ = require('lodash');

module.exports = {
	getassocs: function (req,res,next) {
		if (!req.body.lat || req.body.lat=="" || req.body.lat==null) return res.send({error: "no lat"});
		if (!req.body.lon || req.body.lon=="" || req.body.lon==null) return res.send({error: "no lon"});
		if (!req.body.action || req.body.action=="" || req.body.action==null) return res.send({error: "no action"});
		

		function calculateDistance(lat1, long1, lat2, long2)
		{    

	      //radians
	      lat1 = (lat1 * 2.0 * Math.PI) / 60.0 / 360.0;      
	      long1 = (long1 * 2.0 * Math.PI) / 60.0 / 360.0;    
	      lat2 = (lat2 * 2.0 * Math.PI) / 60.0 / 360.0;   
	      long2 = (long2 * 2.0 * Math.PI) / 60.0 / 360.0;       


	      // use to different earth axis length    
	      var a = 6378137.0;        // Earth Major Axis (WGS84)    
	      var b = 6356752.3142;     // Minor Axis    
	      var f = (a-b) / a;        // "Flattening"    
	      var e = 2.0*f - f*f;      // "Eccentricity"      

	      var beta = (a / Math.sqrt( 1.0 - e * Math.sin( lat1 ) * Math.sin( lat1 )));    
	      var cos = Math.cos( lat1 );    
	      var x = beta * cos * Math.cos( long1 );    
	      var y = beta * cos * Math.sin( long1 );    
	      var z = beta * ( 1 - e ) * Math.sin( lat1 );      

	      beta = ( a / Math.sqrt( 1.0 -  e * Math.sin( lat2 ) * Math.sin( lat2 )));    
	      cos = Math.cos( lat2 );   
	      x -= (beta * cos * Math.cos( long2 ));    
	      y -= (beta * cos * Math.sin( long2 ));    
	      z -= (beta * (1 - e) * Math.sin( lat2 ));       

	      return (Math.sqrt( (x*x) + (y*y) + (z*z) )/1000);  
		};

		Association.find().exec(function(err,result){
			console.log(result);
			if(err) return res.send(err);
			var restmp=[];
			async.forEach(result,function(association, callback){
				if( _.find(association.ressources, {action:req.body.action}) && _.find(association.ressources, {action:req.body.action}).status){	
			  		var km = calculateDistance(req.body.lat,req.body.lon,association.lat,association.lon);
			  		restmp.push({name:association.name,dist:km});
				}
			 	callback(); 
			}, function(err){
			 if(err){throw err;}
			restmp.sort(function(a, b) {
			    return parseFloat(a.km) - parseFloat(b.km);
			});

			res.send({data:restmp});
			});
		});
	}
};

