/* Menu trigger */

const menuClose = document.querySelector("#menuclose");
const hamburgerMenu = document.querySelector(".menu-trigger");
const menuItems = document.querySelector(".menu-items");

menuClose.style.pointerEvents = "none";

hamburgerMenu.addEventListener("mousedown", e => {
    hamburgerMenu.classList.add("is-open");
    menuItems.classList.add("is-open");

    menuClose.style.pointerEvents = "";
})

// Don't have to tap X to close menu, can just tap the top bar area left to it
menuClose.addEventListener("mousedown", e => {
    hamburgerMenu.classList.remove("is-open");
    menuItems.classList.remove("is-open");

    menuClose.style.pointerEvents = "none";
});