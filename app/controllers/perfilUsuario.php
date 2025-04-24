<?php
session_start();
header("Content-Type: application/json");
require_once '../../config/database.php';

if (!isset($_SESSION["usuario_id"])) {
    echo json_encode(["status" => "error", "mensaje" => "No autorizado."]);
    exit;
}

$id = $_SESSION["usuario_id"];
$campos = [];
$valores = [];
$nombreArchivo = null;

//Email
if (!empty($_POST["email"])) {
    $campos[] = "email=?";
    $valores[] = $_POST["email"];
    $_SESSION["usuario_nombre"] = $_POST["email"];
}

//Teléfono
if (!empty($_POST["telefono"])) {
    $campos[] = "telefono=?";
    $valores[] = $_POST["telefono"];
}

//Contraseña
if (!empty($_POST["contrasena"])) {
    $campos[] = "contrasena=?";
    $valores[] = password_hash($_POST["contrasena"], PASSWORD_DEFAULT);
}

//Foto
if (!empty($_FILES["foto_perfil"]["name"])) {
    $nombreArchivo = uniqid() . "_" . basename($_FILES["foto_perfil"]["name"]);
    $ruta = "../../public/img/" . $nombreArchivo;

    if (move_uploaded_file($_FILES["foto_perfil"]["tmp_name"], $ruta)) {
        $campos[] = "foto_perfil=?";
        $valores[] = $nombreArchivo;
        $_SESSION["foto_perfil"] = $nombreArchivo;
    } else {
        echo json_encode(["status" => "error", "mensaje" => "Error al subir la imagen."]);
        exit;
    }
}

if (empty($campos)) {
    echo json_encode(["status" => "error", "mensaje" => "No se enviaron cambios."]);
    exit;
}

$sql = "UPDATE usuarios_tb SET " . implode(", ", $campos) . " WHERE id=?";
$valores[] = $id;

$stmt = $conn->prepare($sql);
$tipos = str_repeat("s", count($valores) - 1) . "i";
$stmt->bind_param($tipos, ...$valores);

if ($stmt->execute()) {
    echo json_encode([
        "status" => "ok",
        "mensaje" => "Perfil actualizado correctamente.",
        "foto_perfil" => $nombreArchivo
    ]);
} else {
    echo json_encode(["status" => "error", "mensaje" => "Error al actualizar: " . $conn->error]);
}

$stmt->close();
$conn->close();
?>