/* Menu trigger */
(() => {

    const hamburgerMenu = document.querySelector(".menu-trigger");
    const menuItems = document.querySelector(".menu-items");

    const clickable = document.querySelector("#menu-clickable-area")

    clickable.addEventListener("click", () => {
        hamburgerMenu.classList.toggle("is-open");
        menuItems.classList.toggle("is-open");
    });

})();