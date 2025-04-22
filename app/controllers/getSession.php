<?php
session_start();
header("Content-Type: application/json");

if (isset($_SESSION["usuario_id"])) {
    echo json_encode([
        "loggedIn" => true,
        "nombre" => $_SESSION["usuario_nombre"],
        "foto_perfil" => $_SESSION["foto_perfil"] ?? "default.png",
        "rol" => $_SESSION["usuario_rol"]
    ]);
} else {
    echo json_encode(["loggedIn" => false]);
}
?>