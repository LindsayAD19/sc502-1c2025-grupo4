document.addEventListener("DOMContentLoaded", function () {
    //Carga datos actuales
    fetch("app/controllers/getSession.php")
        .then(res => res.json())
        .then(data => {
            if (data.loggedIn) {
                document.getElementById("email").value = data.email || '';
                document.getElementById("telefono").value = data.telefono || '';
                document.getElementById("profile-pic").src = "public/img/" + data.foto_perfil;
            }
        });

    //Vista previa imagen
    document.getElementById("upload-img").addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById("profile-pic").src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    //Guardar cambios
    document.getElementById("perfilForm").addEventListener("submit", function (e) {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const telefono = document.getElementById("telefono").value.trim();
        const contrasena = document.getElementById("contrasena").value;
        const confirmar = document.getElementById("confirmarContraseña").value;
        const foto = document.getElementById("upload-img").files[0];

        if (contrasena && contrasena !== confirmar) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        const formData = new FormData();
        if (email) formData.append("email", email);
        if (telefono) formData.append("telefono", telefono);
        if (contrasena) formData.append("contrasena", contrasena);
        if (foto) formData.append("foto_perfil", foto);

        fetch("app/controllers/perfilUsuario.php", {
            method: "POST",
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            alert(data.mensaje);

            //Si se subió una imagen nueva, actualiza la del navbar sin recargar
            if (data.foto_perfil) {
                const nuevaRuta = "public/img/" + encodeURIComponent(data.foto_perfil) + "?" + new Date().getTime();
                document.getElementById("imgPerfil").src = nuevaRuta;
            
                //Revalida sesión para que se mantenga al navegar
                fetch("app/controllers/getSession.php").then(() => console.log("Sesión revalidada"));
            }
        })
        .catch(() => alert("Error al guardar los cambios."));
    });
});
