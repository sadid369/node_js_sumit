const path = require("path");
const os = require("os");
const fs = require("fs");
const School = require("./school");
const http = require("http");
// const myPath = "C:/Users/Sadid/Desktop/node js sumit/index.js";
// console.log(path.basename(myPath));
// console.log(path.dirname(myPath));
// console.log(path.extname(myPath));
// console.log(path.parse(myPath));

// console.log(os.cpus());
// fs.writeFileSync("myFile.txt", "Hello Programmer\n");
// fs.appendFileSync("myFile.txt", "How Are you");
// fs.readFile("myFile.txt", (err, data) => {
//   console.log(err);
//   console.log(data.toString());
// });
// console.log(`hello`);

// const emitter = new EventEmitter();
//register a listener for bellRing event
// const school = new School();
// school.on("bellRing", function (period) {
//   console.log(`We Need to Run because ${period.period} ${period.text}`);
// });
// // raise an event
// school.startPeriod();

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("Hello Programmers\n");
    res.write("How are you");
    res.end();
  } else if (req.url === "/about") {
    res.write("This is About page\n");
    res.end();
  } else {
    res.write("Not Found!!!!\n");
    res.end();
  }
});

server.listen(8000, () => {
  console.log("Server is running");
});
