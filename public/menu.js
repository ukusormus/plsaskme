/* Menu & dark-mode */

const darkSwitch = document.querySelector("#darkmode-section > label");

darkSwitch.addEventListener("mousedown", event => {
    document.body.classList.toggle("dark");
})


const hamburgerMenu = document.querySelector(".menu-trigger");
const menuItems = document.querySelector(".menu-items")

hamburgerMenu.addEventListener("mousedown", event => {
    hamburgerMenu.classList.toggle("is-open");
    menuItems.classList.toggle("is-open");
})