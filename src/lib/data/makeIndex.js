const fs = require("fs");
const path = require("path");

const directoryPath = path.join(__dirname, "./jobsQuestion");
const outputPath = path.join(__dirname, "./jobsQuestion/index.js");

fs.readdir(directoryPath, function (err, files) {
  if (err) {
    return console.log("Unable to scan directory: " + err);
  }

  let imports = "";
  let exports = "const jobsQuestion = {\n";

  files.forEach(function (file) {
    if (path.extname(file) === ".json") {
      const baseName = path.basename(file, ".json");
      const importName = baseName;

      imports += `import ${importName} from "./${file}";\n`;
      exports += `  ${importName},\n`;
    }
  });

  exports += "};\n\nexport default {\n  ...jobsQuestion,\n};";

  const outputContent = imports + "\n" + exports;
  fs.writeFileSync(outputPath, outputContent);

  console.log("File generated successfully!");
});
