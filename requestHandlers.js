var querystring = require("querystring"),
    fs = require("fs"),
    url = require("url");

var db = require("./database");
db.start();				// Start connection to MongoDb
	
var math = {
	"get" : function (res) {
		console.log("Processing Request for math.get");
		db.get("math", {}, function (err, docs) {
    		if (err) {
    			res.writeHead(200, {"Content-Type": "text/html"});
				res.end("Query error:" + err, "utf-8");
    			return;
    		}
    		
			res.writeHead(200, {"Content-Type": "text/html"});
			res.end(JSON.stringify(docs), "utf-8");
    	});
	},
	"put" : function (res, req) {
		console.log("Processing Request for math.put");
		
		var urlparts = url.parse(req.url);
		var querystring = urlparts.query.split("&");
		
		var user = "";
		var time = "";
		var date = "";
		
		var patt_user = /user=/;
		var patt_time = /time=/;
		var patt_date = /date=/;
		
		querystring.forEach(function (item) {
		    if (patt_user.test(item)) { 
				user = item.replace(patt_user,"");
				user = decodeURI (user);
				user = user.replace(/\+/g," "); // TODO: better way to pass in " " in parameters like a post body.
				user = user.substr(0,20);	  // For safety, truncate to 20 chars.
		    } else if (patt_time.test(item)) {
				time = item.replace(patt_time,"");
				time = decodeURI (time);
				time = time.replace(/\+/g," "); // TODO: better way to pass in " " in parameters like a post body.
				time = time.substr(0,20);	  // For safety, truncate to 20 chars.
		    } else if (patt_date.test(item)) {
				date = item.replace(patt_date,"");
				date = decodeURI (date);
				date = date.replace(/\+/g," "); // TODO: better way to pass in " " in parameters like a post body.
				date = date.substr(0,20);	  // For safety, truncate to 20 chars.
		    }
		});
		
		var data = {"user":user,"time":time,"date":date};
		console.log(data);
		db.put("math", data, function (err, docs) {
			if (err) {
			    console.log("Insert error", err);
			    return;
			}
		});
		
		res.writeHead(200, {"Content-Type": "text/html"});
		res.end(JSON.stringify(data), "utf-8");
	}
};

exports.math = math;