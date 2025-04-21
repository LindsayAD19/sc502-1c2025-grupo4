// Aquí se pueden agregar dinámicamente los datos de la cita o del pago.
document.getElementById("paciente").textContent = "Juan Pérez";
document.getElementById("terapeutaFactura").textContent = "TP. Camacho";
document.getElementById("fechaCitaFactura").textContent = "2024-08-10";
document.getElementById("horaCitaFactura").textContent = "14:00";
document.getElementById("fechaEmision").textContent = new Date().toISOString().split('T')[0]; // Fecha de emisión actual
