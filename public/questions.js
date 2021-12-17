// import { random, QuestionHistory } from "./helpers.js"
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
// ----


// Shortcuts to DOM elements
const questionContainer = document.querySelector(".q-container");
const currentQuestionText = document.querySelector("#current-q");
const spicySwitch = document.querySelector("#spicy");
const langSwitch = document.querySelector("#lang");

// Bilingual right now, may be updated in the future
function currentLang() {
    // Default, when page loaded for the first time, is English
    return langSwitch.checked ? "et" : "en";
}

function isSpicy() {
    // Default, when page loaded for the first time, is non-spicy
    return spicySwitch.checked;
}

// Returns "en", "et-spicy", depending on current language and spiciness
function langSpicy(lang = currentLang(), spicy = isSpicy()) {
    return spicy ? lang + "-spicy" : lang;
}

let qHistory = {
    "et": new QuestionHistory("et", false),
    "et-spicy": new QuestionHistory("et", true),
    "en": new QuestionHistory("en", false),
    "en-spicy": new QuestionHistory("en", true)
}

/** 
 * Gets last question's index for particular language and spiciness.
 * 
 * (Our "server-side" node script (q-counter.js) will add a file called
 * /questions/lang(-spicy)/count
 * every time it is ran, keeping count of questions count inside the folders)
 * 
 * Usage example: await getLastIndex("et", false) 
 * */
async function getLastQuestionIndex(lang, spicy) {
    const url = `${document.location.origin}/questions/${langSpicy(lang, spicy)}/count`;
    return parseInt(await (await fetch(url)).text()) - 1;
}

// Save last indexes while loading page (these won't update often, no need to call every question)
let lastIndex = {
    "et": await getLastQuestionIndex("et", false),
    "et-spicy": await getLastQuestionIndex("et", true),
    "en": await getLastQuestionIndex("en", false),
    "en-spicy": await getLastQuestionIndex("en", true)
}



/**
 * @returns A random question that isn't in history
 */
async function getNewRandQuestion() {

    // 1. Generate random index (min & max inclusive)
    let randomIndex = random(0, lastIndex[langSpicy()]);

    // 2.a Reset history if all questions have been already shown (avoids infinite while loop)
    if (qHistory[langSpicy()].length() >= (lastIndex[langSpicy()] + 1)) {

        // Will show the first question, so no chance of "buggy" UX, except when there's only one question
        randomIndex = qHistory[langSpicy()].list()[0];

        qHistory[langSpicy()].clear();
    }
    // 2.b Else, generate new random index until one found that isn't in history
    else while (qHistory[langSpicy()].contains(randomIndex)) {
        randomIndex = random(0, lastIndex[langSpicy()]);
    }

    // 3. Get a question by that index
    const url = `${document.location.origin}/questions/${langSpicy()}/${randomIndex}`;
    const question = (await fetch(url)).text()

    console.log(question);

    // 4. Save that question to history
    qHistory[langSpicy()].insert(randomIndex);

    // 5. Return question text
    return question;
}


// New question with click/tap on question container (mousedown = fired the moment the button is initially pressed)
questionContainer.addEventListener('click', () => {
    getNewRandQuestion().then((result) => {
        console.log("result mouse / tap: " + result)
        currentQuestionText.innerHTML = result;
    });
});

// New question with spacebar
document.addEventListener('keydown', event => {
    if (event.code === "Space") {
        getNewRandQuestion().then((result) => {
            console.log("result keydown: " + result)
            currentQuestionText.innerHTML = result;
        });
    }
});