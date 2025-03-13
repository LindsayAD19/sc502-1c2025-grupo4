// Obtener datos de la cita (simulación, en la realidad vendrían de otra página o backend)
const cita = {
    terapeuta: "TP. Camacho",
    fecha: "2024-08-10",
    hora: "14:00",
    costo: 18000 // Cambiar por el precio real si aplica
};

// Mostrar datos en la página
document.getElementById("terapeuta").textContent = cita.terapeuta;
document.getElementById("fecha").textContent = cita.fecha;
document.getElementById("hora").textContent = cita.hora;
document.getElementById("costo").textContent = cita.costo === 0 ? "Gratis" : `₡${cita.costo}`;

// Ocultar pago si es gratis
if (cita.costo === 0) {
    document.getElementById("pagoSection").style.display = "none";
    document.getElementById("confirmarBtn").textContent = "Confirmar Cita";
}

// Función para alternar entre campos de pago
function togglePaymentFields() {
    const metodoPago = document.getElementById("metodoPago").value;
    if (metodoPago === "tarjeta") {
        document.getElementById("tarjetaSection").style.display = "block";
        document.getElementById("nombreTitularSection").style.display = "block";
        document.getElementById("fechaSection").style.display = "block";
        document.getElementById("cvvSection").style.display = "block";
        document.getElementById("paypalSection").style.display = "none";
    } else {
        document.getElementById("tarjetaSection").style.display = "none";
        document.getElementById("nombreTitularSection").style.display = "none";
        document.getElementById("fechaSection").style.display = "none";
        document.getElementById("cvvSection").style.display = "none";
        document.getElementById("paypalSection").style.display = "block";
    }
}

// Función de confirmación de pago
function confirmarPago() {
    alert("Pago Confirmado.");
}