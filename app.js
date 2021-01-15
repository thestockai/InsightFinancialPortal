const http = require('http');
var fs = require('fs');
const url = require('url');
const path = require("path");

const hostname = '127.0.0.1';
const port = 3000;
//
// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });

const server = http.createServer((req, res) => {
  var my_path = decodeURIComponent(url.parse(req.url).pathname);
  res.writeHead(200, {'content-type' : 'text/html'})
  fs.createReadStream('index.html').pipe(res)
});
//
// fs.readFile('./IvyOnlineTest3.html', function (err, html) {
//
//     if (err) throw err;
//
//     http.createServer(function(request, response) {
//         response.writeHeader(200, {"Content-Type": "text/html"});
//         response.write(html);
//         response.end();
//     }).listen(port);
// });

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
