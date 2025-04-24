$(document).ready(function () {
    const params = new URLSearchParams(window.location.search);
    const idPago = params.get('idPago');

    if (!idPago) {
        alert('ID de pago no proporcionado');
        return;
    }

    $.ajax({
        url: `app/controllers/facturaCita.php?idPago=${idPago}`,
        method: 'GET',
        dataType: 'json',
        success: function (res) {
            if (!res.success) {
                alert('No se pudo cargar la factura: ' + res.mensaje);
                return;
            }

            const f = res.factura;

            $('#fechaEmision').text(f.FECHA_PAGO.split(' ')[0]);
            $('#paciente').text(`${f.nombre_paciente} ${f.apellidos_paciente}`);
            $('#terapeutaFactura').text(`${f.nombre_terapeuta} ${f.apellidos_terapeuta}`);
            $('#fechaCitaFactura').text(f.FECHA_CITA);
            $('#horaCitaFactura').text(f.HORA_CITA);

            // Actualizar tabla de detalles
            const precio = parseFloat(f.TOTAL).toFixed(2);
            const fila = `
                <tr>
                    <td>${f.descripcion_terapia}</td>
                    <td>1</td>
                    <td>₡${precio}</td>
                    <td>₡${precio}</td>
                </tr>
            `;
            $('#detallePago').html(fila);
            $('#totalFactura').text(`₡${precio}`);
        },
        error: function (xhr, status, error) {
            console.error('Error al cargar la factura:', error);
            alert('Error al cargar la factura');
        }
    });
});
