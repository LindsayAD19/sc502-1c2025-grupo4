document.addEventListener("DOMContentLoaded", function () {
    console.log("signIn.js cargado correctamente");

    // Evento para abrir el modal de inicio de sesión
    document.getElementById("BtnSignIn").addEventListener("click", function (event) {
        event.preventDefault();
        console.log("Clic en Iniciar Sesión detectado.");

        // Carga el contenido del modal de signIn.html
        fetch("signIn.html")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                console.log("signIn.html cargado correctamente.");
                document.getElementById("signInModal-container").innerHTML = data;

                // Verifica si el modal ya existe en el DOM
                let signInModal = new bootstrap.Modal(document.getElementById("signInModal"));
                signInModal.show();

                // Una vez cargado signIn.html, agrega evento al botón de registro
                setTimeout(() => {
                    let btnSignUp = document.getElementById("btnSignUp");
                    if (btnSignUp) {
                        btnSignUp.addEventListener("click", function (event) {
                            event.preventDefault();
                            console.log("Clic en Registrarse detectado.");

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

                                    // Cierra el modal de inicio de sesión antes de abrir el de registro
                                    signInModal.hide();

                                    // Verifica si el modal ya existe en el DOM
                                    let signUpModal = new bootstrap.Modal(document.getElementById("signUpModal"));
                                    signUpModal.show();
                                })
                                .catch(error => console.error("Error cargando signUp.html:", error));
                        });
                    } else {
                        console.error("btnSignUp no encontrado en el DOM.");
                    }
                }, 500);
            })
            .catch(error => console.error("Error cargando signIn.html:", error));
    });
});