/* Cardstack below the question card */

// Number of cards below the question card
// const cardN = 5;

// import { random } from "./helpers.js";

/** Get random integer between min (inclusive) and max (inclusive) */
const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


// A pallette.
const pallette1 = [
    "#F38181",
    "#FCE38A",
    "#EAFFD0",
    "#95E1D3",
    "#5F7367"
]

/** Get a random color from a pallette array and pop it off */
const randomColorFromPallette = (pallette) => {
    if (!pallette.length) {
        console.error("Color pallette array empty or not big enough. Setting all cards to color black.")
        return "#000"; // black
    }

    const randomIndex = Math.floor(pallette.length * Math.random());

    // Splice pops from specific index and returns the popped value(s) as an array
    return pallette.splice(randomIndex, 1)[0];
}

// Add random value to each card: unique color, transform (rotation, position) and transition time
let tempColors = Array.from(pallette1);
const allCards = document.querySelectorAll(".cardstack");
for (let i = 0; i < allCards.length; i++) {
    const card = allCards[i];

    const randomTransform = `translate(${random(-40, -55)}%, ${random(-40, -55)}%) rotate(${random(-30, 30)}deg)`;
    const randomColor = randomColorFromPallette(tempColors);
    const randomTransitionTime = random(1, 10) * 0.1;

    card.style.transform = randomTransform;
    card.style.backgroundColor = randomColor;
    card.style.setProperty('--transition-time', randomTransitionTime + 's');

    // First card is on the bottom, last card is on the top
    card.style.zIndex = i + 1;
}

// Add shadows after animations
setTimeout(() => {
    const style = document.createElement('style');
    document.head.appendChild(style);
    style.sheet.insertRule(`
    .cardstack {
        box-shadow: 
        0 3px 100px hsl(0deg 0% 0% / 0.1),
        0 2px 1px hsl(0deg 0% 0% / 0.1),
        1px 3px 10px hsl(0deg 0% 0% / 0.1),
        0 -1px 1px hsl(0deg 0% 0% / 0.1);
    }`);
}, 1000);