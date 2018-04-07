"use strict";
const fs = require('fs'),
    Canvas = require('canvas-prebuilt');

require('./Extruder.js');

let source = null;
let dest = null;
let dim = null;
let error = false;
let mode = null;
let promises = [];

process.argv.forEach(arg => {
    let lc = arg.toLowerCase();
    if (lc.endsWith("json")) {
        if (mode) {
            console.error("Can't define multiple source types");
            error = true;
        } else {
            mode = "tilemap";
        }
        if (!source) {
            source = arg;
            dim = fs.readFileSync(source, "utf8");
        } else {
            dest = arg;
        }
    } else if (lc.endsWith("png") || lc.endsWith("jpg")) {
        if (mode === "tilemap") {
            console.error("Can't define multiple source types");
            error = true;
        } else {
            mode = "image";
        }
        if (!source) {
            source = arg;
        } else {
            dest = arg;
        }
    } else if (lc > 0 && !dim) {
        dim = {
            x: parseInt(lc),
            y: parseInt(lc)
        };
    } else if (/^[0-9]*x[0-9]*$/.test(lc) && !dim) {
        let tmp = lc.split("x");
        dim = {
            x: parseInt(tmp[0]),
            y: parseInt(tmp[1])
        };
    }

});

if (!source) {
    console.error("No source file");
    error = true;
} else if (!dest) {
    dest = source.replace(/(\.[a-z]*?$)/, '.out$1');
}

if (!dim && mode !== "tilemap") {
    console.error("No dimensions specified! (16x16 = 16)");
    error = true;
}
if (!error) {
    const extruder = new Extruder();
    extruder.extrude(source, dest, dim);
    console.log("SUCCESS! Generated files can be found in ./extruded");
}