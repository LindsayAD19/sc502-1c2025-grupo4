function togglePaymentFields() {
    //Solo usamos tarjeta
  }
  
  function confirmarPago() {
    //Llama datos de la cita
    const cita = JSON.parse(localStorage.getItem('datosCita'));
    if (!cita) {
      alert('No hay datos de cita');
      return;
    }
  
    //Obtiene el método de pago
    const metodo = $('#metodoPago').val();
  
    //Envia el POST
    $.post('app/controllers/registroCitaPago.php', {
      fecha: cita.fecha,
      hora: cita.hora,
      idTerapeuta: cita.idTerapeuta,
      precio: cita.precio,
      metodo: metodo
    }, function(res) {
      console.log('Respuesta pago:', res);
      if (res.success) {
        localStorage.removeItem('datosCita');
        window.location.href = `facturaCita.html?idPago=${res.idPago}`;
      } else {
        alert('Error: ' + res.mensaje);
      }
    }, 'json')
    .fail((xhr, status, err) => {
      console.error('Error comunicación:', status, err, xhr.responseText);
      alert('Error de comunicación al guardar');
    });
  }
  
  //Al cargar la página, rellena el resumen
  $(function() {
    const cita = JSON.parse(localStorage.getItem('datosCita')) || {};
    $('#terapeuta').text(cita.nombreTerapeuta || '');
    $('#fecha').text(cita.fecha || '');
    $('#hora').text(cita.hora || '');
    $('#costo').text(cita.precio ? `₡${cita.precio}` : 'Gratis');
    if (cita.precio === 0) {
      $('#pagoSection').hide();
      $('#confirmarBtn').text('Confirmar Cita');
    }
  });
  
