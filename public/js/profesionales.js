$(document).ready(function () {
    $.ajax({
        url: 'app/controllers/profesionales.php',
        type: 'GET',
        success: function (data) {
            console.log("Respuesta del servidor:", data);
            const container = $('.row-cols-md-3');
            container.empty();

            if (Array.isArray(data) && data.length > 0) {
                data.forEach(t => {
                    const card = `
                       <div class="col">
                            <div class="card p-4 shadow-sm">
                                <div class="card-body">
                                    <div class="d-flex align-items-center mb-3">
                                        <img src="https://ui-avatars.com/api/?name=${t.nombre}+${t.apellidos}&background=random" 
                                            alt="avatar" 
                                            class="rounded-circle me-3" 
                                            style="width: 60px; height: 60px;">

                                        <div>
                                            <h5 class="card-title text-primary mb-0">${t.nombre} ${t.apellidos}</h5>
                                            <small class="text-muted"><strong>Especialidad:</strong> ${t.especialidad}</small>
                                        </div>
                                    </div>

                                    <p class="card-text mb-2"><em>${t.descripcion}</em></p>
                                    <p class="card-text mb-2">
                                        <strong>Precio:</strong> 
                                        <span class="text-success fw-semibold">₡${t.precio}</span>
                                    </p>

                                    <p class="mb-1">
                                        <strong>Horario:</strong><br>
                                        ${t.dia}: ${t.hora_inicio} - ${t.hora_fin}
                                    </p>

                                    <a href="gestionCitas.html?id=${t.id}" class="btn btn-success mt-2" data-id="${t.id}">Agendar Cita</a>
                                </div>
                            </div>
                        </div>
                    `;
                    container.append(card);
                });
            } else {
                container.append(`<p class="text-center">No se encontraron profesionales</p>`);
            }
        },
        error: function () {
            console.error('Error al cargar los terapeutas');
        }
    });
});
