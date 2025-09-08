const debug = require("debug")('app:asyncCallbackFileReader');
const fs = require("fs");

function readFileAsynUsingCallback(path) {
  const start = Date.now();
  fs.readFile(path, 'UTF-8', (err, data) => {
    const end = Date.now();
    if (err) 
      debug(`Error following an asynchronous callback: ${err}`);
    else
      debug("Returned sessions usng callback: " + JSON.parse(data).length + ' items ...');
      // debug(`Read file content in ${(end - start)/1000} seconds`)
  });
}

module.exports = readFileAsynUsingCallback;