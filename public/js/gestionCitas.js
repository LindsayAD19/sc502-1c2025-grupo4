document.getElementById("citaForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const fecha = document.getElementById("fecha").value;
    const hora = document.getElementById("hora").value;
    const terapeuta = document.getElementById("terapeuta").value;
    const idCita = Date.now();

    const listaCitas = document.getElementById("listaCitas");

    const li = document.createElement("li");
    li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
    li.dataset.id = idCita;
    li.innerHTML = `
                <div>
                    <strong>${terapeuta}</strong> - ${fecha} a las ${hora}
                </div>
                <div>
                    <button class="btn btn-warning btn-sm me-2" onclick="reprogramarCita(${idCita})">Reprogramar</button>
                    <button class="btn btn-danger btn-sm" onclick="cancelarCita(${idCita})">Cancelar</button>
                </div>
            `;

    listaCitas.appendChild(li);

    document.getElementById("citaForm").reset();

    //Codigo para abrir el pago
    setTimeout(() => {
        window.location.href = "pagoCita.html";
    }, 3000);

});

function reprogramarCita(id) {
    const nuevaFecha = prompt("Ingrese la nueva fecha (YYYY-MM-DD):");
    const nuevaHora = prompt("Ingrese la nueva hora (HH:MM):");

    if (nuevaFecha && nuevaHora) {
        const cita = document.querySelector(`li[data-id='${id}']`);
        const info = cita.querySelector("div");
        info.innerHTML = `<strong>${info.querySelector("strong").innerText}</strong> - ${nuevaFecha} a las ${nuevaHora}`;
    }
}

function cancelarCita(id) {
    if (confirm("¿Estás seguro de que deseas cancelar esta cita?")) {
        document.querySelector(`li[data-id='${id}']`).remove();
    }
}