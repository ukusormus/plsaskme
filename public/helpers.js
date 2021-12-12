/* Helper functions */
export { random, QuestionHistory };

/** Converts words wrapped into asterisks into words wrapped into HTML "strong" tags */
// const asteriskToBold = (str) => {
//     let result = Array.from(str);
//     let first = false;
//     for (let i = 0; i < result.length; i++) {
//         if (result[i] === "*") {
//             first = !first;
//             result[i] = first ? "<strong>" : "</strong>";
//         }
//     }

//     // This gets inserted into innerHTML, which could /theoretically/ lead to XSS
//     // Since we are the ones controlling the storage (pre-sanitizing questions), there should be no problem

//     return result.join("");
// }

/** Get random integer between min (inclusive) and max (inclusive) */
const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/** Save the history of different language & spiciness questions to Local Storage */
class QuestionHistory {
    constructor(lang, spicy) {
        this.collection = spicy ? lang + "-spicy" : lang;

        if (!localStorage.getItem(this.collection)) {
            localStorage.setItem(this.collection, "");
        }
    }

    insert = (id) => {
        localStorage.setItem(this.collection, localStorage.getItem(this.collection) + "," + id);

        console.log(`--- Inserted ${id} into local storage (collection: ${this.collection})`);
    }

    /** Lists all question id-s as an array */
    list = () => {
        return localStorage[this.collection].split(",").slice(1);
    }

    length = () => {
        return this.list().length;
    }

    clear = () => {
        localStorage.removeItem(this.collection);
        localStorage.setItem(this.collection, "");
        console.log(`--- Cleared history from local storage (${this.collection})`);
    }

    /** Returns boolean value whether question is found in local storage history */
    contains = (id) => {
        return this.list().includes(id.toString());
    }
}