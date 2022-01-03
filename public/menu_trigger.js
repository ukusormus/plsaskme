/* Menu trigger */
(() => {

    const hamburgerMenu = $(".menu-trigger");
    const menuItems = $(".menu-items");

    const clickable = $("#menu-clickable-area")

    clickable.addEventListener("click", () => {
        hamburgerMenu.classList.toggle("is-open");
        menuItems.classList.toggle("is-open");
    });

})();