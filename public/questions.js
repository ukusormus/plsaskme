(() => {

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

            // console.log(`--- Inserted ${id} into local storage (collection: ${this.collection})`);
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
            // console.log(`--- Cleared history from local storage (${this.collection})`);
        }

        /** Returns boolean value whether question is found in local storage history */
        contains = (id) => {
            return this.list().includes(id.toString());
        }
    }
    // ----


    // Shortcuts to DOM elements
    const questionContainer = document.querySelector(".q-container.draggable");
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
     * (Our "server-side" Node script (q-counter.js) will add a file called
     * /questions/lang(-spicy)/count
     * every time it is ran, keeping count of questions count inside the folders)
     * 
     * Usage example: await getLastIndex("et", false) 
     * */
    async function getLastQuestionIndex(lang, spicy) {
        const url = `${document.location.origin}/questions/${langSpicy(lang, spicy)}/count`;
        return parseInt(await (await fetch(url)).text()) - 1;
    }

    // Save last indexes (question count - 1) while loading page
    let lastIndex = {
        "et": 0,
        "et-spicy": 0,
        "en": 0,
        "en-spicy": 0
    }

    let savedResult = "";
    let savedResult_langSpicy = "";

    getLastQuestionIndex("et", false).then((result) => {
        lastIndex["et"] = result;

        getLastQuestionIndex("et", true).then((result) => {
            lastIndex["et-spicy"] = result;

            getLastQuestionIndex("en", false).then((result) => {
                lastIndex["en"] = result;

                getLastQuestionIndex("en", true).then((result) => {
                    lastIndex["en-spicy"] = result;

                    // Load first question on page load
                    getNewRandQuestion().then((result) => {
                        savedResult = result;
                        savedResult_langSpicy = langSpicy();
                    });
                });
            });

        });

    })


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

        // console.log(question);

        // 4. Save that question to history
        qHistory[langSpicy()].insert(randomIndex);

        // 5. Return question text
        return question;
    }


    if (!touchSupported) {

        // New question with click/tap on question container
        questionContainer.addEventListener('click', () => {

            if (langSpicy() === savedResult_langSpicy) {
                // Use saved result
                currentQuestionText.textContent = savedResult;
            } else {
                // Language or spiciness has changed in between, fetch new
                getNewRandQuestion().then((result) => {
                    currentQuestionText.textContent = result;
                });
            }

            // Save (fetch) next one
            getNewRandQuestion().then((result) => {
                // console.log("Next question: " + result)
                savedResult = result;
                savedResult_langSpicy = langSpicy();
            });
        });
    }
    else {

        let newCardQuestionText = document.querySelector(".q-container:not(.draggable) > p");
        let currentCardQuestionText = document.querySelector(".q-container.draggable > p");

        if (langSpicy() === savedResult_langSpicy) {
            // Use saved result
            newCardQuestionText.textContent = savedResult;
        } else {
            // Language or spiciness has changed in between, fetch new
            getNewRandQuestion().then((result) => {
                newCardQuestionText.textContent = result;
            });
        }

        let firstTime = true;

        // New question with swipe
        document.addEventListener("newQuestionEvent", (e) => {

            // console.log("Inside addEventListener")

            newCardQuestionText = document.querySelector(".q-container:not(.draggable) > p");
            currentCardQuestionText = document.querySelector(".q-container.draggable > p");

            // console.log("currentCard (draggable): ", currentCardQuestionText.textContent)
            // console.log("newCard (next one up): ", newCardQuestionText.textContent)


            // e.detail is true if called from user_lang: language has changed
            if (e.detail) {
                // console.log("Language has changed!")
                getNewRandQuestion().then((result) => {
                    savedResult = result;
                    savedResult_langSpicy = langSpicy();
                    newCardQuestionText.textContent = savedResult;

                    getNewRandQuestion().then((result) => {
                        savedResult = result;
                        savedResult_langSpicy = langSpicy();
                    });
                });

            }

            else if (firstTime) {

                getNewRandQuestion().then((result) => {
                    savedResult = result;
                    savedResult_langSpicy = langSpicy();
                    currentCardQuestionText.textContent = savedResult;

                    getNewRandQuestion().then((result) => {
                        savedResult = result;
                        savedResult_langSpicy = langSpicy();
                    });
                });


            } else {

                if (langSpicy() === savedResult_langSpicy) {
                    // Use saved result
                    currentCardQuestionText.textContent = savedResult;
                } else {
                    // Language or spiciness has changed in between, fetch new
                    getNewRandQuestion().then((result) => {
                        currentCardQuestionText.textContent = result;
                    });
                }

                getNewRandQuestion().then((result) => {
                    savedResult = result;
                    savedResult_langSpicy = langSpicy();
                });
            }

            firstTime = false;

        });
    }
})();