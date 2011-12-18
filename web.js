/**
 * @author cgriffin
 */
var http = require("http");
var url = require("url");

function start(route, handle, portno) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    route(handle, pathname, response, request);
  }

  http.createServer(onRequest).listen(portno);
  console.log("Server has started.");
}

exports.start = start;