var querystring = require("querystring"),
    fs = require("fs");

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
	}	
};

exports.math = math;