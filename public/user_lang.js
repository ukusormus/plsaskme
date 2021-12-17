/* Persistent UI language */

const dict = {
    tapMe: {
        "en": "Tap here for a new question!",
        "et": "Uue küsimuse jaoks kliki siia!"
    },
    spicy: {
        "en": "Spicier questions?",
        "et": "Julgemad küsimused?"
    },
    language: {
        "en": "Language",
        "et": "Keel"
    },
    lightdark: {
        "en": "Light/dark background",
        "et": "Hele/tume taust"
    }
}


// Switches
const spicySwitch = document.querySelector("#spicy");
const langSwitch = document.querySelector("#lang");

// Switch texts
const spicyText = document.querySelector("#spicy-section > h4");
const langText = document.querySelector("#lang-section > h4");
const darkText = document.querySelector("#darkmode-section > h4")

// spicyText.textContent = dict.spicy["en"];
langText.innerText = dict.language["en"];
darkText.innerText = dict.lightdark["en"];



const currentQ = document.querySelector("#current-q");
let langSpicy = localStorage.getItem("lang-spicy");


// If first time: try to guess the country (and language) by IP address
// if (langSpicy === null) {
//     // localStorage.setItem("lang-spicy", "");

//     fetch('https://api.ipregistry.co/?key=iepjetovubznkogb')
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (payload) {
//             // if (payload.location.country.code = 'EE') {
//             //     localStorage["lang-spicy"] = "et";
//             // } else {
//             //     localStorage["lang-spicy"] = "en";
//             // }
//         })
//         .catch(function (error) {
//             console.error("Couldn't detect language by IP. Defaulting to 'en'. Error:\n" + error);
//             localStorage["lang-spicy"] = "en";
//             alert("here too")
//         }).finally(() => {
//             alert("here");
//             throw new Error();
//             setup(localStorage.getItem("lang-spicy"));
//         });

//     // Not first time:
// } else {
//     alert("here1");
//     setup(langSpicy);
// }

// function setup(langSpicy) {
//     alert("here2")
//     const [lang, spicy] = langSpicy.split("-");

//     if (lang !== "en" && lang !== "et") {
//         alert("WTF");
//     }

//     // Update switch texts
//     // spicyText.textContent = dict.spicy[lang];
//     // langText.textContent = dict.language[lang];
//     // darkText.textContent = dict.lightdark[lang];

//     console.log(`lang: '${lang}', spicy: '${spicy}'`);
//     // Update switch positions
//     if (lang === "et") {
//         // langSwitch.click();
//     }
//     if (spicy === "spicy") {
//         // spicySwitch.click();
//     }

//     // Display smth like "Click me for new question" in appropriate lang 
//     currentQ.textContent = dict.tapMe[lang];

//     alert("here3");
// }


// Language changed
langSwitch.addEventListener("click", () => {
    const newLang = langSwitch.checked ? "et" : "en";

    // Update switch texts
    // spicyText.innerText = dict.spicy[newLang];
    // langText.innerText = dict.language[newLang];
    darkText.innerHTML = dict.lightdark[newLang];

    // Update currentQ
    currentQ.innerText = dict.tapMe[newLang];

    // Update local storage
    const currentSpicy = spicySwitch.checked ? "-spicy" : "";
    localStorage["lang-spicy"] = newLang + currentSpicy;
});

// // Spiciness changed
// spicySwitch.addEventListener("click", () => {
//     const newSpicy = spicySwitch.checked ? "-spicy" : "";
//     const currentLang = langSwitch.checked ? "et" : "en";

//     // Update local storage
//     localStorage["lang-spicy"] = currentLang + newSpicy;
// });