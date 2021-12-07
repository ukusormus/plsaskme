/**
 * @fileoverview Overwrites questions in public/questions/<filename>
 * @usage node q-putter.mjs <filename.tsv>
 */

import nReadlines from 'n-readlines';
import fs from 'fs';

const fileToProcess = process.argv.slice(2).toString()

if (fileToProcess === "") {
    console.error("Please supply the file name as an argument.\nUsage: node q-putter.mjs <filename.tsv>\n");
    process.exit(1);
}

try {
    if (fs.existsSync(fileToProcess)) {
        console.log("--- File '" + fileToProcess + "' found.");
    } else {
        console.error("--- File '" + fileToProcess + "' not found.")
        process.exit(1);
    }
} catch (err) {
    console.error(err);
    process.exit(1);
}



const broadbandLines = new nReadlines(fileToProcess);

let line;
let lineCount = 0;

const currentCount = fs.readFileSync("") // TODO: add count file
const path = "public/questions/" + fileToProcess.split(".")[0];

while (line = broadbandLines.next()) {
    // console.log(`Line ${lineCount} has: ${line.toString()}`);

    // 1. Write to public/questions/<filename>
    fs.writeFile(path, line.toString(), error => {
        if (error) {
            console.error("Error writing file.\n" + error)
            process.exit(1);
        }
    })
    lineCount++;
}

// 2.