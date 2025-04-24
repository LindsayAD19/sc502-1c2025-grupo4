<?php
session_start();
header("Content-Type: application/json");

if (isset($_SESSION["usuario_id"])) {
    echo json_encode([
        "loggedIn" => true,
        "nombre" => $_SESSION["usuario_nombre"],
        "foto_perfil" => $_SESSION["foto_perfil"] ?? "default.png",
        "rol" => $_SESSION["usuario_rol"],
        "email" => $_SESSION["usuario_email"] ?? '',
        "telefono" => $_SESSION["usuario_telefono"] ?? ''
    ]);
} else {
    echo json_encode(["loggedIn" => false]);
}
?>