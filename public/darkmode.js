/* Persistent dark-mode */
(() => {

    const darkSwitch = document.querySelector("#darkmode-section > label");
    const urlbarMeta = document.querySelector("meta[name='theme-color']");


    const darkmodeInLocalStorage = localStorage.getItem("darkmode");

    if (darkmodeInLocalStorage === null) { // first time to visit
        localStorage.setItem("darkmode", "false")
    }
    // Not first time...
    else if (darkmodeInLocalStorage === "true") {
        document.body.classList.add("dark");
        urlbarMeta.setAttribute("content", "#202225");
        darkSwitch.click();
    } else {
        document.body.classList.remove("dark");
        urlbarMeta.setAttribute("content", "#cccccc");
    }


    darkSwitch.addEventListener("click", () => {
        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {
            urlbarMeta.setAttribute("content", "#202225");
            localStorage["darkmode"] = "true";
        } else {
            urlbarMeta.setAttribute("content", "#cccccc");
            localStorage["darkmode"] = "false";
        }
    });

})();