document.addEventListener("DOMContentLoaded", () => {
    //Carga navbar y luego ejecuta tipoUsuario.js
    includeHTML("navbar", "app/views/navbar.html", () => {
        loadScript("public/js/tipoUsuario.js");
    });

    //Carga footer
    includeHTML("footer", "app/views/footer.html");

    //Carga modals y luego inicializa eventos
    includeHTML("modals", "app/views/modals.html", () => {
        loadModalEvents();
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
    document.body.appendChild(script);
}