/**
 * @author cgriffin
 */

// BELOW is to connect to running MongoDB server
exports.databaseUrl = "dbh26.mongolab.com:27267";
exports.databaseName = "nodejs";
exports.username = "cgriffin4";
exports.password = "Ifor1loveDaisy!";

//
// allowedFiles: array of "inbound URL pathnames" mapped to allowed filenames to limit potentially malicious behaviors
//
exports.allowedFiles = { "/index.html" : "index.html",
			 "/" : "index.html",
			 "/LICENSE": "LICENSE"};