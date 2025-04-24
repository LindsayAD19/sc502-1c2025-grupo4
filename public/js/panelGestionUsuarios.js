$(function () {
    const controller = 'app/controllers/gestionUsuarios.php';
    let currentAction = 'agregar', currentTipo = '';

    //Cargar tablas
    function refrescarTablas() {
        ['terapeuta', 'paciente', 'admin'].forEach(tipo => {
            $.post(controller, { action: 'listar', tipo: tipo }, null, 'json')
                .done(users => {
                    const tbody = $(`#tabla-${tipo}`);
                    tbody.empty();
                    if (!Array.isArray(users) || users.length === 0) {
                        tbody.append(`<tr><td colspan="6" class="text-center text-muted">No hay ${tipo}s</td></tr>`);
                        return;
                    }
                    users.forEach(u => {
                        tbody.append(`
                        <tr data-id="${u.id}" data-tipo="${u.tipo}" data-direccion="${u.direccion}">
                            <td>${u.nombre}</td>
                            <td>${u.apellidos}</td>
                            <td>${u.email}</td>
                            <td>${u.telefono || ''}</td>
                            <td>${u.direccion || ''}</td>
                            <td>
                                <button class="btn btn-sm btn-warning editar">Editar</button>
                                <button class="btn btn-sm btn-danger eliminar">Eliminar</button>
                            </td>
                        </tr>
                    `);
                    });
                }).fail(() => alert(`Error cargando ${tipo}s`));
        });
    }

    refrescarTablas();

    //Botón Agregar
    $('button[data-tipo]').click(function () {
        currentAction = 'agregar'; currentTipo = $(this).data('tipo');
        $('#usuarioId, #usuarioNombre, #usuarioApellidos, #usuarioCorreo, #usuarioTelefono, #usuarioDireccion, #usuarioContrasena').val('');
        $('#usuarioTipo').val(currentTipo);
        $('#modalUsuarioTitle').text(`Agregar ${capitalize(currentTipo)}`);
        $('#guardarUsuarioBtn').text('Agregar');
        $('#modalUsuario').modal('show');
    });

    //Botón Editar
    $('body').on('click', '.editar', function () {
        currentAction = 'editar';
        const tr = $(this).closest('tr');
        currentTipo = tr.data('tipo');
        $('#usuarioId').val(tr.data('id'));
        $('#usuarioTipo').val(currentTipo);
        $('#usuarioNombre').val(tr.find('td').eq(0).text());
        $('#usuarioApellidos').val(tr.find('td').eq(1).text());
        $('#usuarioCorreo').val(tr.find('td').eq(2).text());
        $('#usuarioTelefono').val(tr.find('td').eq(3).text());
        $('#usuarioDireccion').val(tr.data('direccion'));
        $('#usuarioContrasena').val('');
        $('#modalUsuarioTitle').text(`Editar ${capitalize(currentTipo)}`);
        $('#guardarUsuarioBtn').text('Guardar Cambios');
        $('#modalUsuario').modal('show');
    });

    //Guardar Agregar/Editar
    $('#guardarUsuarioBtn').click(function () {
        const payload = {
            action: currentAction,
            tipo: currentTipo,
            id: $('#usuarioId').val(),
            nombre: $('#usuarioNombre').val(),
            apellidos: $('#usuarioApellidos').val(),
            email: $('#usuarioCorreo').val(),
            telefono: $('#usuarioTelefono').val(),
            direccion: $('#usuarioDireccion').val(),
            contrasena: $('#usuarioContrasena').val()
        };
        $.post(controller, payload, (res) => {
            if (res.success) { $('#modalUsuario').modal('hide'); refrescarTablas(); }
            else alert(res.mensaje || 'Error');
        }, 'json').fail(() => alert('Error comunicación'));
    });

    //Eliminar
    $('body').on('click', '.eliminar', function () {
        const tr = $(this).closest('tr');
        if (!confirm(`¿Eliminar este ${tr.data('tipo')}?`)) return;
        $.post(controller, { action: 'eliminar', id: tr.data('id') }, (res) => {
            if (res.success) refrescarTablas();
            else alert(res.mensaje || 'Error eliminar');
        }, 'json').fail(() => alert('Error comunicación'));
    });

    function capitalize(str) { return str.charAt(0).toUpperCase() + str.slice(1); }
});