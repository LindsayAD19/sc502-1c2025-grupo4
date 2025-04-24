const cita = JSON.parse(localStorage.getItem("datosCita"));

if (cita) {
    document.getElementById("terapeuta").textContent = cita.nombreTerapeuta || "Sin nombre";
    document.getElementById("fecha").textContent = cita.fecha || "Fecha no disponible";
    document.getElementById("hora").textContent = cita.hora || "Hora no disponible";
    
    const costo = cita.costo || 18000; 
    document.getElementById("costo").textContent = costo === 0 ? "Gratis" : `₡${costo}`;
} else {
    console.warn("No hay datos de la cita en localStorage.");
}

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