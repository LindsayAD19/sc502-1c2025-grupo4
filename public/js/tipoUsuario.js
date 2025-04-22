document.addEventListener("DOMContentLoaded", () => {
    //Espera a que exista el elemento del navbar
    const esperarNavbar = setInterval(() => {
        const navbarCargado = document.getElementById("BtnSignIn") || document.getElementById("userDropdown");
        if (navbarCargado) {
            clearInterval(esperarNavbar);

            //Verificación de sesión
            $.ajax({
                url: "app/controllers/getSession.php",
                method: "GET",
                dataType: "json",
                success: function (res) {
                    if (res.loggedIn) {
                        $('#BtnSignIn').hide();
                        $('#userDropdown').show();
                        $('#imgPerfil').attr("src", "public/img/" + res.foto_perfil);

                        if (res.rol === 'admin') $('#adminTab').show();
                        if (res.rol === 'terapeuta') $('#terapeutaTab').show();
                    } else {
                        $('#BtnSignIn').show();
                        $('#userDropdown').hide();
                    }
                }
            });

            //Cerrar sesión
            $(document).on("click", "#btnSignOut", function () {
                $.get("app/controllers/SignOut.php", function () {
                    location.reload();
                });
            });
        }
    }, 100); //Revisa cada 100ms hasta que el navbar esté cargado
});