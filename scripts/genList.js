const path = require("path");
const fs = require("fs");
const util = require('util');

const directoryPath = path.join(__dirname, "../templates");
const readFile = util.promisify(fs.readFile);
const readdir = util.promisify(fs.readdir);
const writeFile = util.promisify(fs.writeFile);
const commentIndicator = "//";
const commentRegex = new RegExp(`^${commentIndicator}`);

(async () => {
  try {
    const files = await readdir(directoryPath);
    const templates = await Promise.all(files.map(async (file) => {
      const data = await readFile(
        path.join(__dirname, `../templates/${file}`),
        "utf8"
      );
      const lines = data.split("\n");
      const lastTagIndex = lines.findIndex((line) => !line.startsWith(commentIndicator));
      // If there are no tags
      if (lastTagIndex === 0) return { name: file };
      // Get the lines that are tags
      const tagLines = lines.slice(0, lastTagIndex);
      const urlIndex = tagLines.findIndex((line) => line.match(/^\/\/ https?:\/\//));
      const url =
        urlIndex > -1
          ? tagLines[urlIndex].split(commentRegex)[1].trim()
          : null;
      if (urlIndex > -1) tagLines.splice(urlIndex, 1);
      const tags = tagLines.map((line) => line.split(commentRegex)[1].trim());
      return ({
        name: file,
        url,
        tags,
      });
    }));
    await writeFile(path.join(__dirname, "../templates.json"), JSON.stringify(templates, null, 2));
  } catch (e) {
    console.error("Ow I hit my head on something: ", e);
  }
})()
