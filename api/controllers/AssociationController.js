/**
 * AssociationController
 *
 * @description :: Server-side logic for managing Associations
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var http = require('http');
var escape = require('escape-html');
var async = require('async');

module.exports = {
	getassocs: function (req,res,next) {
		if (!req.body.adress || req.body.adress=="" || req.body.adress==null) return res.send({error: "no adress"});
		
		function getdata(callback,adress) {
			var escadress=escape(adress).replace(/\s/g, "+");
			http.get({
		        host: 'nominatim.openstreetmap.org',
		        path: '/?format=json&limit=1&addressdetails=1&q='+escadress
		    }, function(response) {
		        // Continuously update stream with data
		        var body = '';
		        response.on('data', function(d) {
		            body += d;
		        });
		        response.on('end', function() {

		            // Data reception is done, do whatever with it!
		            var parsed = JSON.parse(body)[0];
		            if (parsed && parsed.lat && parsed.lon){
			            callback({
			                lat: parsed.lat,
			                lon: parsed.lon
			            });
		            }
		            else{
		            	callback({
			                error:"no data"
			            });
		            }
		        });
		    });
		};

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

		getdata(function(obj){
			if (obj.error) return res.send({error:"wrong adress"});
			Association.find().exec(function(err,result){
				if(err) return res.send(err);
				var restmp=[];
				async.forEach(result,function(association, callback){
				    getdata(function(tmp){
					 	if (!tmp.error){	
						  	var km = calculateDistance(obj.lat,obj.lon,tmp.lat,tmp.lon);
						  	restmp.push({name:association.name,dist:km});
					 	}
					 	callback(); 
				  	},association.adress);
				}, function(err){
				 if(err){throw err;}
				 console.log(restmp);
				restmp.sort(function(a, b) {
				    return parseFloat(a.km) - parseFloat(b.km);
				});

				res.send({data:restmp});
				});
			});
		},req.body.adress);
	}
};

