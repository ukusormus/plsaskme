/**
 * @fileoverview Update the count files for each directory in questions.
 */

console.log("This script is meant to be run from public/.. (remove this if things change)")
console.log("--- Starting q-counter.js in " + process.env.PWD);

const { table } = require('console');
// Requires
const fs = require('fs');

// Directory of questions
const dir = process.env.PWD + '/public/questions/';

// Read files from public/questions into "files" array (async)
fs.readdir(dir, (err, files) => {
    console.log(`--- Number of files in ${dir}: ${files.length}`);
    console.log("--- Listing # of questions in questions DB\n")
    // Loop over files in public/questions
    for (let i = 0; i < files.length; i++) {

        // If file is a directory (e.g. public/questions/et)... 
        if (isFileDir(dir + files[i])) {
            // ... read files in that directory into "subfiles" array (async)
            fs.readdir(dir + files[i], (err, subfiles) => {

                // Depending if count file already exists...
                let countExists = false;
                if (subfiles.includes("count")) countExists = true;

                // ... log how many files does each question directory contain, 
                const fileCount = countExists ? subfiles.length - 1 : subfiles.length

                console.log(`'${files[i]}': ${fileCount}`)

                // Overwrite the count (async)
                fs.writeFile(dir + files[i] + "/count", fileCount.toString(), err => {
                    if (err) {
                        console.error("Error writing count file.\n" + err)
                        return
                    }
                })
            })
        }
    }

    // testing
    // isFileDirr(dir).then((bool) => {
    //     console.log(bool)
    //     if (bool) {
    //         console.log("yes")
    //     }
    // });


});


/** Check if directory exists (sync) */
function isFileDir(path) {
    try {
        const stat = fs.lstatSync(path);
        return stat.isDirectory();
    } catch (e) {
        // lstatSync throws an error if path doesn't exist
        return false;
    }
}

// testing
// async function isFileDirr(path) {
//     return await fs.stat(path, (err, stats) => {
//         if (err) {
//             console.error("Checking whether file is a directory failed.\n" + err);
//             return
//         }

//         return stats.isDirectory();
//     });
// }

// isFileDirr(dir).then()