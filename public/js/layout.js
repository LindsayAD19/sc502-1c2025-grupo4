document.addEventListener("DOMContentLoaded", () => {
    //Carga navbar y luego ejecuta tipoUsuario.js
    includeHTML("navbar", "app/views/navbar.html", () => {
        setTimeout(() => {
            loadScript("public/js/tipoUsuario.js");
        }, 200);
    });

    //Carga footer
    includeHTML("footer", "app/views/footer.html");

    //Carga modals y luego inicializa eventos, tambien ejecuta signUp.js
    includeHTML("modals", "app/views/modals.html", () => {
        loadModalEvents();
        loadScript("public/js/signUp.js");
        loadScript("public/js/signIn.js");
    });
});

function includeHTML(id, file, callback) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
            if (typeof callback === "function") callback();
        });
}

function loadScript(src) {
    const script = document.createElement("script");
    script.src = src;
    script.defer = true;
    document.body.appendChild(script);
}