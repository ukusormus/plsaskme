/* Makes the top card swipable and emits newQuestionEvent when swipe successful */

const touchSupported = ('ontouchstart' in document.documentElement);

const newQuestionSwipeEvent = new Event("newQuestionEvent");

if (touchSupported) {
    let currTopCard;
    let newTopCard;

    function init() {

        currTopCard = $(".q-container.draggable");
        newTopCard = $(".q-container:not(.draggable)");

        currTopCard.addEventListener("touchstart", start);
        currTopCard.addEventListener("touchmove", move);
        currTopCard.addEventListener("touchend", end);
    }

    init();

    let startingY = newY = 0;
    // const threshold = window.innerHeight / 6; // Card has to be swiped at least threshold px upwards to change card


    function start(e) {
        currTopCard.style.transition = ``;
        startingY = newY = e.touches[0].clientY;
        // console.log("Touch started", startingY);

        currTopCard.style.filter = `brightness(${0.95})`;
        newTopCard.style.opacity = 1;

        // currTopCard.style.willChange = "transform, opacity, filter";
        // newTopCard.style.willChange = "opacity";
    }

    function move(e) {
        newY = e.touches[0].clientY;

        let change = startingY - newY;

        // console.log("Touch moving, change:", change);

        if (change <= 0) return;

        change = change / window.innerHeight * 100;

        currTopCard.style.transform = `translate(-50%, ${-50 - change}%) scale(${1 - (change * 0.005)})`;
        // currTopCard.style.opacity = `${1 - (change * 0.005)}`;
        // currTopCard.style.filter = `brightness(${0.95 - (change * 0.005)})`;

        newTopCard.style.setProperty("--after-opacity", `${change / 100}`);
    }

    function end(e) {
        // console.log("Touch has ended.");

        if (startingY - newY < (window.innerHeight / 6)) {
            // Reset position
            currTopCard.style.transition = `transform 0.1s`;
            currTopCard.style.transform = `translate(-50%, -50%)`;
            currTopCard.style.opacity = 1;
            currTopCard.style.filter = "";
            newTopCard.style.setProperty("--after-opacity", "0");
        } else {
            document.dispatchEvent(newQuestionSwipeEvent);
            // Make the card <div.q-container.draggable> #current-q </div> fly away
            currTopCard.style.transform = "";
            currTopCard.classList.add("flyaway");

            newTopCard.style.opacity = 1;
            newTopCard.classList.add("draggable");
            newTopCard.style.setProperty("--after-opacity", "1");

            // If transition ended (has flown away), make the new one draggable
            currTopCard.addEventListener("transitionend", transition);



            function transition() {

                currTopCard.classList.remove("draggable", "flyaway");
                currTopCard.style.opacity = 0;
                currTopCard.style.filter = "";

                currTopCard.removeEventListener("touchstart", start);
                currTopCard.removeEventListener("touchmove", move);
                currTopCard.removeEventListener("touchend", end);

                currTopCard.removeEventListener("transitionend", transition);

                // currTopCard.style.willChange = "auto";

                init();
            }
        }
    }
} else {

}