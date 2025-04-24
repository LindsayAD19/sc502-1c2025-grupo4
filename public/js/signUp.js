$(document).ready(function () {
    console.log("signUp.js cargado");

    $('#signUpForm').on('submit', function (e) {
        e.preventDefault();

        const contrasena = $('#contrasena').val();
        const confirmar = $('#confirmarContrasena').val();

        if (contrasena !== confirmar) {
            alert('Las contraseñas no coinciden.');
            return;
        }

        const formData = $(this).serialize();

        $.ajax({
            url: 'app/controllers/signUp.php',
            type: 'POST',
            data: formData,
            success: function (response) {
                alert(response);
                $('#signUpForm')[0].reset();
                const signUpModal = bootstrap.Modal.getInstance(document.getElementById("signUpModal"));
                signUpModal.hide();
            },
            error: function () {
                alert('Error al comunicarse con el servidor.');
            }
        });
    });
});