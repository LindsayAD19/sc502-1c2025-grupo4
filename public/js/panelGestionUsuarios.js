//Simulamos un usuario
const user = {
    loggedIn: true,   //Si el usuario ha iniciado sesión
    role: 'admin'     //El rol del usuario (admin, terapeuta, paciente)
};

//Verificar si el usuario está logueado y su rol para mostrar los tabs del navbar
if (user.loggedIn && user.role === 'admin') {
    //Mostrar el tab de administración
    document.getElementById('adminTab').style.display = 'block';
}

if (user.loggedIn && (user.role === 'terapeuta' || user.role === 'admin')) {
    document.getElementById('terapeutaTab').style.display = 'block';
}



function agregarTerapeuta() {
    let cedula = document.getElementById('cedulaTerapeuta').value;
    let nombre = document.getElementById('nombreTerapeuta').value;
    let especialidad = document.getElementById('especialidadTerapeuta').value;
    let horario = document.getElementById('horarioTerapeuta').value;
    let precio = document.getElementById('precioTerapeuta').value;
    if (cedula && nombre && especialidad && horario && precio) {
        let fila = `<tr id="terapeuta-${cedula}">
                        <td>${cedula}</td>
                        <td>${nombre}</td>
                        <td>${especialidad}</td>
                        <td>${horario}</td>
                        <td>${precio} colones</td>
                        <td>
                            <button class="btn btn-secondary" onclick="editarTerapeuta('${cedula}')">Editar</button>
                            <button class="btn btn-danger" onclick="eliminarTerapeuta('${cedula}')">Eliminar</button>
                        </td>
                    </tr>`;
        document.getElementById('tablaTerapeutas').innerHTML += fila;
        document.getElementById('cedulaTerapeuta').value = "";
        document.getElementById('nombreTerapeuta').value = "";
        document.getElementById('especialidadTerapeuta').value = "";
        document.getElementById('horarioTerapeuta').value = "";
        document.getElementById('precioTerapeuta').value = "";
    }
}

function agregarPaciente() {
    let cedula = document.getElementById('cedulaPaciente').value;
    let nombre = document.getElementById('nombrePaciente').value;
    let email = document.getElementById('emailPaciente').value;
    if (cedula && nombre && email) {
        let fila = `<tr id="paciente-${cedula}">
                        <td>${cedula}</td>
                        <td>${nombre}</td>
                        <td>${email}</td>
                        <td>
                            <button class="btn btn-danger" onclick="eliminarPaciente('${cedula}')">Eliminar</button>
                        </td>
                    </tr>`;
        document.getElementById('tablaPacientes').innerHTML += fila;
        document.getElementById('cedulaPaciente').value = "";
        document.getElementById('nombrePaciente').value = "";
        document.getElementById('emailPaciente').value = "";
    }
}

function eliminarPaciente(cedula) {
    let fila = document.getElementById(`paciente-${cedula}`);
    fila.remove();
    alert('Paciente con cédula ' + cedula + ' eliminado');
}