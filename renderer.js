function serverError(code, content) {
	res.writeHead(code, {"Content-Type": "text/plain"});
	res.end(content);
};

function renderHtml(content) {
	res.writeHead(200, {"Content-Type": "text/html"});
	res.end(content, "utf-8");
};

exports.error = serverError;
exports.render = renderHtml;