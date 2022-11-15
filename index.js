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
    res.write(`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
      </head>
      <body>
        <form method="post" action="/process">
          <input name="message" />
        </form>
      </body>
    </html>

    `);
    res.write("How are you");
    res.end();
  } else if ((req.url === "/process") & (req.method === "POST")) {
    // const body = [];
    // req.on("data", (chunk) => {
    //   res.write(chunk.toString());
    // });
    req.pipe(res);
    // req.on("end", () => {
    //   console.log("Stream Finished");
    //   const parsedBody = Buffer.concat(body).toString();
    //   console.log(parsedBody);
    //   res.write(parsedBody);
    //   res.end();
    // });
    // res.write("Thank you for submitted\n");
  } else {
    res.write("Not Found!!!!\n");
    res.end();
  }
});

server.listen(8000, () => {
  console.log("Server is running");
});

// const ourReadStream = fs.createReadStream(`${__dirname}/bigData.txt`, "utf-8");
// ourReadStream.on("data", (data) => {
//   console.log(data);
// });
// const ourReadStream = fs.createReadStream(`${__dirname}/bigData.txt`, "utf-8");
// const ourWriteStream = fs.createWriteStream(`${__dirname}/output.txt`);
// // ourReadStream.on("data", (chunk) => {
// //   ourWriteStream.write(chunk);
// // });
// ourReadStream.pipe(ourWriteStream);
