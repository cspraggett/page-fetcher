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
    throw new Error(error.message);
  }
  fs.access(path, fs.constants.F_OK, err => {
    if (!err) {
      rl.question(`${path} already exists, press 'y' to erase it: `, answer => {
        if (answer !== "y") {
          console.log("goodbye");
          rl.close();
        } else {
          fs.writeFile(path, body, () => {
            console.log(`Downloaded and saved ${body.length} bytes to ${path}`);
            rl.close();
          });
        }
      });
    } else {
      fs.writeFile(path, body, () => {
        console.log(`Downloaded and saved ${body.length} bytes to ${path}`);
      });
    }
  });
});
