//dependencies

const fs = require("fs");
const { Module } = require("module");
const path = require("path");

const lib = {};

// base directory of the data folder
lib.basedir = path.join(__dirname, "/../.data/");

//write data to file
lib.create = function (dir, file, data, callback) {
  // open file for writing
  fs.open(
    `${lib.basedir + dir}/${file}.json`,
    "wx",
    function (err, fileDescriptor) {
      console.log(fileDescriptor);
      if (!err && fileDescriptor) {
        // convert data to string
        const stringData = JSON.stringify(data);
        fs.writeFile(fileDescriptor, stringData, function (err2) {
          if (!err2) {
            fs.close(fileDescriptor, function (err3) {
              if (!err3) {
                callback(false);
              } else {
                callback("Error Closing the new file");
              }
            });
          } else {
            callback("Error writing to new file!");
          }
        });
      } else {
        callback(`There was an Error ${err}`);
      }
    }
  );
};
//read data from file
lib.read = (dir, file, callback) => {
  fs.readFile(`${lib.basedir + dir}/${file}.json`, "utf-8", (err, data) => {
    callback(err, data);
  });
};

///update existing file
lib.update = (dir, file, data, callback) => {
  //file open for writing
  fs.open(`${lib.basedir + dir}/${file}.json`, "r+", (err, fileDescriptor) => {
    console.log(fileDescriptor);
    if (!err && fileDescriptor) {
      // convert the data to string
      const stringData = JSON.stringify(data);

      //truncate the file
      fs.ftruncate(fileDescriptor, (err2) => {
        if (!err2) {
          fs.writeFile(fileDescriptor, stringData, (err3) => {
            if (!err3) {
              fs.close(fileDescriptor, (err4) => {
                if (!err4) {
                  callback(false);
                } else {
                  callback(`Error closing file ${err4}`);
                }
              });
            } else {
              callback(`Writing to file ${err3}`);
            }
          });
        } else {
          callback(`Error Truncating file! ${err2}`);
        }
      });
    } else {
      callback(`Error updating file may not exist ${err}`);
    }
  });
};
//delete existing file

lib.delete = (dir, file, callback) => {
  //unlink file
  fs.unlink(`${lib.basedir + dir}/${file}.json`, (err) => {
    if (!err) {
      callback(false);
    } else {
      callback(`Error Deleting file ${err}`);
    }
  });
};
module.exports = lib;
