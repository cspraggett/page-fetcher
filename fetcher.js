const request = require("request");
const fs = require("fs");
const [site, path] = process.argv.slice(2);

request(site, (error, response, body) => {
  if (error) {
    throw new Error(error.message);
  }
  fs.writeFile(path, body, () => {
    console.log(`Downloaded and saved ${body.length} bytes to ${path}`);
  });
});
