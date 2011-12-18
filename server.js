//
// Globals
//
var portno = 80;		// The network port to listen on. 

//includes
var web = require("./web");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

//build possible paths
var handle = {};
handle["/math/get"] = requestHandlers.math.get;
handle["/math/put"] = requestHandlers.math.put;

//
// Start running here.
//
processCmd();			// Process Command Line args.
web.start(router.route, handle, portno);

//
// Command line processing
//
var argvskip = false;

function processCmd() {
    process.argv.forEach(function (val, index, array) {
	switch(val)
	{
		case "--port":
		case "-p":
		    portno = array[index+1];
		    argvskip = true;
		    break;
		default:
		    if (index >= 2 && argvskip == false) { // TODO Improve way to detect if we're past the node args
				printusage();
		    } else {
				argvskip = false;
		    }
	}
    });
}

function printusage() {
    console.log ("usage: server.js [-p|--port] <portnumber>");
    process.exit(1);
}