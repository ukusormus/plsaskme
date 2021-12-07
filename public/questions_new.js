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
function langSpicy(lang = currentLang(), spicy = isSpicy()) {
    return spicy ? lang + "-spicy" : lang;
}

/** Gets last question's index for particular language and spiciness.
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

// Get last indexes
let lastIndex = {
    "et": await getLastQuestionIndex("et", false),
    "et-spicy": await getLastQuestionIndex("et", true),
    "en": await getLastQuestionIndex("en", false),
    "en-spicy": await getLastQuestionIndex("en", true)
}
// Question history (in local storage)
let qHistory = {
    "et": new QuestionHistory("et", false),
    "et-spicy": new QuestionHistory("et", true),
    "en": new QuestionHistory("en", false),
    "en-spicy": new QuestionHistory("en", true)
}

// // Pool of questions for future display (in local storage; for smoother switch)
// let qPool = {
//     "pool-et": new QuestionHistory("pool-et", false),
//     "pool-et-spicy": new QuestionHistory("pool-et", true),
//     "pool-en": new QuestionHistory("pool-en", false),
//     "pool-en-spicy": new QuestionHistory("pool-en", true),
// }

const poolSize = 5;
let nextQuestionsPool = [];

setInterval(() => {

    if (nextQuestionsPool.length < poolSize) {  /* Less than pool size of questions in pool left */

        const alreadyAskedCount = qHistory[langSpicy()].length;
        const questionsInDB = lastIndex[langSpicy()] + 1;
        const yetToAsk = questionsInDB - alreadyAskedCount;

        let newQuestionsCount = poolSize;

        if (yetToAsk >= 1) {  /* Questions DB depleted, clear history */
            qHistory[langSpicy()].clear();
        }
        else if (yetToAsk < poolSize) {  /* Left less than poolsize in DB */
            newQuestionsCount = yetToAsk;
        }

        for (let i = 0; i < newQuestionsCount; i++) {

        }

    }
}, 2000);

/* ... NB! Probably should fetch 5 questions upfront and then fetch 1 question w every new cardpull
1. Every 2 seconds, check how many questions (x) in qPool for current langSpicy
2. If x < 5 (less than five) questions in qPool...
3. Get 5-x random indexes that aren't in history (if lastIndex[langSpicy()] is less than 5)
4. Fetch corresponding questions
5. 
6. 
*/

/** @returns A random question that isn't in history
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
    return question // asteriskToBold(question);
}

// New question with click/tap on question container (mousedown = fired the moment the button is initially pressed)
questionContainer.addEventListener('mousedown', event => {
    getNewRandQuestion().then((result) => {
        console.log("result mouse / tap: " + result)
        currentQuestionText.innerHTML = asteriskToBold(result);
    });
});

// New question with spacebar
document.addEventListener('keydown', event => {
    if (event.code === "Space") {
        getNewRandQuestion().then((result) => {
            console.log("result keydown: " + result)
            currentQuestionText.innerHTML = asteriskToBold(result);
        });
    }
});


// async function getNewRandQuestion_local() {

// }

setInterval(() => {
    // 1. If there's less than 5 questions in local storage
    // if (langSpicy)

    // 2. Add missing question count to local storage

    // console.log("smth")
    // getNewRandQuestion().then((result) => {
    //     console.log(result)
    // })  
}, 1500);