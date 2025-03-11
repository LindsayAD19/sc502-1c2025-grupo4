document.addEventListener("DOMContentLoaded", function() {
    fetch("signIn.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("signInModal-container").innerHTML = data;
        })
        .catch(error => console.error("Error cargando el modal de iniciar sesión:", error));

    document.getElementById("BtnSignIn").addEventListener("click", function(event) {
        event.preventDefault();
        let signInModal = new bootstrap.Modal(document.getElementById("signInModal"));
        signInModal.show();
    });
});