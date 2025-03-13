//Simulamos un usuario
const user = {
    loggedIn: true,   //Si el usuario ha iniciado sesión
    role: 'admin'     //El rol del usuario (admin, terapeuta, paciente)
};

//Verificar si el usuario está logueado y su rol para mostrar los tabs del navbar
if (user.loggedIn && user.role === 'admin') {
        // Mostrar el tab de administración
        document.getElementById('adminTab').style.display = 'block';
}
            
if(user.loggedIn && (user.role === 'terapeuta' || user.role === 'admin')){
        document.getElementById('terapeutaTab').style.display = 'block';
}