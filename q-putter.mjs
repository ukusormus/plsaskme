/**
 * @fileoverview Overwrites questions in public/questions/<filename>, where <filename> is language code
 * @usage node q-putter.mjs <filename.tsv>
 * @example node q-putter.mjs en-spicy.tsv
 */


import nReadlines from "n-readlines";
import fs from "fs-extra";


const currentDir = process.env.PWD;
console.log(`\n--- Starting q-putter.mjs in '${currentDir}'`);


// e.g argv["node", "q-putter.mjs", "en-spicy.tsv"] -> "en-spicy.tsv"
const fileToProcess = process.argv.slice(2).toString();

// Check if .tsv file supplied as argument, otherwise exit
if (fileToProcess === "") {
    console.error("\n! Error: no argument supplied. Please supply the .tsv file as an argument.");
    console.error("Usage: 'node q-putter.mjs <filename.tsv>', where <filename> is the lang-spicy code, e.g. 'en-spicy'.")
    process.exit(1);
}

// Check if that .tsv file exists in current directory, otherwise exit
if (!fs.pathExistsSync(`${fileToProcess}`)) {
    console.error(`\n! Questions table file '${fileToProcess}' not found or accessible in current dir.`);
    process.exit(1);
}
console.log(`--- Questions table file '${fileToProcess}' found.`)



// Check if the directory of questions exists in current directory, otherwise exit
const questionsDir = currentDir + "/public/questions/";

if (!fs.pathExistsSync(questionsDir)) {
    console.error(`! Dir '/public/questions/' not found or not accessible in current dir '${currentDir}', 
    please change current script's location or permissions.`)
    process.exit(1);
}
console.log("--- Directory '/public/questions/' found.")



// Ensure that the lang-spicy subfolder specified by the .tsv file directory is empty. 
// Deletes its contents if not empty. 
// If that directory does not exist, it is created. The directory itself is not deleted.

// e.g. /public/questions/en-spicy
const langSpicyDir = questionsDir + fileToProcess.split(".")[0] + "/";

console.log(`\n--- Emptying contents of '${langSpicyDir}' if dir exists, otherwise creating that dir.`);
fs.emptyDirSync(langSpicyDir);
console.log(`--- '${langSpicyDir}' emptied successfully\n`)


const broadbandLines = new nReadlines(fileToProcess);

let line;
let lineCount = 0;

while (line = broadbandLines.next()) {

    // 1. Write to public/questions/<filename>
    fs.writeFile(langSpicyDir + lineCount, line.toString(), err => {
        if (err) {
            console.error("! Error writing file.");
            console.error(`lineCount: ${lineCount} -- line.toString(): ${line.toString()}`);
            console.error("\nError message: ");
            console.error(err);
            process.exit(1);
        }
    });
    lineCount++;
}

console.log(`--- Questions count: ${lineCount}`);

console.log("--- Writing 'count' file...")
fs.writeFile(langSpicyDir + "count", lineCount.toString(), err => {
    if (err) {
        console.error("! Error writing count file.");
        console.error("\nError message: ");
        console.error(err);
        process.exit(1);
    }
});

console.log("--- Success! Exiting...")