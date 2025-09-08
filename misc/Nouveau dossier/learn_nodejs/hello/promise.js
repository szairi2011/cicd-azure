const https = require("https");

const print = require("./easy_print");

print('Testing local dependency ...');

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = "";
      res.on("data", (rd) => (data = data + rd));
      res.on("end", () => resolve(data));
      res.on("error", reject);
    });
  });
}

// Using traditional then/catch to consume the promise
fetch("https://www.google.com").then((data) => {
  console.log("The returned data length: ", data.length);
});

async function cuter() {
    const data = await fetch('https://www.javascript.com/');
    
    console.log(`The returned data length for JS site: ${data.length}`)
};

cuter();
