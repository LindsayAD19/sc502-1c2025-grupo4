function loadModalEvents() {
    console.log("signIn.js cargado correctamente");

    const btnSignIn = document.getElementById("BtnSignIn");
    if (btnSignIn) {
        btnSignIn.addEventListener("click", function (event) {
            event.preventDefault();

            const signInModal = new bootstrap.Modal(document.getElementById("signInModal"));
            signInModal.show();

            //Agrega el evento de "Registrarse" dentro del modal
            setTimeout(() => {
                const btnSignUp = document.getElementById("btnSignUp");
                if (btnSignUp) {
                    btnSignUp.addEventListener("click", function (e) {
                        e.preventDefault();

                        const signInModalEl = document.getElementById("signInModal");
                        const bsSignInModal = bootstrap.Modal.getInstance(signInModalEl);
                        bsSignInModal.hide();

                        //Espera a que termine de cerrarse completamente antes de abrir SignUp
                        signInModalEl.addEventListener("hidden.bs.modal", function openSignUpOnce() {
                            setTimeout(() => {
                                const signUpModal = new bootstrap.Modal(document.getElementById("signUpModal"));
                                signUpModal.show();
                            }, 200); //Espera a que Bootstrap termine de limpiar backdrop
                        
                            signInModalEl.removeEventListener("hidden.bs.modal", openSignUpOnce);
                        });
                    });
                }
            }, 200);
        });
    }

    //Limpieza cuando no hay ningún modal activo
    document.addEventListener("hidden.bs.modal", function () {
        const modalsAbiertos = document.querySelectorAll('.modal.show');

        if (modalsAbiertos.length === 0) {
            document.body.classList.remove('modal-open');
            document.body.style = '';
            document.querySelectorAll('.modal-backdrop').forEach(backdrop => backdrop.remove());
        }
    });
}