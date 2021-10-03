import { random, asteriskToBold, QuestionHistory } from "./helpers.js"

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
function langSpicy() {
    return isSpicy() ? currentLang() + "-spicy" : currentLang();
}

let qHistory = {
    "et": new QuestionHistory("et", false),
    "et-spicy": new QuestionHistory("et", true),
    "et": new QuestionHistory("et", false),
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
    const url = `${document.location.origin}/questions/${langSpicy()}/count`;
    return parseInt(await (await fetch(url)).text()) - 1;
}

// Save last indexes while loading page (these won't update often, no need to call every question)
let lastIndex = {
    "et": await getLastQuestionIndex("et", false),
    "et-spicy": await getLastQuestionIndex("et", true),
    "en": await getLastQuestionIndex("en", false),
    "en-spicy": await getLastQuestionIndex("en", true)
}

async function getNewRandQuestion() {

    // 1. Generate random index (min & max inclusive)
    const randomIndex = random(0, lastIndex[langSpicy()]);

    // 2. Check that it isn't in history
    // TODO
    // if (qHistory[langSpicy()].contains(randomIndex)) { console.log("fu, same q") }

    // 3. Get a question by that index
    const url = `${document.location.origin}/questions/${langSpicy()}/${randomIndex}`;
    const question = (await fetch(url)).text()

    console.log(question)
    // 4. Save that question to history
    // TODO

    // 5. Return question text
    return question // asteriskToBold(question);
}

// New question with click/tap on question container (mousedown = fired the moment the button is initially pressed)
questionContainer.addEventListener('mousedown', event => {
    getNewRandQuestion().then((result) => {
        console.log("result mouse: " + result)
        currentQuestionText.innerHTML = asteriskToBold(result);
    });
}, false);

// New question with spacebar
document.addEventListener('keydown', event => {
    if (event.code === "Space") {
        getNewRandQuestion().then((result) => {
            console.log("result keydown: " + result)
            currentQuestionText.innerHTML = asteriskToBold(result);
        });
    }
});
