const debug = require("debug")('app:synchronousFileReader');
const fs = require("fs");

function readFileSynchronously(path) {
  try {
    const start = Date.now();
    const sessions = fs.readFileSync(path, 'UTF-8');
    const end = Date.now();
    debug("Returned sessions data length: " + JSON.parse(sessions).length + ' items ...');
    // debug(`Read file content in ${(end - start)/1000} seconds`);
  } catch (error) {
    debug('Log the rr to console: ' + error);
  }
}

function dummyFunction() {

}

// An Ex. to export multiple components from a module
module.exports = {readFileSynchronously, dummyFunction};