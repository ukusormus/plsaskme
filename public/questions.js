import { ref, get, child, query } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";
import { db } from "./app.js"

// Shortcuts to DOM elements
const currentQuestionText = document.querySelector("#current-q");

// Gets a reference to all questions
const questionsRef = ref(db, "questions");
console.log(questionsRef)

// Gets a reference to question with id 0 and current language
let id = "0";
let NSFW = false;
let language = "en";

const currentQuestionRef = child(questionsRef, `${id}/${language}`);
console.log(currentQuestionRef)



// const allNSFW = query(questionsRef, equalTo())


const getNewQuestion = (questionsRef, isNSFW = false) => {

    const allNSFW = query(ref(db, 'posts'), limitToLast(100));
    // get(questionsRef).then((result) => {
    //     console.log(result.val());
    // }).catch((err) => {
    //     console.error(err);
    // }); 
}

// Temp: new question w spacebar
document.addEventListener('keyup', event => {
    if (event.code === 'Space') {
        currentQuestionText.innerText = "yo space";
    }
});
// Temp: new question w click
document.addEventListener('click', event => {
    // If the clicked element doesn't have the right selector, bail
    if (!event.target.matches('.q-container')) return;

    currentQuestionText.innerText = "yo click";
});

// --- Each node of the JSON tree is a reference. ref(db, "questions/1")
// Saving data - set(ref, value : unknown)
// Reading data - get(query)
// Updating data - update(ref, values : Object)
// Removing data - remove(ref)