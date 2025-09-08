const debug = require("debug")('app:asyncCustomPromiseFileReader');
const fs = require("fs");

function readFileUsingCustomPromise(path) {
  const sessionsPromise = new Promise((resolve, reject) => {
    return fs.readFile(path, 'UTF-8', (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
  return sessionsPromise;
}

module.exports = readFileUsingCustomPromise;