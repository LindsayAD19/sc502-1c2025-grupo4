$(document).on('click', '#btnSignIn', function () {
    console.log("signIn.js cargado");

    const email = $('#emailR').val();
    const password = $('#password').val();

    $.ajax({
        url: 'app/controllers/SignIn.php',
        type: 'POST',
        data: {
            email: email,
            contrasena: password
        },
        dataType: 'json',
        success: function (response) {
            if (response.success) {
                //Cierra el modal
                const modal = bootstrap.Modal.getInstance(document.getElementById("signInModal"));
                if (modal) modal.hide();

                //Recarga la página para que layout.js vuelva a cargar el navbar y tipoUsuario.js
                setTimeout(() => {
                    location.reload();
                }, 300);
            } else {
                alert(response.mensaje);
            }
        },
        error: function (xhr) {
            console.error("Error AJAX", xhr.responseText);
            alert("Error al comunicarse con el servidor.");
        }
    });
});