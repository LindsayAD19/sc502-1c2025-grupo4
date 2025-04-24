function loadModalEvents() {
    console.log("modals.js cargado");

    document.addEventListener("click", function (event) {
        if (event.target.closest("#BtnSignIn")) {
            event.preventDefault();

            const signInModalEl = document.getElementById("signInModal");
            if (signInModalEl) {
                const signInModal = new bootstrap.Modal(signInModalEl);
                signInModal.show();

                //Espera a que el modal esté totalmente cargado antes de añadir el listener de "Registrarse"
                setTimeout(() => {
                    const btnSignUp = document.getElementById("btnSignUp");

                    if (btnSignUp && !btnSignUp.classList.contains("event-added")) {
                        btnSignUp.addEventListener("click", function (e) {
                            e.preventDefault();

                            const bsSignInModal = bootstrap.Modal.getInstance(signInModalEl);
                            bsSignInModal.hide();

                            //Solo abre el modal de registro después de cerrarse el anterior
                            signInModalEl.addEventListener("hidden.bs.modal", function openSignUpOnce() {
                                const signUpModalEl = document.getElementById("signUpModal");
                                const signUpModal = new bootstrap.Modal(signUpModalEl);
                                signUpModal.show();

                                //Limpia este listener para evitar duplicados
                                signInModalEl.removeEventListener("hidden.bs.modal", openSignUpOnce);
                            });
                        });

                        //Evita agregar múltiples veces el evento a btnSignUp
                        btnSignUp.classList.add("event-added");
                    }
                }, 200);
            }
        }
    });

    //Limpieza de backdrop y clases si no hay ningún modal visible
    document.addEventListener("hidden.bs.modal", function () {
        const modalsAbiertos = document.querySelectorAll('.modal.show');

        if (modalsAbiertos.length === 0) {
            document.body.classList.remove('modal-open');
            document.body.style = '';
            document.querySelectorAll('.modal-backdrop').forEach(backdrop => backdrop.remove());
        }
    });
}