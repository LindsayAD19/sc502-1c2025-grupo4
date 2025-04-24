$(function() {
    const controller = 'app/controllers/configurarTerapeuta.php';
    const bloquesCont = $('#bloquesHorario');
    const template = $('#templateBloque')[0].content;

    //Carga la lista de terapias
    function cargarTerapias() {
        return $.getJSON(controller, { action: 'listTerapias' })
            .done(data => {
                const select = $('#selectTerapia');
                data.forEach(t => select.append(`<option value="${t.ID_TERAPIA}">${t.ESPECIALIDAD}</option>`));
            });
    }

    //Agrega el bloque horario en DOM
    function agregarBloque(b) {
        const clone = document.importNode(template, true);
        const row = $(clone).find('.bloque-horario');
        if (b) {
            row.find('.dia').val(b.dia);
            row.find('.hora-inicio').val(b.hora_inicio);
            row.find('.hora-fin').val(b.hora_fin);
        }
        row.find('.btn-eliminar-bloque').click(function() { row.remove(); });
        bloquesCont.append(row);
    }

    //Carga la configuración existente
    function cargarConfig() {
        $.getJSON(controller, { action: 'getConfig' })
            .done(data => {
                if (data.ID_TERAPIA) $('#selectTerapia').val(data.ID_TERAPIA);
                if (data.PRECIO) $('#precioConsulta').val(data.PRECIO);
                // horarios
                bloquesCont.empty();
                (data.horarios || []).forEach(h => agregarBloque(h));
                if (!data.horarios.length) agregarBloque();
            });
    }

    //Guarda la configuración
    $('#guardarBtn').click(function() {
        const payload = {
            action: 'saveConfig',
            idTerapia: $('#selectTerapia').val(),
            precio: $('#precioConsulta').val(),
            horarios: []
        };
        $('.bloque-horario').each(function() {
            const dia = $(this).find('.dia').val();
            const inicio = $(this).find('.hora-inicio').val();
            const fin = $(this).find('.hora-fin').val();
            if (dia && inicio && fin) payload.horarios.push({ dia, hora_inicio: inicio, hora_fin: fin });
        });
        $.ajax({
            url: controller,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(payload),
            dataType: 'json'
        }).done(res => {
            if (res.success) alert('Configuración guardada');
            else alert(res.mensaje || 'Error al guardar');
        }).fail(() => alert('Error de comunicación'));
    });

    //Inicialización
    $.when(cargarTerapias()).then(cargarConfig);

    //Evento para agregar bloque vacío
    $('#agregarBloqueBtn').click(() => agregarBloque());
});