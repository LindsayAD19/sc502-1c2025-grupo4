$(document).ready(function () {
    $('#formContacto').submit(function (e) {
        e.preventDefault(); 

        const nombre = $('#nombre').val();
        const apellido = $('#apellido').val();
        const correo = $('#correo').val();
        const sexo = $('#sexo').val();
        const mensaje = $('#mensaje').val();

        $.ajax({
            url: 'app/controllers/contacto.php', 
            type: 'POST',
            data: {
                nombre: nombre,
                apellido: apellido,
                correo: correo,
                sexo: sexo,
                mensaje: mensaje
            },
            success: function (response) {
                try {
                    //const res = JSON.parse(response); 
                    const res = response;
                    if (res.success) {
                        $('#resultado').html('<p class="success">✅ ' + res.mensaje + '</p>');
                        $('#formContacto')[0].reset(); 
                    } else {
                        $('#resultado').html('<p class="error">❌ ' + res.mensaje + '</p>');
                    }
                } catch (error) {
                    console.error("Error al parsear el JSON: ", error);
                    $('#resultado').html('<p class="error">⚠️ Hubo un error con la respuesta del servidor.</p>');
                }
            },
            error: function (xhr) {
                console.error("Error AJAX", xhr.responseText);
                $('#resultado').html('<p class="error">⚠️ Hubo un error al enviar el formulario.</p>');
            }
        });
    });
});