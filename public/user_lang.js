/* Persistent UI language */

let setupDone = false;  // used in questions.js

(() => {

    const dict = {
        tapMe: {
            "en": "Tap here for a new question!",
            "et": "Uue küsimuse jaoks kliki siia!"
        },
        swipeMe: {
            "en": "Swipe me up for a new question!",
            "et": "Uue küsimuse jaoks viipa mind üles!"
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
    const spicySwitch = $("#spicy");
    const langSwitch = $("#lang");

    // Switch texts
    const spicyText = $("#spicy-section > h4");
    const langText = $("#lang-section > h4");
    const darkText = $("#darkmode-section > h4")


    const currentQ = $("#current-q");
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
                } else {
                    localStorage["lang-spicy"] = "en";
                }
            })
            .catch(function (error) {
                console.error("Couldn't detect language by IP. Defaulting to 'en'. Error:\n" + error);
                localStorage["lang-spicy"] = "en";
            }).finally(() => {
                setup(localStorage.getItem("lang-spicy"));
            });

    }
    // Not first time:
    else {
        setup(langSpicy);
    }

    function setup(langSpicy) {
        const [lang, spicy] = langSpicy.split("-");

        // Update switch texts
        spicyText.textContent = dict.spicy[lang];
        langText.textContent = dict.language[lang];
        darkText.textContent = dict.lightdark[lang];

        // console.log(`lang: '${lang}', spicy: '${spicy}'`);
        // Update switch positions
        if (lang === "et") {
            langSwitch.click();
        }
        if (spicy === "spicy") {
            spicySwitch.click();
        }

        // Display smth like "Click me for new question" in appropriate lang
        currentQ.textContent = touchSupported ? dict.swipeMe[lang] : dict.tapMe[lang];

        setupDone = true;
    }


    // Language changed
    langSwitch.addEventListener("click", () => {
        const newLang = langSwitch.checked ? "et" : "en";

        // Update switch texts
        spicyText.textContent = dict.spicy[newLang];
        langText.textContent = dict.language[newLang];
        darkText.textContent = dict.lightdark[newLang];

        // Update currentQ
        // 
        if (!touchSupported) {
            currentQ.textContent = dict.tapMe[newLang];
        } else {
            $$(".q-container > p").forEach((text) => {
                text.textContent = dict.swipeMe[newLang];
            });
            const firstTimeNewQuestionSwipeEvent = new CustomEvent('newQuestionEvent', { detail: true });
            document.dispatchEvent(firstTimeNewQuestionSwipeEvent);
        }
        // currentQ.textContent = touchSupported ? dict.swipeMe[newLang] : dict.tapMe[newLang];

        // Update local storage
        const currentSpicy = spicySwitch.checked ? "-spicy" : "";
        localStorage["lang-spicy"] = newLang + currentSpicy;
    });

    // Spiciness changed
    spicySwitch.addEventListener("click", () => {
        const newSpicy = spicySwitch.checked ? "-spicy" : "";
        const currentLang = langSwitch.checked ? "et" : "en";

        // Update local storage
        localStorage["lang-spicy"] = currentLang + newSpicy;
    });

})();