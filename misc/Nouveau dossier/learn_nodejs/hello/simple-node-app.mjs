// import http from 'http';
import { createServer } from 'http';

var server = createServer(function(req, res) {
    res.writeHead(200, {'Content-Type':'text/html'});
    res.end('Hello world 2');
});

server.listen(3000, () => {
    console.log('The server is running on port: 3000')
});