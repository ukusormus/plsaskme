/* Persistent dark-mode */
(() => {

    const darkSwitch = $("#darkmode-section > label");
    const urlbarMeta = $("meta[name='theme-color']");


    let darkmodeInLocalStorage = localStorage.getItem("darkmode"); // "true", "false" or null

    // First time to visit
    if (darkmodeInLocalStorage === null) {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            // Dark mode enabled in OS
            localStorage.setItem("darkmode", "true")
            darkmodeInLocalStorage = "true";
        } else {
            localStorage.setItem("darkmode", "false")
        }
    }
    // Not first time to visit, enabled // or first time to visit and enabled in OS
    if (darkmodeInLocalStorage === "true") {
        document.body.classList.add("dark");
        urlbarMeta.setAttribute("content", "#202225");
        darkSwitch.click();
    }
    // Not first time to visit, disabled // or first time to visit and disabled in OS
    else {
        document.body.classList.remove("dark");
        urlbarMeta.setAttribute("content", "#cccccc");
    }


    darkSwitch.addEventListener("click", () => {
        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {
            urlbarMeta.setAttribute("content", "#202225");
            localStorage.setItem("darkmode", "true");
        } else {
            urlbarMeta.setAttribute("content", "#cccccc");
            localStorage.setItem("darkmode", "false");
        }
    });

})();