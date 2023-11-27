const fs = require("fs");
const path = require("path");

const directoryPath = path.join(__dirname, "./jobsQuestion"); // update with the actual path
const baseUrl = "https://job-search-log.vercel.app/jobs/";

fs.readdir(directoryPath, function (err, files) {
  if (err) {
    return console.log("Unable to scan directory: " + err);
  }

  let sitemap =
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Adding the home page
  sitemap +=
    "  <url>\n    <loc>" +
    baseUrl.replace("/jobs/", "") +
    "</loc>\n    <lastmod>2023-11-08T15:28:11+00:00</lastmod>\n  </url>\n";

  files.forEach(function (file) {
    if (path.extname(file) === ".json") {
      const jobName = file.replace(".json", "");
      sitemap +=
        "  <url>\n    <loc>" +
        baseUrl +
        jobName +
        "</loc>\n    <lastmod>2023-11-08T15:28:11+00:00</lastmod>\n  </url>\n";
    }
  });

  sitemap += "</urlset>";

  fs.writeFile("sitemap.xml", sitemap, function (err) {
    if (err) throw err;
    console.log("Sitemap generated!");
  });
});
