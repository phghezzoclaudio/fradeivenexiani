const fs = require("fs-extra")
const {DOMParser} = require("xmldom")
const togeojson = require("@tmcw/togeojson")

const input="./data/gpx"
const output="./public/Cycleroutes"

fs.ensureDirSync(output)

const files=fs.readdirSync(input)

files.forEach(file=>{

 if(!file.endsWith(".gpx")) return

 const gpx=fs.readFileSync(`${input}/${file}`,"utf8")

 const dom=new DOMParser().parseFromString(gpx)

 const geojson=togeojson.gpx(dom)

 const name=file.replace(".gpx",".geojson")

 fs.writeJsonSync(`${output}/${name}`,geojson)

})