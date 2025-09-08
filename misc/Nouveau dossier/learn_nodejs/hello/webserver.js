const http = require('http');

const requestListener = (req, res) => {
    // console.dir(req, {depth: 0});
    // console.log(req.url)
    console.dir(res, {depth: 0});
    res.write("First hello there ... \n");
    res.write("Second hello there ...");
    res.end();
}

const server = http.createServer();

server.on('request', requestListener);

const port = 4000
server.listen(port, () => {
    console.log(`Server is listening on port ${port} ...`);
});