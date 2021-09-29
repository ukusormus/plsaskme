/* Helper functions */
export { asteriskToBold, random };

/** Converts words wrapped into asterisks into words wrapped into HTML "strong" tags */
const asteriskToBold = (str) => {
    let result = Array.from(str);
    let first = false;
    for (let i = 0; i < result.length; i++) {
        if (result[i] === "*") {
            first = !first;
            result[i] = first ? "<strong>" : "</strong>";
        }
    }

    return result.join("");
}

/**  Get random integer between min (inclusive) and max (inclusive) */
const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// TODO: classes are not hoisted like functions (moved to top during runtime), move to different
class QuestionHistory {
    /** TODO */
    static insert = (id) => {
        console.log("inserted " + id + " into local storage")
    }

    /** TODO */
    static list = (id) => {

    }

    /** TODO */
    static clear = (id) => {

    }

    /** TODO: Returns boolean value whether question is found in local storage history */
    static contains = (id) => {

    }
}