document.addEventListener("DOMContentLoaded", () => {
    $.ajax({
        url: "app/controllers/getSession.php",
        method: "GET",
        dataType: "json",
        success: function (res) {
            console.log("🧠 Datos de sesión:", res); // DEBUG

            if (res.loggedIn) {
                $('#BtnSignIn').hide();
                $('#userDropdown').show();

                const basePath = window.location.origin + "/sc502-3c2025-grupo4/";
                const safeFileName = encodeURIComponent(res.foto_perfil || "default.png");

                const rutaImg = res.foto_perfil === "default.png"
                    ? "public/img/default.png"
                    : "public/img/" + encodeURIComponent(res.foto_perfil) + "?" + new Date().getTime();

                $("#imgPerfil").attr("src", rutaImg);
                $("#imgPerfil").attr("title", res.nombre || "Usuario");

                if (res.rol === 'admin') $('#adminTab').show();
                if (res.rol === 'terapeuta') $('#terapeutaTab').show();
            }
        },
        error: function () {
            console.error("Error al obtener sesión del usuario.");
        }
    });

    $(document).on("click", "#btnSignOut", function () {
        $.get("app/controllers/SignOut.php", function () {
            location.reload();
        });
    });
});