/* Menu trigger */


const hamburgerMenu = document.querySelector(".menu-trigger");
const menuItems = document.querySelector(".menu-items");


hamburgerMenu.addEventListener("click", () => {
    hamburgerMenu.classList.toggle("is-open");
    menuItems.classList.toggle("is-open");

    if (menuItems.classList.contains("is-open")) {
        menuItems.style.pointerEvents = "auto";
    } else {
        menuItems.style.pointerEvents = "none";
    }
});