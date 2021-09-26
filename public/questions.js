import { ref, get, child, query } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";
import { db } from "./app.js"
// import { } from "./helpers.js"
import { random } from "./helpers.js"

// Shortcuts to DOM elements
const questionContainer = document.querySelector(".q-container");
const currentQuestionText = document.querySelector("#current-q");
const spicySwitch = document.querySelector("#spicy");
const langSwitch = document.querySelector("#lang");



// Gets a reference to question with id 0 and current language
let language = "en";

// const currentQuestionRef = child(questionsRef, `${id}/${language}`);
// console.log(currentQuestionRef)


// Gets a reference to all questions
const questionsRef = ref(db, "q");
const lastQuestionID = 0; // TODO: select last element, get its id
console.log(questionsRef);
const spicyQuestionsRef = ref(db, "spicy-q");
const lastSpicyQuestionID = 0; // TODO: select last element, get its id


async function getNewRandQuestion(isSpicy = spicySwitch.checked, langSwitched = langSwitch.checked) {

    // 1. Generate random index
    const ref = isSpicy ? spicyQuestionsRef : questionsRef;
    lang = langSwitched ? "en" : "et";

    const randomIndex = random(0, 1).toString();


    // 2. Check that it isn't in history

    // 3. Get a question by that index
    return await get(child(ref, randomIndex)).then((result) => {
        if (result.exists()) {
            return result.val()[randomIndex][lang];
        }
        else return "No data available"
    }).catch((err) => {
        console.error(err)
        return "I'm sorry, a wild error has occured! Please try to refresh the page.";
    });

    // 4. Save that question to history

    // 5. Return question text

    // const allNSFW = query(ref(db, 'posts'), limitToLast(100));

}

spicySwitch.addEventListener("click", (e) => {
    console.log("spicySwitch.checked: " + spicySwitch.checked);
});


// Temp: new question w spacebar
document.addEventListener('keyup', event => {
    if (event.code === 'Space') {
        currentQuestionText.innerText = val()
    }
});
// Temp: new question w click
questionContainer.addEventListener('click', event => {
    getNewRandQuestion().then((result) => {
        currentQuestionText.innerText = result;
    });
});

// --- Each node of the JSON tree is a reference. ref(db, "questions/1")
// Saving data - set(ref, value : unknown)
// Reading data - get(query)
// Updating data - update(ref, values : Object)
// Removing data - remove(ref)