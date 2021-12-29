const http = require('http');
const fs = require('fs');
const mime = require('mime');

const hostname = '127.0.0.1';
const port = 4200;

const server = http.createServer((req, res) => {
	const path = __dirname + ('/' === req.url ? '/index.html' : req.url);

  fs.readFile(path, function (err, data) {
    if (err) {
      fs.readFile(__dirname + '/index.html', function (err, data) {
		    if (err) {
					res.writeHead(404);
					res.end('error' + JSON.stringify(err));
		    } else {
			    res.writeHead(200);
			    res.end(data);
		    }
		  });
    } else {
    	res.setHeader('Content-Type', mime.getType(path));
	    res.writeHead(200);
	    res.end(data);
    }
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
