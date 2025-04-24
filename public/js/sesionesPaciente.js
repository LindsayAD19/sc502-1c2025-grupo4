document.addEventListener('DOMContentLoaded', function () {
    fetch('app/controllers/getCitasSesion.php')
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error(data.error);
                return;
            }

            const tbody = document.querySelector('tbody');
            tbody.innerHTML = ""; 

            if (data.length === 0) {
                tbody.innerHTML = '<tr><td colspan="2" class="text-center">No hay sesiones disponibles</td></tr>';
                return;
            }

            data.forEach(cita => {
                const tr = document.createElement('tr');
                tr.dataset.idCita = cita.ID_CITA;
                tr.dataset.fecha = cita.FECHA;
                tr.dataset.hora = cita.HORA;
                tr.dataset.terapeuta = cita.nombre_terapeuta;
                tr.dataset.plataforma = cita.PLATAFORMA || 'No asignada';

                tr.innerHTML = `
                    <td>${cita.nombre_terapeuta}</td>
                    <td>${formatearFecha(cita.FECHA)}</td>
                `;

                tr.addEventListener('click', function () {
                    mostrarInfoSesion(this);
                });

                tbody.appendChild(tr);
            });
        })
        .catch(err => console.error("Error cargando citas:", err));
});

function formatearFecha(fechaStr) {
    const fecha = new Date(fechaStr);
    return fecha.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' });
}

function mostrarInfoSesion(tr) {
    const infoContainer = document.querySelector('.container + hr + .container .row .col');

    infoContainer.innerHTML = `
        <h3>Información de la Sesión:</h3>
        <h5>Sesión con ${tr.dataset.terapeuta}</h5>
        <p>${formatearFecha(tr.dataset.fecha)} de ${tr.dataset.hora}</p>
        <p>Terapeuta: ${tr.dataset.terapeuta}</p>
        <p>Plataforma a utilizar para la reunión: ${tr.dataset.plataforma}</p>
        <button class="btn btn-success btn-lg" onclick="unirseASesion('${tr.dataset.plataforma}')">Unirse</button>
    `;
}

function unirseASesion(plataforma) {
    if (plataforma.toLowerCase().includes("zoom")) {
        window.open("https://zoom.us/", "_blank");
    } else {
        alert("Plataforma no disponible para apertura automática.");
    }
}