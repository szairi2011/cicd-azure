
const prt = require("sz_easy_print");

prt("test message ...");

function test() {
    console.log(arguments);
}

test(10,20,40,80);
