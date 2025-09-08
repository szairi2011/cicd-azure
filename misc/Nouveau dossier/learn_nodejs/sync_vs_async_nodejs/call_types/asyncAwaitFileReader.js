const fs = require('fs');
const fsPromises = require('fs').promises;
const debug = require("debug")('app:asyncAwaitFileReader');

async function readFileUsingAsyncAwait(_path) {
  let sessions = null;

  try {
    // 1st option and probably most elegant option use a promisied function of the same API
    // sessions = await fsPromises.readFile(_path, 'UTF-8');
    
    // 2nd option Wrap the non promisified call around a custom Promise, e.g. when there is no promisified equivalent of the invoked API function
    sessions = await new Promise((resolve, reject) => {
      return fs.readFile(_path, 'UTF-8', (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
    
    debug("Returned sessions using Aync/Await keywords: " + JSON.parse(sessions).length + ' items ...');
  }
  catch(error) {
    debug(`Error following an asynchronous Async/Await: ${error.message}`);
  }
  return sessions;
}

module.exports = readFileUsingAsyncAwait;