/**
 * @fileoverview Update the "count" file for each question directory in public/questions/.
 * @usage node q-counter.mjs
 */

/* Requires */
import { promises, readdir, stat as _stat, writeFile, lstatSync } from 'fs';

// The directory this script is ran from
const currentDir = process.env.PWD;
console.log("--- Starting q-counter.mjs in " + currentDir);

try {
    await promises.access(currentDir + "/public");
    // The check succeeded
} catch (error) {
    // The check failed
    console.error(`No folder found called 'public' in current dir (${currentDir}).`)
    process.exit(1);
}


// Directory of questions
const questionsDir = currentDir + '/public/questions/';

// Read files from ./public/questions into an array called files
readdir(questionsDir, (error, files) => {
    if (error) {
        console.error(`Error reading files from ${questionsDir}\n` + error);
        process.exit(1);
    }

    console.log(`--- Number of files in ${questionsDir}: ${files.length}`);
    console.log("--- Listing # of questions in different questions DB-s\n")

    // Loop over these files in ./public/questions
    for (let i = 0; i < files.length; i++) {

        const subdir = questionsDir + files[i];
        _stat(subdir, (error, stats) => {
            if (error) {
                console.error(`Error figuring if files in ${questionsDir} are directories\n` + error);
                process.exit(1);
            }

            // If file is a directory (e.g. public/questions/et)... 
            if (stats.isDirectory()) {
                // ... read files in that directory into "subfiles" array
                readdir(subdir, (error, subfiles) => {
                    if (error) {
                        console.error(error);
                    }

                    // Depending if count file already exists...
                    let countExists = false;
                    if (subfiles.includes("count")) countExists = true;

                    // ... save how many files does each question directory contain
                    const fileCount = countExists ? subfiles.length - 1 : subfiles.length

                    // Overwrite the count
                    writeFile(subdir + "/count", fileCount.toString(), error => {
                        if (error) {
                            console.error("Error writing count file.\n" + error)
                            process.exit(1);
                        }
                        console.log(`'${files[i]}': ${fileCount} -- count file overwrite OK.`)
                    })
                })
            }
        });
    }
});


