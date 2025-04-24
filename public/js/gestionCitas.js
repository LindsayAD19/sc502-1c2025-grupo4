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
        $('#terapeuta').val(idTerapeuta);  // Asignamos el valor al select

        // Llamamos a la función para obtener el precio, simulando un cambio programático
        obtenerPrecio(idTerapeuta);
    }

    // Manejo del evento de cambio manual (cuando el usuario selecciona un valor en el select)
    $('#terapeuta').on('change', function () {
        const idSeleccionado = $(this).val();
        if (idSeleccionado) {
            obtenerPrecio(idSeleccionado);  // Llamamos a la función para obtener el precio
        }
    });

    // Función para obtener el precio del terapeuta
    function obtenerPrecio(id) {
        $.ajax({
            url: 'app/controllers/gestionCitas.php',
            method: 'GET',
            data: { id: id },
            success: function (response) {
                // Si la respuesta es una cadena, intentamos convertirla a un objeto JSON
                if (typeof response === "string") {
                    try {
                        response = JSON.parse(response);
                    } catch (e) {
                        console.error("Error al analizar la respuesta JSON", e);
                        response = {};
                    }
                }

                // Comprobamos si el precio está presente y lo asignamos al campo
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



// document.getElementById("citaForm").addEventListener("submit", function (event) {
//     event.preventDefault();

//     const fecha = document.getElementById("fecha").value;
//     const hora = document.getElementById("hora").value;
//     const terapeuta = document.getElementById("terapeuta").value;
//     const idCita = Date.now();

//     const listaCitas = document.getElementById("listaCitas");

//     const li = document.createElement("li");
//     li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
//     li.dataset.id = idCita;
//     li.innerHTML = `
//                 <div>
//                     <strong>${terapeuta}</strong> - ${fecha} a las ${hora}
//                 </div>
//                 <div>
//                     <button class="btn btn-warning btn-sm me-2" onclick="reprogramarCita(${idCita})">Reprogramar</button>
//                     <button class="btn btn-danger btn-sm" onclick="cancelarCita(${idCita})">Cancelar</button>
//                 </div>
//             `;

//     listaCitas.appendChild(li);

//     document.getElementById("citaForm").reset();

//     //Codigo para abrir el pago
//     setTimeout(() => {
//         window.location.href = "pagoCita.html";
//     }, 3000);

// });

// function reprogramarCita(id) {
//     const nuevaFecha = prompt("Ingrese la nueva fecha (YYYY-MM-DD):");
//     const nuevaHora = prompt("Ingrese la nueva hora (HH:MM):");

//     if (nuevaFecha && nuevaHora) {
//         const cita = document.querySelector(`li[data-id='${id}']`);
//         const info = cita.querySelector("div");
//         info.innerHTML = `<strong>${info.querySelector("strong").innerText}</strong> - ${nuevaFecha} a las ${nuevaHora}`;
//     }
// }

// function cancelarCita(id) {
//     if (confirm("¿Estás seguro de que deseas cancelar esta cita?")) {
//         document.querySelector(`li[data-id='${id}']`).remove();
//     }
// }