import { random, asteriskToBold } from "./helpers.js"

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

/** 
 * Gets the question count - 1 for particular language and spiciness.
 * 
 * (Our "server-side" node script (q-counter.js) will add a file called
 * /questions/lang(-spicy)/count
 * every time it is ran, keeping count of questions count inside the folders)
 * 
 * Usage example: await getLastIndex("et", false) 
 * */
async function getLastQuestionIndex(lang, spicy) {
    const url = `${document.location.origin}/questions/${spicy ? lang + "-spicy" : lang}/count`;
    return parseInt(await (await fetch(url)).text()) - 1;
}

let lastIndex = {
    "et": await getLastQuestionIndex("et", false),
    "et-spicy": await getLastQuestionIndex("et", true),
    "en": await getLastQuestionIndex("en", false),
    "en-spicy": await getLastQuestionIndex("en", true)
}

async function getNewRandQuestion() {
    const lang = currentLang();
    const spicy = isSpicy();

    // 1. Generate random index (min & max inclusive)
    const randomIndex = random(0, lastIndex);

    // 2. Check that it isn't in history
    // TODO

    // 3. Get a question by that index
    const url = `${document.location.origin}/questions/${spicy ? lang + "-spicy" : lang}/${randomIndex}`;
    const question = (await fetch(url)).text()

    // 4. Save that question to history
    // TODO

    // 5. Return question text
    return asteriskToBold(question);
}

// New question with click/tap on question container (mousedown = fired the moment the button is initially pressed)
questionContainer.addEventListener('mousedown', event => {
    getNewRandQuestion().then((result) => {
        currentQuestionText.textContent = result;
    });
}, false);

// New question with spacebar
document.addEventListener('keydown', event => {
    if (event.code === "Space") {
        getNewRandQuestion().then((result) => {
            currentQuestionText.textContent = result;
        });
    }
});