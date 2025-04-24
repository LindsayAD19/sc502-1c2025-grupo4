$(document).ready(function () {
    const params = new URLSearchParams(window.location.search);
    const idTerapeuta = params.get("id");

    if (idTerapeuta) {

        // Agregar terapeuta temporalmente mientras se carga por AJAX
        $('#terapeuta').html(`
            <option value="${idTerapeuta}" selected>Terapeuta #${idTerapeuta}</option>
        `);
    } else {
        $('#terapeuta').html(`<option disabled selected>Error al cargar terapeuta</option>`);
    }

    // Cargar terapeutas desde PHP (esto reemplazará el anterior select si es exitoso)
    $.ajax({
        url: 'app/controllers/gestionCitas.php',
        type: 'GET',
        success: function (response) {
            const select = $('#terapeuta');
            select.empty();
            select.append('<option disabled selected>Seleccione un terapeuta</option>');
            response.forEach(function (t) {
                const selected = t.id == idTerapeuta ? 'selected' : '';
                select.append(`<option value="${t.id}" ${selected}>${t.nombre}</option>`);
            });
        },
        error: function () {
            console.error('Error al cargar los terapeutas');
        }
    });

    // Captura y redirección al agendar
    $('#citaForm').submit(function (e) {
        e.preventDefault();

        const datosCita = {
            fecha: $('#fecha').val(),
            hora: $('#hora').val(),
            nombreTerapeuta: $('#terapeuta option:selected').text(),
            precio: $('#precio').val()
        };

        localStorage.setItem('datosCita', JSON.stringify(datosCita));

        setTimeout(() => {
            window.location.href = "pagoCita.html";
        }, 2000);
    });

 if (idTerapeuta) {
        $('#terapeuta').val(idTerapeuta);

        obtenerPrecio(idTerapeuta);
    }

    $('#terapeuta').on('change', function () {
        const idSeleccionado = $(this).val();
        if (idSeleccionado) {
            obtenerPrecio(idSeleccionado); 
        }
    });

    function obtenerPrecio(id) {
        $.ajax({
            url: 'app/controllers/gestionCitas.php',
            method: 'GET',
            data: { id: id },
            success: function (response) {
                if (typeof response === "string") {
                    try {
                        response = JSON.parse(response);
                    } catch (e) {
                        console.error("Error al analizar la respuesta JSON", e);
                        response = {};
                    }
                }
                if (response && response.precio && response.precio !== '') {
                    console.log("Precio asignado:", response.precio);
                    $('#precio').val(response.precio);
                } else {
                    console.error('Precio no encontrado o no disponible');
                    $('#precio').val('');
                }
            },
            error: function () {
                console.error('Error al obtener el precio del terapeuta');
                $('#precio').val('');
            }
        });
    }
});