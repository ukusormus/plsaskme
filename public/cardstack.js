/* Cardstack below the question card */
(() => {

    /** Get random integer between min (inclusive) and max (inclusive) */
    const random = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    const pallettes = [
        [
            "#F38181",
            "#FCE38A",
            "#EAFFD0",
            "#95E1D3",
            "#5F7367"
        ],
        [
            "#A2D2FF",
            "#FEF9EF",
            "#FF865E",
            "#FEE440",
            "#00798C"
        ],
    ];

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
    let tempColors = Array.from(pallettes[random(0, pallettes.length - 1)]);

    const allCards = $$(".cardstack");

    for (let i = 0; i < allCards.length; i++) {

        const card = allCards[i];
        // First card is on the bottom, last card is on the top
        card.style.zIndex = i + 1;

        const randomColor = randomColorFromPallette(tempColors);
        card.style.backgroundColor = randomColor;

        const randomTransitionTime = random(1, 10) * 0.1;
        card.style.setProperty('--transition-time', randomTransitionTime + 's');

        card.style.setProperty('--random-x', `${random(-40, -55)}%`);
        card.style.setProperty('--random-y', `${random(-40, -55)}%`);
        card.style.setProperty('--random-rotation', `${random(-30, 30)}deg`);
    }

})();