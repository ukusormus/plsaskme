let curr = document.querySelector("body > main > div.q-container")

curr.addEventListener("touchstart", start)
curr.addEventListener("touchmove", move)
curr.addEventListener("touchend", end)

let startingY = newY = 0;
const threshold = window.innerHeight / 4;

function start(e) {
    startingY = e.touches[0].clientY;
    console.log("Touch started", startingY)
}

function move(e) {
    newY = e.touches[0].clientY;

    let change = startingY - newY;

    console.log("Touch moving, change:", change)

    if (change <= 0) return;

    change = change / window.innerHeight * 100

    curr.style.transform = `translate(-50%, ${-50 - change}%) scale(${1 - (change * 0.005)})`
    curr.style.opacity = `${1 - (change * 0.01)}`
    e.preventDefault();
}

function end(e) {
    console.log("Touch has ended.")

    if (startingY - newY < threshold) {
        // reset position
        curr.style.transform = `translate(-50%, -50%)`
        curr.style.opacity = `1`
    } else {
        // move, next q etc
        curr.style.opacity = 0;
    }
}