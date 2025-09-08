const { createServer } = require("http");

const fun = (_server) => {
    console.log("Hi there ...");
    _server.listen(3000, () => {
        console.log('The server is up and running ...')
    })
}

const server = createServer((req, res) => {
    res.setHeader('Content-Type', 'plain/text')
    res.end("hello from node web server ...")
})

setTimeout(fun, 4*1000, server);