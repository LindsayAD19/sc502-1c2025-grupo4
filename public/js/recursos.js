

$(document).ready(function () {
    $.ajax({
        url: 'app/controllers/getRecursos.php',
        type: 'GET',
        dataType: 'json',
        success: function (recursos) {
            const contenedor = $('.container.mt-2.mb-5 .row');
            contenedor.empty(); // Limpiar contenido actual

            recursos.forEach(recurso => {
                const card = `
                    <div class="col mb-4">
                        <div class="card" style="width: 18rem;">
                            <img src="${recurso.imagen}" class="card-img-top" alt="Imagen recurso">
                            <div class="card-body">
                                <h5 class="card-title">${recurso.nombre}</h5>
                                <p class="card-text">${recurso.fecha}</p>
                                <a href="${recurso.link}" target="_blank" class="btn btn-success">Visitar</a>
                            </div>
                        </div>
                    </div>
                `;
                contenedor.append(card);
            });
        },
        error: function (xhr, status, error) {
            console.error("Error al cargar los recursos:", error);
        }
    });
});