const request = require("request");
const fs = require("fs");
const [site, path] = process.argv.slice(2);
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

request(site, (error, response, body) => {
  if (error) {
    console.log("Error, request not successful");
    process.exit();
  }
  // if (response.statusCode < 200 || response.statusCode >= 300) {
  //   console.log(
  //     `Request was unsuccessful, Error code: ${response.statusCode} `
  //   );
  //   process.exit();
  // }
  fs.access(path, fs.constants.F_OK, err => {
    if (!err) {
      rl.question(`${path} already exists, press 'y' to erase it: `, answer => {
        if (answer !== "y") {
          console.log("goodbye");
          rl.close();
        } else {
          fs.writeFile(path, body, err => {
            if (err) {
              console.log("Invalid file path");
              process.exit();
            }
            console.log(`Downloaded and saved ${body.length} bytes to ${path}`);
            rl.close();
          });
        }
      });
    } else {
      fs.writeFile(path, body, err => {
        if (err) {
          console.log("Invalid file path");
          process.exit();
        }
        console.log(`Downloaded and saved ${body.length} bytes to ${path}`);
      });
    }
  });
});
