/* Menu & dark-mode */

// if (document.body.classList.contains("dark")) {
//     urlbarMeta.setAttribute("content", "#202225")
// } else {
//     urlbarMeta.setAttribute("content", "#cccccc")
// }

const darkSwitch = document.querySelector("#darkmode-section > label");
const urlbarMeta = document.querySelector("meta[name='theme-color']")

darkSwitch.addEventListener("mousedown", event => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        urlbarMeta.setAttribute("content", "#202225")
    } else {
        urlbarMeta.setAttribute("content", "#cccccc")
    }
})


const hamburgerMenu = document.querySelector(".menu-trigger");
const menuItems = document.querySelector(".menu-items")

hamburgerMenu.addEventListener("mousedown", event => {
    hamburgerMenu.classList.toggle("is-open");
    menuItems.classList.toggle("is-open");
})

// Don't have to tap X to close menu, can just tap the top bar area left to it
document.querySelector("#menu").addEventListener("mousedown", e => {
    if (e.target.id === "menu") {
        hamburgerMenu.classList.remove("is-open");
        menuItems.classList.remove("is-open");
    }
});