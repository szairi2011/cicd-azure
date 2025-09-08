const express = require('express');

const server = express();

// Add GET http listener on route '/'
server.get('/', (req, res) => {
    res.send('Hello from root ...')
})

// Add GET http listener on route '/'
server.get('/about', (req, res) => {
    res.send('Hello from about ...')
})

const port = 3000;
server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})

