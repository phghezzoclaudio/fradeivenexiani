const fs = require("fs-extra");
const { DOMParser } = require("xmldom");
const togeojson = require("@tmcw/togeojson");
const path = require("path");

const input = "./data/gpx";
const output = "./public/Cycleroutes";

fs.ensureDirSync(output);

const files = fs.readdirSync(input);

files.forEach(file => {

  if (!file.endsWith(".gpx")) return;

  const gpx = fs.readFileSync(path.join(input, file), "utf8");

  const dom = new DOMParser().parseFromString(gpx, "text/xml");

  const geojson = togeojson.gpx(dom);

  const name = file.replace(".gpx", ".geojson");

  fs.writeJsonSync(
    path.join(output, name),
    geojson,
    { spaces: 2 }
  );

  console.log(`✅ Creato ${name}`);

});