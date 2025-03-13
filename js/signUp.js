document.addEventListener("DOMContentLoaded", function () {
    console.log("SignUp.js cargado correctamente");

    document.getElementById("btnSignUp").addEventListener("click", function (event) {
        event.preventDefault();
        console.log("Clic en Registrarse detectado.");

        // Carga el contenido del modal de registro
        fetch("signUp.html")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                console.log("signUp.html cargado correctamente.");
                document.getElementById("signUpModal-container").innerHTML = data;

                // Espera a que el modal se inserte en el DOM antes de abrirlo
                let signUpModal = new bootstrap.Modal(document.getElementById("signUpModal"));
                signUpModal.show();
            })
            .catch(error => console.error("Error cargando signUp.html:", error));
    });
});