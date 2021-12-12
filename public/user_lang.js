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



const currentQ = document.querySelector("#current-q");
let langSpicy = localStorage.getItem("lang-spicy");

// If first time: try to guess the country (and language) by IP address
if (langSpicy === null) {
    localStorage.setItem("lang-spicy", "");

    fetch('https://api.ipregistry.co/?key=iepjetovubznkogb')
        .then(function (response) {
            return response.json();
        })
        .then(function (payload) {
            if (payload.location.country.code = 'EE') {
                localStorage["lang-spicy"] = "et";
                currentQ.textContent = dict.tapMe["et"];
            } else {
                localStorage["lang-spicy"] = "en";
                currentQ.textContent = dict.tapMe["en"];
            }
        })
        .catch(function (error) {
            console.error("Couldn't detect language by IP. Error:\n" + error);
            // Defaulting to en
            localStorage["lang-spicy"] = "en";
            currentQ.textContent = dict.tapMe["en"];
        }).finally(() => {
            setup(localStorage.getItem("lang-spicy"));
        });

    // Not first time:
} else {
    setup(langSpicy);
}

function setup(langSpicy) {
    const [lang, spicy] = langSpicy.split("-");

    // Update switch texts
    spicyText.textContent = dict.spicy[lang];
    langText.textContent = dict.language[lang];
    darkText.textContent = dict.lightdark[lang];

    // Update switch positions
    if (lang === "et") {
        langSwitch.click();
    }
    if (spicy === "spicy") {
        spicySwitch.click();
    }

    currentQ.textContent = dict.tapMe[lang];
    // // Display a question
    // document.querySelector(".q-container").click();
}


// Language changed
langSwitch.addEventListener("click", event => {
    const newLang = langSwitch.checked ? "et" : "en";

    // Update switch texts
    spicyText.textContent = dict.spicy[newLang];
    langText.textContent = dict.language[newLang];
    darkText.textContent = dict.lightdark[newLang]

    // Update currentQ
    currentQ.textContent = dict.tapMe[newLang];

    // Update local storage
    const currentSpicy = spicySwitch.checked ? "-spicy" : "";
    localStorage["lang-spicy"] = newLang + currentSpicy;
});

// Spiciness changed
spicySwitch.addEventListener("click", event => {
    const newSpicy = spicySwitch.checked ? "-spicy" : "";
    const currentLang = langSwitch.checked ? "et" : "en";

    // Update local storage
    localStorage["lang-spicy"] = currentLang + newSpicy;
});