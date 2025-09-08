const debug = require("debug")("app");
const { readFileSynchronously } = require("./call_types/synchronousFileReader");
const readFileAsyncUsingCallback = require("./call_types/asyncCallbackFileReader");
const readFileUsingAsyncAwait = require("./call_types/asyncAwaitFileReader");
const readFileUsingCustomPromise = require("./call_types/asyncPromiseFileReader");
const EventEmitter = require("events");
// const fileMonitor = require('');

const fileMonitor = new EventEmitter();

/* 
  Few Ex. of event-driven programming approach
*/
    // 1st option :: listeners below will execute synchronously when the event gets elitted Register event listeners :: Few examples of an event-driven programming approach
fileMonitor.on("FileReadEvent", () => {
  debug(
    `A FileReadEvent was emitted and 1st listener synchronously handled it `
  );
});
    // 2nd option :: Asynchronous event execution by scheduling the task with the event loop Async queue using setImmediate(() => {})
fileMonitor.on("FileReadEvent", () => {
  setImmediate(() => debug(`A FileReadEvent was emitted and 3rd listener asynchronously handled it`));
});

fileMonitor.on("FileReadEvent", () => {
  debug(
    `A FileReadEvent was emitted and 2st listener synchronously handled it `
  );
});

const path = "sessions.json";

/* 
  An Ex. of a Synchronous call :: this will go in the default Task call stack/queue. The execution of each task will block the event loop untill it will return the result or fails
  **** This will impact the performance given the single threaded nature of the NodeJS event loop; so it should be avoided ****
*/
readFileSynchronously(path);

/* 
  An Ex. of an Asynchronous call using the callback approach :: These type of calls  will be put in a separate Async tasks call stack, 
  and the event loop will process them after finishing the execution of the synchronous tasks queue; 
  so these are 2nd in priority after the synchronous ones, and will be even 3rd in priority if there are Promises in the micro tasks queue
*/
readFileAsyncUsingCallback(path);

/* 
  An Ex. of an Aynchronous call using a basic Promise approach, i.e. no async / await :: These type of calls together with the async/await promisified flavours will be put in another call stack called micro tasks queue,
  and the event loop will process them prior to the Async tasks queue => Therefore, the Promise asynchronous prograamming approach is 
  preferred over the callback one since they will be processed in priority
*/
const sessionsPromise = readFileUsingCustomPromise(path);
sessionsPromise
  .then((sessions) => {
    debug(
      "Returned sessions using a custom promise: " +
        JSON.parse(sessions).length +
        " items ..."
    );
  })
  .catch((err) => {
    debug(
      "Custom promise has been rejected while reading file: " + err.message
    );
  })
  .finally(() => debug("Done with file reading using a custom promise"));

/* An Ex. of an Asynchronous call using Async / Await keywords */
// 1st option
readFileUsingAsyncAwait(path);

// 2nd option: When an async function returns a Promise<Of_Some_Type>, and we need to asynchronously process it from another piece of code
(async () => {
  try {
    const wrappedata = await readFileUsingAsyncAwait(path);
    debug("wrapped data: " + JSON.parse(wrappedata).length);
  } catch (error) {
    debug("Wrapped up promise section: " + error.message);
  }
})();

// Lets' emit the event now that the file has been read
fileMonitor.emit("FileReadEvent");
