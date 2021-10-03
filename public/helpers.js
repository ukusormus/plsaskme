/* Helper functions */
export { asteriskToBold, random, QuestionHistory };

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
    constructor(lang, spicy) {
        this.collection = spicy ? lang + "-spicy" : lang;
    }

    /** TODO */
    insert = (id) => {
        if (localStorage.getItem(this.collection) !== null) {
            localStorage.setItem(this.collection, localStorage.getItem(this.collection) + "," + id);
        } else {
            // First time
            localStorage.setItem(this.collection, id)
        }
        console.log(`Inserted ${id} into local storage (collection: ${this.collection})`);
    }

    /** TODO */
    list = () => {
        return localStorage[this.collection].split(",");
    }

    /** TODO */
    clear = () => {
        localStorage.removeItem(this.collection);
        console.log(`Cleared collection (${this.collection}) from local storage`);
    }

    /** TODO: Returns boolean value whether question is found in local storage history */
    contains = (id) => {
        return localStorage[this.collection].split(",").includes(id);
    }
}