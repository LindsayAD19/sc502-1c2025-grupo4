document.addEventListener("DOMContentLoaded", function () {
    fetch("app/controllers/getRecordatorios.php")
        .then(res => res.json())
        .then(data => {
            const lista = document.getElementById("lista-recordatorios");
            lista.innerHTML = "";

            if (data.length === 0) {
                lista.innerHTML = "<li class='list-group-item text-center'>No tienes citas próximas.</li>";
                return;
            }

            data.forEach((cita, index) => {
                const fecha = new Date(cita.fecha + 'T' + cita.hora);
                const opciones = { day: 'numeric', month: 'long' };
                const fechaFormateada = fecha.toLocaleDateString('es-ES', opciones);
                const horaFormateada = fecha.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

                const item = `
                    <li class="list-group-item d-flex align-items-center">
                        <input class="form-check-input me-3" type="checkbox" id="cita${index}">
                        <label class="form-check-label flex-grow-1" for="cita${index}">
                            <strong>${cita.nombre}</strong><br>
                            <small class="text-muted">${fechaFormateada} | ${horaFormateada}</small>
                        </label>
                    </li>`;
                lista.insertAdjacentHTML('beforeend', item);
            });
        })
        .catch(error => {
            console.error("Error al cargar recordatorios:", error);
        });
});