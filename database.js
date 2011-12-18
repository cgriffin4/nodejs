/**
 * @author cgriffin
 */
var mongoose = require("mongoose");  

// BELOW is to connect to running MongoDB server
databaseUrl = "dbh26.mongolab.com:27267";
databaseName = "nodejs";
username = "cgriffin4";
password = "Ifor1loveDaisy!";

var loginCredentials = username + ":" + password;
var dbUrl = databaseUrl;
var dbName = databaseName;

//
// Opens connection to MongoDB database, authenticates, logs successful connection.
//
function initializeDb() {
    mongoose.connection.on("open", function() {
	console.log("Connected to MongoDB successfully!");});
    mongoose.connect("mongodb://" + loginCredentials + "@" + dbUrl + "/" + dbName);	  
}

//
// Queries a MongoDB collection to retrieve data based on
// properties supplied by json parameter.
//
function query (collectionIdent, json, callback) {
    mongoose.connection.db.collection(collectionIdent, function (err, collection) {
        collection.find(json).toArray(callback);
    });
}

//
// Inserts into a MongoDB collection and returns inserted data
//
function insert (collectionIdent, json, callback) {
    mongoose.connection.db.collection(collectionIdent, function (err, collection) {
        collection.insert(json);
		});
}

exports.start = initializeDb;
exports.get = query;
exports.put = insert;